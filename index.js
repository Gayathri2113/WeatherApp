let currentdate = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentday = days[currentdate.getDay()];
let dayofweek = document.querySelector("#day");

let hours = currentdate.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let min = currentdate.getMinutes();
if (min < 10) {
    min = `0${min}`;
}

let time = `${hours}:${min}`;
dayofweek.innerHTML = `${currentday} ${time}`;

function search(event) {
    event.preventDefault();
    let changecity = document.querySelector(".country");
    let innerput = document.querySelector("#type");
    changecity.innerHTML = innerput.value;
}

let searchform = document.querySelector("#search");
searchform.addEventListener("submit", search);

function showTemperature(response) {
    let temperature = document.querySelector(".number");
    let humid = document.querySelector("#humid");
    let wind = document.querySelector("#wind");
    let description = document.querySelector(".weather");
    let icon = document.querySelector(".image");

    celsiusTemperature = response.data.main.temp
    temperature.innerHTML = Math.round(celsiusTemperature);
    humid.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    description.innerHTML = response.data.weather[0].description;
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", response.data.weather[0].description);
    getForecast(response.data.coord);
}

function showCountry(event) {
    event.preventDefault();
    let city = document.querySelector("#type");
    let cityname = city.value;
    let country = document.querySelector(".country");
    country.innerHTML = cityname;
    let apikey = "36459a8242aec3971626f0447d4eb713";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=metric`
    axios.get(apiUrl).then(showTemperature);
}

let btn = document.querySelector(".btn");
btn.addEventListener("click", showCountry);

function displayForecast(response) {
    let forecast  = response.data.list;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;

    forecast.forEach(function (forecastday,index) {
        if(index < 6){
        forecastHTML = forecastHTML + `
        <div class="col-2">
            <div class="weather-forecast-date">${forecastday.dt_txt}</div>
                    <img src="https://openweathermap.org/img/wn/${forecastday.weather[0].icon}@2x.png" alt="" width="30px">
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperatures-max">${Math.round(forecastday.main.temp_max)}°</span>
                        <span class="weather-forecast-temperatures-min">${Math.round(forecastday.main.temp_min)}°</span>
            </div>
        </div>
    `;
    }
    })
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
    let apikey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
    axios.get(apiurl).then(displayForecast);
}
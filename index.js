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

function changetempToFahren(event) {
    event.preventDefault();
    let temp = document.querySelector(".number");
    fahrenheit.classList.add("active");
    celsius.classList.remove("active");
    let fahren = (celsiusTemperature * 9 / 5) + 32;
    temp.innerHTML = Math.round(fahren);
}

function changetempTocelsius(event) {
    event.preventDefault();
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
    let temp = document.querySelector(".number");
    temp.innerHTML = Math.round(celsiusTemperature);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changetempToFahren);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changetempTocelsius);

let celsiusTemperature = null;

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
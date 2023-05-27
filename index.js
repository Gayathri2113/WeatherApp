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
    let Temperature = temp.innerHTML;
    let fahren = (Temperature * 9 / 5) + 32;
    temp.innerHTML = fahren;
}


function changetempTocelsius(event) {
    event.preventDefault();
    let temp = document.querySelector(".number");
    let Temperature = temp.innerHTML;
    let celsius = ((Temperature - 32) * 5) / 9;
    temp.innerHTML = celsius;
}
let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", changetempToFahren);

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", changetempTocelsius);

function showTemperature(response){
    let temperature = document.querySelector(".number")
    let humid = document.querySelector("#humid");
    humid.innerHTML = response.data.main.humidity;
    let wind = document.querySelector("#wind");
    wind.innerHTML = response.data.wind.speed;
    let description = document.querySelector(".weather");
    description.innerHTML = response.data.weather[0].description;
    console.log(response.data);
    console.log(response.data.weather[0].description);

    let icon = response.data.weather[0].icon;
    let icons = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    console.log(icons);
}

function showCountry(event){
    event.preventDefault();
    let city = document.querySelector("#type");
    let cityname = city.value;
    let country = document.querySelector(".country");
    country.innerHTML = cityname;
    let apikey = "36459a8242aec3971626f0447d4eb713";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=metric`
    axios.get(apiUrl).then(showTemperature);
    console.log(cityname);
}

let btn = document.querySelector(".btn");
btn.addEventListener("click",showCountry);
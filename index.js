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

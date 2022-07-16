let now = new Date();

let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let months = [
  "Janaury",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

let h3 = document.querySelector("h3");

h3.innerHTML = `${day} ${date}, ${month}`;

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let time = document.querySelector("#time");
time.innerHTML = `${hours}:${minutes}`;

///
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels_like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

function searchCity(city) {
  let apiKey = "6f1066b52fb74e7c4c41b08e58f115f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#textInput").value;
  searchCity(city);
}
let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", submitSearch);

function searchCurrentPosition(position) {
  let apiKey = "6f1066b52fb74e7c4c41b08e58f115f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentPosition);
}

let currentLocationBtn = document.querySelector("#currentBtn");
currentLocationBtn.addEventListener("click", getCurrentLocation);
searchCity("Kyiv");

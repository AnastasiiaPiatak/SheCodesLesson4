let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
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
  "December",
];

let hour = document.querySelector("#current_hour");
let minutes = document.querySelector("#current_minutes");
hour.innerHTML = now.getHours();
if (hour.innerHTML < 10) {
  hour.innerHTML = `0${now.getHours()}`;
}
minutes.innerHTML = now.getMinutes();
if (minutes.innerHTML < 10) {
  minutes.innerHTML = `0${now.getMinutes()}`;
}

let weekday = document.querySelector("#current_weekday");
weekday.innerHTML = days[now.getDay()];

let date = document.querySelector("#current_date");
date.innerHTML = now.getDate();
let month = document.querySelector("#current_month");
month.innerHTML = months[now.getMonth()];
let year = document.querySelector("#current_year");
year.innerHTML = now.getFullYear();

/////////////////Change Weather////////////////////////

function showWeather(city) {
  //let currentLocation = document.querySelector("#location-input");
  let apiKey = `72bb9dab46b9ec3d65f423c63f27a9b8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeWeather);
}

function changeWeather(response) {
  console.log(response.data);
  celsCurrentTemp = response.data.main.temp;
  let temp = document.querySelector("#current_temp");
  let city = document.querySelector("#city");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind_speed");
  let cloudy = document.querySelector("#cloudy");
  let weather_discription = document.querySelector("#weather_discription");
  let icon = document.querySelector("#current_emoji");
  let rain = document.querySelector("#rain");

  temp.innerHTML = `${Math.round(celsCurrentTemp)}`;
  city.innerHTML = `${response.data.name}`;
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  cloudy.innerHTML = `${Math.round(response.data.clouds.all)}%`;
  weather_discription.innerHTML = `${response.data.weather[0].main}`;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  rain.innerHTML = `---`;
  if (response.data.rain != undefined) {
    rain.innerHTML = `${Math.round(response.data.rain[`1h`])}mm`;
  }

  findForecast(response.data.coord);
}

////////////////////Geolocation///////////////////////////
function showGeolocation(position) {
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemp);
}
let location_button = document.querySelector("#location_button");
location_button.addEventListener("click", getCurrentPosition);

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showGeolocation);
}

function showCurrentTemp(response) {
  let current_temp = document.querySelector("#current_temp");
  celsCurrentTemp = response.data.main.temp;
  current_temp.innerHTML = `${Math.round(celsCurrentTemp)}`;

  let current_city = document.querySelector("#city");
  current_city.innerHTML = `${response.data.name}`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let wind = document.querySelector("#wind_speed");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;

  let cloudy = document.querySelector("#cloudy");
  cloudy.innerHTML = `${Math.round(response.data.clouds.all)}%`;

  let weather_discription = document.querySelector("#weather_discription");
  weather_discription.innerHTML = `${response.data.weather[0].main}`;

  let icon = document.querySelector("#current_emoji");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let rain = document.querySelector("#rain");
  rain.innerHTML = `---`;
  if (response.data.rain != undefined) {
    rain.innerHTML = `${Math.round(response.data.rain[`1h`])}mm`;
  }
}

//////////////////Convert////////////////////

function convertFahr(event) {
  event.preventDefault();
  cels.classList.remove("active");
  fahr.classList.add("active");
  let celsValue = document.querySelector("#current_temp");
  let fahrValue = (celsCurrentTemp * 9) / 5 + 32;
  celsValue.innerHTML = Math.round(fahrValue);
}

function convertCels(event) {
  event.preventDefault();
  fahr.classList.remove("active");
  cels.classList.add("active");
  let celsValue = document.querySelector("#current_temp");
  celsValue.innerHTML = Math.round(celsCurrentTemp);
}

let celsCurrentTemp = null;

let fahr = document.querySelector("#fahr");
fahr.addEventListener("click", convertFahr);

let cels = document.querySelector("#cels");
cels.addEventListener("click", convertCels);

////////////////Default/////////////////
showWeather("Kyiv");


///////////////FindWeather////////////////
let button = document.querySelector("#search_form");
button.addEventListener("submit", findWeather);

function findWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input");
  showWeather(city.value);
}

//////////Forecast//////////////
function formatDay(weekdays){
  let date = new Date (weekdays*1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return  days[day];


}

function showForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let day_forecast = document.querySelector("#future");
  let day_forecastHTML = `<div class = "card-group">`;
  forecast.forEach(function (forecastDay, index) {
    if (index<6){
    day_forecastHTML =
      day_forecastHTML +
      ` <div class="card future">
        <div class="card-body">
          <h5 class="day">${formatDay(forecastDay.dt)}</h5>
          <img class="day_emoji" src = "https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt = "Weather icon">
          <p class="temperature">${Math.round(
            forecastDay.temp.max
          )}°/${Math.round(forecastDay.temp.min)}°</p>
        </div> </div>
        `;}
  });

  day_forecastHTML = day_forecastHTML + `</div>`;

  day_forecast.innerHTML = day_forecastHTML;
}

function findForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

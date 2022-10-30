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

///////////////Design///////////////////

function design() {
  if (weather_description.innerHTML === "Clear") {
    document.body.style.backgroundColor = "rgb(232 255 227)";
    document.getElementById("main").style.borderColor = "rgb(177 206 181)";
    document.getElementById("addition").style.borderColor = "rgb(177 206 181)";
    document.getElementById("main").style.background =
      "linear-gradient(90deg, rgb(255, 127, 91) 0%, rgb(210, 235, 205) 100%)";
    document.getElementById("addition").style.backgroundColor = "#d2ebcd";

    let forecast_color = document.getElementsByClassName("future");
    for (let i = 0; i < forecast_color.length; i++) {
      forecast_color[i].style.backgroundColor = "#f09477";
    }
  } else if (weather_description.innerHTML === "Rain") {
    document.body.style.backgroundColor = "#9eadb8";
    document.getElementById("main").style.borderColor = "#253E45";
    document.getElementById("addition").style.borderColor = "#253E45";
    document.getElementById("main").style.background =
      "linear-gradient(211deg, rgb(17, 18, 18) 8%, rgb(102, 212, 241) 94%)";
    document.getElementById("addition").style.backgroundColor = "#253E45";

    let forecast_color = document.getElementsByClassName("future");
    for (let i = 0; i < forecast_color.length; i++) {
      forecast_color[i].style.backgroundColor = "#64AEC1";
    }
  } else if (weather_description.innerHTML === "Snow") {
    document.getElementById("main").style.background =
      "linear-gradient(128deg, rgb(123, 233, 246) 0%, rgb(255, 255, 255) 88%)";
    document.getElementById("addition").style.backgroundColor = "#FFFFFF";
    document.getElementById("main").style.borderColor = "#CCF7FC";
    document.getElementById("addition").style.borderColor = "#CCF7FC";
    document.body.style.backgroundColor = "#E7FBFD";

    let forecast_color = document.getElementsByClassName("future");
    for (let i = 0; i < forecast_color.length; i++) {
      forecast_color[i].style.backgroundColor = "#A6F0F9";
    }
  } else if (
    weather_description.innerHTML === "Clouds" ||
    weather_description.innerHTML === "Drizzle"
  ) {
    document.body.style.backgroundColor = "#9695B3";
    document.getElementById("main").style.borderColor = "#253E45";
    document.getElementById("addition").style.borderColor = "#253E45";
    document.getElementById("main").style.background =
      "linear-gradient(313deg, rgb(224, 226, 241) 0%, rgb(23, 17, 74) 100%)";
    document.getElementById("addition").style.backgroundColor = "#C4C5DA";

    let forecast_color = document.getElementsByClassName("future");
    for (let i = 0; i < forecast_color.length; i++) {
      forecast_color[i].style.backgroundColor = "#65628B";
    }
  } else if (weather_description.innerHTML === "Thunderstorm") {
    document.body.style.backgroundColor = "#fdebe5";
    document.getElementById("main").style.borderColor = "#253E45";
    document.getElementById("addition").style.borderColor = "#253E45";
    document.getElementById("main").style.background =
      "linear-gradient(126deg, rgb(246, 88, 5) 0%, rgb(151, 9, 191) 100%)";
    document.getElementById("addition").style.backgroundColor = "#9f15b8";

    let forecast_color = document.getElementsByClassName("future");
    for (let i = 0; i < forecast_color.length; i++) {
      forecast_color[i].style.backgroundColor = "#D33B4A";
    }
  } else {
    document.body.style.backgroundColor = "#7aab97";
    document.getElementById("main").style.borderColor = "#253E45";
    document.getElementById("addition").style.borderColor = "#253E45";
    document.getElementById("main").style.background =
      "linear-gradient(to right, rgb(52, 232, 158), rgb(15, 52, 67))";
    document.getElementById("addition").style.backgroundColor = "#13494D";

    let forecast_color = document.getElementsByClassName("future");
    for (let i = 0; i < forecast_color.length; i++) {
      forecast_color[i].style.backgroundColor = "rgb(45 163 120)";
    }
  }
}

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
  let weather_description = document.querySelector("#weather_description");
  let icon = document.querySelector("#current_emoji");
  let rain = document.querySelector("#rain");

  temp.innerHTML = `${Math.round(celsCurrentTemp)}`;
  city.innerHTML = `${response.data.name}`;
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  cloudy.innerHTML = `${Math.round(response.data.clouds.all)}%`;
  weather_description.innerHTML = `${response.data.weather[0].main}`;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  rain.innerHTML = `---`;
  if (response.data.rain != undefined) {
    rain.innerHTML = `${Math.round(response.data.rain[`1h`])}mm`;
  }

  findForecast(response.data.coord);
  design();
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

  let weather_description = document.querySelector("#weather_description");
  weather_description.innerHTML = `${response.data.weather[0].main}`;

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
  findForecast(response.data.coord);
  design();
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
function formatDay(weekdays) {
  let date = new Date(weekdays * 1000);
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
  return days[day];
}

function showForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let day_forecast = document.querySelector("#future");
  let day_forecastHTML = `<div class = "card-group">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      day_forecastHTML =
        day_forecastHTML +
        ` <div class="card future">
        <div class="card-body">
          <h5 class="day">${formatDay(forecastDay.dt)}</h5>
          <img  src = "https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" 
          class="day_emoji"
          alt = "Weather icon">
          <p class="temperature">${Math.round(
            forecastDay.temp.max
          )}°/${Math.round(forecastDay.temp.min)}°</p>
        </div> </div>
        `;
    }
  });

  day_forecastHTML = day_forecastHTML + `</div>`;

  day_forecast.innerHTML = day_forecastHTML;
  design();
}

function findForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

////////////LinksWeather///////////////
function findParisLinkWeather() {
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let city_link = document.querySelector("#paris").innerHTML;
  console.log(city_link);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_link}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeWeather);
  console.log(apiUrl);
}

function findLondonLinkWeather() {
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let city_link = document.querySelector("#london").innerHTML;
  console.log(city_link);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_link}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeWeather);
  console.log(apiUrl);
}

function findPNYLinkWeather() {
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let city_link = document.querySelector("#ny").innerHTML;
  console.log(city_link);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_link}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeWeather);
  console.log(apiUrl);
}

let pLink = document.querySelector("#paris");
pLink.addEventListener("click", findParisLinkWeather);

let lLink = document.querySelector("#london");
lLink.addEventListener("click", findLondonLinkWeather);

let NYLink = document.querySelector("#ny");
NYLink.addEventListener("click", findPNYLinkWeather);

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let weekday = days[now.getDay()];
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `Updated on: ${weekday} ${currentHour}:${currentMinutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
    
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function(forecastDay, index){
    if (index < 6) {
    let temperatureMax = `${Math.round(forecastDay.temp.max)}°`;
    let temperatureMin = `${Math.round(forecastDay.temp.min)}°`;
   
    forecastHTML = forecastHTML + 
    `
    <div class="col-2 ">
      <span id="day-forecast">${formatDay(forecastDay.dt)}</span>
      <span class="image">
        <img class="small-image" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt=""
      /></span>
      <span class="temperature-prediction-max">${temperatureMax}</span> <span class="temperature-prediction-min">${temperatureMin}</span>
    </div>
    `;
    }
  })
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  }

  function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayForecast);
  }

function showSearchedTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  let currentDescription = document.querySelector("#description");
  let currentCity = document.querySelector("#city");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let currentWindRounded = Math.round(response.data.wind.speed);
  let currentDate = document.querySelector("#day-time");
  let iconElement = document.querySelector("#image-today");

  getForecast(response.data.coord);

  currentCity.innerHTML = `${response.data.name}`;
  currentTemperature.innerHTML = temperature;
  currentDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = `${response.data.main.humidity}%`;
  currentWind.innerHTML = `${currentWindRounded} km/h`;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  fahrenheitElement.classList.remove("boldTemp", "no-events");
  celsiusElement.classList.add("boldTemp", "no-events");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city");
  let cityValue = cityInput.value;
  city.innerHTML = cityValue;
  let apiKey = "3479815e27bf9e90efaa9982f0052413";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showSearchedTemperature);
}

function showDefaultTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  let currentDescription = document.querySelector("#description");
  let currentCity = document.querySelector("#city");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let currentWindRounded = Math.round(response.data.wind.speed);
  let currentDate = document.querySelector("#day-time");
  let iconElement = document.querySelector("#image-today");
  
  getForecast(response.data.coord);

  currentCity.innerHTML = `${response.data.name}`;
  currentTemperature.innerHTML = temperature;
  currentDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = `${response.data.main.humidity}%`;
  currentWind.innerHTML = `${currentWindRounded} km/h`;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3479815e27bf9e90efaa9982f0052413";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showDefaultTemperature);
}

function darkThemeWebsite() {
  var element = document.body;
  element.classList.toggle("darkTheme");
}

function getGeoLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);


let darkButton = document.querySelector(".darkButton");
darkButton.addEventListener("click", darkThemeWebsite);

let locationElement = document.querySelector("#location-icon");
locationElement.addEventListener("click", getGeoLocation);

navigator.geolocation.getCurrentPosition(showPosition);

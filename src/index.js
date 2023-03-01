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
function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];
  
  let forecastHTML = `<div class="row">`;
  days.forEach(function(day){
    forecastHTML = forecastHTML + 
    `
    <div class="col-2 ">
      <span id="day-forecast">${day}</span>
      <span class="image">
        <img class="small-image" src="media/cloud.svg" alt="cloud"
      /></span>
      <span class="temperature-prediction-max">17°  </span> <span class="temperature-prediction-min">9°</span>
    </div>
    `;
  })
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  }

  function getForecast(coordinates){
    let apiKey = "a3d36d3ff18dab96ef4b04bo91eb0t3c";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
    
    console.log(apiUrl);
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

  displayForecast();
  getForecast(response.data.coord);

  currentCity.innerHTML = `${response.data.name}`;
  currentTemperature.innerHTML = temperature;
  currentDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = `${response.data.main.humidity}%`;
  currentWind.innerHTML = `${currentWindRounded} km/h`;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  fahrenheitElement.classList.remove("boldTemp", "no-events");
  celsiusElement.classList.add("boldTemp", "no-events");
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

  displayForecast();
  getForecast(response.data.coord);


  currentCity.innerHTML = `${response.data.name}`;
  currentTemperature.innerHTML = temperature;
  currentDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = `${response.data.main.humidity}%`;
  currentWind.innerHTML = `${currentWindRounded} km/h`;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3479815e27bf9e90efaa9982f0052413";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showDefaultTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  celsiusElement.classList.remove("boldTemp", "no-events");
  fahrenheitElement.classList.add("boldTemp", "no-events");
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature - 32) * 0.5556);
  fahrenheitElement.classList.remove("boldTemp", "no-events");
  celsiusElement.classList.add("boldTemp", "no-events");
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

let fahrenheitElement = document.querySelector("#fahrenheit-element");
fahrenheitElement.addEventListener("click", convertToFahrenheit);

let celsiusElement = document.querySelector("#celsius-element");
celsiusElement.addEventListener("click", convertToCelsius);

let darkButton = document.querySelector(".darkButton");
darkButton.addEventListener("click", darkThemeWebsite);

let locationElement = document.querySelector("#location-icon");
locationElement.addEventListener("click", getGeoLocation);

navigator.geolocation.getCurrentPosition(showPosition);

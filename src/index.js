function formatDate(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];
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
  let month = months[time.getMonth()];
  let date = time.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  return `${day} ${month} ${date} ${hours}:${minutes} `;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    let minimunForecast = Math.round(forecastDay.temperature.minimum);
    let maximumForecast = Math.round(forecastDay.temperature.maximum);
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div id="weather-forecast-day">${formatDay(
                  forecastDay.time
                )}</div>
                <img
                src = ${forecastDay.condition.icon_url}
                  
                  alt=""
                  width="30px"
                  id="weather-forecast-icon"
                />
                <div id="weather-forecast-temperature">
                  <span id="weather-forecast-temperature-max">${maximumForecast}°/</span>
                  <span id="weather-forecast-temperature-min">${minimunForecast}°</span>
                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "80aa35584f4a608doe8c53a6ba7f3c6t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  //let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#number");
  console.log(response);
  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let minTempElement = document.querySelector("#pressure");
  minTempElement.innerHTML = Math.round(response.data.temperature.pressure);
  //let maxTempElement = document.querySelector("#maxTemp");
  //maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    response.data.condition.icon_url
    //`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png,`
    //https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "80aa35584f4a608doe8c53a6ba7f3c6t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q= ${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputFieldElement = document.querySelector("#input-field");
  search(inputFieldElement.value);
}

let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function convertFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#number");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#number");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertCelsius);

search("Cape Town");

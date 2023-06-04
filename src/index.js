let apiKey = "d2ea80f6e7c49d7345f579b725babe1e";
let city = "Cape Town";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q= ${city}&appid=${apiKey}&units=metric`;

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#number");
  console.log(response);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let minTempElement = document.querySelector("#minTemp");
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  let maxTempElement = document.querySelector("#maxTemp");
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
axios.get(apiUrl).then(displayTemperature);

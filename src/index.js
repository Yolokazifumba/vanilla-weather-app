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

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#number");

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
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "d2ea80f6e7c49d7345f579b725babe1e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q= ${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputFieldElement = document.querySelector("#input-field");
  search(inputFieldElement.value);
}
search("Cape Town");
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

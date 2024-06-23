function refreshWeather(response) {
	let temperatureElement = document.querySelector("#temperature");
	let temperature = response.data.temperature.current;
	let cityNameElement = document.querySelector("#city-name");
	let weatherDescriptionElement = document.querySelector(
		"#weather-description"
	);
	let timeElement = document.querySelector("#time");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let date = new Date(response.data.time * 1000);

	let iconElement = document.querySelector("#icon");
	iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

	console.log(response.data);

	timeElement.innerHTML = formatDate(date);
	cityNameElement.innerHTML = response.data.city;
	weatherDescriptionElement.innerHTML = response.data.condition.description;
	humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
	windElement.innerHTML = `${response.data.wind.speed} km/h`;
	temperatureElement.innerHTML = Math.round(temperature);

	getForecast(response.data.city);
}

function formatDate(date) {
	let minutes = date.getMinutes();
	let hours = date.getHours();
	let dayName = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = dayName[date.getDay()];

	if (hours < 10) {
		hours = `0${hours}`;
	}

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
	let apiKey = "bfa4e3a0ac7o3a4bt6f40d35c51eab14";
	let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
	axios.get(apiURL).then(refreshWeather);
}

function submitCityName(event) {
	event.preventDefault();
	let searchFormInput = document.querySelector("#search-form-input");

	searchCity(searchFormInput.value);
}

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sun"];

	return days[date.getDay()];
}

function getForecast(city) {
	let apiKey = "bfa4e3a0ac7o3a4bt6f40d35c51eab14";
	let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
	axios(apiURL).then(displayForecast);
}

function displayForecast(response) {
	let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
	let forecastHTML = "";

	response.data.daily.forEach(function (day, index) {
		if (index < 5) {
			forecastHTML =
				forecastHTML +
				`
     <div class="weather-daily-forecast">
            <div class="weather-daily-forecast-date">${formatDay(
					day.time
				)}</div>
            <br />
            <div>
            <img
              src="${day.condition.icon_url}"
              alt=""
              width="36"
              class="weather-forecast-icon"
            />
            </div>
            <br />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max"> <strong>${Math.round(
					day.temperature.maximum
				)}&deg; </strong></span>
              <span class="weather-forecast-temperature-min">${Math.round(
					day.temperature.minimum
				)}&deg; </span>
            </div>
          </div>
        </div>
    `;
		}
	});

	let forecastElement = document.querySelector("#forecast");
	forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitCityName);

searchCity("Chicago");
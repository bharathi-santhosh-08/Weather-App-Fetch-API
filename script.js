/* =====================================
   WEATHER APP - FULL SCRIPT (WITH ICONS)
===================================== */

/* 🔑 Replace with your OpenWeather API Key */
// const apiKey = "YOUR_API_KEY";

const apiKey = "02c867a7e0778450e7e8914960c0e289";


/* ===== GLOBAL VARIABLES ===== */
let isCelsius = true;
let currentTempC = null;

/* ===== DOM ELEMENTS ===== */
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const errorBox = document.getElementById("error");
const toggleBtn = document.getElementById("toggleUnit");
const iconElement = document.querySelector(".icon");

/* ===== EVENT LISTENERS ===== */
searchBtn.addEventListener("click", getWeather);
toggleBtn.addEventListener("click", toggleTemperature);

/* Search with Enter key */
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});

/* =====================================
   FETCH WEATHER FUNCTION
===================================== */
async function getWeather() {

  const city = cityInput.value.trim();

  if (city === "") {
    showError("Please enter a city name");
    return;
  }

  errorBox.innerText = "";
  weatherCard.style.display = "none";

  try {

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (response.status === 404) throw new Error("City not found");
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();

    /* Store temperature */
    currentTempC = data.main.temp;
    isCelsius = true;

    /* ===== UPDATE UI ===== */
    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText =
      `${currentTempC.toFixed(1)} °C`;

    document.querySelector(".description").innerText =
      data.weather[0].description;

    document.querySelector(".humidity").innerText =
      `Humidity: ${data.main.humidity}%`;

    document.querySelector(".wind").innerText =
      `Wind Speed: ${data.wind.speed} km/h`;

    /* ===== CUSTOM WEATHER ICONS ===== */
    const weatherMain = data.weather[0].main.toLowerCase();

    switch (weatherMain) {
      case "clear":
        iconElement.src = "assets/icons/clear.png";
        break;

      case "clouds":
        iconElement.src = "assets/icons/clouds.png";
        break;

      case "rain":
        iconElement.src = "assets/icons/rain.png";
        break;

      case "drizzle":
        iconElement.src = "assets/icons/drizzle.png";
        break;

      case "thunderstorm":
        iconElement.src = "assets/icons/thunderstorm.png";
        break;

      case "snow":
        iconElement.src = "assets/icons/snow.png";
        break;

      case "mist":
      case "fog":
      case "haze":
      case "smoke":
      case "dust":
      case "sand":
      case "ash":
      case "squall":
      case "tornado":
        iconElement.src = "assets/icons/mist.png";
        break;

      default:
        iconElement.src = "assets/icons/clouds.png";
    }

    iconElement.alt = weatherMain;

    weatherCard.style.display = "block";

  } catch (error) {
    showError(error.message);
  }
}

/* =====================================
   TEMPERATURE TOGGLE
===================================== */
function toggleTemperature() {

  if (currentTempC === null) return;

  const tempElement = document.querySelector(".temp");

  if (isCelsius) {
    const tempF = (currentTempC * 9 / 5) + 32;
    tempElement.innerText = `${tempF.toFixed(1)} °F`;
  } else {
    tempElement.innerText = `${currentTempC.toFixed(1)} °C`;
  }

  isCelsius = !isCelsius;
}

/* =====================================
   ERROR DISPLAY FUNCTION
===================================== */
function showError(message) {
  errorBox.innerText = message;
  weatherCard.style.display = "none";
}

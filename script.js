const apiKey = "aa3300ed502a2be7116f83d3786117b8";
const searchBox = document.querySelector(".search-box input");
const temperature = document.querySelector(".temperature");
const condition = document.querySelector(".condition p");
const locationInfo = document.querySelector(".location");
const date = document.querySelector(".date-time");
const icon = document.querySelector(".icon");

const weatherIconMap = {
    Clear: "icons/clear.svg",
    Clouds: "icons/cloudy.svg",
    Mist: "icons/mist.svg",
    Fog: "icons/mist.svg",
    Haze: "icons/mist.svg",
    Rain: "icons/rain.svg",
    Thunderstorm: "icons/storm.svg",
    Snow: "icons/snow.svg"
};

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

    if (!response.ok) {
        alert("City not found.");
        return;
    }

    const data = await response.json();
    
    // update HTML
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    condition.textContent = data.weather[0].main;
    locationInfo.textContent = data.name.toUpperCase();

    // update date
    updateDate();

    // update icon
    const weatherMain = data.weather[0].main;
    icon.src = weatherIconMap[weatherMain]

    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

searchBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const city = searchBox.value;
        getWeather(city);
    }
});

function updateDate() {
    const now = new Date();
    
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const weekday = now.toLocaleDateString("en-US", { weekday: "long" });

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");

    date.textContent = `${hours}:${minutes} - ${weekday} ${year}-${month}-${day}`;
}

getWeather("Kyoto");
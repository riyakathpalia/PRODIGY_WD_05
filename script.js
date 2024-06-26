const apiKey = '7e475382d9b4d874380708f056c54c7e'; // Demo API key

async function getWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data');
    }
}

function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weather-data');
    if (data.cod !== 200) {
        weatherDataDiv.innerHTML = `<p>${data.message}</p>`;
        return;
    }

    const { name } = data;
    const { temp } = data.main;
    const { description } = data.weather[0];
    const { speed } = data.wind;

    weatherDataDiv.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Weather: ${description}</p>
        <p>Wind Speed: ${speed} m/s</p>
    `;
}

function getWeatherByLocation() {
    const location = document.getElementById('location-input').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    getWeather(url);
}

function getWeatherByCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
            getWeather(url);
        }, () => {
            alert('Unable to retrieve your location');
        });
    } else {
        alert('Geolocation is not supported by this browser');
    }
}

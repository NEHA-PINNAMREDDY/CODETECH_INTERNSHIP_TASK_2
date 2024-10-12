const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

document.getElementById('search-btn').addEventListener('click', fetchWeather);

function fetchWeather() {
    const city = document.getElementById('city-input').value;
    const weatherInfo = document.getElementById('weather-info');
    
    // Clear any previous weather info or error message
    weatherInfo.innerHTML = '';
    weatherInfo.style.display = 'none';

    if (city.trim() === '') {
        displayError('Please enter a city name.');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log('Fetching weather data from URL:', url); // Log the URL to the console

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => displayError(error.message));
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const temp = data.main.temp;
    const weatherDesc = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;

    weatherInfo.innerHTML = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Condition:</strong> ${weatherDesc}</p>
        <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherDesc}">
    `;
    weatherInfo.style.display = 'block';
}

function displayError(errorMessage) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `<p class="error">${errorMessage}</p>`;
    weatherInfo.style.display = 'block';
}

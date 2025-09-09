// script.js

// **Important:** Replace 'YOUR_API_KEY' with your actual API key from a weather service like OpenWeatherMap or Weatherstack.

const apiKey = '222fbab1af18e2f908cf082ae9938aaa';

const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

function setBackgroundImage(weatherCondition) {
    let imageUrl = '11739555838i8o8uwvopbpaz98mwdkunnxxpxsrqmcrlfbvzzylhcwmjnhavgtumk8oituq6d1udzstakzi8xjyqsj5o3gakslwn3nehtrjg7tu.jpg';
    // Customize these URLs with your desired background images.
    switch (weatherCondition.toLowerCase()) {
        case 'clear': imageUrl = 'https://example.com/sunny.jpg'; break;
        case 'clouds': imageUrl = 'https://example.com/cloudy.jpg'; break;
        case 'rain': imageUrl = 'https://example.com/rainy.jpg'; break;
        default: imageUrl = 'https://example.com/default.jpg';
    }
    document.body.style.backgroundImage = `url('${imageUrl}')`;
}

async function getWeatherData(latitude, longitude) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        const weatherDescription = data.weather[0].main;
        const temperature = Math.round(data.main.temp);
        const cityName = data.name;

        locationElement.textContent = cityName;
        temperatureElement.textContent = `${temperature}°C`;
        descriptionElement.textContent = weatherDescription;

        setBackgroundImage(weatherDescription);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        locationElement.textContent = 'Error fetching weather.';
        temperatureElement.textContent = '';
        descriptionElement.textContent = '';
        setBackgroundImage('default');
    }
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => { getWeatherData(position.coords.latitude, position.coords.longitude); },
        (error) => {
            console.error('Error getting user location:', error);
            locationElement.textContent = 'Geolocation denied or not available.';
            setBackgroundImage('default');
        }
    );
} else {
    console.error('Geolocation is not supported by this browser.');
    locationElement.textContent = 'Geolocation not supported.';
    setBackgroundImage('default');
}
  
async function getWeatherData(latitude, longitude) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);

        if (!response.ok) { // Check if the HTTP response was successful
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const weatherDescription = data.weather[0].main; // Access the main property correctly
        const temperature = Math.round(data.main.temp);
        const cityName = data.name;

        locationElement.textContent = cityName;
        temperatureElement.textContent = `${temperature}°C`;
        descriptionElement.textContent = weatherDescription;

        setBackgroundImage(weatherDescription);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        locationElement.textContent = 'Error fetching weather.';
        temperatureElement.textContent = '';
        descriptionElement.textContent = `Please check your API key and network connection. ${error.message ? `Details: ${error.message}` : ''}`;
        setBackgroundImage('default');
    }
}

function setBackgroundImage(weatherCondition) {
    let imageUrl = 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?cs=srgb&dl=pexels-jplenio-1118873.jpg&fm=jpg';
    switch (weatherCondition.toLowerCase()) {
        case 'clear': imageUrl = 'https://example.com/sunny.jpg'; break;
        case 'clouds': imageUrl = 'https://example.com/cloudy.jpg'; break; // This is the key line
        case 'rain': imageUrl = 'https://example.com/rainy.jpg'; break;
        default: imageUrl = 'https://example.com/default.jpg';
    }
    document.body.style.backgroundImage = `url('${imageUrl}')`;
}

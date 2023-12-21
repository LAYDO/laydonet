import { Weather } from './Weather';

let weather = new Weather();

let weatherSearch = document.getElementById('weatherSearch');
weatherSearch.addEventListener('click', () => {
    weather.getCurrentWeather();
});

let cityToggle = document.getElementById('cityToggle');
cityToggle.addEventListener('click', () => {
    weather.toggleCitySearch();
});
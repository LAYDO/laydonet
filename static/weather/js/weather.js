let loader = document.getElementById('loader');
let searches = document.getElementById('citySection');

let credits = document.getElementById('credits');

const options = {
    // month: "numeric",
    // day: "numeric"
    weekday: "short"
};
const icons = {
    '01d': ' fas fa-sun',
    '01n': ' far fa-moon',
    '02d': ' fas fa-cloud-sun',
    '02n': ' fas fa-cloud-moon',
    '03d': ' fas fa-cloud',
    '03n': ' fas fa-cloud',
    '04d': ' fas fa-cloud',
    '04n': ' fas fa-cloud',
    '09d': ' fas fa-cloud-rain',
    '09n': ' fas fa-cloud-rain',
    '10d': ' fas fa-cloud-showers-heavy',
    '10n': ' fas fa-cloud-showers-heavy',
    '11d': ' fas fa-bolt',
    '11n': ' fas fa-bolt',
    '13d': ' fas fa-snowflake',
    '13n': ' fas fa-snowflake',
    '50d': ' fas fa-smog',
    '50n': ' fas fa-smog',
};

init();

function init() {

    loader.style.display = 'none';
    credits.style.display = 'none';

    this.loading = false;
    this.current = new Current();
    this.hourly = new Hourly();
    this.daily = new Daily();
    this.map = new WMap();
    this.elements = new Elements();
    this.celestial = new Celestial();

    document.addEventListener('keyup', (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            getCurrentWeather();
        }
    });

    if (navigator.geolocation) {
        document.getElementById('citySearch').value = '';
        navigator.geolocation.getCurrentPosition(getCurrentWeather);
    } else {
        document.getElementById('forecast').innerHTML = 'Geolocation is not supported by this browser.';
    }
}

async function getCurrentWeather(position) {
    // clearInterval(this.celestial.remainInterval);
    load();
    let q = document.getElementById('citySearch').value.trim();
    let url = `${window.location.href}f/?`;
    if (position) {
        url += `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
    } else if (q) {
        url += `q=${q}`;
    }
    fetch(url).then(response => {
        load();
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log(data);

        this.current.populate(data, icons);
        this.hourly.populate(data.hourly, icons);
        this.daily.populate(data.forecast, icons);
        this.map.populate(data.latitude, data.longitude);
        this.elements.populate(data);
        this.celestial.populate(data);

    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    })
}

function load() {

    this.current.toggle(this.loading);
    this.hourly.toggle(this.loading);
    this.daily.toggle(this.loading);
    this.map.toggle(this.loading);
    this.elements.toggle(this.loading);
    this.celestial.toggle(this.loading);

    credits.style.display = this.loading ? 'flex' : 'none';
    loader.style.display = this.loading ? 'none' : 'inline-block';

    this.loading = !this.loading;
    searches.style.display = 'none';
}

function toggleCitySearch() {
    if (this.current.cityName.style.display != 'none') {
        this.current.cityName.style.display = 'none';
        searches.style.display = 'inherit';
    } else {
        this.current.cityName.style.display = 'inherit';
        searches.style.display = 'none';
    }
    toggleOverlay();
}

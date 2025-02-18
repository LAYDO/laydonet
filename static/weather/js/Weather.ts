import { WMap } from "./WMap";
import { Celestial } from "./Celestial";
import { Elements } from "./Elements";
import { Current } from "./Current";
import { Hourly } from "./Hourly";
import { Daily } from "./Daily";

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



export class Weather {
    protected root: HTMLElement;
    protected column1: HTMLElement;
    protected column2: HTMLElement;
    protected loading: Boolean;
    protected current: Current;
    protected hourly: Hourly;
    protected daily: Daily;
    // protected map: WMap;
    protected elements: Elements;
    protected celestial: Celestial;
    protected searches: HTMLElement;
    protected cityInput: HTMLElement;
    protected cityButton: HTMLElement;
    protected searchIcon: HTMLElement;

    constructor(_root: HTMLElement) {
        // Establish root
        this.root = _root;
        // Build column 1 (current and celestial sections)
        this.column1 = document.createElement('div');
        this.column1.classList.add('laydo-column');
        this.column1.id = 'currentAndCelestialColumn';
        // Build column 2 (hourly and daily forecast sections)
        this.column2 = document.createElement('div');
        this.column2.classList.add('laydo-column');
        this.column2.id = 'hourlyAndDailyColumn';
        // Instantiate other elements
        this.loading = false;
        // Search container
        this.searches = document.createElement('div');
        this.searches.classList.add('city-search');
        this.searches.id = 'citySection';
        // Search input
        this.cityInput = document.createElement('input');
        this.cityInput.setAttribute('type', 'text');
        this.cityInput.setAttribute('name', 'citySearch');
        this.cityInput.setAttribute('placeholder', 'Enter a city');
        this.cityInput.id = 'citySearch';
        // Search button
        this.cityButton = document.createElement('button');
        this.cityButton.id = 'weatherSearch';
        this.cityButton.addEventListener('click', this.getCurrentWeather.bind(this));
        // Search icon
        this.searchIcon = document.createElement('span');
        this.searchIcon.classList.add('fas', 'fa-search');
        this.cityButton.append(this.searchIcon);
        // Append search elements
        this.searches.append(this.cityInput);
        this.searches.append(this.cityButton);
        this.searches.append(document.createElement('br'));
        // Append search container
        this.column1.append(this.searches);
        // Current display
        this.current = new Current(this.column1);
        this.current.cityName.addEventListener('click', this.toggleCitySearch.bind(this));
        // Various weather elements
        this.elements = new Elements(this.column1);
        // Sun and Moon
        this.celestial = new Celestial(this.column1);
        this.root.prepend(this.column1);

        // Forecasts
        this.hourly = new Hourly();
        this.daily = new Daily();

        // Map - deprecated until refactor
        // this.map = new WMap();

        document.addEventListener('keyup', (event) => {
            event.preventDefault();
            if (event.keyCode === 13) {
                this.getCurrentWeather();
            }
        });

        if (navigator.geolocation) {
            let search = document.getElementById('citySearch') as HTMLElement;
            if (search) {
                search.textContent = '';
            }
            navigator.geolocation.getCurrentPosition(this.getCurrentWeather.bind(this));
        } else {
            let forecast = document.getElementById('forecast')
            if (forecast) {
                forecast.innerHTML = 'Geolocation is not supported by this browser.';
            }
        }

    }

    protected toggleCitySearch() {
        if (this.current.cityName.style.display != 'none') {
            this.current.cityName.style.display = 'none';
            this.searches.style.visibility = 'visible';
        } else {
            this.current.cityName.style.display = 'inherit';
            this.searches.style.visibility = 'hidden';
        }
    }

    protected load() {
        this.current.toggle(this.loading);
        this.hourly.toggle(this.loading);
        this.daily.toggle(this.loading);
        // this.map.toggle(this.loading);
        this.elements.toggle(this.loading);
        this.celestial.toggle(this.loading);
        this.loading = !this.loading;
        this.searches.style.visibility = 'hidden';
    }

    protected async getCurrentWeather(position: any = null) {
        // clearInterval(this.celestial.remainInterval);
        this.load();
        let city = document.getElementById('citySearch') as HTMLInputElement;
        let q: string = '';
        if (city) {
            q = city.value.trim();
        }
        let url = `${window.location.href}f/?`;
        if (position instanceof GeolocationPosition) {
            url += `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        } else if (q) {
            url += `q=${q}`;
        }
        fetch(url).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log(data);
            this.load();

            this.current.populate(data);
            this.celestial.populate(data);

            this.hourly.populate(data.hourly, icons);
            this.daily.populate(data.forecast, icons);
            // this.map.populate(data.latitude, data.longitude);
            this.elements.populate(data, icons);

        }).catch(error => {
            console.error('There has been a problem with your fetch operation: ', error);
        })
    }
}

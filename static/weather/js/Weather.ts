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
    protected loading: Boolean;
    protected current: Current;
    protected hourly: Hourly;
    protected daily: Daily;
    protected map: WMap;
    protected elements: Elements;
    protected celestial: Celestial;
    protected loader: HTMLElement;
    protected searches: HTMLElement;
    protected credits: HTMLElement;

    constructor() {
        this.loading = false;
        this.current = new Current();
        this.hourly = new Hourly();
        this.daily = new Daily();
        this.map = new WMap();
        this.elements = new Elements();
        this.celestial = new Celestial();
        this.loader = document.getElementById('loader') as HTMLElement;
        this.searches = document.getElementById('citySection') as HTMLElement;
        this.credits = document.getElementById('credits') as HTMLElement;

        this.loader.style.display = 'none';
        this.credits.style.display = 'none';

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
            this.searches.style.display = 'inherit';
        } else {
            this.current.cityName.style.display = 'inherit';
            this.searches.style.display = 'none';
        }
    }

    protected load() {

        this.current.toggle(this.loading);
        this.hourly.toggle(this.loading);
        this.daily.toggle(this.loading);
        this.map.toggle(this.loading);
        this.elements.toggle(this.loading);
        this.celestial.toggle(this.loading);

        this.credits.style.display = this.loading ? 'flex' : 'none';
        this.loader.style.display = this.loading ? 'none' : 'inline-block';

        this.loading = !this.loading;
        this.searches.style.display = 'none';
    }

    protected async getCurrentWeather(position: any = null) {
        // clearInterval(this.celestial.remainInterval);
        this.load();
        let city = document.getElementById('citySearch');
        let q: string = '';
        if (city?.textContent) {
            q = city.textContent.trim();
        }
        let url = `${window.location.href}f/?`;
        if (position) {
            url += `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        } else if (q) {
            url += `q=${q}`;
        }
        fetch(url).then(response => {
            this.load();
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
}

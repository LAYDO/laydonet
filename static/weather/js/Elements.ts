import { Precipitation } from "./Precipitation";
import { Wind } from "./Wind";
import { Humidity } from "./Humidity";
import { Barometer } from "./Barometer";
import { Clouds } from "./Clouds";
import { AQI } from "./AQI";

export class Elements {
    public eTilesElement: HTMLElement;
    public elementRowOne: HTMLElement;
    public elementRowTwo: HTMLElement;
    public elementRowThree: HTMLElement;
    public AQI: any;
    public Clouds: any;
    public Precipitation: any;
    public Wind: any;
    public Humidity: any;
    public Barometer: any;
    protected root: HTMLElement;

    constructor(_root: HTMLElement) {
        this.root = _root;

        this.eTilesElement = document.createElement('div');
        this.eTilesElement.classList.add('elements-column');
        this.eTilesElement.id = 'elementTiles';
        this.root.append(this.eTilesElement);

        this.elementRowOne = document.createElement('div');
        this.elementRowOne.id = 'elementRowOne';
        this.elementRowOne.className = 'elements-row';


        this.elementRowTwo = document.createElement('div');
        this.elementRowTwo.id = 'elementRowTwo';
        this.elementRowTwo.className = 'elements-row';

        this.elementRowThree = document.createElement('div');
        this.elementRowThree.id = 'elementRowThree';
        this.elementRowThree.className = 'elements-row';

        this.eTilesElement.append(this.elementRowOne);
        this.eTilesElement.append(this.elementRowTwo);
        const isMobile = !window.matchMedia('(min-device-width: 37.5rem)').matches;

        if (isMobile) {
            this.eTilesElement.append(this.elementRowThree);
        }

        this.AQI = new AQI(this.elementRowOne);
        this.Clouds = new Clouds(this.elementRowOne);
        this.Precipitation = new Precipitation(isMobile ? this.elementRowTwo : this.elementRowOne);
        this.Wind = new Wind(this.elementRowTwo);
        this.Humidity = new Humidity(isMobile ? this.elementRowThree : this.elementRowTwo);
        this.Barometer = new Barometer(isMobile ? this.elementRowThree : this.elementRowTwo);
    }

    toggle(loaded: Boolean) {
        if (loaded) {
            this.eTilesElement.style.display = 'flex';
        } else {
            this.eTilesElement.style.display = 'none';
        }
    }

    populate(data: any) {
        this.AQI.populate(data.aqi);
        this.Clouds.populate(data.clouds, data.uvi, data.visibility);
        this.Precipitation.update({ rain_percent: data.rain_today, rain_amount: data.rain_amount});
        this.Wind.update({ wind_speed: data.windSpeed, wind_gust: data.windGust, wind_direction: data.windDeg});
        this.Humidity.update({humidity: data.humidity, dew: data.dew_point});
        this.Barometer.update({pressure: data.pressure});
    }
}
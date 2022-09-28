class Elements {
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

    constructor() {
        this.eTilesElement = document.getElementById('elementTiles')!;

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
        this.eTilesElement.append(this.elementRowThree);

        this.AQI = new AQI();
        this.Clouds = new Clouds();
        this.Precipitation = new Precipitation();
        this.Wind = new Wind();
        this.Humidity = new Humidity();
        this.Barometer = new Barometer();
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
        this.Precipitation.populate(data.rain_next, data.rain_today);
        this.Wind.generateWindDial(data.windSpeed, data.windGust, data.windDeg);
        this.Humidity.populate(data.humidity, data.dew_point);
        this.Barometer.drawBarometer(data.pressure);
    }
}
export class Current {
    public currentElement: HTMLElement;
    public cityName: HTMLElement;
    public currentTemp: HTMLElement;
    public currentIcon: HTMLElement;
    public currentHigh: HTMLElement;
    public currentLow: HTMLElement;
    public currentDesc: HTMLElement;

    constructor() {
        this.currentElement = document.getElementById('currentWeather')!;

        this.cityName = document.createElement('h2');
        this.cityName.id = 'cityName';
        this.currentElement.append(this.cityName);

        let cw = document.createElement('div');
        cw.className = 'current-weather';

        let cm = document.createElement('div');
        cm.className = 'current-middle';

        this.currentTemp = document.createElement('div');
        this.currentTemp.id = 'current-temp';
        cm.append(this.currentTemp);

        this.currentIcon = document.createElement('span');
        this.currentIcon.id = 'current-icon';
        cm.append(this.currentIcon);

        let lrs = document.createElement('div');
        lrs.className = 'laydo-row-space';


        this.currentHigh = document.createElement('div');
        this.currentHigh.id = 'current-high';
        lrs.append(this.currentHigh);

        this.currentLow = document.createElement('div');
        this.currentLow.id = 'current-low';
        lrs.append(this.currentLow);

        this.currentDesc = document.createElement('div');
        this.currentDesc.id = 'tempTitle';
        this.currentDesc.className = 'mini-title';
        lrs.append(this.currentDesc);


        cm.append(lrs);
        cw.append(cm);

        this.currentElement.append(cw);
    }

    toggle(loaded: Boolean) {
        if (loaded) {
            this.currentElement.style.display = 'flex';
            this.cityName.style.display = 'inherit';
        } else {
            this.currentElement.style.display = 'none';
        }
    }

    populate(data: any, icons: any) {
        if (data) {
            this.cityName.innerText = `${data.name}`;
            this.currentTemp.innerText = `${Math.round(data.temp)}\xB0 F`;
            this.currentIcon.className = icons[data.weatherIcon];
            this.currentHigh.innerText = `H: ${Math.round(data.high)}\xB0`;
            this.currentLow.innerText = `L: ${Math.round(data.low)}\xB0`;
            this.currentDesc.innerText = `${data.weatherDesc}`;
        }
    }


}
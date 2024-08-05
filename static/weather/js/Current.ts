export class Current {
    protected root: HTMLElement;
    public currentElement: HTMLElement;
    public cityName: HTMLElement;
    public currentTemp: HTMLElement;
    public currentHigh: HTMLElement;
    public currentLow: HTMLElement;

    constructor(_root: HTMLElement) {
        this.root = _root;
        this.currentElement = document.createElement('div');
        this.currentElement.id = 'currentWeather';

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

        let lrs = document.createElement('div');
        lrs.className = 'laydo-row-space';


        this.currentHigh = document.createElement('div');
        this.currentHigh.id = 'current-high';
        lrs.append(this.currentHigh);

        this.currentLow = document.createElement('div');
        this.currentLow.id = 'current-low';
        lrs.append(this.currentLow);

        cm.append(lrs);
        cw.append(cm);

        this.currentElement.append(cw);
        this.root.append(this.currentElement);
    }

    toggle(loaded: Boolean) {
        if (loaded) {
            this.currentElement.style.display = 'flex';
            this.cityName.style.display = 'inherit';
        } else {
            this.currentElement.style.display = 'none';
        }
    }

    populate(data: any) {
        if (data) {
            this.cityName.innerText = `${data.name}`;
            this.currentTemp.innerText = `${Math.round(data.temp)}\xB0 F`;
            this.currentHigh.innerText = `H: ${Math.round(data.high)}\xB0`;
            this.currentLow.innerText = `L: ${Math.round(data.low)}\xB0`;
        }
    }


}
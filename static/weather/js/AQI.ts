class AQI {
    public aqiElement: HTMLElement;
    public airTitle: HTMLElement;
    public aqiData: HTMLElement;
    public aqiContainer: HTMLElement;

    public coData: HTMLElement;
    public noData: HTMLElement;
    public no2Data: HTMLElement;
    public o3Data: HTMLElement;
    public so2Data: HTMLElement;
    public pm25Data: HTMLElement;
    public pm10Data: HTMLElement;
    public nh3Data: HTMLElement;

    constructor() {
        this.aqiElement = document.createElement('div');
        this.aqiElement.id = 'aqi';
        this.aqiElement.className = 'element-tile';

        this.airTitle = document.createElement('div');
        this.airTitle.id = 'airTitle';
        this.airTitle.className = 'container-title';
        let span = document.createElement('span');
        span.className = 'fas fa-smog pad-right';
        this.airTitle.append(span);
        this.airTitle.append('AQI');

        this.aqiData = document.createElement('div');
        this.aqiData.id = 'aqiData';
        this.aqiData.className = 'mini-data';

        let aqiRow = document.createElement('div');
        aqiRow.className = 'elements-row';


        this.coData = document.createElement('div');
        this.coData.className = 'sub-data';

        this.noData = document.createElement('div');
        this.noData.className = 'sub-data';

        this.no2Data = document.createElement('div');
        this.no2Data.className = 'sub-data';

        this.o3Data = document.createElement('div');
        this.o3Data.className = 'sub-data';


        this.so2Data = document.createElement('div');
        this.so2Data.className = 'sub-data';

        this.pm25Data = document.createElement('div');
        this.pm25Data.className = 'sub-data';

        this.pm10Data = document.createElement('div');
        this.pm10Data.className = 'sub-data';

        this.nh3Data = document.createElement('div');
        this.nh3Data.className = 'sub-data';

        let aqiColumn1 = document.createElement('div');
        aqiColumn1.className = 'elements-column';

        let aqiColumn2 = document.createElement('div');
        aqiColumn2.className = 'elements-column';

        aqiColumn1.append(this.coData);
        aqiColumn1.append(this.noData);
        aqiColumn1.append(this.no2Data);
        aqiColumn1.append(this.o3Data);

        aqiColumn2.append(this.so2Data);
        aqiColumn2.append(this.pm25Data);
        aqiColumn2.append(this.pm10Data);
        aqiColumn2.append(this.nh3Data);

        aqiRow.append(aqiColumn1);
        aqiRow.append(aqiColumn2);

        this.aqiElement.append(this.airTitle);
        this.aqiElement.append(this.aqiData);
        this.aqiElement.append(aqiRow);

        this.aqiContainer = document.getElementById('elementRowOne')!
        this.aqiContainer.append(this.aqiElement);
    }

    toggle(loaded: Boolean) {
        if (loaded) {
            this.aqiElement.style.display = 'flex';
        } else {
            this.aqiElement.style.display = 'none';
        }
    }

    populate(data: any) {
        if (data.main != undefined && data.components != undefined) {
            this.aqiData.innerText = `${data.main.aqi}`;
            this.aqiData.style.color = this.getAQIColor(data.main.aqi);
            this.airTitle.style.color = this.getAQIColor(data.main.aqi);
            this.coData.innerText = `CO: ${data.components.co}`;
            this.noData.innerText = `NO: ${data.components.no}`;
            this.no2Data.innerText = `NO2: ${data.components.no2}`;
            this.o3Data.innerText = `O3: ${data.components.o3}`;
            this.so2Data.innerText = `SO2: ${data.components.so2}`;
            this.pm10Data.innerText = `PM10: ${data.components.pm10}`;
            this.pm25Data.innerText = `PM2.5: ${data.components.pm2_5}`;
            this.nh3Data.innerText = `NH3: ${data.components.nh3}`;
        } else {
            this.aqiData.innerText = '--';
        }
    }

    getAQIColor(aqi: number) {
        switch (aqi) {
            case 1:
                return '#00e400';
            case 2:
                return '#ffff00';
            case 3:
                return '#ff7e00';
            case 4:
                return '#ff0000';
            case 5:
                return '#99004c';
            case 6:
                return '#7e0023';
            default:
                return 'var(--font-faded)';
        }
    }
}
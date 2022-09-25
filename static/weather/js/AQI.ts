class AQI {
    public aqiElement: HTMLElement;
    public airTitle: HTMLElement;
    public aqiData: HTMLElement;

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


        this.so2Data = document.createElement('div');
        this.so2Data.className = 'sub-data';

        this.pm25Data = document.createElement('div');
        this.pm25Data.className = 'sub-data';

        let aqiColumn2 = document.createElement('div');
        aqiColumn2.className = 'elements-column';

        let aqiColumn1 = document.createElement('div');
        aqiColumn1.className = 'elements-column';
    }
}
class Clouds {
    public cloudContainer: HTMLElement;
    public cloudElement: HTMLElement;
    public cloudTitle: HTMLElement;
    public cloudData: HTMLElement;
    public uvData: HTMLElement;
    public visibilityData: HTMLElement;

    constructor() {
        this.cloudElement = document.createElement('div');
        this.cloudElement.id = 'atmosphere';
        this.cloudElement.className = 'element-tile';

        this.cloudTitle = document.createElement('div');
        this.cloudTitle.id = 'atmosTitle';
        this.cloudTitle.className = 'container-title';
        let span = document.createElement('span');
        span.className = 'fas fa-cloud pad-right';
        this.cloudTitle.append(span);
        this.cloudTitle.append('Clouds');

        this.cloudData = document.createElement('div');
        this.cloudData.id = 'cloudsData';
        this.cloudData.className = 'mini-data';

        this.uvData = document.createElement('div');
        this.uvData.id = 'uvData';
        this.uvData.className = 'sub-data';

        this.visibilityData = document.createElement('div');
        this.visibilityData.id = 'visibilityData';
        this.visibilityData.className = 'sub-data';

        this.cloudElement.append(this.cloudTitle);
        this.cloudElement.append(this.cloudData);
        this.cloudElement.append(this.uvData);
        this.cloudElement.append(this.visibilityData);

        this.cloudContainer = document.getElementById('elementRowOne')!;
        this.cloudContainer.append(this.cloudElement);
    }

    toggle(loaded: Boolean) {
        if (loaded) {
            this.cloudElement.style.display = 'flex';
        } else {
            this.cloudElement.style.display = 'none';
        }
    }

    populate(clouds: number, uvi: number, visibility: number) {
        this.cloudData.innerText = `${Math.round(clouds)} \u0025`;
        this.uvData.innerText = `UV Index: ${Math.round(uvi)}`;
        this.visibilityData.innerText = `Visibility: ${Math.round(visibility * 0.0006213712)} miles`;
    }
}
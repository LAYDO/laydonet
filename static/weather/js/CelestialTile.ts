export class CelestialTile {
    protected baseW: number = 128;
    protected baseH: number = 128;
    protected bW: number = 128;
    protected bH: number = 128;
    public container: HTMLElement;
    // Parent element
    public element: HTMLElement;
    public leftContainer: HTMLElement;
    public rightContainer: HTMLElement;
    public topContainer: HTMLElement;
    public title: HTMLElement;
    public icon: HTMLElement;
    public titleText: HTMLElement;
    public countdown: HTMLElement;
    public eventData: HTMLElement;
    public eventTime: HTMLElement;
    public eventInfo: HTMLElement;
    public eventGraphic: HTMLElement;

    constructor(container: HTMLElement, element: string) {
        this.element = document.createElement('div');
        this.element.id = `${element.toLowerCase()}`;
        this.element.classList.add('celestial-tile');

        this.leftContainer = document.createElement('div');
        this.leftContainer.className = 'left-container';
        this.leftContainer.id = `${element.toLowerCase()}LeftContainer`;
        this.element.append(this.leftContainer);

        this.rightContainer = document.createElement('div');
        this.rightContainer.className = 'right-container';
        this.rightContainer.id = `${element.toLowerCase()}RightContainer`;
        this.element.append(this.rightContainer);

        this.topContainer = document.createElement('div');
        this.topContainer.className = 'top-container';
        this.topContainer.id = `${element.toLowerCase()}TopContainer`;
        this.leftContainer.append(this.topContainer);

        this.title = document.createElement('div');
        this.title.id = `${element.toLowerCase()}Title`;
        this.title.className = 'container-title';
        this.icon = document.createElement('span');
        this.icon.className = `fas fa-${element.toLowerCase()} pad-right`;
        this.titleText = document.createElement('div');
        this.titleText.className = 'title-text';
        this.titleText.innerText = element;
        this.title.append(this.icon);
        this.title.append(this.titleText);
        this.topContainer.append(this.title);

        this.countdown = document.createElement('div');
        this.countdown.id = `${element.toLowerCase()}Countdown`;
        this.countdown.classList.add('sub-data');
        this.topContainer.append(this.countdown);

        this.eventData = document.createElement('div');
        this.eventData.id = `${element.toLowerCase()}Data`;
        this.eventData.className = 'event-data';
        this.leftContainer.append(this.eventData);

        this.eventTime = document.createElement('div');
        this.eventTime.id = `${element.toLowerCase()}Time`;
        this.eventTime.className = 'event-time';
        this.eventData.append(this.eventTime);

        this.eventInfo = document.createElement('div');
        this.eventInfo.id = `${element.toLowerCase()}Info`;
        this.eventInfo.className = 'event-info';
        this.eventData.append(this.eventInfo);

        this.eventGraphic = document.createElement('div');
        this.eventGraphic.id = `${element.toLowerCase()}Graphic`;
        this.eventGraphic.className = 'event-graphic';
        this.rightContainer.append(this.eventGraphic);

        this.container = container;
        this.container.append(this.element);
    }

    toggle(loaded: Boolean) {
        if (loaded) {
            this.element.style.display = 'flex';
        } else {
            this.element.style.display = 'none';
        }
    }
}
export class TeamHeader {
    container: HTMLElement;
    headerElement: HTMLElement;
    logoElement: HTMLImageElement;
    headerInfoElement: HTMLElement;
    teamNameElement: HTMLElement;
    recordStandingElement: HTMLElement;
    recordElement: HTMLElement;
    standingElement: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;

        this.headerElement = document.createElement('div');
        this.headerElement.classList.add('team-header');
        this.container.appendChild(this.headerElement);

        this.logoElement = document.createElement('img');
        this.logoElement.classList.add('team-logo');
        this.headerInfoElement = document.createElement('div');
        this.headerInfoElement.classList.add('team-header-info');
        this.headerElement.appendChild(this.headerInfoElement);

        this.teamNameElement = document.createElement('div');
        this.teamNameElement.classList.add('team-name');
        this.headerInfoElement.appendChild(this.teamNameElement);

        this.recordStandingElement = document.createElement('div');
        this.recordStandingElement.classList.add('team-record-standing');
        this.headerInfoElement.appendChild(this.recordStandingElement);

        this.recordElement = document.createElement('div');
        this.recordElement.classList.add('team-record');
        this.recordStandingElement.appendChild(this.recordElement);

        this.standingElement = document.createElement('div');
        this.standingElement.classList.add('team-header-standing');
        this.recordStandingElement.appendChild(this.standingElement);
    }

    populateHeader(data: any) {
        this.headerElement.style.background = `linear-gradient(#${data.color} 70%, var(--color-primary) 100%)`;
        this.logoElement.src = data.logo;
        this.headerElement.prepend(this.logoElement);
        this.teamNameElement.textContent = `${data.seasonYear} ${data.name}`;
        this.recordElement.textContent = data.record;
        this.standingElement.textContent = data.standing;
    }
}
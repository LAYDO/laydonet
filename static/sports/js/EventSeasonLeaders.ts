export class EventSeasonLeaders {
    container: HTMLElement;
    leadersElement: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;

        this.leadersElement = document.createElement('div');
        this.leadersElement.classList.add('event-season-leaders-container');
        this.leadersElement.innerHTML = `Season Leaders`;
        this.container.appendChild(this.leadersElement);
    }

    populateLeaders(data: any) {
    }
}
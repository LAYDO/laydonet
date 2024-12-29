export class EventLastFive {
    container: HTMLElement;
    lastFiveElement: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;

        this.lastFiveElement = document.createElement('div');
        this.lastFiveElement.classList.add('event-last-five-container');
        this.lastFiveElement.innerHTML = `Last Five`;
        this.container.appendChild(this.lastFiveElement);
    }

    populateLastFive(data: any) {
    }
}
export class EventOdds {
    container: HTMLElement;
    oddsElement: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;

        this.oddsElement = document.createElement('div');
        this.oddsElement.classList.add('event-odds-container');
        this.oddsElement.innerHTML = `Odds`;
        this.container.appendChild(this.oddsElement);

    }

    populateOdds(data: any) {
    }
}
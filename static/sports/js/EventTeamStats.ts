export class EventTeamStats {
    container: HTMLElement;
    statsElement: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;

        this.statsElement = document.createElement('div');
        this.statsElement.classList.add('event-team-stats-container');
        this.statsElement.innerHTML = `Team Stats`;
        this.container.appendChild(this.statsElement);
    }

    populateStats(data: any) {
    }
}
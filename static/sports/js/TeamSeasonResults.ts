import { TeamSchedule } from "./TeamSchedule";
import { TeamStandings } from "./TeamStandings";

export class TeamSeasonResults {
    container: HTMLElement;
    resultsElement: HTMLElement;
    standingsContainer: TeamStandings;
    scheduleContainer: TeamSchedule;

    constructor(container: HTMLElement) {
        this.container = container;

        this.resultsElement = document.createElement('div');
        this.resultsElement.classList.add('team-season-results-container');
        this.container.appendChild(this.resultsElement);

        this.standingsContainer = new TeamStandings(this.resultsElement);
        this.scheduleContainer = new TeamSchedule(this.resultsElement);
    }

    populateResults(data: any) {
        this.standingsContainer.populateStandings(data);
        this.scheduleContainer.populateSchedule(data.schedule);
    }
}
import { TeamEvent } from './TeamEvent';
import { TeamSeasonResults } from './TeamSeasonResults';

export class TeamBody {
    container: HTMLElement;
    bodyElement: HTMLElement;
    eventElement: TeamEvent;
    seasonResultsElement: TeamSeasonResults;

    constructor(container: HTMLElement) {
        this.container = container;
        
        this.bodyElement = document.createElement('div');
        this.bodyElement.classList.add('team-body');
        container.appendChild(this.bodyElement);

        this.eventElement = new TeamEvent(this.bodyElement);
        this.seasonResultsElement = new TeamSeasonResults(this.bodyElement);
    }

    populateBody(data: any) {
        this.eventElement.populateEvent(data);
        this.seasonResultsElement.populateResults(data);
    }
}
import { TeamHeader } from "./TeamHeader";
import { TeamBody } from "./TeamBody";

export class TeamPage {
    // Supplied container element, everything appends to this
    container: HTMLElement;
    // Elements for the header and body
    headerElement: TeamHeader;
    bodyElement: TeamBody;

    constructor(container: HTMLElement, data: HTMLElement) {
        this.container = container;
        this.headerElement = new TeamHeader(container);
        this.bodyElement = new TeamBody(container);
        this.populatePage(data);
    }
    populatePage(data: HTMLElement) {
        let url = '/sports/';
        switch (data.dataset.league) {
            case 'nfl':
                url += 'nfl/';
                break;
            case 'ncaaf':
                url += 'ncaaf/';
                break;
            case 'nba':
                url += 'nba/';
                break;
            case 'mlb':
                url += 'mlb/';
                break;
            case 'nhl':
                url += 'nhl/';
                break;
            default:
                url += 'nfl/';
        }
        url += data.dataset.teamId;
        fetch(url).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            this.container.style.border = `0.125rem solid #${data.alternateColor}`;
            this.headerElement.populateHeader(data);
            this.bodyElement.populateBody(data);
        }).catch(error => {
            console.error('There has been a problem with your fetch operation: ', error);
        });
    }
}
import { TeamHeader } from "./TeamHeader";
import { TeamBody } from "./TeamBody";

export class TeamPage {
    // Supplied container element, everything appends to this
    container: HTMLElement;
    // Elements for the header and body
    headerElement: TeamHeader;
    bodyElement: TeamBody;

    constructor(container: HTMLElement) {
        this.container = container;
        this.headerElement = new TeamHeader(container);
        this.bodyElement = new TeamBody(container);
        this.populatePage();
    }
    populatePage() {
        let urlBits = window.location.pathname.split('/');
        let url = `/sports/${urlBits[2]}/${urlBits[4]}`;
        this.container.classList.add('team-container-loading');
        fetch(url).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            this.container.style.border = `0.125rem solid #${data.team.alternateColor}`;
            this.headerElement.populateHeader(data);
            this.bodyElement.populateBody(data);
            this.container.classList.remove('team-container-loading');
        }).catch(error => {
            console.error('There has been a problem with your fetch operation: ', error);
            this.container.classList.remove('team-container-loading');
        });
    }
}
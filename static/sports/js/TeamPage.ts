const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
};

export class TeamPage {
    // Supplied container element, everything appends to this
    container: HTMLElement;

    // Elements for the header
    headerElement: HTMLElement;
    bodyElement: HTMLElement;
    logoElement: HTMLImageElement;
    headerInfoElement: HTMLElement;
    teamNameElement: HTMLElement;
    recordStandingElement: HTMLElement;
    recordElement: HTMLElement;
    standingElement: HTMLElement;

    // Elements for the body

    // Elements for the next event
    nextEventContainer: HTMLElement;
    nextEventElement: HTMLElement;
    nextEventDateElement: HTMLElement;
    nextEventBroadcastElement: HTMLElement;

    // Elements for season results
    seasonResultsContainer: HTMLElement;
    standingsContainer: HTMLElement;
    scheduleContainer: HTMLElement;

    // Data
    teamName: string;
    logo: string;
    league: string;
    record: string;
    standing: string;
    nextEvent: string;
    nextEventDate: string;
    nextEventBroadcast: string;
    color: string;
    altColor: string;

    constructor(container: HTMLElement, data: any) {
        console.log('TeamPage');
        this.container = container;

        this.headerElement = document.createElement('div');
        this.headerElement.classList.add('team-header');
        this.container.appendChild(this.headerElement);

        this.logoElement = document.createElement('img');
        this.logoElement.classList.add('team-logo');
        this.headerElement.appendChild(this.logoElement);

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
        this.standingElement.classList.add('team-standing');
        this.recordStandingElement.appendChild(this.standingElement);
        
        this.bodyElement = document.createElement('div');
        this.bodyElement.classList.add('team-body');
        this.container.appendChild(this.bodyElement);

        this.nextEventContainer = document.createElement('div');
        this.nextEventContainer.classList.add('team-next-event-container');
        this.bodyElement.appendChild(this.nextEventContainer);

        this.nextEventElement = document.createElement('div');
        this.nextEventElement.classList.add('team-next-event');
        this.nextEventContainer.appendChild(this.nextEventElement);

        this.nextEventDateElement = document.createElement('div');
        this.nextEventDateElement.classList.add('team-next-event-date');
        this.nextEventContainer.appendChild(this.nextEventDateElement);

        this.nextEventBroadcastElement = document.createElement('div');
        this.nextEventBroadcastElement.classList.add('team-next-event-broadcast');
        this.nextEventContainer.appendChild(this.nextEventBroadcastElement);

        this.seasonResultsContainer = document.createElement('div');
        this.seasonResultsContainer.classList.add('team-season-results-container');
        this.bodyElement.appendChild(this.seasonResultsContainer);

        this.standingsContainer = document.createElement('div');
        this.standingsContainer.classList.add('team-standings-container');
        this.standingsContainer.innerText = 'Standings';
        this.seasonResultsContainer.appendChild(this.standingsContainer);

        this.scheduleContainer = document.createElement('div');
        this.scheduleContainer.classList.add('team-schedule-container');
        this.scheduleContainer.innerText = 'Schedule';
        this.seasonResultsContainer.appendChild(this.scheduleContainer);

        // Convert UTC date to local date
        let utcDate = new Date(data.dataset.nextEventDate);
        let localDate = utcDate.toLocaleString('en-US', options);

        this.teamName = data.dataset.name || '';
        this.logo = data.dataset.logo || '';
        this.league = data.dataset.league || '';
        this.record = data.dataset.record || '';
        this.standing = data.dataset.standing || '';
        this.nextEvent = data.dataset.nextEvent || '';
        this.nextEventDate = localDate || '';
        this.nextEventBroadcast = data.dataset.nextEventBroadcast || '';
        this.color = data.dataset.color || '';
        this.altColor = data.dataset.altColor || '';

        this.populatePage();
    }

    populatePage() {
        this.logoElement.src = this.logo;
        this.teamNameElement.innerText = this.teamName;
        this.recordElement.innerText = this.record;
        this.standingElement.innerText = this.standing;
        this.nextEventElement.innerText = this.nextEvent;
        this.nextEventDateElement.innerText = this.nextEventDate;
        this.nextEventBroadcastElement.innerText = this.nextEventBroadcast;

        this.headerElement.style.backgroundImage = `linear-gradient(#${this.color} 70%, var(--color-primary) 100%)`;
        this.headerElement.style.borderColor = `#${this.altColor}`;
        this.bodyElement.style.borderColor = `#${this.altColor}`;
    }
}
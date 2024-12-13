const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
};

export abstract class SportsWidget {
    container: HTMLElement;
    widget: HTMLElement;
    logoElement: HTMLImageElement;
    

    constructor(container: HTMLElement) {
        this.container = container;

        this.widget = document.createElement('div');
        this.widget.classList.add('laydo-row-even', 'sports-widget');

        this.logoElement = document.createElement('img');
        this.logoElement.classList.add('sport-logo');
        this.widget.appendChild(this.logoElement);

        this.container.appendChild(this.widget);
    }
    
    protected abstract populateWidget(): void;
}

export class TeamWidget extends SportsWidget {
    teamId: number;
    teamName: string;
    teamLogo: string;
    teamColor: string;
    teamAltColor: string;
    teamLeague: string;
    teamRecord: string;
    teamStanding: string;
    teamNextEvent: string;
    teamNextEventDate: string;
    teamNextEventBroadcast: string;

    // nameElement: HTMLElement;

    // Elements for the record and standing
    recordStandingElement: HTMLElement;
    recordElement: HTMLElement;
    standingElement: HTMLElement;

    // Elements for the next event
    nextEventElement: HTMLElement;
    nextEventDateElement: HTMLElement;
    nextEventOpponentElement: HTMLElement;
    nextEventBroadcastElement: HTMLElement;

    constructor(container: HTMLElement, id: number, league: string) {
        super(container);
        this.teamId = id;
        this.teamLeague = league;
        this.teamName = '';
        this.teamLogo = '';
        this.teamColor = '';
        this.teamAltColor = '';
        this.teamRecord = '';
        this.teamStanding = '';
        this.teamNextEvent = '';
        this.teamNextEventDate = '';
        this.teamNextEventBroadcast = '';

        // this.nameElement = document.createElement('div');
        // this.nameElement.classList.add('team-name');
        // this.widget.appendChild(this.nameElement);

        this.recordStandingElement = document.createElement('div');
        this.recordStandingElement.classList.add('team-record-standing');
        this.widget.appendChild(this.recordStandingElement);

        this.recordElement = document.createElement('div');
        this.recordElement.classList.add('team-record');
        this.recordStandingElement.appendChild(this.recordElement);

        this.standingElement = document.createElement('div');
        this.standingElement.classList.add('team-standing');
        this.recordStandingElement.appendChild(this.standingElement);

        this.nextEventElement = document.createElement('div');
        this.nextEventElement.classList.add('team-next-event');
        this.widget.appendChild(this.nextEventElement);

        this.nextEventDateElement = document.createElement('div');
        this.nextEventDateElement.classList.add('team-next-event-date');
        this.nextEventElement.appendChild(this.nextEventDateElement);

        this.nextEventOpponentElement = document.createElement('div');
        this.nextEventOpponentElement.classList.add('team-next-event-opponent');
        this.nextEventElement.appendChild(this.nextEventOpponentElement);

        this.nextEventBroadcastElement = document.createElement('div');
        this.nextEventBroadcastElement.classList.add('team-next-event-broadcast');
        this.nextEventElement.appendChild(this.nextEventBroadcastElement);

        this.fetchData(this.teamId, this.teamLeague);
    }

    fetchData(id: number, league: string) {
        let url = window.location.href;
        url = `${url}${league}/${id}/`;
        fetch(url).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            let utcDate = new Date(data['nextEventDate']);
            let localDate = utcDate.toLocaleString('en-US', options);
            this.teamName = data['name'];
            this.teamLogo = data['logo'];
            this.teamColor = data['color'];
            this.teamAltColor = data['alternateColor'];
            this.teamRecord = data['record'];
            this.teamStanding = data['standing'];
            this.teamNextEvent = data['nextEvent'];
            this.teamNextEventDate = localDate;
            this.teamNextEventBroadcast = data['nextEventBroadcast'];
            this.populateWidget();
        }).catch(error => {
            console.error('There has been a problem with your fetch operation: ', error);
        });
    }

    populateWidget() {
        this.logoElement.src = this.teamLogo;
        this.logoElement.alt = this.teamName;
        // this.nameElement.textContent = this.teamName;
        this.recordElement.textContent = this.teamRecord;
        this.standingElement.textContent = this.teamStanding;
        this.nextEventDateElement.textContent = this.teamNextEventDate;
        this.nextEventOpponentElement.textContent = this.teamNextEvent;
        this.nextEventBroadcastElement.textContent = this.teamNextEventBroadcast;
        this.widget.style.backgroundColor = `#${this.teamColor}`;
        this.widget.style.borderColor = `#${this.teamAltColor}`;
    }
}

export class NFLTeamWidget extends TeamWidget {
    constructor(container: HTMLElement, id: number) {
        super(container, id, 'nfl');
    }
}

export class CollegeFootballTeamWidget extends TeamWidget {
    constructor(container: HTMLElement, id: number) {
        super(container, id, 'college-football');
    }
}
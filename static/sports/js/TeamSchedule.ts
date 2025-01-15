import { convertToLocalDatetime } from '../../base/js/Utils';

export class TeamSchedule {
    container: HTMLElement;
    scheduleContainer: HTMLElement;
    scheduleHeader: HTMLElement;
    scheduleElement: HTMLElement;
    scheduleEvents: Array<HTMLElement>;

    constructor(container: HTMLElement) {
        this.container = container;

        this.scheduleContainer = document.createElement('div');
        this.scheduleContainer.classList.add('team-schedule-container');
        this.container.appendChild(this.scheduleContainer);

        this.scheduleHeader = document.createElement('div');
        this.scheduleHeader.classList.add('team-schedule-header');
        this.scheduleHeader.textContent = 'Schedule';
        this.scheduleContainer.appendChild(this.scheduleHeader);

        this.scheduleElement = document.createElement('div');
        this.scheduleElement.classList.add('team-schedule');
        this.scheduleContainer.appendChild(this.scheduleElement);

        this.scheduleEvents = [];
    }

    populateSchedule(data: any) {
        this.scheduleElement.innerHTML = '';
        data.events.forEach((event: any) => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('team-schedule-event');
            this.scheduleElement.appendChild(eventElement);

            const eventDateElement = document.createElement('div');
            eventDateElement.classList.add('team-schedule-date');
            // Might be able to convert UTC date to local date here,
            // instead of pulling from data attribute
            let localDate = convertToLocalDatetime(event.date);
            eventDateElement.textContent = localDate;
            eventElement.appendChild(eventDateElement);

            const vsElement = document.createElement('div');
            vsElement.classList.add('team-schedule-vs');
            vsElement.textContent = event.competition.vsText;
            eventElement.appendChild(vsElement);

            const eventOpponentElement = document.createElement('div');
            eventOpponentElement.classList.add('team-schedule-opponent');
            const eventOpponentLogoElement = document.createElement('img');
            eventOpponentLogoElement.classList.add('team-schedule-logo');
            eventOpponentLogoElement.src = event.competition.opponentLogo;
            eventOpponentElement.appendChild(eventOpponentLogoElement);
            const eventOpponentNameElement = document.createElement('div');
            eventOpponentNameElement.classList.add('team-schedule-name');
            eventOpponentNameElement.textContent = event.competition.opponent;
            eventOpponentElement.appendChild(eventOpponentNameElement);
            eventElement.appendChild(eventOpponentElement);

            const eventOutcomeElement = document.createElement('div');
            eventOutcomeElement.classList.add('team-schedule-outcome');
            eventOutcomeElement.textContent = event.competition.outcome;
            eventOutcomeElement.style.color = event.competition.outcome === 'W' ? 'green' : 'red';
            eventElement.appendChild(eventOutcomeElement);

            const eventScoreElement = document.createElement('div');
            eventScoreElement.classList.add('team-schedule-score');
            eventScoreElement.textContent = event.competition.score;
            eventElement.appendChild(eventScoreElement);

            this.scheduleEvents.push(eventElement);
        });
    }
}
import { convertToLocalDatetime } from "../../base/js/Utils";

export class EventHeader {
    container: HTMLElement;
    headerElement: HTMLElement;
    // Away
    awayHeaderElement: HTMLElement;
    awayTeamElement: HTMLElement;
    awayNameElement: HTMLElement;
    awayRecordElement: HTMLElement;
    awayOverallRecordElement: HTMLElement;
    awayAwayRecordElement: HTMLElement;
    awayLogoElement: HTMLImageElement;
    // Home
    homeHeaderElement: HTMLElement;
    homeTeamElement: HTMLElement;
    homeNameElement: HTMLElement;
    homeRecordElement: HTMLElement;
    homeOverallRecordElement: HTMLElement;
    homeHomeRecordElement: HTMLElement;
    homeLogoElement: HTMLImageElement;
    // Middle info
    middleInfoElement: HTMLElement;
    middleBroadcastElement: HTMLElement;
    middleDateElement: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;

        this.headerElement = document.createElement('div');
        this.headerElement.classList.add('event-header');
        this.container.appendChild(this.headerElement);

        // Away
        this.awayHeaderElement = document.createElement('div');
        this.awayHeaderElement.classList.add('event-header-away');
        this.headerElement.appendChild(this.awayHeaderElement);

        this.awayTeamElement = document.createElement('div');
        this.awayTeamElement.classList.add('event-header-away-team');
        this.awayHeaderElement.appendChild(this.awayTeamElement);

        this.awayNameElement = document.createElement('div');
        this.awayNameElement.classList.add('event-header-away-name');
        this.awayTeamElement.appendChild(this.awayNameElement);

        this.awayRecordElement = document.createElement('div');
        this.awayRecordElement.classList.add('event-header-away-record');
        this.awayTeamElement.appendChild(this.awayRecordElement);

        this.awayOverallRecordElement = document.createElement('div');
        this.awayOverallRecordElement.classList.add('event-header-away-overall-record');
        this.awayRecordElement.appendChild(this.awayOverallRecordElement);

        this.awayAwayRecordElement = document.createElement('div');
        this.awayAwayRecordElement.classList.add('event-header-away-away-record');
        this.awayRecordElement.appendChild(this.awayAwayRecordElement);

        this.awayLogoElement = document.createElement('img');
        this.awayLogoElement.classList.add('event-header-away-logo');
        // Middle info
        this.middleInfoElement = document.createElement('div');
        this.middleInfoElement.classList.add('event-header-middle');
        this.headerElement.appendChild(this.middleInfoElement);

        this.middleBroadcastElement = document.createElement('div');
        this.middleBroadcastElement.classList.add('event-header-middle-broadcast');
        this.middleInfoElement.appendChild(this.middleBroadcastElement);

        this.middleDateElement = document.createElement('div');
        this.middleDateElement.classList.add('event-header-middle-date');
        this.middleInfoElement.appendChild(this.middleDateElement);

        // Home
        this.homeHeaderElement = document.createElement('div');
        this.homeHeaderElement.classList.add('event-header-home');
        this.headerElement.appendChild(this.homeHeaderElement);

        this.homeLogoElement = document.createElement('img');
        this.homeLogoElement.classList.add('event-header-home-logo');
        this.homeTeamElement = document.createElement('div');
        this.homeTeamElement.classList.add('event-header-home-team');
        this.homeHeaderElement.appendChild(this.homeTeamElement);

        this.homeNameElement = document.createElement('div');
        this.homeNameElement.classList.add('event-header-home-name');
        this.homeTeamElement.appendChild(this.homeNameElement);

        this.homeRecordElement = document.createElement('div');
        this.homeRecordElement.classList.add('event-header-home-record');
        this.homeTeamElement.appendChild(this.homeRecordElement);

        this.homeOverallRecordElement = document.createElement('div');
        this.homeOverallRecordElement.classList.add('event-header-home-overall-record');
        this.homeRecordElement.appendChild(this.homeOverallRecordElement);

        this.homeHomeRecordElement = document.createElement('div');
        this.homeHomeRecordElement.classList.add('event-header-home-home-record');
        this.homeRecordElement.appendChild(this.homeHomeRecordElement);



    }

    populateHeader(data: any) {
        let away = data.nextEvent.away;
        let home = data.nextEvent.home;
        let broadcast = data.nextEvent.broadcast;
        let localDate = convertToLocalDatetime(data.nextEvent.date);

        // Away
        this.awayNameElement.innerHTML = away.team.nickname;
        this.awayOverallRecordElement.innerHTML = `${away.record[0].displayValue}, `;
        this.awayAwayRecordElement.innerHTML = `${away.record[1].displayValue} Away`;
        this.awayLogoElement.src = away.team.logos[0].href;
        this.awayHeaderElement.appendChild(this.awayLogoElement);

        // Middle info
        this.middleBroadcastElement.innerHTML = broadcast;
        this.middleDateElement.innerHTML = localDate;

        // Home
        this.homeNameElement.innerHTML = home.team.nickname;
        this.homeOverallRecordElement.innerHTML = `${home.record[0].displayValue}, `;
        this.homeHomeRecordElement.innerHTML = `${home.record[1].displayValue} Home`;
        this.homeLogoElement.src = home.team.logos[0].href;
        this.homeHeaderElement.prepend(this.homeLogoElement);
    }
}
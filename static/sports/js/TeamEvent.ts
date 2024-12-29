import { convertToLocalDatetime } from '../../base/js/Utils';
import { EventHeader } from './EventHeader';
import { EventLastFive } from './EventLastFive';
import { EventOdds } from './EventOdds';
import { EventPredictor } from './EventPredictor';
import { EventSeasonLeaders } from './EventSeasonLeaders';
import { EventTeamStats } from './EventTeamStats';

export class TeamEvent {
    container: HTMLElement;
    eventElement: HTMLElement;
    eventHeaderElement: EventHeader;
    eventBodyElement: HTMLElement;
    eventFuturesElement: HTMLElement;
    eventPastElement: HTMLElement;
    eventPredictorElement: EventPredictor;
    eventOddsElement: EventOdds;
    eventTeamStatsElement: EventTeamStats;
    eventSeasonLeadersElement: EventSeasonLeaders;
    eventLastFiveElement: EventLastFive;
    // eventDateElement: HTMLElement;
    // eventOpponentElement: HTMLElement;
    // eventBroadcastElement: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;

        this.eventElement = document.createElement('div');
        this.eventElement.classList.add('team-next-event-container');
        this.container.appendChild(this.eventElement);
        
        this.eventHeaderElement = new EventHeader(this.eventElement);

        this.eventBodyElement = document.createElement('div');
        this.eventBodyElement.classList.add('team-next-event-body');
        this.eventElement.appendChild(this.eventBodyElement);

        this.eventFuturesElement = document.createElement('div');
        this.eventFuturesElement.classList.add('team-next-event-futures');
        this.eventBodyElement.appendChild(this.eventFuturesElement);

        this.eventPredictorElement = new EventPredictor(this.eventFuturesElement);
        this.eventOddsElement = new EventOdds(this.eventFuturesElement);

        this.eventPastElement = document.createElement('div');
        this.eventPastElement.classList.add('team-next-event-past');
        this.eventBodyElement.appendChild(this.eventPastElement);

        this.eventTeamStatsElement = new EventTeamStats(this.eventPastElement);
        this.eventSeasonLeadersElement = new EventSeasonLeaders(this.eventPastElement);
        this.eventLastFiveElement = new EventLastFive(this.eventPastElement);
    }

    populateEvent(data: any) {
        this.eventHeaderElement.populateHeader(data);
        this.eventPredictorElement.populatePredictor(data);
        this.eventOddsElement.populateOdds(data);
        this.eventTeamStatsElement.populateStats(data);
        this.eventSeasonLeadersElement.populateLeaders(data);
        this.eventLastFiveElement.populateLastFive(data);
    }
}
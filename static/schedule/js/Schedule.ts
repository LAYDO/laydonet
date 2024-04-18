import { Clock } from "./Clock";
import { Period } from "./Period";

export class Schedule {
    private schedule: any;
    private url: string = window.location.href;
    private dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    private flip: boolean = false;
    public clock: Clock;
    public periodsElement: HTMLElement;
    private periods: Array<Period>;

    constructor() {
        let clockElement = document.getElementById('newClock')!;
        this.clock = new Clock(clockElement);
        this.periodsElement = document.getElementById('periods')!;
        this.periods = [];
        this.schedule = {};
        this.fetchSchedule();
        setInterval(this.updateSchedule.bind(this), 1000);
    }

    private fetchSchedule() {
        let url = window.location.href;
        fetch(url + 'get').then(response => {
            return response.json();
        }).then(data => {
            this.schedule = data;
            this.displayPeriods();
        }).catch(error => {
            console.error('There has been a problem with your fetch operation: ', error);
        });
    }

    public displayPeriods() {
        this.schedule.periods.forEach((period: any) => {
            let p = new Period(period, this.periodsElement);
            if (p) {
                this.periods.push(p);
            }
        });
    }

    public updateSchedule() {
        let time = new Date();
        this.clock.updateTime(time);
        this.periods.forEach(period => {
            period.updatePeriod(time);
        });
    }
}


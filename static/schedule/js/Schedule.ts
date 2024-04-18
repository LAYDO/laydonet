import { Period } from "./Period";

export class Schedule {
    private schedule: any;
    private url: string = window.location.href;
    private dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    private flip: boolean = false;
    // public clockElement: HTMLElement;
    public periodsElement: HTMLElement;
    private periods: any;

    constructor(data: Object, time: Date) {
        this.periodsElement = document.getElementById('periods')!;

        this.schedule = data;
        this.displayPeriods(time);

    }

    public displayPeriods(time: Date) {
        this.schedule.periods.forEach((period: any) => {
            let p = new Period(period, this.periodsElement, time);
        });
    }
}


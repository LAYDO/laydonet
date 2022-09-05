class Schedule {
    private schedule: any;
    private url: string = window.location.href;
    private dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    private flip: boolean = false;
    public clockElement: HTMLElement;
    public periodsElement: HTMLElement;
    private clock: any;
    private periods: any;

    constructor(data: Object) {
        this.clockElement = document.getElementById('newClock')!;
        this.schedule = data;
        console.log(this.schedule);
        this.clock = new Clock(this.clockElement);
        this.periodsElement = document.getElementById('periods')!;
        if (this.schedule.periods.length > 0) {
            this.schedule.periods.forEach((period: any) => {
                let p = new Period(period, this.periodsElement);
            });
        }
    }
}
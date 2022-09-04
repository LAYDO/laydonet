class Schedule {
    private schedule: Object = {};
    private url: string = window.location.href;
    private dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    private flip: boolean = false;
    public clockElement: HTMLElement;
    private clock: any;

    constructor(data: Object) {
        this.clockElement = document.getElementById('newClock')!;
        this.schedule = data;
        console.log(this.schedule);
        this.clock = new Clock(this.clockElement);
        // this.clockElement.append(JSON.stringify(this.schedule));
    }
}
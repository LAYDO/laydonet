export class Period {
    public end: Date;
    public id: string;
    private plan: boolean;
    private schedule: string;
    public start: Date;
    private title: string;
    public active: boolean = false;
    public period: HTMLElement;

    constructor(data: any, element: HTMLElement) {
        this.start = new Date(data.start);
        this.end = new Date(data.end);
        this.id = data.id;
        this.plan = data.plan;
        this.schedule = data.schedule;
        this.title = data.title;
        this.active = false

        this.period = document.createElement('div');
        let title = document.createElement('div');
        let schedule = document.createElement('div');

        this.period.className = `laydo-row-even laydo-container period`;
        this.period.id = this.id;

        title.innerText = this.title;
        schedule.innerText = this.schedule;

        this.period.append(title);
        this.period.append(schedule);

        element.append(this.period);
    }

    public updatePeriod(time: Date) {
        if (time > this.start && time < this.end) {
            this.period.classList.add('period-active');
        } else {
            this.period.classList.remove('period-active');
        }
    }
}


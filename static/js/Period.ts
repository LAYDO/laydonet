class Period {
    private end: Date;
    private id: string;
    private plan: boolean;
    private schedule: string;
    private start: Date;
    private title: string;

    constructor(data: any, element: HTMLElement) {
        this.end = data.end;
        this.id = data.id;
        this.plan = data.plan;
        this.schedule = data.schedule;
        this.start = data.start;
        this.title = data.title;
    }
}
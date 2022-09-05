"use strict";
class Period {
    constructor(data, element) {
        this.end = data.end;
        this.id = data.id;
        this.plan = data.plan;
        this.schedule = data.schedule;
        this.start = data.start;
        this.title = data.title;
        let period = document.createElement('div');
        let title = document.createElement('div');
        let schedule = document.createElement('div');
        period.className = 'laydo-row-even laydo-container';
        title.innerText = data.title;
        schedule.innerText = data.schedule;
        period.append(title);
        period.append(schedule);
        element.append(period);
    }
}

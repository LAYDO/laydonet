"use strict";
class Period {
    constructor(data, element, now) {
        this.active = false;
        this.start = new Date(data.start);
        this.end = new Date(data.end);
        this.id = data.id;
        this.plan = data.plan;
        this.schedule = data.schedule;
        this.title = data.title;
        this.active = (now > this.start && now < this.end);
        let period = document.createElement('div');
        let title = document.createElement('div');
        let schedule = document.createElement('div');
        period.className = `laydo-row-even laydo-container ${this.active ? 'period-active' : ''}`;
        period.id = this.id;
        title.innerText = data.title;
        schedule.innerText = data.schedule;
        period.append(title);
        period.append(schedule);
        element.append(period);
    }
}

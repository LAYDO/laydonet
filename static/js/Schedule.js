"use strict";
class Schedule {
    constructor(data) {
        this.schedule = {};
        this.url = window.location.href;
        this.dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.flip = false;
        this.clockElement = document.getElementById('newClock');
        this.schedule = data;
        console.log(this.schedule);
        this.clock = new Clock(this.clockElement);
        this.periodsElement = document.getElementById('periods');
    }
}

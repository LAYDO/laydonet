"use strict";
class Schedule {
    constructor(data) {
        this.url = window.location.href;
        this.dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.flip = false;
        this.clockElement = document.getElementById('newClock');
        this.periodsElement = document.getElementById('periods');
        this.time = new Date();
        this.schedule = data;
        // console.log(this.schedule);
        this.clock = new Clock(this.clockElement);
        setInterval(this.updateTime.bind(this));
    }
    updateTime() {
        this.time = new Date();
        let hour = this.time.getHours();
        let minute = this.time.getMinutes();
        let second = this.time.getSeconds();
        hour = hour % 12;
        hour = (hour * 30) + (minute / 2) + (second / 10);
        this.clock.drawHand(hour, 'hourHand', '4', this.clock.baseW / 4);
        minute = (minute * 6) + (second / 10);
        this.clock.drawHand(minute, 'minuteHand', '3', this.clock.baseW / 6);
        second = (second * 6);
        this.clock.drawHand(second, 'secondHand', '2', this.clock.baseW / 9);
        if (this.schedule.periods.length > 0) {
            this.periodsElement.innerHTML = '';
            this.schedule.periods.forEach((period) => {
                let p = new Period(period, this.periodsElement, this.time);
            });
        }
    }
}

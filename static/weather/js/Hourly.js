"use strict";
class Hourly {
    constructor() {
        this.hourlyElement = document.getElementById('hfc');
        this.hourlyTitle = document.createElement('div');
        this.hourlyTitle.className = 'container-title';
        let span = document.createElement('span');
        span.className = 'fas fa-clock pad-right';
        this.hourlyTitle.append(span);
        this.hourlyTitle.append('Hourly Forecast');
        this.hourly = document.createElement('div');
        this.hourly.id = 'hourly';
        this.hourly.className = 'weather-hourly';
        this.hourlyElement.append(this.hourlyTitle);
        this.hourlyElement.append(this.hourly);
    }
    toggle(loaded) {
        if (loaded) {
            this.hourlyElement.style.display = 'flex';
        }
        else {
            this.hourlyElement.style.display = 'none';
        }
    }
    populate(data, icons) {
        if (data) {
            this.hourly.innerHTML = '';
            data.forEach((d) => {
                let hourContainer = document.createElement('div');
                hourContainer.className = 'hourly-container';
                let hourTitle = document.createElement('div');
                hourTitle.className = 'hourly-title';
                let hourIcon = document.createElement('span');
                hourIcon.className = 'hourly-icon';
                let hourTemps = document.createElement('div');
                hourTemps.className = 'hourly-temps';
                hourContainer.id = `${d.dt}Container`;
                hourTitle.id = `${d.dt}Title`;
                hourIcon.id = `${d.dt}Icon`;
                hourTemps.id = `${d.dt}Temps`;
                let theHour = new Date(d.dt * 1000);
                hourTitle.innerText = this.hourlyText(theHour.getHours());
                hourIcon.className += icons[d.weather[0].icon];
                hourTemps.innerText = `${Math.round(d.temp)}\xB0`;
                hourContainer.append(hourTitle);
                hourContainer.append(hourIcon);
                hourContainer.append(hourTemps);
                this.hourly.append(hourContainer);
            });
        }
    }
    hourlyText(h) {
        if (h > 12) {
            return `${h - 12} PM`;
        }
        else if (h == 12) {
            return "12 PM";
        }
        else if (h == 0) {
            return "12 AM";
        }
        else {
            return `${h} AM`;
        }
    }
}

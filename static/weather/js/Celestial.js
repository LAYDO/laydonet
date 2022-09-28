"use strict";
class Celestial {
    constructor() {
        this.celeOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };
        this.celestialElement = document.getElementById('celestialSection');
        this.celestialRow = document.createElement('div');
        this.celestialRow.id = 'celestialRow';
        this.celestialRow.className = 'elements-row';
        this.celestialElement.append(this.celestialRow);
        this.Sun = new Sun();
        this.Moon = new Moon();
        this.trigger = false;
        this.place = 0;
        this.animSunId = 0;
        this.animMoonId = 0;
    }
    toggle(loaded) {
        if (loaded) {
            this.celestialElement.style.display = 'inherit';
        }
        else {
            this.celestialElement.style.display = 'none';
        }
    }
    populate(data) {
        this.Sun.populate(this.Sun, data.todaily, data, this.place);
        document.addEventListener('scroll', this.celestialTriggers.bind(this, data));
        this.Sun.animSunId = window.requestAnimationFrame(this.Sun.populate.bind(this.Sun, data.todaily, data, this.place));
        this.animMoonId = window.requestAnimationFrame(this.Moon.populate.bind(this.Moon, data));
    }
    celestialTriggers(data) {
        if (this.celestialRow.getBoundingClientRect().bottom > 0 && !this.trigger) {
            this.trigger = true;
            this.Sun.animSunId = window.requestAnimationFrame(this.Sun.populate.bind(this.Sun, data.todaily, data, this.place));
            this.animMoonId = window.requestAnimationFrame(this.Moon.populate.bind(this.Moon, data));
        }
        else if (this.celestialRow.getBoundingClientRect().bottom <= 0 && this.trigger) {
            window.cancelAnimationFrame(this.Sun.animSunId);
            window.cancelAnimationFrame(this.animMoonId);
            this.trigger = false;
        }
    }
}

"use strict";
class Moon extends ElementTile {
    constructor() {
        super('Moon', 'moon', ['moonData', 'moonGraphic2'], 'celestialRow', ['moonRemain']);
    }
    populate(data) {
    }
    moonRemaining(data) {
        let n = new Date();
        let moonrise = new Date(data['moonrise'] * 1000);
        let moonset;
        if (data['moonset'] == 0) {
            moonset = undefined;
        }
        else {
            moonset = new Date(data['moonset'] * 1000);
        }
        let m = document.getElementById('moonRemain');
        if (moonset != undefined && moonset < moonrise) {
            if (n < moonset) {
                let diff = Math.abs(moonset.valueOf() - n.valueOf());
                document.getElementById('moonTitle').innerHTML = `<span class="fas fa-moon pad-right"></span>Moonset`;
                document.getElementById('moonData').innerText = moonset.toLocaleString('en-US', {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
                this.plugDiff(diff, m, 'Moonset');
            }
            else {
                let diff = Math.abs(moonrise.valueOf() - n.valueOf());
                document.getElementById('moonTitle').innerHTML = `<span class="fas fa-moon pad-right"></span>Moonrise`;
                document.getElementById('moonData').innerText = moonrise.toLocaleTimeString('en-US', {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
                this.plugDiff(diff, m, 'Moonrise');
            }
        }
        else {
            if (n < moonrise) {
                let diff = Math.abs(moonrise.valueOf() - n.valueOf());
                document.getElementById('moonTitle').innerHTML = `<span class="fas fa-moon pad-right"></span>Moonrise`;
                document.getElementById('moonData').innerText = moonrise.toLocaleTimeString('en-US', {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
                this.plugDiff(diff, m, 'Moonrise');
            }
            else {
                if (moonset != undefined) {
                    let diff = Math.abs(moonset.valueOf() - n.valueOf());
                    document.getElementById('moonTitle').innerHTML = `<span class="fas fa-moon pad-right"></span>Moonset`;
                    document.getElementById('moonData').innerText = moonset.toLocaleString('en-US', {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    });
                    this.plugDiff(diff, m, 'Moonset');
                }
            }
        }
    }
    plugDiff(diff, div, text) {
        diff = Math.floor(diff / 1000);
        let secs = (diff % 60).toFixed(0);
        secs = ('0' + secs).slice(-2);
        diff = Math.floor(diff / 60);
        let mins = (diff % 60).toFixed(0);
        mins = ('0' + mins).slice(-2);
        diff = Math.floor(diff / 60);
        let hours = (diff % 24).toFixed(0);
        hours = ('0' + hours).slice(-2);
        div.innerText = `${hours}h ${mins}m ${secs}s until ${text}`;
    }
}

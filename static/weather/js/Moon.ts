import { CelestialTile } from "./CelestialTile";

export class Moon extends CelestialTile {
    private remainInterval: any;
    public animMoonId: number;
    private radius: number;
    private moon_phase: number;
    private phaseText: string;
    private moonSVG: SVGElement;

    constructor(_row: HTMLElement) {
        super(_row, 'Moon');
        this.remainInterval = 0;
        this.animMoonId = 0;
        this.radius = 0;
        this.moon_phase = 0;
        this.phaseText = '';
        this.moonSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.moonSVG.id = 'moonSVG';
    }

    populate(data: any) {
        clearInterval(this.remainInterval);
        this.remainInterval = setInterval(this.moonRemaining.bind(this, data));

        this.bW = this.baseW * 0.9;
        this.radius = this.bW / 2;

        this.moon_phase = data.moon_phase;
        // this.minis[1].innerHTML = '';

        // Black background
        let background = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        background.setAttribute('cx', (this.bW / 2).toFixed(0));
        background.setAttribute('cy', (this.bW / 2).toFixed(0));
        background.setAttribute('r', this.radius.toFixed(0));
        background.setAttribute('stroke', 'none');
        background.setAttribute('fill', 'black');

        // Phase text
        // let phase = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        // phase.setAttribute('x', (this.bW / 2).toFixed(0));
        // phase.setAttribute('y', (this.radius * 1.7).toFixed(0));
        // phase.setAttribute('text-anchor', 'middle');
        // phase.setAttribute('fill', '#fff8ed');
        // phase.setAttribute('font-size', '0.75rem');

        // Moon Shadow Mask
        let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        let mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
        mask.id = 'moonShadow';

        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('height', '100%');
        rect.setAttribute('width', '100%');
        rect.setAttribute('fill', 'white');

        // this.moon_phase = 0.95; // For testing
        let shadow;
        if (this.moon_phase == 0.25 || this.moon_phase == 0.75) {
            shadow = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            shadow.setAttribute('y', '0');
            shadow.setAttribute('height', (this.bW).toFixed(0));
            shadow.setAttribute('width', (this.bW / 2).toFixed(0));
        } else {
            shadow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            shadow.setAttribute('cy', (this.bW / 2.5).toFixed(0));
            shadow.setAttribute('r', (this.radius * 0.51).toFixed(0));
        }
        
        // Moon
        let moon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moon.setAttribute('cx', (this.bW / 2).toFixed(0));
        moon.setAttribute('cy', (this.bW / 2.5).toFixed(0));
        moon.setAttribute('r', (this.radius * 0.5).toFixed(0));
        moon.setAttribute('stroke', 'none');
        if ((this.moon_phase > 0.25 && this.moon_phase < 0.5) || (this.moon_phase > 0.5 && this.moon_phase < 0.75)) {
            rect.setAttribute('fill', '#191919');
            moon.setAttribute('fill', 'white');
            shadow.setAttribute('fill', 'white');
        } else {
            moon.setAttribute('fill', 'white');
            shadow.setAttribute('fill', '#191919');
        }
        moon.setAttribute('mask', 'url(#moonShadow)');

        if (this.moon_phase == 0 || this.moon_phase == 1) {
            shadow.setAttribute('cx', ((this.bW / 2)).toFixed(0));
            this.phaseText = 'New Moon';
        } else if (this.moon_phase > 0 && this.moon_phase < 0.25) {
            shadow.setAttribute('cx', ((this.bW / 2) - (this.radius * this.moon_phase)).toFixed(0));
            this.phaseText = 'Waxing Crescent';
        } else if (this.moon_phase == 0.25) {
            shadow.setAttribute('x', '0');
            this.phaseText = 'First Quarter Moon';
        } else if (this.moon_phase > 0.25 && this.moon_phase < 0.5) {
            shadow.setAttribute('cx', ((this.bW / 2) + (this.radius * (0.5 - this.moon_phase))).toFixed(0));
            this.phaseText = 'Waxing Gibbous';
        } else if (this.moon_phase == 0.5) {
            this.phaseText = 'Full Moon';
        } else if (this.moon_phase > 0.5 && this.moon_phase < 0.75) {
            shadow.setAttribute('cx', ((this.bW / 2) - (this.radius * (this.moon_phase - 0.5))).toFixed(0));
            this.phaseText = 'Waning Gibbous';
        } else if (this.moon_phase == 0.75) {
            shadow.setAttribute('x', (this.bW / 2).toFixed(0));
            this.phaseText = 'Last Quarter Moon';
        } else if (this.moon_phase > 0.75 && this.moon_phase < 1) {
            shadow.setAttribute('cx', ((this.bW / 2) + (this.radius * (1 - this.moon_phase))).toFixed(0));
            this.phaseText = 'Waning Crescent';
        }

        this.eventInfo.textContent = this.phaseText;

        mask.append(rect);
        mask.append(shadow);
        defs.append(mask);

        this.moonSVG.append(defs);
        this.moonSVG.append(background);
        this.moonSVG.append(moon);
        this.moonSVG.setAttribute('viewBox', `0 0 ${this.baseW} ${this.baseW}`);
        this.moonSVG.setAttribute('width', "100%");
        this.moonSVG.setAttribute('height', "100%");

        this.eventGraphic.append(this.moonSVG);
        // this.minis[1].append(this.moonSVG);
    }

    moonRemaining(data: any) {
        let n = new Date();

        let moonrise = new Date(data['moonrise'] * 1000);
        let moonset;
        if (data['moonset'] == 0) {
            moonset = undefined;
        } else {
            moonset = new Date(data['moonset'] * 1000);
        }

        if (moonset != undefined && moonset < moonrise) {
            if (n < moonset) {
                let diff = Math.abs(moonset.valueOf() - n.valueOf());
                this.titleText.innerText = `Moonset`;
                if (this.eventTime) {
                    this.eventTime.innerText = moonset.toLocaleString('en-US', {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    });
                }
                this.plugDiff(diff);
            } else {
                let diff = Math.abs(moonrise.valueOf() - n.valueOf());
                this.titleText.innerText = `Moonrise`;
                if (this.eventTime) {
                    this.eventTime.innerText = moonrise.toLocaleTimeString('en-US', {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    });
                }
                this.plugDiff(diff);

            }
        } else {
            if (n < moonrise) {
                let diff = Math.abs(moonrise.valueOf() - n.valueOf());
                this.titleText.innerText = `Moonrise`;
                if (this.eventTime) {
                    this.eventTime.innerText = moonrise.toLocaleTimeString('en-US', {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    });
                }
                this.plugDiff(diff);
            } else {
                if (moonset != undefined) {
                    let diff = Math.abs(moonset.valueOf() - n.valueOf());
                    this.titleText.innerText = `Moonset`;
                    if (this.eventTime) {
                        this.eventTime.innerText = moonset.toLocaleString('en-US', {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        });
                    }
                    this.plugDiff(diff);
                }

            }

        }
    }

    plugDiff(diff: number) {
        diff = Math.floor(diff / 1000);
        let secs = (diff % 60).toFixed(0);
        secs = ('0' + secs).slice(-2);
        diff = Math.floor(diff / 60);
        let mins = (diff % 60).toFixed(0);
        mins = ('0' + mins).slice(-2);
        diff = Math.floor(diff / 60);
        let hours = (diff % 24).toFixed(0);
        hours = ('0' + hours).slice(-2);
        this.countdown.innerText = `${hours}h ${mins}m ${secs}s`;
    }
}
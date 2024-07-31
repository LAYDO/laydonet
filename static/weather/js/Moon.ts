import { ElementTile } from "./ElementTile";

export class Moon extends ElementTile {
    private remainInterval: any;
    public animMoonId: number;
    private baseW: number;
    private radius: number;
    private moon_phase: number;
    private phaseText: string;
    private moonSVG: SVGElement;

    constructor(_row: HTMLElement) {
        super('Moon', 'moon', ['moonData', 'moonGraphic2'], _row, ['moonRemain']);
        this.remainInterval = 0;
        this.animMoonId = 0;
        this.baseW = 0;
        this.radius = 0;
        this.moon_phase = 0;
        this.phaseText = '';
        this.moonSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.moonSVG.id = 'moonSVG';
        this.element.classList.add('celestial-tile');
    }

    populate(data: any) {
        clearInterval(this.remainInterval);
        this.remainInterval = setInterval(this.moonRemaining.bind(this, data));

        this.baseW = this.minis[1]?.clientWidth * 0.9;
        this.radius = this.baseW / 2;

        this.moon_phase = data.moon_phase;
        this.minis[1].innerHTML = '';

        // Black background
        let background = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        background.setAttribute('cx', (this.baseW / 2).toFixed(0));
        background.setAttribute('cy', (this.baseW / 2).toFixed(0));
        background.setAttribute('r', this.radius.toFixed(0));
        background.setAttribute('stroke', 'none');
        background.setAttribute('fill', 'black');

        // Phase text
        let phase = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        phase.setAttribute('x', (this.baseW / 2).toFixed(0));
        phase.setAttribute('y', (this.radius * 1.7).toFixed(0));
        phase.setAttribute('text-anchor', 'middle');
        phase.setAttribute('fill', '#fff8ed');
        phase.setAttribute('font-size', '0.75rem');

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
            shadow.setAttribute('height', (this.baseW).toFixed(0));
            shadow.setAttribute('width', (this.baseW / 2).toFixed(0));
        } else {
            shadow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            shadow.setAttribute('cy', (this.baseW / 2.5).toFixed(0));
            shadow.setAttribute('r', (this.radius * 0.51).toFixed(0));
        }
        
        // Moon
        let moon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        moon.setAttribute('cx', (this.baseW / 2).toFixed(0));
        moon.setAttribute('cy', (this.baseW / 2.5).toFixed(0));
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
            shadow.setAttribute('cx', ((this.baseW / 2)).toFixed(0));
            this.phaseText = 'New Moon';
        } else if (this.moon_phase > 0 && this.moon_phase < 0.25) {
            shadow.setAttribute('cx', ((this.baseW / 2) - (this.radius * this.moon_phase)).toFixed(0));
            this.phaseText = 'Waxing Crescent';
        } else if (this.moon_phase == 0.25) {
            shadow.setAttribute('x', '0');
            this.phaseText = 'First Quarter Moon';
        } else if (this.moon_phase > 0.25 && this.moon_phase < 0.5) {
            shadow.setAttribute('cx', ((this.baseW / 2) + (this.radius * (0.5 - this.moon_phase))).toFixed(0));
            this.phaseText = 'Waxing Gibbous';
        } else if (this.moon_phase == 0.5) {
            this.phaseText = 'Full Moon';
        } else if (this.moon_phase > 0.5 && this.moon_phase < 0.75) {
            shadow.setAttribute('cx', ((this.baseW / 2) - (this.radius * (this.moon_phase - 0.5))).toFixed(0));
            this.phaseText = 'Waning Gibbous';
        } else if (this.moon_phase == 0.75) {
            shadow.setAttribute('x', (this.baseW / 2).toFixed(0));
            this.phaseText = 'Last Quarter Moon';
        } else if (this.moon_phase > 0.75 && this.moon_phase < 1) {
            shadow.setAttribute('cx', ((this.baseW / 2) + (this.radius * (1 - this.moon_phase))).toFixed(0));
            this.phaseText = 'Waning Crescent';
        }

        phase.textContent = this.phaseText;

        mask.append(rect);
        mask.append(shadow);
        defs.append(mask);

        this.moonSVG.append(defs);
        this.moonSVG.append(background);
        this.moonSVG.append(moon);
        this.moonSVG.append(phase);
        this.moonSVG.setAttribute('width', this.baseW.toFixed(0));
        this.moonSVG.setAttribute('height', this.baseW.toFixed(0));

        this.minis[1].append(this.moonSVG);
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

        let m = document.getElementById('moonRemain')!;

        if (!m) {
            return;
        }

        if (moonset != undefined && moonset < moonrise) {
            if (n < moonset) {
                let diff = Math.abs(moonset.valueOf() - n.valueOf());
                this.title.innerHTML = `<span class="fas fa-moon pad-right"></span>Moonset`;
                let d = document.getElementById('moonData');
                if (d) {
                    d.innerText = moonset.toLocaleString('en-US', {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    });
                }
                this.plugDiff(diff, m, 'Moonset');
            } else {
                let diff = Math.abs(moonrise.valueOf() - n.valueOf());
                this.title.innerHTML = `<span class="fas fa-moon pad-right"></span>Moonrise`;
                let d = document.getElementById('moonData');
                if (d) {
                    d.innerText = moonrise.toLocaleTimeString('en-US', {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    });
                }
                this.plugDiff(diff, m, 'Moonrise');

            }
        } else {
            if (n < moonrise) {
                let diff = Math.abs(moonrise.valueOf() - n.valueOf());
                this.title.innerHTML = `<span class="fas fa-moon pad-right"></span>Moonrise`;
                let d = document.getElementById('moonData');
                if (d) {
                    d.innerText = moonrise.toLocaleTimeString('en-US', {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    });
                }
                this.plugDiff(diff, m, 'Moonrise');
            } else {
                if (moonset != undefined) {
                    let diff = Math.abs(moonset.valueOf() - n.valueOf());
                    this.title.innerHTML = `<span class="fas fa-moon pad-right"></span>Moonset`;
                    let d = document.getElementById('moonData');
                    if (d) {
                        d.innerText = moonset.toLocaleString('en-US', {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        });
                    }
                    this.plugDiff(diff, m, 'Moonset');
                }

            }

        }
    }

    plugDiff(diff: number, div: HTMLElement, text: string) {
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
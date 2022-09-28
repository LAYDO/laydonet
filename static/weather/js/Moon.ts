class Moon extends ElementTile {
    private remainInterval: number;
    public animMoonId: number;
    private baseW: number;
    private radius: number;
    private moonGraphic: HTMLElement;

    constructor() {
        super('Moon', 'moon', ['moonData', 'moonGraphic2'], 'celestialRow', ['moonRemain']);
        this.remainInterval = 0;
        this.animMoonId = 0;
        this.baseW = 0;
        this.radius = 0;
        this.moonGraphic = document.getElementById('moonGraphic2')!;
    }

    populate(data: any) {
        clearInterval(this.remainInterval);
        this.remainInterval = setInterval(this.moonRemaining.bind(this, data));

        this.baseW = this.moonGraphic?.clientWidth * 0.9;
        this.radius = this.baseW / 2;

        this.moonGraphic.innerHTML = '';

        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', this.baseW.toFixed(0));
        svg.setAttribute('height', this.baseW.toFixed(0));
        svg.id = 'moonSVG';

        // Black background
        let background = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        background.setAttribute('cx', (this.baseW / 2).toFixed(0));
        background.setAttribute('cy', (this.baseW / 2).toFixed(0));
        background.setAttribute('r', this.radius.toFixed(0));
        background.setAttribute('stroke', 'none');
        background.setAttribute('fill', 'black');

        let phase = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        phase.setAttribute('x', (this.baseW / 2).toFixed(0));
        phase.setAttribute('y', (this.radius * 1.5).toFixed(0));
        phase.setAttribute('text-anchor', 'middle');
        phase.setAttribute('fill', 'var(--font-color)');
        phase.setAttribute('font-size', '1rem');
        let moon_phase = data.moon_phase;
        let phaseText = '';
        if (moon_phase == 0 || moon_phase == 1) {
            phaseText = 'New Moon';
        } else if (moon_phase > 0 && moon_phase < 0.25) {
            phaseText = 'Waxing Crescent';
        } else if (moon_phase == 0.25) {
            phaseText = 'First Quarter Moon';
        } else if (moon_phase > 0.25 && moon_phase < 0.5) {
            phaseText = 'Waxing Gibbous';
        } else if (moon_phase == 0.5) {
            phaseText = 'Full Moon';
        } else if (moon_phase > 0.5 && moon_phase < 0.75) {
            phaseText = 'Waning Gibbous';
        } else if (moon_phase == 0.75) {
            phaseText = 'Last Quarter Moon';
        } else if (moon_phase > 0.75 && moon_phase < 1) {
            phaseText = 'Waning Crescent';
        }
        phase.textContent = phaseText;

        svg.append(background);
        svg.append(phase);

        this.moonGraphic.append(svg);
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

        if (moonset != undefined && moonset < moonrise) {
            if (n < moonset) {
                let diff = Math.abs(moonset.valueOf() - n.valueOf());
                document.getElementById('moonTitle')!.innerHTML = `<span class="fas fa-moon pad-right"></span>Moonset`;
                document.getElementById('moonData')!.innerText = moonset.toLocaleString('en-US', {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
                this.plugDiff(diff, m, 'Moonset');
            } else {
                let diff = Math.abs(moonrise.valueOf() - n.valueOf());
                document.getElementById('moonTitle')!.innerHTML = `<span class="fas fa-moon pad-right"></span>Moonrise`;
                document.getElementById('moonData')!.innerText = moonrise.toLocaleTimeString('en-US', {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
                this.plugDiff(diff, m, 'Moonrise');

            }
        } else {
            if (n < moonrise) {
                let diff = Math.abs(moonrise.valueOf() - n.valueOf());
                document.getElementById('moonTitle')!.innerHTML = `<span class="fas fa-moon pad-right"></span>Moonrise`;
                document.getElementById('moonData')!.innerText = moonrise.toLocaleTimeString('en-US', {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
                this.plugDiff(diff, m, 'Moonrise');
            } else {
                if (moonset != undefined) {
                    let diff = Math.abs(moonset.valueOf() - n.valueOf());
                    document.getElementById('moonTitle')!.innerHTML = `<span class="fas fa-moon pad-right"></span>Moonset`;
                    document.getElementById('moonData')!.innerText = moonset.toLocaleString('en-US', {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    });
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
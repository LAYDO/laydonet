class Celestial {
    public celestialElement: HTMLElement;
    public celestialRow: HTMLElement;

    public Sun: any;
    public Moon: any;
    private trigger: Boolean;
    private animSunId: number;
    private animMoonId: number;
    private place: number;
    public remainInterval: number;
    private colorSunrise: string = '#FFE600';
    private colorSunset: string = '#FF8700';

    private celeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    constructor() {
        this.celestialElement = document.getElementById('celestialSection')!;

        this.celestialRow = document.createElement('div');
        this.celestialRow.id = 'celestialRow';
        this.celestialRow.className = 'elements-row';

        this.celestialElement.append(this.celestialRow);

        this.Sun = new Sun();
        this.Moon = new Moon();

        this.trigger = false;
        this.place = 0;
        this.remainInterval = 0;
        this.animSunId = 0;
        this.animMoonId = 0;
    }

    toggle(loaded: Boolean) {
        if (loaded) {
            this.celestialElement.style.display = 'inherit';
        } else {
            this.celestialElement.style.display = 'none';
        }
    }

    populate(data: any) {
        this.remainInterval = setInterval(this.celestialRemaining.bind(this, data), 1000);
        document.addEventListener('scroll', this.celestialTriggers.bind(this, data));
        this.animSunId = window.requestAnimationFrame(this.Sun.populate.bind(null, data, this.place));
        this.animMoonId = window.requestAnimationFrame(this.Moon.populate.bind(null, data.moon_phase));
    }

    celestialTriggers(data: any) {

        if (this.celestialRow.getBoundingClientRect().bottom > 0 && !this.trigger) {
            this.trigger = true;
            this.animSunId = window.requestAnimationFrame(this.Sun.populate.bind(null, data, this.place));
            this.animMoonId = window.requestAnimationFrame(this.Moon.populate.bind(null, data.moon_phase));
        } else if (this.celestialRow.getBoundingClientRect().bottom <= 0 && this.trigger) {
            window.cancelAnimationFrame(this.animSunId);
            window.cancelAnimationFrame(this.animMoonId);
            this.trigger = false;
        }
    }

    celestialRemaining(data: any) {
        let n = new Date();
        let sunrise = new Date(data['sunrise'] * 1000);
        let sunset = new Date(data['sunset'] * 1000);
        let moonrise = new Date(data['moonrise'] * 1000);
        let moonset;
        if (data['moonset'] == 0) {
            moonset = undefined;
        } else {
            moonset = new Date(data['moonset'] * 1000);
        }

        let s = document.getElementById('sunRemain')!;
        let m = document.getElementById('moonRemain')!;

        if (sunrise > sunset) {
            if (n < sunset) {
                let diff = Math.abs(sunset.valueOf() - n.valueOf());
                document.getElementById('sunTitle')!.innerHTML = `<span class="fas fa-sun pad-right"></span>Sunset`;
                document.getElementById('sunTitle')!.style.color = this.colorSunset;
                document.getElementById('sunData')!.innerText = sunset.toLocaleTimeString('en-US', {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
                this.plugDiff(diff, s, 'Sunset');
            } else {
                let diff = Math.abs(sunrise.valueOf() - n.valueOf());
                document.getElementById('sunTitle')!.innerHTML = `<span class="fas fa-sun pad-right"></span>Sunrise`;
                document.getElementById('sunTitle')!.style.color = this.colorSunrise;
                document.getElementById('sunData')!.innerText = sunrise.toLocaleTimeString('en-US', {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
                this.plugDiff(diff, s, 'Sunrise');
            }
        } else {
            let diff = Math.abs(sunrise.valueOf() - n.valueOf());
            document.getElementById('sunTitle')!.innerHTML = `<span class="fas fa-sun pad-right"></span>Sunrise`;
            document.getElementById('sunTitle')!.style.color = this.colorSunrise;
            document.getElementById('sunData')!.innerText = sunrise.toLocaleTimeString('en-US', {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });
            this.plugDiff(diff, s, 'Sunrise');
        }


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
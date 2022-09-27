class Celestial {
    public celestialElement: HTMLElement;
    public celestialRow: HTMLElement;

    public Sun: any;
    public Moon: any;
    private trigger: Boolean;
    public animSunId: number;
    public animMoonId: number;
    public place: number;

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
        this.Sun.populate(this.Sun, data.todaily, data, this.place);
        document.addEventListener('scroll', this.celestialTriggers.bind(this, data));
        this.Sun.animSunId = window.requestAnimationFrame(this.Sun.populate.bind(this.Sun, data.todaily, data, this.place));
        this.animMoonId = window.requestAnimationFrame(this.Moon.populate.bind(this.Moon, data.moon_phase));
    }

    celestialTriggers(data: any) {

        if (this.celestialRow.getBoundingClientRect().bottom > 0 && !this.trigger) {
            this.trigger = true;
            this.Sun.animSunId = window.requestAnimationFrame(this.Sun.populate.bind(this.Sun, data.todaily, data, this.place));
            this.animMoonId = window.requestAnimationFrame(this.Moon.populate.bind(this.Moon, data.moon_phase));
        } else if (this.celestialRow.getBoundingClientRect().bottom <= 0 && this.trigger) {
            window.cancelAnimationFrame(this.Sun.animSunId);
            window.cancelAnimationFrame(this.animMoonId);
            this.trigger = false;
        }
    }
}
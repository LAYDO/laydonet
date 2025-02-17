import { Sun } from './Sun';
import { Moon } from './Moon';

export class Celestial {
    protected root: HTMLElement;
    public celestialElement: HTMLElement;

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

    constructor(_root: HTMLElement) {
        this.root = _root;
        this.celestialElement = document.createElement('div');
        this.celestialElement.classList.add('elements-column');
        this.celestialElement.id = 'celestialSection';
        this.root.append(this.celestialElement);

        this.Sun = new Sun(this.celestialElement);
        this.Moon = new Moon(this.celestialElement);

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
        this.Sun.populate(data.todaily, data, this.place);
        document.addEventListener('scroll', this.celestialTriggers.bind(this, data));
        this.Sun.animSunId = window.requestAnimationFrame(this.Sun.populate.bind(this.Sun, data.todaily, data, this.place));
        this.animMoonId = window.requestAnimationFrame(this.Moon.populate.bind(this.Moon, data));
    }

    celestialTriggers(data: any) {

        if (this.celestialElement.getBoundingClientRect().bottom > 0 && !this.trigger) {
            this.trigger = true;
            this.Sun.animSunId = window.requestAnimationFrame(this.Sun.populate.bind(this.Sun, data.todaily, data, this.place));
            this.animMoonId = window.requestAnimationFrame(this.Moon.populate.bind(this.Moon, data));
        } else if (this.celestialElement.getBoundingClientRect().bottom <= 0 && this.trigger) {
            window.cancelAnimationFrame(this.Sun.animSunId);
            window.cancelAnimationFrame(this.animMoonId);
            this.trigger = false;
        }
    }
}
class Celestial {
    public celestialElement: HTMLElement;
    public celestialRow: HTMLElement;

    public Sun: any;
    public Moon: any;

    constructor() {
        this.celestialElement = document.getElementById('celestialSection')!;

        this.celestialRow = document.createElement('div');
        this.celestialRow.id = 'celestialRow';
        this.celestialRow.className = 'elements-row';

        this.celestialElement.append(this.celestialRow);

        this.Sun = new Sun();
        this.Moon = new Moon();
    }

    toggle(loaded: Boolean) {
        if (loaded) {
            this.celestialElement.style.display = 'inherit';
        } else {
            this.celestialElement.style.display = 'none';
        }
    }

    populate(data: any) {
        this.Sun.populate(data);
        this.Moon.populate(data);
    }
}
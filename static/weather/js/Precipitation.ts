class Precipitation extends ElementTile {
    constructor() {
        super('Precipitation', 'tint', 'precip', 'elementRowTwo', 'precipToday');
    }

    populate(next: number, today: number) {
        this.miniData.innerText = `1Hr: ${Math.round(next * 100)}\u0025`;
        this.subData.innerText = `24 hour chance: ${Math.round(today * 100)}\u0025`;
    }
}
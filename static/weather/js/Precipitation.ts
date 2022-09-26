class Precipitation extends ElementTile {
    constructor() {
        super('Precipitation', 'tint', ['precipData'], 'elementRowTwo', ['precipTodayData']);
    }

    populate(next: number, today: number) {
        let miniData = document.getElementById('precipData');
        if (miniData) {
            miniData.innerText = `1Hr: ${Math.round(next * 100)}\u0025`;
        }
        let subData = document.getElementById('precipTodayData');
        if (subData) {
            subData.innerText = `24 hour chance: ${Math.round(today * 100)}\u0025`;
        }
    }
}
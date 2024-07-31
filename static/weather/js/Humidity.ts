import { ElementTile } from './ElementTile';

export class Humidity extends ElementTile {
    constructor(_row: HTMLElement) {
        super('Humidity', 'water', ['humidData'], _row, ['dewData']);
        this.element.className = 'element-tile';
    }

    populate(humidity: number, dew: number) {
        let miniData = document.getElementById('humidData');
        if (miniData) {
            miniData.innerText = `${humidity}\u0025`;
        }
        
        let subData = document.getElementById('dewData');
        if (subData) {
            subData.innerText = `Dew Point: ${dew}\xB0`;
        }
    }
}
import { ElementTile } from './ElementTile';

interface HumidityData {
    humidity: number;
    dew: number;
}

export class Humidity extends ElementTile {
    constructor(_container: HTMLElement) {
        super('Humidity', _container);
    }

    update(data: HumidityData) {
        let miniData = document.getElementById('humidData');
        if (miniData) {
            miniData.innerText = `${data.humidity}\u0025`;
        }
        
        let subData = document.getElementById('dewData');
        if (subData) {
            subData.innerText = `Dew Point: ${data.dew}\xB0`;
        }
    }
}
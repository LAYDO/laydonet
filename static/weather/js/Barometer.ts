import { ElementTile } from './ElementTile';

interface BaroData {
    pressure: number;
}

export class Barometer extends ElementTile {

    private baseW: number = 0;
    private baseH: number = 0;
    private radius: number = 0;

    constructor(_container: HTMLElement) {
        super('Pressure', _container);
    }

    update(data: BaroData) {

        if (this.element) {
            this.baseW = this.element.clientWidth * 0.7;
            this.baseH = this.element.clientHeight * 0.7;
            this.radius = this.element.clientWidth / 2;
        }

        let barometer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        barometer.setAttribute('width', this.baseW.toFixed(0));
        barometer.setAttribute('height', this.baseH.toFixed(0));

        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        circle.setAttribute('stroke', 'var(--font-faded');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('fill', 'transparent');
        circle.setAttribute('d', `M ${this.baseW * 0.1} ${this.radius} C 0 0, ${this.baseW} 0, ${this.baseW * 0.9} ${this.radius}`);

        let hpa = data.pressure;
        let inhg = hpa * 0.02953;

        let pressure = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        pressure.setAttribute('x', '50%');
        pressure.setAttribute('y', '50%');
        pressure.setAttribute('text-anchor', 'middle');
        pressure.setAttribute('fill', 'var(--font-color)');
        pressure.setAttribute('font-size', '0.75rem');
        pressure.textContent = `${inhg.toFixed(2)} inHg`;

        let pascals = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        pascals.setAttribute('x', '50%');
        pascals.setAttribute('y', '60%');
        pascals.setAttribute('text-anchor', 'middle');
        pascals.setAttribute('fill', 'var(--font-color)');
        pascals.setAttribute('font-size', '0.75rem');
        pascals.textContent = `${hpa.toFixed(0)} hPa`;

        let line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        line.setAttribute('d', `M${(this.baseW / 2).toFixed(0)} ${this.baseH / 4} L${(this.baseW / 2).toFixed(0)} 20`);
        line.setAttribute('style', 'stroke:var(--font-color); stroke-width:1;');
        let rotation = 0;
        if (inhg == 0.00) {
            rotation = 0;
        } else if (inhg < 30.00) {
            rotation = (inhg - 30.00) * 4;
        }
        rotation *= 10;
        line.setAttribute('transform', `rotate(${rotation.toFixed(1)}, ${(this.baseW / 2).toFixed(0)}, ${(this.baseH / 1.75).toFixed(0)})`);



        barometer.append(circle);
        barometer.append(line);
        barometer.append(pressure);
        barometer.append(pascals);

        let miniData = document.getElementById('pressureData');
        if (miniData) {
            miniData.innerHTML = '';
            miniData.append(barometer);
        }
    }
}
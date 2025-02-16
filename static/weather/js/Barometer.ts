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
        if (!data) {
            console.error('Invalid data passed to update method');
            return;
        }
        if (this.element && this.graphicDrawGroup && this.graphicDrawing) {
            this.baseW = this.element.getBoundingClientRect().width;
            this.baseH = this.element.getBoundingClientRect().height;
            this.radius = this.baseW * 0.7;

            this.graphicDrawGroup.innerHTML = '';

            let inhg = data.pressure * 0.02953;

            let circle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            circle.setAttribute('stroke', 'var(--font-faded');
            circle.setAttribute('stroke-width', '2');
            circle.setAttribute('fill', 'transparent');
            circle.setAttribute('d', `M ${this.baseW * 0.1} ${this.radius} C 0 0, ${this.baseW} 0, ${this.baseW * 0.9} ${this.radius}`);


            let line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            line.setAttribute('d', `M${(this.baseW / 2).toFixed(0)} ${this.baseH / 4} L${(this.baseW / 2).toFixed(0)} 20`);
            line.setAttribute('style', 'stroke:var(--font-color); stroke-width:1;');
            let rotation = 0;
            if (inhg == 0.00) {
                rotation = 0;
            } else {
                rotation = (inhg - 29.92) * 4;
            }
            rotation *= 10;
            line.setAttribute('transform', `rotate(${rotation.toFixed(1)}, ${(this.baseW / 2).toFixed(0)}, ${(this.baseH / 1.75).toFixed(0)})`);

            this.graphic.setAttribute('viewBox', `0 0 ${this.baseW} ${this.baseH}`); // ADD THIS LINE
            this.graphic.setAttribute('width', '100%'); // ADD THIS LINE
            this.graphic.setAttribute('height', '100%'); // ADD THIS LINE

            this.graphicText.setAttribute('x', '50%');
            this.graphicText.setAttribute('y', '60%');
            this.graphicText.setAttribute('text-anchor', 'middle');
            this.graphicText.setAttribute('fill', 'var(--font-color)');
            this.graphicText.setAttribute('font-size', '0.9rem');
            this.graphicText.textContent = `${inhg.toFixed(2)} in`;

            this.graphicDrawGroup.append(circle);
            this.graphicDrawGroup.append(line);
        }

        if (this.subText && typeof data.pressure === 'number' && !Number.isNaN(data.pressure)) {
            this.subText.innerText = `${data.pressure.toFixed(0)} hPa`;
        }
    }
}
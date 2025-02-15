import { ElementTile } from "./ElementTile";

interface AQIData {
    category: number;
    pm25: number;
    desc: string;
}

export class AQI extends ElementTile {

    constructor(_container: HTMLElement) {
        super('AQI', _container);
    }

    update(data: AQIData) {
        if (!data) {
            console.error('Invalid data passed to update method');
            this.graphicText.textContent = '--';
            return;
        }
        if (this.element && this.graphic && this.graphicDrawGroup && this.graphicDrawing && this.graphicText) {
            let baseW = this.element.getBoundingClientRect().width;
            let baseH = this.element.getBoundingClientRect().height;
            let gW = this.graphic.getBoundingClientRect().width;
            let gH = this.graphic.getBoundingClientRect().height;

            for (let i = 0; i < data.pm25; i++) {
                let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', (Math.random() * gW).toFixed(0));
                circle.setAttribute('cy', (Math.random() * gH).toFixed(0));
                circle.setAttribute('r', '1');
                circle.setAttribute('fill', 'gray');
                this.graphicDrawGroup.append(circle);
            }
            this.graphicText.setAttribute('x', (baseW * 0.5).toFixed(0));
            this.graphicText.setAttribute('y', (baseH * 0.4).toFixed(0));
            this.graphicText.setAttribute('text-anchor', 'middle');
            this.graphicText.setAttribute('fill', this.getAQIColor(data.category));
            this.graphicText.setAttribute('font-size', '2rem');
            
            let tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.setAttribute('x', (baseW * 0.5).toFixed(0));
            tspan.setAttribute('dy', '2em');
            tspan.setAttribute('font-size', '1rem');
            tspan.textContent = data.desc;

            this.graphicText.innerHTML = '';
            this.graphicText.append(document.createTextNode(data.category.toFixed(0)));
            this.graphicText.append(tspan);
        }
        if (this.subText && typeof data.pm25 === 'number' && !Number.isNaN(data.pm25)) {
            this.subText.innerText = `PM2.5: ${data.pm25}`;
            this.subText.style.fontSize = '0.8rem';
        }
    }

    getAQIColor(aqi: number) {
        switch (aqi) {
            case 1:
                return '#00e400';
            case 2:
                return '#ffea00';
            case 3:
                return '#ff7e00';
            case 4:
                return '#ff0000';
            case 5:
                return '#99004c';
            case 6:
                return '#7e0023';
            default:
                return 'var(--font-faded)';
        }
    }
}
import { ElementTile } from './ElementTile';

interface PrecipitationData {
    rain_percent: number;
    rain_amount: number;
}

export class Precipitation extends ElementTile {
    constructor(_container: HTMLElement) {
        // Constructor for precipitation element
        super('Precipitation', _container);
    }
    /**
     * Updates the text content of the graphical and subtext elements with precipitation data.
     * @param {PrecipitationData} data - The precipitation data containing `rain_percent` and `rain_amount`.
     */
    update(data: PrecipitationData) {
        if (!data) {
            console.error('Invalid data passed to update method');
            return;
        }
        const percentage = data.rain_percent * 100;
        if (this.element && this.graphicDrawGroup && this.graphicDrawing) {
            const elementWidth = this.element.getBoundingClientRect().width;
            const elementHeight = this.element.getBoundingClientRect().height;
            this.graphicDrawGroup.innerHTML = '';
            // Draw water drop outline
            this.graphicDrawing = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            if (!this.graphicDrawing) {
                throw new Error('Failed to create SVG path element');
            }
            this.graphicDrawing.setAttribute('fill', 'none');
            this.graphicDrawing.setAttribute('stroke', 'skyblue');
            this.graphicDrawing.setAttribute('stroke-width', '3');
            this.graphicDrawing.setAttribute('d', `M${elementWidth * 0.5} ${elementHeight * 0.125}
                Q${elementWidth * 0.5} ${elementHeight * 0.21875}, ${elementWidth * 0.34375} ${elementHeight * 0.40625}
                A ${elementWidth * 0.1875} ${elementHeight * 0.25} 0 1 0 ${(elementWidth * 0.65725)} ${elementHeight * 0.40625}
                Q${elementWidth * 0.5} ${elementHeight * 0.21875}, ${elementWidth * 0.5} ${elementHeight * 0.125}`);
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', 'precipGradient');
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '100%');
            gradient.setAttribute('x2', '0%');
            gradient.setAttribute('y2', `${100 - percentage}%`);

            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '100%');
            stop1.setAttribute('stop-color', 'rgba(135, 206, 235, 0.5)');
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', 'transparent');
            gradient.append(stop1);
            gradient.append(stop2);
            this.graphicDrawGroup.append(gradient);

            const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
            clipPath.setAttribute('id', 'precipClip');
            const clipPathRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            clipPathRect.setAttribute('x', '0');
            clipPathRect.setAttribute('y', '0');
            clipPathRect.setAttribute('width', '100%');
            clipPathRect.setAttribute('height', '100%');
            clipPath.append(clipPathRect);
            this.graphicDrawGroup.append(clipPath);
            this.graphicDrawing.setAttribute('fill', 'url(#precipGradient)');
            this.graphicDrawing.setAttribute('clip-path', 'url(#precipClip)');
            this.graphicDrawGroup.append(this.graphicDrawing);
        }
        if (this.element && this.graphicText && typeof data.rain_percent === 'number' && !Number.isNaN(data.rain_percent)) {
            const elementWidth = this.element.getBoundingClientRect().width;
            this.graphicText.textContent = `${Math.round(percentage)}\u0025`;
            const textWidth = this.graphicText.getBoundingClientRect().width;
            this.graphicText.setAttribute('x', `${(elementWidth / 2) - (textWidth / 2)}`);
            this.graphicText.setAttribute('y', `${elementWidth / 2}`);
            this.graphicText.setAttribute('stroke', 'white');
        }
        if (this.subText && typeof data.rain_amount === 'number' && !Number.isNaN(data.rain_amount)) {
            this.subText.innerText = `${data.rain_amount.toFixed(2)}"`;
        }
    }
}
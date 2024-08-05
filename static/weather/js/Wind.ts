import { ElementTile } from './ElementTile';

interface WindData {
    wind_speed: number;
    wind_gust: number;
    wind_direction: number;
}

export class Wind extends ElementTile {
    // Constructor for wind element
    constructor(_row: HTMLElement) {
        super('Wind', _row);
    }
    /**
     * Updates the text content of the graphical and subtext elements with wind data.
     * @param {WindData} data - The precipitation data containing `wind_speed`, `wind_gust`, and `wind_direction`.
     */
    update(data: WindData) {
        // console.log(degree);
        if (!data) {
            console.error('Invalid data passed to update method');
            return;
        }
        if (this.element && this.graphicDrawGroup && this.graphicDrawing && this.graphicText) {
            let baseW = this.element.getBoundingClientRect().width;
            let baseH = this.element.getBoundingClientRect().height;

            this.graphicDrawGroup.innerHTML = '';
    
            let radius = (baseW * 0.25);
    
            let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', (baseW * 0.5).toFixed(0));
            circle.setAttribute('cy', (baseH * 0.4).toFixed(0));
            circle.setAttribute('r', radius.toFixed(0));
            circle.setAttribute('stroke', 'var(--font-faded)'); // #fff8ed
            circle.setAttribute('fill', 'none');
            circle.setAttribute('stroke-width', '2');
    
            for (let i = 0; i < 4; i++) {
                let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', (baseW * 0.5).toFixed(0));
                line.setAttribute('y1', `${(baseH * 0.4) - (radius)}`);
                line.setAttribute('x2', (baseW * 0.5).toFixed(0));
                line.setAttribute('y2', `${(baseH * 0.4) - (radius) - 10}`);
                line.setAttribute('style', 'stroke:var(--font-color); stroke-width:0.5;');
    
                let dirG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                dirG.setAttribute('x', (baseW * 0.5).toFixed(0));
                dirG.setAttribute('y', `${(baseH * 0.4) - (radius) - 12}`);

                let dir = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                dir.setAttribute('x', (baseW * 0.5).toFixed(0));
                dir.setAttribute('y', `${(baseH * 0.4) - (radius) - 12}`);
                dir.setAttribute('text-anchor', 'middle');
                dir.setAttribute('fill', 'var(--font-color)');
                dir.setAttribute('font-size', '0.5rem');
                switch (i) {
                    case 0:
                        dir.textContent = 'N';
                        break;
                    case 1:
                        dir.textContent = 'E';
                        break;
                    case 2:
                        dir.textContent = 'S';
                        break;
                    case 3:
                        dir.textContent = 'W';
                        break;
                }
                dirG.append(dir);
                line.setAttribute('transform', `rotate(${i * 90}, ${baseW * 0.5}, ${baseH * 0.4})`);
                dir.setAttribute('transform', `rotate(${-(i * 90)}, ${baseW * 0.5}, ${(baseH * 0.4) - (radius) - 15})`);
                dirG.setAttribute('transform', `rotate(${i * 90}, ${baseW * 0.5}, ${baseH * 0.4})`);
    
                this.graphicDrawGroup.append(line);
                this.graphicDrawGroup.append(dirG);
            }
    
            for (let y = 1; y <= 360; y++) {
                if (y === data.wind_direction) {
                    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
                    let arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                    arrow.setAttribute('style', 'stroke:var(--font-faded); stroke-width:1; fill:var(--font-color);');
                    arrow.setAttribute('points', `${baseW * 0.5},${(baseH * 0.4) - radius + 8} ${(baseW * 0.5) - 4},${(baseH * 0.4) - radius} ${(baseW * 0.5) + 4},${(baseH * 0.4) - radius}`);

                    g.append(arrow);
    
                    g.setAttribute('transform', `rotate(${y}, ${baseW * 0.5}, ${baseH * 0.4})`);
    
                    this.graphicDrawGroup.append(g);
                }
            }
    
            this.graphicText.setAttribute('x', (baseW * 0.5).toFixed(0));
            this.graphicText.setAttribute('y', (baseH * 0.4).toFixed(0));
            this.graphicText.setAttribute('text-anchor', 'middle');
            this.graphicText.setAttribute('fill', 'var(--font-color)');
            this.graphicText.setAttribute('font-size', '0.75rem');
            this.graphicText.textContent = `${data.wind_speed.toFixed(0)} MPH`;
    
            this.graphicDrawGroup.append(circle);

            if (this.subText && typeof data.wind_speed === 'number' && !Number.isNaN(data.wind_speed)) {
                this.subText.innerText = `Gusts: ${data.wind_gust.toFixed(0)} MPH`;
                this.subText.style.fontSize = '0.75rem';
            }
        }
    }
}
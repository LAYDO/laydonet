"use strict";
class Clock {
    constructor(element) {
        this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.radius = 0;
        this.baseW = element.clientWidth;
        this.clock = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.clock.setAttribute('width', this.baseW + 'px');
        this.clock.setAttribute('height', this.baseW + 'px');
        this.radius = (this.baseW / 2) * 0.8;
        this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.circle.setAttribute('cx', (this.baseW / 2).toFixed(0));
        this.circle.setAttribute('cy', (this.baseW / 2).toFixed(0));
        this.circle.setAttribute('r', this.radius.toFixed(0));
        this.circle.setAttribute('stroke', 'var(--font-color)');
        this.circle.setAttribute('fill', 'transparent');
        this.circle.setAttribute('stroke-width', '3');
        if (this.baseW > 300) {
            for (let i = 0; i < this.numbers.length; i++) {
                let hour = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                hour.setAttribute('x', '50%');
                hour.setAttribute('y', (this.baseW / 6.5).toFixed(0));
                hour.setAttribute('text-anchor', 'middle');
                hour.setAttribute('fill', 'var(--font-color)');
                hour.setAttribute('font-size', '1rem');
                hour.textContent = this.numbers[i].toFixed(0);
                hour.setAttribute('transform', `rotate(${(i + 1) * 30}, ${this.baseW / 2}, ${this.baseW / 2})`);
                this.clock.append(hour);
            }
        }
        this.clock.append(this.circle);
        element.innerHTML = '';
        element.append(this.clock);
    }
    drawHand(pos, id, width, y2) {
        let existing = document.getElementById(id);
        if (existing) {
            existing.remove();
        }
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('id', id);
        line.setAttribute('stroke-width', width);
        line.setAttribute('stroke', `${id === 'secondHand' ? 'red' : 'var(--font-color)'}`);
        line.setAttribute('x1', `${this.baseW / 2}`);
        line.setAttribute('y1', `${this.baseW / 2}`);
        line.setAttribute('x2', `${this.baseW / 2}`);
        line.setAttribute('y2', `${y2}`);
        line.setAttribute('transform', `rotate(${pos.toFixed(0)}, ${this.baseW / 2}, ${this.baseW / 2})`);
        this.clock.append(line);
    }
}

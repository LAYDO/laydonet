"use strict";
class Barometer {
    constructor(h) {
        this.pressure = h;
        this.baseW = 0;
        this.baseH = 0;
        this.radius = 0;
        this.drawBarometer();
    }
    drawBarometer() {
        let pressureElement = document.getElementById('pressure');
        if (pressureElement) {
            this.baseW = pressureElement.clientWidth * 0.7;
            this.baseH = pressureElement.clientHeight * 0.7;
            this.radius = pressureElement.clientWidth / 2;
        }
        let barometer = document.createElementNS(svgns, 'svg');
        barometer.setAttribute('width', this.baseW.toFixed(0));
        barometer.setAttribute('height', this.baseH.toFixed(0));
        let circle = document.createElementNS(svgns, 'path');
        circle.setAttribute('stroke', 'var(--font-faded');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('fill', 'transparent');
        circle.setAttribute('d', `M ${this.baseW * 0.1} ${this.radius} C 0 0, ${this.baseW} 0, ${this.baseW * 0.9} ${this.radius}`);
        // currentPressure.innerText = `${Math.round(data.pressure)} hPa`;
        // currentInhg.innerText = `${(data.pressure * 0.02953).toFixed(2)} inHg`;
        let hpa = this.pressure;
        let inhg = hpa * 0.02953;
        let pressure = document.createElementNS(svgns, 'text');
        pressure.setAttribute('x', '50%');
        pressure.setAttribute('y', '50%');
        pressure.setAttribute('text-anchor', 'middle');
        pressure.setAttribute('fill', 'var(--font-color)');
        pressure.setAttribute('font-size', '0.75rem');
        pressure.textContent = `${inhg.toFixed(2)} inHg`;
        let line = document.createElementNS(svgns, 'line');
        line.setAttribute('x1', (this.baseW / 2).toFixed(0));
        line.setAttribute('y1', '25%');
        line.setAttribute('x2', (this.baseW / 2).toFixed(0));
        line.setAttribute('y2', '20');
        line.setAttribute('style', 'stroke:var(--font-color); stroke-width:1;');
        let rotation = (inhg - 29.00) * 2;
        if (rotation > 1.05) {
            rotation = rotation - 1.05;
        }
        else if (rotation < 1.05) {
            rotation = (1.05 - rotation);
            rotation = -rotation;
        }
        else {
            rotation = 0;
        }
        rotation *= 100;
        line.setAttribute('transform', `rotate(${rotation.toFixed(0)}, ${this.baseW / 2}, ${this.baseH / 2});`);
        barometer.append(circle);
        barometer.append(line);
        barometer.append(pressure);
        if (currentPressure) {
            currentPressure.innerHTML = '';
            currentPressure.append(barometer);
        }
    }
}

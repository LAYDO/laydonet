"use strict";
class Barometer {
    constructor(h) {
        this.pressure = h;
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
        barometer.append(circle);
        barometer.append(pressure);
        if (currentPressure) {
            currentPressure.append(barometer);
        }
    }
}

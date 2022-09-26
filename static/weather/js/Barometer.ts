class Barometer extends ElementTile {

    private baseW: number = 0;
    private baseH: number = 0;
    private radius: number = 0;

    constructor() {
        super('Pressure', 'weight', 'pressure', 'elementRowThree');
    }

    drawBarometer(p: number) {

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

        // currentPressure.innerText = `${Math.round(data.pressure)} hPa`;
        // currentInhg.innerText = `${(data.pressure * 0.02953).toFixed(2)} inHg`;
        let hpa = p;
        let inhg = hpa * 0.02953;
        let pressure = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        pressure.setAttribute('x', '50%');
        pressure.setAttribute('y', '50%');
        pressure.setAttribute('text-anchor', 'middle');
        pressure.setAttribute('fill', 'var(--font-color)');
        pressure.setAttribute('font-size', '0.75rem');
        pressure.textContent = `${inhg.toFixed(2)} inHg`;

        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', (this.baseW / 2).toFixed(0));
        line.setAttribute('y1', '25%');
        line.setAttribute('x2', (this.baseW / 2).toFixed(0));
        line.setAttribute('y2', '20');
        line.setAttribute('style', 'stroke:var(--font-color); stroke-width:1;');
        let rotation = (inhg - 29.00) * 2;
        if (rotation > 1.05) {
            rotation = rotation - 1.05;
        } else if (rotation < 1.05) {
            rotation = (1.05 - rotation);
            rotation = -rotation;
        } else {
            rotation = 0;
        }
        rotation *= 100;
        line.setAttribute('transform', `rotate(${rotation.toFixed(0)}, ${this.baseW / 2}, ${this.baseH / 2});`);



        barometer.append(circle);
        barometer.append(line);
        barometer.append(pressure);

        if (this.miniData) {
            this.miniData.innerHTML = '';
            this.miniData.append(barometer);
        }
    }
}
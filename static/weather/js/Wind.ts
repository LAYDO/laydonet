import { ElementTile } from './ElementTile';

export class Wind extends ElementTile {
    constructor() {
        super('Wind', 'wind', ['windData'], 'elementRowTwo', ['gustData']);
    }

    generateWindDial(velocity: number, gust: number, degree: number) {
        // console.log(degree);

        let baseW = this.element.clientWidth * 0.7;
        let baseH = this.element.clientHeight * 0.7;

        let dial = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        dial.setAttribute('width', baseW.toFixed());
        dial.setAttribute('height', baseH.toFixed(0));

        let radius = (this.element.clientWidth * 0.5) / 2;

        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', (baseW / 2).toFixed(0));
        circle.setAttribute('cy', (baseH / 2).toFixed(0));
        circle.setAttribute('r', radius.toFixed(0));
        circle.setAttribute('stroke', 'var(--font-faded)'); // #fff8ed
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke-width', '2');

        for (let i = 0; i < 4; i++) {
            let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', (baseW / 2).toFixed(0));
            line.setAttribute('y1', '10');
            line.setAttribute('x2', (baseW / 2).toFixed(0));
            line.setAttribute('y2', '20');
            line.setAttribute('style', 'stroke:var(--font-color); stroke-width:0.5;');


            let dir = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            dir.setAttribute('x', '50%');
            dir.setAttribute('y', '8');
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
            line.setAttribute('transform', `rotate(${i * 90}, ${baseW / 2}, ${baseW / 2})`);
            dir.setAttribute('transform', `rotate(${i * 90}, ${baseW / 2}, ${baseW / 2})`);

            dial.append(line);
            dial.append(dir);
        }

        for (let y = 1; y <= 360; y++) {
            if (y == degree) {
                let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                let arrowLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                arrowLine.setAttribute('x1', (baseW / 2).toFixed(0));
                arrowLine.setAttribute('y1', (radius / 2).toFixed(0));
                arrowLine.setAttribute('x2', (baseW / 2).toFixed(0));
                arrowLine.setAttribute('y2', radius.toFixed(0));
                arrowLine.setAttribute('style', 'stroke:var(--font-faded); stroke-width:2;');

                let arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                arrow.setAttribute('style', 'stroke:var(--font-faded); stroke-width:1; fill:var(--font-color);');
                arrow.setAttribute('points', `${baseW / 2},16 ${(baseW / 2) - 4},20 ${(baseW / 2) + 4},20`);

                let arrowButt = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                arrowButt.setAttribute('x1', (baseW / 2).toFixed(0));
                arrowButt.setAttribute('y1', (2.25 * radius).toFixed(0));
                arrowButt.setAttribute('x2', (baseW / 2).toFixed(0));
                arrowButt.setAttribute('y2', radius.toFixed(0));
                arrowButt.setAttribute('style', 'stroke:var(--font-faded); stroke-width:2;');

                let butt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                butt.setAttribute('cx', (baseW / 2).toFixed(0));
                butt.setAttribute('cy', (2.3 * radius).toFixed(0));
                butt.setAttribute('r', (0.05 * radius).toFixed(0));
                butt.setAttribute('stroke', 'var(--font-faded)'); // #fff8ed
                butt.setAttribute('fill', 'none');
                butt.setAttribute('stroke-width', '2');

                g.append(arrowLine);
                g.append(arrow);
                g.append(arrowButt);
                g.append(butt);

                g.setAttribute('transform', `rotate(${y}, ${baseW / 2}, ${baseW / 2})`);

                dial.append(g);
            }
        }

        let vel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        vel.setAttribute('x', '50%');
        vel.setAttribute('y', '50%');
        vel.setAttribute('text-anchor', 'middle');
        vel.setAttribute('fill', 'var(--font-color)');
        vel.setAttribute('font-size', '1rem');
        vel.textContent = `${velocity.toFixed(0)} MPH`;

        let gusts = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        gusts.setAttribute('x', '50%');
        gusts.setAttribute('y', '60%');
        gusts.setAttribute('text-anchor', 'middle');
        gusts.setAttribute('fill', 'var(--font-color)');
        gusts.setAttribute('font-size', '0.5rem');
        gusts.textContent = `Gusts: ${gust.toFixed(0)} MPH`;

        dial.append(circle);
        dial.append(vel);
        dial.append(gusts);

        let miniData = document.getElementById('windData');
        if (miniData) {
            miniData.innerHTML = '';
            miniData.append(dial);
        }
    }
}
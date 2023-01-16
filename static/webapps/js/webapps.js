init()

function init() {
    let element = document.getElementById('schedule');
    let ft = document.getElementById('fifteentoes');
    drawLogo(ft);
    this.clock = new Clock(element);
    setInterval(this.updateTime.bind(this));
}

function updateTime() {

    this.time = new Date();
    let hour = this.time.getHours();
    let minute = this.time.getMinutes();
    let second = this.time.getSeconds();

    hour = hour % 12;
    hour = (hour * 30) + (minute / 2) + (second / 10);
    this.clock.drawHand(hour, 'hourHand', '4', this.clock.baseW / 4);

    minute = (minute * 6) + (second / 10);
    this.clock.drawHand(minute, 'minuteHand', '3', this.clock.baseW / 6);

    second = (second * 6);
    this.clock.drawHand(second, 'secondHand', '2', this.clock.baseW / 9);
}



function drawLogo(_element) {
    let width = _element.clientWidth;
    let sWidth = width / 3;
    let start = sWidth / 7;

    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width + 'px');
    svg.setAttribute('height', width + 'px');

    for (let i = 0; i < 3; i++) {
        let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        for (let j = 0; j < 5; j++) {
            let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('stroke', 'var(--font-color)');
            line.setAttribute('stroke-width', '2.5');
            if (j != 4) {
                line.setAttribute('x1', ((j * (sWidth / 4)) + start).toFixed(0));
                line.setAttribute('x2', ((j * (sWidth / 4)) + start).toFixed(0));
                line.setAttribute('y1', '3');
                line.setAttribute('y2', `${sWidth - 3}`);
            } else {
                line.setAttribute('x1', (((j - 1) * (sWidth / 4)) + start).toFixed(0));
                line.setAttribute('x2', (start).toFixed(0));
                line.setAttribute('y1', '3');
                line.setAttribute('y2', `${sWidth - 3}`);

            }
            g.append(line);
        }
        if (i == 1) {
            g.setAttribute('transform', `translate(0,${sWidth})`);
        }
        svg.append(g);
        start += sWidth;
    }
    _element.append(svg);
}
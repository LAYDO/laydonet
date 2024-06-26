export class Clock {
    public clock: any;
    private numbers: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    private radius: number = 0;
    public circle: any;
    public baseW: number;
    private element: HTMLElement;

    constructor(element: HTMLElement) {
        // setInterval(this.updateTime.bind(this), 1000);
        this.element = element;
        this.baseW = this.element.clientWidth;

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

        this.element.innerHTML = '';
        this.element.append(this.clock);
        let hour = 6;
        let minute = 13;
        let second = 0;
        hour = (hour % 12) * 30 + (minute * 0.5) + (second * (0.5 / 60));
        minute = (minute * 6) + (second / 10);
        second = (second * 6);
        this.drawHand(hour, 'hourHand', '4', this.baseW / 4);
        this.drawHand(minute, 'minuteHand', '3', this.baseW / 6);
        this.drawHand(second, 'secondHand', '2', this.baseW / 9);
    }

    public updateTime(time: Date) {
        // time = new Date();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds();

        hour = hour % 12;
        hour = (hour * 30) + (minute * 0.5) + (second * (0.5 / 60));
        this.drawHand(hour, 'hourHand', '4', this.baseW / 4);

        minute = (minute * 6) + (second / 10);
        this.drawHand(minute, 'minuteHand', '3', this.baseW / 6);

        second = (second * 6);
        this.drawHand(second, 'secondHand', '2', this.baseW / 9);

    }

    drawHand(pos: number, id: string, width: string, y2: number) {
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
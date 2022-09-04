class Clock {
    public clock: any;
    private numbers: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    private radius: number = 0;
    public circle: any;

    constructor(element: HTMLElement) {

        let baseW = element.clientWidth * 0.9;
        let baseH = element.clientHeight * 0.9;

        this.clock = document.createElementNS(Utils.svgns, 'svg');
        this.clock.setAttribute('width', baseW + 'px');
        this.clock.setAttribute('height', baseW + 'px');

        this.radius = (baseW / 2) * 0.9;

        this.circle = document.createElementNS(Utils.svgns, 'circle');
        this.circle.setAttribute('cx', (baseW / 2).toFixed(0));
        this.circle.setAttribute('cy', (baseW / 2).toFixed(0));
        this.circle.setAttribute('r', this.radius.toFixed(0));
        this.circle.setAttribute('stroke', 'var(--font-color)');
        this.circle.setAttribute('fill', 'transparent');
        this.circle.setAttribute('stroke-width', '3');

        // let circle1 = document.createElementNS(Utils.svgns, 'circle');
        // circle1.setAttribute('cx', '100');
        // circle1.setAttribute('cy', '100');
        // circle1.setAttribute('r', '50');
        // circle1.setAttribute('stroke', 'var(--font-color)');
        // circle1.setAttribute('fill', 'transparent');
        // circle1.setAttribute('stroke-width', '3');

        this.clock.append(this.circle);

        element.innerHTML = '';
        element.append(this.clock);
    }
}
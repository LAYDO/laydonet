export class EventPredictor {
    container: HTMLElement;
    predictorElement: SVGSVGElement;
    awayPercentElement: SVGTextElement;
    awayLogoElement: SVGImageElement;
    homePercentElement: SVGTextElement;
    homeLogoElement: SVGImageElement;
    graphicElement: SVGCircleElement;

    constructor(container: HTMLElement) {
        this.container = container;

        // Create SVG element with namespace
        this.predictorElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.predictorElement.classList.add('event-predictor-container');
        this.predictorElement.setAttribute('width', '50%');
        this.predictorElement.setAttribute('height', '100%');
        this.predictorElement.setAttribute('viewBox', '0 0 100 100');

        // Create SVG child elements
        this.graphicElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.awayPercentElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        this.homePercentElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        this.awayLogoElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        this.homeLogoElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');

        // Append elements
        this.predictorElement.appendChild(this.graphicElement);
        this.predictorElement.appendChild(this.awayPercentElement);
        this.predictorElement.appendChild(this.homePercentElement);
        this.predictorElement.appendChild(this.awayLogoElement);
        this.predictorElement.appendChild(this.homeLogoElement);

        this.container.appendChild(this.predictorElement);
    }

    populatePredictor(data: any) {
        let away = data.nextEvent.away;
        let home = data.nextEvent.home;
        this.awayLogoElement.setAttribute('href', away.team.logos[0].href);
        this.awayLogoElement.setAttribute('x', '0');
        this.awayLogoElement.setAttribute('y', '0');
        this.awayLogoElement.setAttribute('width', '25');
        this.awayLogoElement.setAttribute('height', '25');

        this.homeLogoElement.setAttribute('href', home.team.logos[0].href);
        this.homeLogoElement.setAttribute('x', '75');
        this.homeLogoElement.setAttribute('y', '0');
        this.homeLogoElement.setAttribute('width', '25');
        this.homeLogoElement.setAttribute('height', '25');
    }
}
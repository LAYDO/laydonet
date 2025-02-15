export class EventPredictor {
    container: HTMLElement;
    predictorContainer: HTMLElement;
    predictorTitle: HTMLElement;
    predictorElement: SVGSVGElement;
    awayPercentElement: SVGTextElement;
    awayLogoElement: SVGImageElement;
    dividerElement: SVGLineElement;
    homePercentElement: SVGTextElement;
    homeLogoElement: SVGImageElement;
    graphicAwayElement: SVGCircleElement;
    graphicHomeElement: SVGCircleElement;

    constructor(container: HTMLElement) {
        this.container = container;

        this.predictorContainer = document.createElement('div');
        this.predictorContainer.classList.add('laydo-flex-col');
        this.container.appendChild(this.predictorContainer);

        this.predictorTitle = document.createElement('div');
        this.predictorTitle.classList.add('event-predictor-title');
        this.predictorContainer.appendChild(this.predictorTitle);

        // Create SVG element with namespace
        this.predictorElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.predictorElement.classList.add('event-predictor-container');
        this.predictorElement.setAttribute('width', '50%');
        this.predictorElement.setAttribute('height', '100%');
        this.predictorElement.setAttribute('viewBox', '0 0 100 100');

        // Create SVG child elements
        this.graphicAwayElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.graphicHomeElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.awayPercentElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        this.homePercentElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        this.awayLogoElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        this.homeLogoElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        this.dividerElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.dividerElement.setAttribute('x1', '50');
        this.dividerElement.setAttribute('y1', '20');
        this.dividerElement.setAttribute('x2', '50');
        this.dividerElement.setAttribute('y2', '80');
        this.dividerElement.setAttribute('stroke', 'var(--font-faded)');
        this.dividerElement.setAttribute('stroke-width', '0.5');

        // Append elements
        this.predictorElement.appendChild(this.graphicAwayElement);
        this.predictorElement.appendChild(this.graphicHomeElement);
        this.predictorElement.appendChild(this.awayPercentElement);
        this.predictorElement.appendChild(this.homePercentElement);
        this.predictorElement.appendChild(this.awayLogoElement);
        this.predictorElement.appendChild(this.homeLogoElement);

        this.predictorContainer.appendChild(this.predictorElement);
    }

    populatePredictor(data: any) {
        let away = data.nextEvent.away;
        let home = data.nextEvent.home;
        let predictor = data.predictor;
        this.predictorTitle.innerText = predictor.header;
        this.awayLogoElement.setAttribute('href', away.team.logos[0].href);
        this.awayLogoElement.setAttribute('x', '20');
        this.awayLogoElement.setAttribute('y', '40');
        this.awayLogoElement.setAttribute('width', '20');
        this.awayLogoElement.setAttribute('height', '20');

        this.homeLogoElement.setAttribute('href', home.team.logos[0].href);
        this.homeLogoElement.setAttribute('x', '60');
        this.homeLogoElement.setAttribute('y', '40');
        this.homeLogoElement.setAttribute('width', '20');
        this.homeLogoElement.setAttribute('height', '20');

        this.awayPercentElement.setAttribute('x', '1');
        this.awayPercentElement.setAttribute('y', '10');
        this.awayPercentElement.setAttribute('font-size', '11');
        this.awayPercentElement.setAttribute('fill', 'var(--font-color)');
        this.awayPercentElement.textContent = `${predictor.awayTeam.gameProjection}%`;

        this.homePercentElement.setAttribute('x', '65');
        this.homePercentElement.setAttribute('y', '98');
        this.homePercentElement.setAttribute('font-size', '11');
        this.homePercentElement.setAttribute('fill', 'var(--font-color)');
        this.homePercentElement.textContent = `${predictor.homeTeam.gameProjection}%`;

        const circumference = 2 * Math.PI * 40;
        this.graphicAwayElement.setAttribute('cx', '50');
        this.graphicAwayElement.setAttribute('cy', '50');
        this.graphicAwayElement.setAttribute('r', '40');
        this.graphicAwayElement.setAttribute('fill', 'none');
        this.graphicAwayElement.setAttribute('stroke', `#${away.team.color}`);
        this.graphicAwayElement.setAttribute('stroke-width', '4');
        this.graphicAwayElement.setAttribute('stroke-dasharray', circumference.toString());
        this.graphicAwayElement.setAttribute('stroke-dashoffset', '0');
        this.graphicAwayElement.setAttribute('transform', 'rotate(-90 50 50)');

        this.graphicHomeElement.setAttribute('cx', '50');
        this.graphicHomeElement.setAttribute('cy', '50');
        this.graphicHomeElement.setAttribute('r', '40');
        this.graphicHomeElement.setAttribute('fill', 'none');
        this.graphicHomeElement.setAttribute('stroke', `#${home.team.color}`);
        this.graphicHomeElement.setAttribute('stroke-width', '4');
        this.graphicHomeElement.setAttribute('stroke-dasharray', circumference.toString());
        this.graphicHomeElement.setAttribute('stroke-dashoffset', '0');
        this.graphicHomeElement.setAttribute('transform', 'rotate(-90 50 50)');

        this.updateProgressBar(predictor.homeTeam.gameProjection, predictor.awayTeam.gameProjection);

        this.predictorElement.appendChild(this.dividerElement);
    }

    updateProgressBar(homePercentage: number, awayPercentage: number) {
        // Validate percentages
        if (homePercentage < 0 || homePercentage > 100 || awayPercentage < 0 || awayPercentage > 100) {
            return;
        }
        const circumference = 2 * Math.PI * 40;
        // Calculate precise offsets
        const homeOffset = circumference * (1 - homePercentage / 100);
        const awayOffset = (circumference * (1 + awayPercentage / 100));
        // Set offsets
        this.graphicHomeElement.setAttribute('stroke-dashoffset', (homeOffset).toString());
        this.graphicAwayElement.setAttribute('stroke-dashoffset', (awayOffset).toString());
    }
}
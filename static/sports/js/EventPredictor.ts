export class EventPredictor {
    container: HTMLElement;
    predictorElement: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;

        this.predictorElement = document.createElement('div');
        this.predictorElement.classList.add('event-predictor-container');
        this.predictorElement.innerHTML = `Predictor`;
        this.container.appendChild(this.predictorElement);

    }

    populatePredictor(data: any) {
    }
}
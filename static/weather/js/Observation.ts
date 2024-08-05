import { ElementTile } from "./ElementTile";

interface ObservationData {
    desc: string;
    icon: string;
}

export class Observation extends ElementTile {
    constructor(_container: HTMLElement) {
        super('Observation', _container);
    }

    update(data: ObservationData) {
        if (!data) {
            console.error('Invalid data passed to update method');
            return;
        }
        if (this.element && this.graphicDrawGroup && this.graphicDrawing) {
            this.graphicDrawGroup.innerHTML = '';

            // this.graphicDrawing = document.createElementNS('http://www.w3.org/2000/svg', 'image');

        }
        if (this.subText) {
            let icon = document.createElement('span');
            icon.id = 'currentIcon';
            icon.className = data.icon;
            icon.classList.add('current-icon');

            let description = document.createElement('div');
            description.id = 'currentDesc';
            description.classList.add('mini-title');
            description.innerText = data.desc;

            this.subText.append(icon);
            this.subText.append(description);
        }
    }
}
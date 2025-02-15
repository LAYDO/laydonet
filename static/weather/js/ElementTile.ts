export abstract class ElementTile {
    public container: HTMLElement;
    public element: HTMLElement;
    protected graphic: SVGElement;
    protected graphicDrawGroup: SVGElement;
    protected graphicDrawing: SVGElement;
    protected graphicText: SVGElement;
    protected subText: HTMLElement;

    constructor(element: string, container: HTMLElement) {
        
        if (element && container) {
            this.container = container;

            const lowerElement = element.toLowerCase();
            this.element = document.createElement('div');
            this.element.id = `${lowerElement}Element`;
            this.element.className = 'element-tile';
    
            this.graphic = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.graphic.id = `${lowerElement}Graphic`;
    
            this.graphicDrawGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            this.graphicDrawGroup.id = `${lowerElement}DrawGroup`;
    
            this.graphicDrawing = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this.graphicDrawing.id = `${lowerElement}Drawing`;
    
            this.graphicDrawGroup.append(this.graphicDrawing);
    
            this.graphicText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            this.graphicText.id = `${lowerElement}MainText`;
    
            this.graphic.append(this.graphicDrawGroup);
            this.graphic.append(this.graphicText);
    
            this.subText = document.createElement('div');
            this.subText.classList.add('element-sub-text');
            this.subText.id = `${lowerElement}SubText`;
    
            this.element.append(this.graphic);
            this.element.append(this.subText);
    
            this.container.append(this.element);
        } else {
            throw new Error('Element and contianer parameters are required and cannot be null or undefined.');
        }
    }

    toggle(loaded: boolean) {
        if (loaded) {
            this.element.style.display = 'flex';
        } else {
            this.element.style.display = 'none';
        }
    }

    public abstract update(data: any): void;
}
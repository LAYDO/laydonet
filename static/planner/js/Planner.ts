// Original Author: Laydo
class Planner {
    private container: HTMLElement;
    public property: SVGElement;
    public house: SVGElement;

    private static propertyWidth = 40;
    private static propertyHeight = 130;

    private static houseWidth = 27;
    private static houseHeight = 55;

    constructor(container: HTMLElement) {
        this.container = container;
        this.property = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.property.id = 'property';
        this.property.setAttributeNS(null, 'height', Planner.propertyHeight + 'rem');
        this.property.setAttributeNS(null, 'width', Planner.propertyWidth + 'rem');
        this.property.style.backgroundColor = 'green';

        // Calculate the initial left and top positions based on the parent's bounds and the given rem values
        // const parentBounds = this.property.getBoundingClientRect();
        // const leftPosition = parseFloat(getComputedStyle(document.documentElement).fontSize) * 6.5;
        const topPosition = parseFloat(getComputedStyle(document.documentElement).fontSize) * 16;

        this.house = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.house.id = 'house';
        this.house.classList.add('draggable');
        this.house.setAttributeNS(null, 'height', Planner.houseHeight + 'rem');
        this.house.setAttributeNS(null, 'width', Planner.houseWidth + 'rem');
        this.house.setAttributeNS(null, 'fill', 'gray');
        const centerX = (Planner.propertyWidth - Planner.houseWidth) / 2;
        // const centerY = (Planner.propertyHeight - Planner.houseHeight) / 2;
        this.house.setAttributeNS(null, 'x', centerX.toString());
        this.house.setAttributeNS(null, 'y', topPosition.toString());
        // this.house.style.top = (parentBounds.top + topPosition) + 'px';
        // this.house.style.left = (parentBounds.left + leftPosition) + 'px';
        
        let reference = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        reference.id = 'reference';
        reference.classList.add('draggable');
        reference.setAttributeNS(null, 'height', '1rem');
        reference.setAttributeNS(null, 'width', '1rem');
        reference.setAttributeNS(null, 'fill', 'black');
        // reference.style.height = '1rem';
        // reference.style.width = '1rem';
        // reference.style.backgroundColor = 'black';
        
        this.property.appendChild(this.house);
        this.property.appendChild(reference);

        this.container.appendChild(this.property);
        
    }
}
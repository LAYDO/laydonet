"use strict";
// Original Author: Laydo
class Planner {
    constructor(property) {
        this.property = property;
        this.property.style.height = '130rem';
        this.property.style.width = '40rem';
        this.property.style.backgroundColor = 'green';
        this.house = document.createElement('div');
        this.house.id = 'house';
        this.house.classList.add('draggable');
        this.house.style.height = '55rem';
        this.house.style.width = '27rem';
        this.house.style.backgroundColor = 'grey';
        let reference = document.createElement('div');
        reference.id = 'reference';
        reference.classList.add('draggable');
        reference.style.height = '1rem';
        reference.style.width = '1rem';
        reference.style.backgroundColor = 'black';
        this.property.appendChild(this.house);
        this.property.appendChild(reference);
    }
}

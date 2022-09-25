"use strict";
class Elements {
    constructor() {
        this.eTilesElement = document.getElementById('elementTiles');
        this.elementRowOne = document.createElement('div');
        this.elementRowOne.id = 'elementRowOne';
        this.elementRowOne.className = 'elements-row';
        this.elementRowTwo = document.createElement('div');
        this.elementRowTwo.id = 'elementRowTwo';
        this.elementRowTwo.className = 'elements-row';
        this.elementRowThree = document.createElement('div');
        this.elementRowThree.id = 'elementRowThree';
        this.elementRowThree.className = 'elements-row';
        this.eTilesElement.append(this.elementRowOne);
        this.eTilesElement.append(this.elementRowTwo);
        this.eTilesElement.append(this.elementRowThree);
    }
    toggle(loaded) {
        if (loaded) {
            this.eTilesElement.style.display = 'inherit';
        }
        else {
            this.eTilesElement.style.display = 'none';
        }
    }
}

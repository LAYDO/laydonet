"use strict";
class Humidity extends ElementTile {
    constructor() {
        super('Humidity', 'water', 'humid', 'elementRowThree', 'dew');
    }
    populate(humidity, dew) {
        this.miniData.innerText = `${humidity}\u0025`;
        this.subData.innerText = `Dew Point: ${dew}\xB0`;
    }
}

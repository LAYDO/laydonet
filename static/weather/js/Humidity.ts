class Humidity extends ElementTile {
    constructor() {
        super('Humidity', 'water', ['humidData'], 'elementRowThree', ['dewData']);
    }

    populate(humidity: number, dew: number) {
        let miniData = document.getElementById('humidData');
        if (miniData) {
            miniData.innerText = `${humidity}\u0025`;
        }
        
        let subData = document.getElementById('dewData');
        if (subData) {
            subData.innerText = `Dew Point: ${dew}\xB0`;
        }
    }
}
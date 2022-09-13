class Utils {
    static svgns: "http://www.w3.org/2000/svg";

    constructor() {
    }

    windDirection(deg: number) {
        let dir = '';
        if (deg >= 0 && deg <= 10) {
            dir = 'N';
        } else if (deg >= 11 && deg <= 79) {
            dir = 'NE';
        } else if (deg >= 80 && deg <= 100) {
            dir = 'E';
        } else if (deg >= 101 && deg <= 169) {
            dir = 'SE';
        } else if (deg >= 170 && deg <= 190) {
            dir = 'S';
        } else if (deg >= 191 && deg <= 259) {
            dir = 'SW';
        } else if (deg >= 260 && deg <= 280) {
            dir = 'W';
        } else if (deg >= 281 && deg <= 349) {
            dir = 'NW';
        } else if (deg >= 350) {
            dir = 'N';
        } else {
            dir = 'No Wind';
        }
        return dir;
    }
}
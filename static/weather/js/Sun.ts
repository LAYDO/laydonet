import { CelestialTile } from "./CelestialTile";

export class Sun extends CelestialTile {
    private riseUnix: number;
    private setUnix: number;
    private colorSunrise: string = '#FFE600';
    private colorSunset: string = '#FF8700';
    private remainInterval: any;
    public animSunId: number;
    private radius: number;
    // private sunGraphic: HTMLElement;
    private sunSVG: SVGElement;

    constructor(_row: HTMLElement) {
        super(_row, 'Sun');
        this.riseUnix = 0;
        this.setUnix = 0;
        this.remainInterval = 0;
        this.animSunId = 0;
        this.radius = 0;
        this.sunSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.sunSVG.id = 'sunSVG';
    }

    populate(todaily: any, data: any, place: number) {
        clearInterval(this.remainInterval);
        this.remainInterval = setInterval(this.sunRemaining.bind(this, data));
        this.riseUnix = todaily.sunrise;
        this.setUnix = todaily.sunset;

        let diff = this.setUnix - this.riseUnix;
        diff = Math.floor(diff / 60);
        let mins = (diff % 60).toFixed(0);
        mins = ('0' + mins).slice(-2);
        diff = Math.floor(diff / 60);
        let hours = (diff % 24).toFixed(0);
        hours = ('0' + hours).slice(-2);

        let daylightText = `Daylight:\n${hours}hrs ${mins}mins`;
        this.eventInfo.innerText = daylightText;

        let sunrise = this.convertToAdjustedRadians(this.riseUnix);
        let sunset = this.convertToAdjustedRadians(this.setUnix);

        this.bW = this.baseW * 0.9;
        this.radius = this.bW / 2;

        // this.minis[1].innerHTML = '';
        this.sunSVG.innerHTML = '';

        // Black background
        let background = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        background.setAttribute('cx', (this.bW / 2).toFixed(0));
        background.setAttribute('cy', (this.bW / 2).toFixed(0));
        background.setAttribute('r', this.radius.toFixed(0));
        background.setAttribute('stroke', 'none');
        background.setAttribute('fill', 'black');

        // Daylight area
        let daylightFill = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        daylightFill.setAttribute('cx', (this.bW / 2).toFixed(0));
        daylightFill.setAttribute('cy', (this.bW / 2).toFixed(0));
        daylightFill.setAttribute('r', (this.radius * 0.8).toFixed(0));
        daylightFill.setAttribute('stroke', 'none');
        daylightFill.setAttribute('fill', 'rgb(245, 238, 139)');

        // Night time area, using 0.81 on radius to get rid of slight yellow outline
        let darkness = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        darkness.setAttribute('d', `
            M ${((this.bW / 2) + ((this.radius * 0.8) * Math.cos(sunset))).toFixed(0)},${((this.bW / 2) + ((this.radius * 0.8) * Math.sin(sunset))).toFixed(0)}
            A ${(this.radius * 0.8).toFixed(0)} ${(this.radius * 0.8).toFixed(0)} 0 1 1 ${((this.bW / 2) + ((this.radius * 0.8) * Math.cos(sunrise))).toFixed(0)},${((this.bW / 2) + ((this.radius * 0.8) * Math.sin(sunrise))).toFixed(0)}
            L ${(this.bW / 2).toFixed(0)} ${(this.bW / 2).toFixed(0)} Z
        `);
        darkness.setAttribute('fill', 'rgb(0, 0, 133)');
        darkness.setAttribute('stroke', 'none');
        darkness.setAttribute('id', 'darkness');
        // console.log('DARKNESS D: ', darkness.getAttribute('d'));
        // "M" for midnight
        let midnight = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        midnight.setAttribute('x', (this.bW / 2).toFixed(0));
        midnight.setAttribute('y', (this.radius * 0.15).toFixed(0));
        midnight.setAttribute('text-anchor', 'middle');
        midnight.setAttribute('fill', 'var(--font-faded)');
        midnight.setAttribute('font-size', '0.75rem');
        midnight.textContent = 'M';

        // "N" for noon
        let noon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        noon.setAttribute('x', (this.bW / 2).toFixed(0));
        noon.setAttribute('y', (this.radius * 1.95).toFixed(0));
        noon.setAttribute('text-anchor', 'middle');
        noon.setAttribute('fill', 'var(--font-faded)');
        noon.setAttribute('font-size', '0.75rem');
        noon.textContent = 'N';

        // // Daylight Text
        // let dayText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        // dayText.setAttribute('x', (this.bW / 2).toFixed(0));
        // dayText.setAttribute('y', (this.radius * 1.3).toFixed(0));
        // dayText.setAttribute('text-anchor', 'middle');
        // dayText.setAttribute('fill', 'rgb(0, 0, 133)');
        // dayText.setAttribute('font-size', '0.75rem');
        // dayText.textContent = 'Daylight';

        // // Daylight Hours
        // let dayHours = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        // dayHours.setAttribute('x', (this.bW / 2).toFixed(0));
        // dayHours.setAttribute('y', (this.radius * 1.5).toFixed(0));
        // dayHours.setAttribute('text-anchor', 'middle');
        // dayHours.setAttribute('fill', 'rgb(0, 0, 133)');
        // dayHours.setAttribute('font-size', '0.75rem');
        // dayHours.textContent = daylightText;

        // Mini Sunrise
        let miniRise = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        miniRise.setAttribute('cx', ((this.bW / 2) + ((this.radius * 0.81) * Math.cos(sunrise))).toFixed(0));
        miniRise.setAttribute('cy', ((this.bW / 2) + ((this.radius * 0.81) * Math.sin(sunrise))).toFixed(0));
        miniRise.setAttribute('r', ((this.radius * 0.8) * 0.1).toFixed(0));
        miniRise.setAttribute('stroke', 'none');
        miniRise.setAttribute('fill', this.colorSunrise);

        // Mini Sunset
        let miniSet = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        miniSet.setAttribute('cx', ((this.bW / 2) + ((this.radius * 0.81) * Math.cos(sunset))).toFixed(0));
        miniSet.setAttribute('cy', ((this.bW / 2) + ((this.radius * 0.81) * Math.sin(sunset))).toFixed(0));
        miniSet.setAttribute('r', ((this.radius * 0.8) * 0.1).toFixed(0));
        miniSet.setAttribute('stroke', 'none');
        miniSet.setAttribute('fill', this.colorSunset);
        // console.log(`SUNSET D: `, miniSet.getAttribute('d'));

        this.sunSVG.append(background);
        this.sunSVG.append(daylightFill);
        this.sunSVG.append(darkness);
        this.sunSVG.append(miniRise);
        this.sunSVG.append(miniSet);
        this.sunSVG.append(midnight);
        this.sunSVG.append(noon);
        // this.sunSVG.append(dayText);
        // this.sunSVG.append(dayHours);
        this.sunSVG.setAttribute('viewBox', `0 0 ${this.baseW} ${this.baseW}`); // ADD THIS LINE
        this.sunSVG.setAttribute('width', "100%");  // this.baseW.toFixed(0));
        this.sunSVG.setAttribute('height', "100%");  // this.baseW.toFixed(0));

        this.eventGraphic.append(this.sunSVG);

        // this.minis[1].append(this.sunSVG);

        this.animateCurrentTime(place, todaily, data);
    }

    convertToAdjustedRadians(uTime: number) {
        let event = new Date(uTime * 1000);
        let totalMinutes = (event.getHours() * 60) + event.getMinutes();
        let degrees = totalMinutes / 4;
        let radians = (degrees - 90) * (Math.PI / 180);
        return radians;
    }

    animateCurrentTime(place: number, todaily: any, data: any) {
        let time = new Date();
        // minute
        let totalM = (time.getHours() * 60) + time.getMinutes();
        let totalMr = ((totalM / 4) - 90) * (Math.PI / 180);
        totalM = (totalM / 4) * (Math.PI / 180);
        let interval = (totalMr + 0.5) / 60;
        this.drawHand(place);
        this.drawMini(place);

        place += interval;

        if (place <= totalM) {
            window.requestAnimationFrame(this.populate.bind(this, todaily, data, place));
        } else {
            window.cancelAnimationFrame(this.animSunId);
        }
    }

    sunRemaining(data: any) {
        let n = new Date();
        let sunrise = new Date(data['sunrise'] * 1000);
        let sunset = new Date(data['sunset'] * 1000);

        if (sunrise > sunset) {
            if (n < sunset) {
                let diff = Math.abs(sunset.valueOf() - n.valueOf());
                this.titleText.innerText = `Sunset`;
                this.titleText.style.color = this.colorSunset;
                if (this.eventTime) {
                    this.eventTime.innerText = sunset.toLocaleTimeString('en-US', {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    });
                }
                this.plugDiff(diff);
            } else {
                let diff = Math.abs(sunrise.valueOf() - n.valueOf());
                this.titleText.innerText = `Sunrise`;
                this.titleText.style.color = this.colorSunrise;
                if (this.eventTime) {
                    this.eventTime.innerText = sunrise.toLocaleTimeString('en-US', {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    });
                }
                this.plugDiff(diff);
            }
        } else {
            let diff = Math.abs(sunrise.valueOf() - n.valueOf());
            this.titleText.innerText = `Sunrise`;
            this.titleText.style.color = this.colorSunrise;
            if (this.eventTime) {
                this.eventTime.innerText = sunrise.toLocaleTimeString('en-US', {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
            }
            this.plugDiff(diff);
        }
    }

    plugDiff(diff: number) {
        diff = Math.floor(diff / 1000);
        let secs = (diff % 60).toFixed(0);
        secs = ('0' + secs).slice(-2);
        diff = Math.floor(diff / 60);
        let mins = (diff % 60).toFixed(0);
        mins = ('0' + mins).slice(-2);
        diff = Math.floor(diff / 60);
        let hours = (diff % 24).toFixed(0);
        hours = ('0' + hours).slice(-2);
        this.countdown.innerText = `${hours}h ${mins}m ${secs}s`;
    }

    drawHand(place: number) {
        let todHand = document.getElementById('todHand')!;
        if (todHand) {
            todHand.innerHTML = '';
        }
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.id = 'todHand';
        line.setAttribute('x1', (this.bW / 2).toFixed(0));
        line.setAttribute('y1', this.radius.toFixed(0));
        line.setAttribute('x2', (this.bW / 2).toFixed(0));
        line.setAttribute('y2', (this.radius * 0.15).toFixed(0));
        line.setAttribute('style', 'stroke:var(--font-color); stroke-width: 2;');
        line.setAttribute('transform', `rotate(${((place * 180) / Math.PI).toFixed(2)}, ${this.bW / 2}, ${this.bW / 2})`);

        this.sunSVG.append(line);
    }

    drawMini(place: number) {
        let m = document.getElementById('mini')
        if (m) {
            m.innerHTML = '';
        }
        let mini = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        mini.id = 'mini';
        mini.setAttribute('cx', (this.bW / 2).toFixed(0));
        mini.setAttribute('cy', (this.radius * 0.15).toFixed(0));
        mini.setAttribute('r', ((this.radius * 0.8) * 0.1).toFixed(0));
        mini.setAttribute('stroke', 'none');
        mini.setAttribute('fill', 'white');
        mini.setAttribute('transform', `rotate(${((place * 180) / Math.PI).toFixed(2)}, ${this.bW / 2}, ${this.bW / 2})`);

        this.sunSVG.append(mini);
    }
}
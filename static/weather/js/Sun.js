"use strict";
class Sun extends ElementTile {
    constructor() {
        super('Sun', 'sun', ['sunData', 'sunGraphic2'], 'celestialRow', ['sunRemain']);
        this.colorSunrise = '#FFE600';
        this.colorSunset = '#FF8700';
        this.riseUnix = 0;
        this.setUnix = 0;
        this.remainInterval = 0;
        this.animSunId = 0;
        this.baseW = 0;
        this.radius = 0;
        this.sunGraphic = document.getElementById('sunGraphic2');
    }
    populate(todaily, data, place) {
        var _a;
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
        let daylightText = `${hours}hrs ${mins}mins`;
        let sunrise = this.convertToAdjustedRadians(this.riseUnix);
        let sunset = this.convertToAdjustedRadians(this.setUnix);
        this.baseW = ((_a = this.sunGraphic) === null || _a === void 0 ? void 0 : _a.clientWidth) * 0.9;
        this.radius = this.baseW / 2;
        this.sunGraphic.innerHTML = '';
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', this.baseW.toFixed(0));
        svg.setAttribute('height', this.baseW.toFixed(0));
        svg.id = 'sunSVG';
        // Black background
        let background = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        background.setAttribute('cx', (this.baseW / 2).toFixed(0));
        background.setAttribute('cy', (this.baseW / 2).toFixed(0));
        background.setAttribute('r', this.radius.toFixed(0));
        background.setAttribute('stroke', 'none');
        background.setAttribute('fill', 'black');
        // Daylight area
        let daylightFill = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        daylightFill.setAttribute('cx', (this.baseW / 2).toFixed(0));
        daylightFill.setAttribute('cy', (this.baseW / 2).toFixed(0));
        daylightFill.setAttribute('r', (this.radius * 0.8).toFixed(0));
        daylightFill.setAttribute('stroke', 'none');
        daylightFill.setAttribute('fill', 'rgb(245, 238, 139)');
        // Night time area, using 0.81 on radius to get rid of slight yellow outline
        let darkness = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        darkness.setAttribute('d', `
            M ${(this.baseW / 2) + ((this.radius * 0.81) * Math.cos(sunset))} ${(this.baseW / 2) + ((this.radius * 0.81) * Math.sin(sunset))}
            A ${(this.radius * 0.81)} ${(this.radius * 0.81)}, 0, 0, 1, ${(this.baseW / 2) + ((this.radius * 0.81) * Math.cos(sunrise))} ${(this.baseW / 2) + ((this.radius * 0.81) * Math.sin(sunrise))}
            L ${(this.baseW / 2)} ${(this.baseW / 2)} Z
        `);
        darkness.setAttribute('fill', 'rgb(0, 0, 133)');
        darkness.setAttribute('stroke', 'none');
        // "M" for midnight
        let midnight = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        midnight.setAttribute('x', (this.baseW / 2).toFixed(0));
        midnight.setAttribute('y', (this.radius * 0.15).toFixed(0));
        midnight.setAttribute('text-anchor', 'middle');
        midnight.setAttribute('fill', 'var(--font-faded)');
        midnight.setAttribute('font-size', '0.75rem');
        midnight.textContent = 'M';
        // "N" for noon
        let noon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        noon.setAttribute('x', (this.baseW / 2).toFixed(0));
        noon.setAttribute('y', (this.radius * 1.95).toFixed(0));
        noon.setAttribute('text-anchor', 'middle');
        noon.setAttribute('fill', 'var(--font-faded)');
        noon.setAttribute('font-size', '0.75rem');
        noon.textContent = 'N';
        // Daylight Text
        let dayText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        dayText.setAttribute('x', (this.baseW / 2).toFixed(0));
        dayText.setAttribute('y', (this.radius * 1.3).toFixed(0));
        dayText.setAttribute('text-anchor', 'middle');
        dayText.setAttribute('fill', 'rgb(0, 0, 133)');
        dayText.setAttribute('font-size', '0.75rem');
        dayText.textContent = 'Daylight';
        // Daylight Hours
        let dayHours = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        dayHours.setAttribute('x', (this.baseW / 2).toFixed(0));
        dayHours.setAttribute('y', (this.radius * 1.5).toFixed(0));
        dayHours.setAttribute('text-anchor', 'middle');
        dayHours.setAttribute('fill', 'rgb(0, 0, 133)');
        dayHours.setAttribute('font-size', '0.75rem');
        dayHours.textContent = daylightText;
        // Mini Sunrise
        let miniRise = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        miniRise.setAttribute('cx', ((this.baseW / 2) + ((this.radius * 0.81) * Math.cos(sunrise))).toFixed(0));
        miniRise.setAttribute('cy', ((this.baseW / 2) + ((this.radius * 0.81) * Math.sin(sunrise))).toFixed(0));
        miniRise.setAttribute('r', ((this.radius * 0.8) * 0.1).toFixed(0));
        miniRise.setAttribute('stroke', 'none');
        miniRise.setAttribute('fill', this.colorSunrise);
        // Mini Sunset
        let miniSet = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        miniSet.setAttribute('cx', ((this.baseW / 2) + ((this.radius * 0.81) * Math.cos(sunset))).toFixed(0));
        miniSet.setAttribute('cy', ((this.baseW / 2) + ((this.radius * 0.81) * Math.sin(sunset))).toFixed(0));
        miniSet.setAttribute('r', ((this.radius * 0.8) * 0.1).toFixed(0));
        miniSet.setAttribute('stroke', 'none');
        miniSet.setAttribute('fill', this.colorSunset);
        svg.append(background);
        svg.append(daylightFill);
        svg.append(darkness);
        svg.append(miniRise);
        svg.append(miniSet);
        svg.append(midnight);
        svg.append(noon);
        svg.append(dayText);
        svg.append(dayHours);
        this.sunGraphic.append(svg);
        this.animateCurrentTime(place, todaily, data);
    }
    convertToAdjustedRadians(uTime) {
        let event = new Date(uTime * 1000);
        let totalMinutes = (event.getHours() * 60) + event.getMinutes();
        let degrees = totalMinutes / 4;
        let radians = (degrees - 90) * (Math.PI / 180);
        return radians;
    }
    animateCurrentTime(place, todaily, data) {
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
        }
        else {
            window.cancelAnimationFrame(this.animSunId);
        }
    }
    sunRemaining(data) {
        let n = new Date();
        let sunrise = new Date(data['sunrise'] * 1000);
        let sunset = new Date(data['sunset'] * 1000);
        let s = document.getElementById('sunRemain');
        if (sunrise > sunset) {
            if (n < sunset) {
                let diff = Math.abs(sunset.valueOf() - n.valueOf());
                document.getElementById('sunTitle').innerHTML = `<span class="fas fa-sun pad-right"></span>Sunset`;
                document.getElementById('sunTitle').style.color = this.colorSunset;
                document.getElementById('sunData').innerText = sunset.toLocaleTimeString('en-US', {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
                this.plugDiff(diff, s, 'Sunset');
            }
            else {
                let diff = Math.abs(sunrise.valueOf() - n.valueOf());
                document.getElementById('sunTitle').innerHTML = `<span class="fas fa-sun pad-right"></span>Sunrise`;
                document.getElementById('sunTitle').style.color = this.colorSunrise;
                document.getElementById('sunData').innerText = sunrise.toLocaleTimeString('en-US', {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
                this.plugDiff(diff, s, 'Sunrise');
            }
        }
        else {
            let diff = Math.abs(sunrise.valueOf() - n.valueOf());
            document.getElementById('sunTitle').innerHTML = `<span class="fas fa-sun pad-right"></span>Sunrise`;
            document.getElementById('sunTitle').style.color = this.colorSunrise;
            document.getElementById('sunData').innerText = sunrise.toLocaleTimeString('en-US', {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });
            this.plugDiff(diff, s, 'Sunrise');
        }
    }
    plugDiff(diff, div, text) {
        diff = Math.floor(diff / 1000);
        let secs = (diff % 60).toFixed(0);
        secs = ('0' + secs).slice(-2);
        diff = Math.floor(diff / 60);
        let mins = (diff % 60).toFixed(0);
        mins = ('0' + mins).slice(-2);
        diff = Math.floor(diff / 60);
        let hours = (diff % 24).toFixed(0);
        hours = ('0' + hours).slice(-2);
        div.innerText = `${hours}h ${mins}m ${secs}s until ${text}`;
    }
    drawHand(place) {
        let todHand = document.getElementById('todHand');
        if (todHand) {
            todHand.innerHTML = '';
        }
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.id = 'todHand';
        line.setAttribute('x1', (this.baseW / 2).toFixed(0));
        line.setAttribute('y1', this.radius.toFixed(0));
        line.setAttribute('x2', (this.baseW / 2).toFixed(0));
        line.setAttribute('y2', (this.radius * 0.15).toFixed(0));
        line.setAttribute('style', 'stroke:var(--font-color); stroke-width: 2;');
        line.setAttribute('transform', `rotate(${((place * 180) / Math.PI).toFixed(2)}, ${this.baseW / 2}, ${this.baseW / 2})`);
        document.getElementById('sunSVG').append(line);
    }
    drawMini(place) {
        let m = document.getElementById('mini');
        if (m) {
            m.innerHTML = '';
        }
        let mini = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        mini.id = 'mini';
        mini.setAttribute('cx', (this.baseW / 2).toFixed(0));
        mini.setAttribute('cy', (this.radius * 0.15).toFixed(0));
        mini.setAttribute('r', ((this.radius * 0.8) * 0.1).toFixed(0));
        mini.setAttribute('stroke', 'none');
        mini.setAttribute('fill', 'white');
        mini.setAttribute('transform', `rotate(${((place * 180) / Math.PI).toFixed(2)}, ${this.baseW / 2}, ${this.baseW / 2})`);
        document.getElementById('sunSVG').append(mini);
    }
}

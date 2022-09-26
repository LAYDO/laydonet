let loader = document.getElementById('loader');
let searches = document.getElementById('citySection');

let celestialSection = document.getElementById('celestialSection');
let celestial = document.getElementById('celestial');
let celestialElements = document.getElementById('celestialElements');

let credits = document.getElementById('credits');

let colorSunrise = '#FFE600';
let colorSunset = '#FF8700';
let animID, place = 0;
let animMoonID, moonPos;
let remainInterval;

this.trigger = false;

const datas = [
    {
        'object': 'atmosphere',
        'atmosTitle': ['Clouds', 'Pressure'],
        'elements': ['cloudsData', 'pressureData'],
    },
    {
        'object': 'aqi',
        'airTitle': ['AQI', 'PM 2.5'],
        'elements': ['aqiData', 'pmData'],
    },
    {
        'object': 'temp',
        'tempTitle': ['', ''],
        'elements': ['current-temp', 'current-temp-c'],
    },
    {
        'object': 'precip',
        'wetTitle': ['Humidity', 'Precip'],
        'elements': ['humidData', 'precipData'],
    },
    {
        'object': 'wind',
        'windTitle': ['Wind', 'Gusts'],
        'elements': ['windData', 'gustData'],
    },
];
const options = {
    // month: "numeric",
    // day: "numeric"
    weekday: "short"
};
const celeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
};
const icons = {
    '01d': ' fas fa-sun',
    '01n': ' far fa-moon',
    '02d': ' fas fa-cloud-sun',
    '02n': ' fas fa-cloud-moon',
    '03d': ' fas fa-cloud',
    '03n': ' fas fa-cloud',
    '04d': ' fas fa-cloud',
    '04n': ' fas fa-cloud',
    '09d': ' fas fa-cloud-rain',
    '09n': ' fas fa-cloud-rain',
    '10d': ' fas fa-cloud-showers-heavy',
    '10n': ' fas fa-cloud-showers-heavy',
    '11d': ' fas fa-bolt',
    '11n': ' fas fa-bolt',
    '13d': ' fas fa-snowflake',
    '13n': ' fas fa-snowflake',
    '50d': ' fas fa-smog',
    '50n': ' fas fa-smog',
};

init();

function init() {

    loader.style.display = 'none';
    celestialSection.style.display = 'none';
    credits.style.display = 'none';

    this.loading = false;
    this.current = new Current();
    this.hourly = new Hourly();
    this.daily = new Daily();
    this.map = new WMap();
    this.elements = new Elements();

    document.addEventListener('keyup', (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            getCurrentWeather();
        }
    });

    if (navigator.geolocation) {
        document.getElementById('citySearch').value = '';
        navigator.geolocation.getCurrentPosition(getCurrentWeather);
    } else {
        document.getElementById('forecast').innerHTML = 'Geolocation is not supported by this browser.';
    }
}

async function getCurrentWeather(position) {
    clearInterval(remainInterval);
    load();
    let q = document.getElementById('citySearch').value.trim();
    let url = `${window.location.href}f/?`;
    if (position) {
        url += `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
    } else if (q) {
        url += `q=${q}`;
    }
    fetch(url).then(response => {
        load();
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log(data);

        this.current.populate(data, icons);
        this.hourly.populate(data.hourly, icons);
        this.daily.populate(data.forecast, icons);
        this.map.populate(data.latitude, data.longitude);
        this.elements.populate(data);

        remainInterval = setInterval(celestialRemaining.bind(null, data), 1000);
        buildCelestial(data.todaily, data.tomorrow);

    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    })
}

function load() {
    if (this.loading) {
        celestialSection.style.display = 'inherit';
    } else {
        celestialSection.style.display = 'none';
    }

    this.current.toggle(this.loading);
    this.hourly.toggle(this.loading);
    this.daily.toggle(this.loading);
    this.map.toggle(this.loading);
    this.elements.toggle(this.loading);
    credits.style.display = this.loading ? 'inherit' : 'none';
    loader.style.display = this.loading ? 'none' : 'inline-block';

    this.loading = !this.loading;
    searches.style.display = 'none';
}


function buildCelestial(data, tomorrow) {
    let sun = document.createElement('div');
    sun.id = 'sun';
    let moon = document.createElement('div');
    moon.id = 'moon';

    let celeArr = [];
    celeArr.push(sun, moon);

    celeArr.forEach(c => {
        let celeGraphic = document.createElement('div');
        celeGraphic.className = 'celestial-graphic';
        celeGraphic.id = `${c.id}Graphic`;
        let celeInfo = document.createElement('div');
        celeInfo.className = 'celestial-info';

        let riseLabel = document.createElement('label');
        riseLabel.setAttribute('for', `${c.id}rise`);
        riseLabel.innerText = `${c.id.charAt(0).toUpperCase() + c.id.slice(1)}rise:`;
        riseLabel.style.color = c.id === 'sun' ? colorSunrise : 'inherit';
        let rise = document.createElement('div');
        rise.id = `${c.id}rise`;
        rise.className = 'celestial-stat';
        rise.innerText = new Date(data[`${c.id}rise`] * 1000).toLocaleTimeString('en-US', celeOptions);

        let setLabel = document.createElement('label');
        setLabel.setAttribute('for', `${c.id}set`);
        setLabel.innerText = `${c.id.charAt(0).toUpperCase() + c.id.slice(1)}set:`;
        setLabel.style.color = c.id === 'sun' ? colorSunset : 'inherit';
        let set = document.createElement('div');
        set.id = `${c.id}set`;
        set.className = 'celestial-stat';
        let todaySet = new Date(data[`${c.id}set`] * 1000);
        let tomorrowSet = new Date(tomorrow[`${c.id}set`] * 1000);
        if (data[`${c.id}set`] < data[`${c.id}rise`]) {
            set.innerText = tomorrowSet.toLocaleTimeString('en-US', celeOptions);
        } else {
            set.innerText = todaySet.toLocaleTimeString('en-US', celeOptions);
        }

        let celeRemaining = document.createElement('div');
        celeRemaining.id = `${c.id}Remaining`;
        celeRemaining.className = 'cele-remaining';

        celeInfo.append(riseLabel);
        celeInfo.append(rise);
        celeInfo.append(setLabel);
        celeInfo.append(set);
        celeInfo.append(celeRemaining);

        c.append(celeGraphic);
        c.append(celeInfo);

        // celestial.append(c);
    });

    document.addEventListener('scroll', celestialTriggers.bind(null, data, place, moonPos));
    animID = window.requestAnimationFrame(generateSun.bind(null, data, place));
    animMoonID = window.requestAnimationFrame(generateMoonPhase.bind(null, data.moon_phase, moonPos));

}

function celestialTriggers(data, place, moonPos) {


    if (celestialElements.getBoundingClientRect().bottom > 0 && !this.trigger) {
        this.trigger = true;
        animID = window.requestAnimationFrame(generateSun.bind(null, data, place));
        animMoonID = window.requestAnimationFrame(generateMoonPhase.bind(null, data.moon_phase, moonPos));
    } else if (celestialElements.getBoundingClientRect().bottom <= 0 && this.trigger) {
        window.cancelAnimationFrame(animID);
        window.cancelAnimationFrame(animMoonID);
        this.trigger = false;
    }
}

function generateSun(data, place) {
    let riseUnix = data.sunrise;
    let setUnix = data.sunset;

    let diff = setUnix - riseUnix;
    diff = Math.floor(diff / 60);
    let mins = diff % 60;
    mins = ('0' + mins).slice(-2);
    diff = Math.floor(diff / 60);
    let hours = diff % 24;
    hours = ('0' + hours).slice(-2);

    let daylightText = 'DAYLIGHT';
    let daylight = `${hours}:${mins} HRS`;
    let sunrise = convertToAdjustedRadians(riseUnix);
    let sunset = convertToAdjustedRadians(setUnix);
    let rSunrise = convertToRadians(riseUnix);
    let rSunset = convertToRadians(setUnix);
    let sunElement = document.getElementById('sunGraphic2');
    let c = document.createElement('canvas');
    let ctx = c.getContext('2d');
    ctx.canvas.width = sunElement.clientWidth;
    ctx.canvas.height = sunElement.clientWidth;
    let radius = sunElement.clientWidth / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.9;

    sunElement.innerHTML = '';

    // Background
    ctx.beginPath();
    ctx.fillStyle = 'black'; //`rgba(255, 255, 255, 0.15)`;
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fill();

    // "Sun"
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.8, 0, 2 * Math.PI);
    ctx.fillStyle = `rgb(245, 238, 139)`;
    ctx.fill();

    // Night Fill
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.8, sunrise, sunset, true);
    ctx.lineTo(0, 0)
    ctx.fillStyle = `rgb(0, 0, 133)`;
    ctx.fill();

    // Midnight line
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -radius * 0.8);
    ctx.stroke();

    // Midnight & Noon Text
    ctx.beginPath();
    ctx.font = 'bold 1rem Times New Roman';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.textAlign = 'center';
    drawTextAlongArc(ctx, 'M', radius * 0.85, 0.3 * Math.PI);
    drawTextAlongArc(ctx, 'N', -radius * 0.95, 0.25 * Math.PI);

    // Draw sunrise & sunset
    drawMini(ctx, rSunset, radius * 0.8, colorSunset);
    drawMini(ctx, rSunrise, radius * 0.8, colorSunrise);

    // Current time
    animateCurrentTime(ctx, radius, place, data);

    // Daylight HRS
    ctx.font = 'bold 1rem Times New Roman';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'center';
    ctx.fillText(daylightText, 0, radius * 0.4);
    ctx.fillText(daylight, 0, radius * 0.6);


    sunElement.append(c);
}

function generateMoonPhase(phase, moonPos) {
    // Great reference https://i.ytimg.com/vi/RPvL7yeWBQM/maxresdefault.jpg
    let text = '';
    let element = document.getElementById('moonGraphic2');
    let canv = document.createElement('canvas');
    let ctx = canv.getContext('2d');
    ctx.canvas.width = element.clientWidth;
    ctx.canvas.height = element.clientWidth;
    let radius = element.clientWidth / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.9;
    if (moonPos == undefined) {
        moonPos = -(ctx.canvas.height / 4);
    }

    element.innerHTML = '';

    // Background
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    if (phase == 0 || phase == 1) {
        text = 'New Moon';
    } else if (phase > 0 && phase < 0.25) {
        text = 'Waxing Crescent';
    } else if (phase == 0.25) {
        text = 'First Quarter Moon';
    } else if (phase > 0.25 && phase < 0.5) {
        text = 'Waxing Gibbous';
    } else if (phase == 0.5) {
        text = 'Full Moon';
    } else if (phase > 0.5 && phase < 0.75) {
        text = 'Waning Gibbous';
    } else if (phase == 0.75) {
        text = 'Last Quarter Moon';
    } else if (phase > 0.75 && phase < 1) {
        text = 'Waning Crescent';
    }

    ctx.font = 'bold 1.25rem Times New Roman';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(text, 0, (ctx.canvas.height / 4));

    // Moon animation
    animateMoon(ctx, radius, moonPos, phase);

    element.append(canv);
}

function convertToAdjustedRadians(uTime) {
    let event = new Date(uTime * 1000);
    let totalMinutes = (event.getHours() * 60) + event.getMinutes();
    let degrees = totalMinutes / 4;
    let radians = (degrees - 90) * (Math.PI / 180);
    return radians;
}

function convertToRadians(uTime) {
    let event = new Date(uTime * 1000);
    let totalMinutes = (event.getHours() * 60) + event.getMinutes();
    let degrees = totalMinutes / 4;
    let radians = (degrees) * (Math.PI / 180);
    return radians;
}

function drawHand(ctx, pos, length, width) {
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawMini(ctx, pos, length, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rotate(pos);
    ctx.arc(0, -length, length * 0.1, 0, 2 * Math.PI);
    ctx.fill();
    ctx.rotate(-pos);
}

function drawOuterRim(ctx, radius, pos) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = radius * 0.075;
    ctx.arc(0, 0, radius * 0.8, 1.5 * Math.PI, pos - 1.5);
    ctx.stroke();
}

function drawTextAlongArc(ctx, str, radius, angle) {
    var len = str.length, s;
    ctx.save();
    ctx.rotate(-1 * angle / 2);
    ctx.rotate(-1 * (angle / len) / 2);
    for (var n = 0; n < len; n++) {
        ctx.rotate(angle / len);
        ctx.save();
        ctx.translate(0, -1 * radius);
        s = str[n];
        ctx.fillText(s, 0, 0);
        ctx.restore();
        ;
    }
    ctx.restore();
}

function animateCurrentTime(ctx, radius, place, data) {
    let time = new Date();
    // minute
    totalM = (time.getHours() * 60) + time.getMinutes();
    totalMr = ((totalM / 4) - 90) * (Math.PI / 180);
    totalM = (totalM / 4) * (Math.PI / 180);
    let interval = (totalMr + 0.5) / 60;
    ctx.save();
    drawHand(ctx, place, radius * 0.8, radius * 0.03);
    drawMini(ctx, place, radius * 0.8, 'white');
    drawOuterRim(ctx, radius, place);

    ctx.restore();
    place += interval;

    if (place <= totalM) {
        window.requestAnimationFrame(generateSun.bind(null, data, place));
    } else {
        window.cancelAnimationFrame(animID);
    }
}

function animateMoon(ctx, radius, moonPos, phase) {
    let moonPosEnd = -ctx.canvas.height / 6;
    let moonPosStart = -(ctx.canvas.height / 4);
    let moonInterval = (moonPosStart - moonPosEnd) / 30;

    // Moon
    ctx.beginPath();
    ctx.arc(0, moonPos, radius * 0.4, 0, 2 * Math.PI);
    if ((phase > 0.25 && phase < 0.5) || (phase > 0.5 && phase < 0.75)) {
        ctx.fillStyle = 'gray';
    } else {
        ctx.fillStyle = 'white';
    }
    ctx.fill();

    // Moon shadow
    let basePhase = phase * 2;
    ctx.beginPath();
    let something = (phase == 0 || phase == 0.25 || phase == 0.5 || phase == 0.75 || phase == 1);
    if (something) {
        ctx.arc(0, moonPos, radius * 0.4, (basePhase * Math.PI), ((2 - basePhase) * Math.PI));
        ctx.fillStyle = 'gray';
    } else {
        ctx.globalCompositeOperation = 'multiply';
        if (phase < 0.25) {
            ctx.arc(radius * -phase, moonPos, radius * 0.4, 0, (2 * Math.PI));
            ctx.fillStyle = 'gray';
        } else if (phase > 0.75) {
            ctx.arc(radius * (1 - phase), moonPos, radius * 0.4, 0, (2 * Math.PI));
            ctx.fillStyle = 'gray';
        } else if (phase > 0.25 && phase < 0.5) {
            ctx.globalCompositeOperation = 'overlay';
            ctx.arc(radius * (0.5 - phase), moonPos, radius * 0.4, 0, (2 * Math.PI));
            ctx.fillStyle = 'white';
        } else if (phase > 0.5 && phase < 0.75) {
            ctx.globalCompositeOperation = 'overlay';
            ctx.arc(radius * -(phase - 0.5), moonPos, radius * 0.4, 0, (2 * Math.PI));
            ctx.fillStyle = 'white';
        }
    }
    ctx.fill();
    moonPos -= moonInterval;

    if (moonPos <= moonPosEnd) {
        window.requestAnimationFrame(generateMoonPhase.bind(null, phase, moonPos));
    } else {
        window.cancelAnimationFrame(animMoonID);
        moonPos = undefined;
    }
}

function celestialRemaining(data) {
    let n = new Date();
    let sunrise = new Date(data['sunrise'] * 1000);
    let sunset = new Date(data['sunset'] * 1000);
    let moonrise = new Date(data['moonrise'] * 1000);
    let moonset;
    if (data['moonset'] == 0) {
        moonset = 0;
    } else {
        moonset = new Date(data['moonset'] * 1000);
    }

    if (sunrise > sunset) {
        if (n < sunset) {
            let diff = Math.abs(sunset - n);
            document.getElementById('sunTitle').innerHTML = `<span class="fas fa-sun pad-right"></span>Sunset`;
            document.getElementById('sunTitle').style.color = colorSunset;
            document.getElementById('sunData').innerText = sunset.toLocaleTimeString('en-US', celeOptions);
            let s = document.getElementById('sunRemain');
            plugDiff(diff, s, 'Sunset');
        } else {
            let diff = Math.abs(sunrise - n);
            document.getElementById('sunTitle').innerHTML = `<span class="fas fa-sun pad-right"></span>Sunrise`;
            document.getElementById('sunTitle').style.color = colorSunrise;
            document.getElementById('sunData').innerText = sunrise.toLocaleTimeString('en-US', celeOptions);
            let s = document.getElementById('sunRemain');
            plugDiff(diff, s, 'Sunrise');
        }
    } else {
        let diff = Math.abs(sunrise - n);
        document.getElementById('sunTitle').innerHTML = `<span class="fas fa-sun pad-right"></span>Sunrise`;
        document.getElementById('sunTitle').style.color = colorSunrise;
        document.getElementById('sunData').innerText = sunrise.toLocaleTimeString('en-US', celeOptions);
        let s = document.getElementById('sunRemain');
        plugDiff(diff, s, 'Sunrise');
    }


    if (moonset < moonrise) {
        if (n < moonset) {
            let diff = Math.abs(moonset - n);
            document.getElementById('moonTitle').innerHTML = `<span class="fas fa-moon pad-right"></span>Moonset`;
            document.getElementById('moonData').innerText = moonset.toLocaleTimeString('en-US', celeOptions);
            let m = document.getElementById('moonRemain');
            plugDiff(diff, m, 'Moonset');
        } else {
            let diff = Math.abs(moonrise - n);
            document.getElementById('moonTitle').innerHTML = `<span class="fas fa-moon pad-right"></span>Moonrise`;
            document.getElementById('moonData').innerText = moonrise.toLocaleTimeString('en-US', celeOptions);
            let m = document.getElementById('moonRemain');
            plugDiff(diff, m, 'Moonrise');

        }
    } else {
        if (n < moonrise) {
            let diff = Math.abs(moonrise - n);
            document.getElementById('moonTitle').innerHTML = `<span class="fas fa-moon pad-right"></span>Moonrise`;
            document.getElementById('moonData').innerText = moonrise.toLocaleTimeString('en-US', celeOptions);
            let m = document.getElementById('moonRemain');
            plugDiff(diff, m, 'Moonrise');
        } else {
            let diff = Math.abs(moonset - n);
            document.getElementById('moonTitle').innerHTML = `<span class="fas fa-moon pad-right"></span>Moonset`;
            document.getElementById('moonData').innerText = moonset.toLocaleTimeString('en-US', celeOptions);
            let m = document.getElementById('moonRemain');
            plugDiff(diff, m, 'Moonset');

        }

    }
}

function plugDiff(diff, div, text) {
    diff = Math.floor(diff / 1000);
    let secs = diff % 60;
    secs = ('0' + secs).slice(-2);
    diff = Math.floor(diff / 60);
    let mins = diff % 60;
    mins = ('0' + mins).slice(-2);
    diff = Math.floor(diff / 60);
    let hours = diff % 24;
    hours = ('0' + hours).slice(-2);
    div.innerText = `${hours}h ${mins}m ${secs}s until ${text}`;
}

function toggleCitySearch() {
    if (this.current.cityName.style.display != 'none') {
        this.current.cityName.style.display = 'none';
        searches.style.display = 'inherit';
    } else {
        this.current.cityName.style.display = 'inherit';
        searches.style.display = 'none';
    }
    toggleOverlay();
}

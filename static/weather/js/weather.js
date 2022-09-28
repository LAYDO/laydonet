let loader = document.getElementById('loader');
let searches = document.getElementById('citySection');

let credits = document.getElementById('credits');

let moonPos;

const options = {
    // month: "numeric",
    // day: "numeric"
    weekday: "short"
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
    credits.style.display = 'none';

    this.loading = false;
    this.current = new Current();
    this.hourly = new Hourly();
    this.daily = new Daily();
    this.map = new WMap();
    this.elements = new Elements();
    this.celestial = new Celestial();

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
    // clearInterval(this.celestial.remainInterval);
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
        this.celestial.populate(data);

    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    })
}

function load() {

    this.current.toggle(this.loading);
    this.hourly.toggle(this.loading);
    this.daily.toggle(this.loading);
    this.map.toggle(this.loading);
    this.elements.toggle(this.loading);
    this.celestial.toggle(this.loading);

    credits.style.display = this.loading ? 'inherit' : 'none';
    loader.style.display = this.loading ? 'none' : 'inline-block';

    this.loading = !this.loading;
    searches.style.display = 'none';
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

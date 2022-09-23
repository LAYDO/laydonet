let loader = document.getElementById('loader');
let searches = document.getElementById('citySection');
let cityName = document.getElementById('cityName');

let currElement = document.getElementById('currentWeather');
let currentTemp = document.getElementById('current-temp');
let currentIcon = document.getElementById('current-icon');
let currentHigh = document.getElementById('current-high');
let currentLow = document.getElementById('current-low');
let currentDesc = document.getElementById('tempTitle');

let hourly = document.getElementById('hourly');
let hfc = document.getElementById('hfc');

let forecast = document.getElementById('forecast');
let elForecast = document.getElementById('dailyForecast');

let map = document.getElementById('map');
let wMap = document.getElementById('weatherMap');

let elementTiles = document.getElementById('elementTiles');

let currentCloud = document.getElementById('cloudsData');
let currentUVI = document.getElementById('uviData');
let currentVisibility = document.getElementById('visibilityData');

let currentWind = document.getElementById('windData');
let currentGust = document.getElementById('gustData');

let currentHumid = document.getElementById('humidData');
let currentDew = document.getElementById('dewData');

let currentPressure = document.getElementById('pressureData');
let currentInhg = document.getElementById('inhgData');

let currentAqi = document.getElementById('aqiData');
let currentCO = document.getElementById('coData');
let currentNO = document.getElementById('noData');
let currentNO2 = document.getElementById('no2Data');
let currentO3 = document.getElementById('o3Data');
let currentSO2 = document.getElementById('so2Data');
let currentNH3 = document.getElementById('nh3Data');
let currentPM10 = document.getElementById('pm10Data');
let currentPM25 = document.getElementById('pm25Data');

let currentRain = document.getElementById('precipData');
let currentRainToday = document.getElementById('precipToday');

let celestialSection = document.getElementById('celestialSection');
let celestialT = document.getElementById('celestialTop');
let celestial = document.getElementById('celestial');
let celestialElements = document.getElementById('celestialElements');

let credits = document.getElementById('credits');

let now = new Date();
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
const titles = [
    'todayTitle',
    'tomorrowTitle',
    'dayAfterTitle',
    'twoDayAfterTitle',
    'threeDayAfterTitle',
    'fourDayAfterTitle',
    'fiveDayAfterTitle',
    'sixDayAfterTitle',
    'sevenDayAfterTitle',
    'eightDayAfterTitle',
]
const titleContent = [
    'today',
    'tomorrow',
    'dayAfter',
    'twoDayAfter',
    'threeDayAfter',
    'fourDayAfter',
    'fiveDayAfter',
    'sixDayAfter',
    'sevenDayAfter',
    'eightDayAfter',
]

init();

function init() {

    currElement.style.display = 'none';
    elForecast.style.display = 'none';
    loader.style.display = 'none';
    map.style.display = 'none';
    celestialT.style.display = 'none';
    hfc.style.display = 'none';
    elementTiles.style.display = 'none';
    celestialSection.style.display = 'none';
    credits.style.display = 'none';
    this.loading = false;

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
        // buildCurrent(data);
        let current = new Current();
        buildMap(data.latitude, data.longitude);
        buildForecasts(data.forecast);
        buildHourly(data.hourly);
        remainInterval = setInterval(celestialRemaining.bind(null, data), 1000);
        buildCelestial(data.todaily, data.tomorrow);
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    })
}

function load() {
    if (this.loading) {
        loader.style.display = 'none';
        celestialT.style.display = 'none';
        map.style.display = 'inherit';
        currElement.style.display = 'inherit';
        elForecast.style.display = 'inherit';
        cityName.style.display = 'inherit';
        credits.style.display = 'inherit';
        celestialSection.style.display = 'inherit';
        hfc.style.display = 'flex';
        elementTiles.style.display = 'flex';
    } else {
        currElement.style.display = 'none';
        elForecast.style.display = 'none';
        map.style.display = 'none';
        celestialT.style.display = 'none';
        hfc.style.display = 'none';
        elementTiles.style.display = 'none';
        credits.style.display = 'none';
        celestialSection.style.display = 'none';

        forecast.innerHTML = '';
        celestial.innerHTML = '';
        hourly.innerHTML = '';

        loader.style.display = 'inline-block';
    }
    this.loading = !this.loading;
    searches.style.display = 'none';
}

function buildCurrent(data) {
    cityName.innerText = `${data.name}`;

    currentTemp.innerText = `${Math.round(data.temp)}\xB0 F`;
    currentIcon.className = icons[data.weatherIcon];
    currentHigh.innerText = `H: ${Math.round(data.high)}\xB0`;
    currentLow.innerText = `L: ${Math.round(data.low)}\xB0`;
    currentDesc.innerText = `${data.weatherDesc}`;

    currentCloud.innerText = `${Math.round(data.clouds)} \u0025`;
    currentUVI.innerText = `UV Index: ${Math.round(data.uvi)}`;
    currentVisibility.innerText = `Visibility: ${Math.round(data.visibility * 0.0006213712)} miles`;

    // currentWind.innerText = `${Math.round(data.windSpeed)} ${windDirection(data.windDeg)}`;
    // currentGust.innerText = `Gusts: ${Math.round(data.windGust)} mph`;
    window.requestAnimationFrame(generateWindDial.bind(null, data));

    currentHumid.innerText = `${data.humidity}\u0025`;
    currentDew.innerText = `Dew Point: ${data.dew_point}\xB0`;

    let currentBaro = new Barometer(data.pressure);
    // currentBaro.pressure = data.pressure;

    if (data.aqi.main != undefined && data.aqi.components != undefined) {
        currentAqi.innerText = `${data.aqi.main.aqi}`;
        currentAqi.style.color = getAQIColor(data.aqi.main.aqi);
        document.getElementById('airTitle').style.color = getAQIColor(data.aqi.main.aqi);
        currentCO.innerText = `CO: ${data.aqi.components.co}`;
        currentNO.innerText = `NO: ${data.aqi.components.no}`;
        currentNO2.innerText = `NO2: ${data.aqi.components.no2}`;
        currentO3.innerText = `O3: ${data.aqi.components.o3}`;
        currentSO2.innerText = `SO2: ${data.aqi.components.so2}`;
        currentPM10.innerText = `PM10: ${data.aqi.components.pm10}`;
        currentPM25.innerText = `PM2.5: ${data.aqi.components.pm2_5}`;
        currentNH3.innerText = `NH3: ${data.aqi.components.nh3}`;
    } else {
        currentAqi.innerText = '--';
    }

    currentRain.innerText = `${Math.round(data.rain_next * 100)}\u0025`;
    currentRainToday.innerText = `24 hour chance: ${Math.round(data.rain_today * 100)}\u0025`;
};

function buildMap(lat, lon) {
    wMap.innerHTML = '<div id="mapid"></div>'; // kudos to Artem Kovalov for this fix
    var weatherMap = L.map('mapid', {
        zoomControl: false,
        zoomSnap: 0,
        dragging: false,
        doubleClickZoom: false,
    }).setView([lat, lon], 7);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/dark-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibGF5ZG8iLCJhIjoiY2t0bmcwZW5oMDJqNTJwbzJ1cm9uZHZjMiJ9.aP2xQEplUndXkrSgmkB9Sw'
    }).addTo(weatherMap);
    let precipMap = L.tileLayer(`http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}?appid={accessToken}`, {
        attribution: '&copy; <a href="https://openweathermap.org/api">OWM</a>',
        op: 'PR0',
        opacity: 0.5,
        accessToken: '9de243494c0b295cca9337e1e96b00e2',
    }),
        windMap = L.tileLayer(`http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}?appid={accessToken}`, {
            attribution: '&copy; <a href="https://openweathermap.org/api">OWM</a>',
            op: 'WND',
            use_norm: true,
            arrow_step: 16,
            accessToken: '9de243494c0b295cca9337e1e96b00e2',
        }),
        cloudMap = L.tileLayer(`http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}?appid={accessToken}`, {
            attribution: '&copy; <a href="https://openweathermap.org/api">OWM</a>',
            op: 'CL',
            opacity: 0.8,
            accessToken: '9de243494c0b295cca9337e1e96b00e2',
        });
    let mapLayers = {
        'Precip': precipMap,
        'Wind': windMap,
        'Clouds': cloudMap,
    };
    L.control.layers(mapLayers).addTo(weatherMap);
    precipMap.addTo(weatherMap);
    let gpsIcon = L.divIcon({ className: 'gps-icon' });
    L.marker([lat, lon], { icon: gpsIcon }).addTo(weatherMap);
};

function buildForecasts(data) {
    data.forEach((d, idx) => {
        let foreContainer = document.createElement('div');
        foreContainer.className = 'forecast-container';
        let foreTitle = document.createElement('div');
        foreTitle.className = 'forecast-title';
        let foreIcon = document.createElement('span');
        foreIcon.className = 'forecast-icon';
        let foreTemps = document.createElement('div');
        foreTemps.className = 'forecast-temps';
        let foreHigh = document.createElement('div');
        foreHigh.className = 'forecast-high';
        let foreLow = document.createElement('div');
        foreLow.className = 'forecast-low';
        foreContainer.id = `${titleContent[idx]}Container`;
        foreTitle.id = `${titleContent[idx]}Title`;
        foreIcon.id = `${titleContent[idx]}Icon`;
        foreTemps.id = `${titleContent[idx]}Temps`;
        foreHigh.id = `${titleContent[idx]}High`;
        foreLow.id = `${titleContent[idx]}Low`;
        foreIcon.className += icons[d.weather[0].icon];
        foreHigh.innerText = `${Math.round(d.temp.max)}\xB0`;
        foreLow.innerText = `${Math.round(d.temp.min)}\xB0`;
        foreContainer.append(foreTitle);
        foreContainer.append(foreIcon);
        foreTemps.append(foreHigh);
        foreTemps.append(foreLow);
        foreContainer.append(foreTemps);
        forecast.append(foreContainer);
    });

    for (i = 0; i < 10; i++) {
        let day = new Date();
        day.setDate(now.getDate() + i);
        var dayDate = day.toLocaleDateString("en-US", options);
        document.getElementById(titles[i]).innerText = `${i == 0 ? 'Today' : dayDate}`;
    }
};

function buildHourly(data) {
    data.forEach((d) => {
        let hourContainer = document.createElement('div');
        hourContainer.className = 'hourly-container';
        let hourTitle = document.createElement('div');
        hourTitle.className = 'hourly-title';
        let hourIcon = document.createElement('span');
        hourIcon.className = 'hourly-icon';
        let hourTemps = document.createElement('div');
        hourTemps.className = 'hourly-temps';

        hourContainer.id = `${d.dt}Container`;
        hourTitle.id = `${d.dt}Title`;
        hourIcon.id = `${d.dt}Icon`;
        hourTemps.id = `${d.dt}Temps`;

        let theHour = new Date(d.dt * 1000);
        hourTitle.innerText = hourlyText(theHour.getHours());
        hourIcon.className += icons[d.weather[0].icon];
        hourTemps.innerText = `${Math.round(d.temp)}\xB0`;

        hourContainer.append(hourTitle);
        hourContainer.append(hourIcon);
        hourContainer.append(hourTemps);
        hourly.append(hourContainer);
    });
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

        celestial.append(c);
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

function hourlyText(h) {
    if (h > 12) {
        return `${h - 12} PM`;
    } else if (h == 12) {
        return "Noon";
    } else if (h == 0) {
        return "Midnight";
    } else {
        return `${h} AM`;
    }
}

function toggleCitySearch() {
    if (cityName.style.display != 'none') {
        cityName.style.display = 'none';
        searches.style.display = 'inherit';
    } else {
        cityName.style.display = 'inherit';
        searches.style.display = 'none';
    }
    toggleOverlay();
}

function getAQIColor(aqi) {
    switch (aqi) {
        case 1:
            return '#00e400';
        case 2:
            return '#ffff00';
        case 3:
            return '#ff7e00';
        case 4:
            return '#ff0000';
        case 5:
            return '#99004c';
        case 6:
            return '#7e0023';
        default:
            return 'var(--font-faded)';
    }
}

function generateWindDial(data) {
    let velocity = data.windSpeed;
    let gust = data.windGust;
    let degree = data.windDeg;
    console.log(degree);

    let windElement = document.getElementById('wind');
    let baseW = windElement.clientWidth * 0.7;
    let baseH = windElement.clientHeight * 0.7;

    let dial = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    dial.setAttribute('width', baseW);
    dial.setAttribute('height', baseH);

    let radius = (windElement.clientWidth * 0.5) / 2;

    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', baseW / 2);
    circle.setAttribute('cy', baseH / 2);
    circle.setAttribute('r', radius);
    circle.setAttribute('stroke', 'var(--font-faded)'); // #fff8ed
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke-width', 2);

    for (let i = 0; i < 4; i++) {
        let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', baseW / 2);
        line.setAttribute('y1', 10);
        line.setAttribute('x2', baseW / 2);
        line.setAttribute('y2', 20);
        line.setAttribute('style', 'stroke:var(--font-color); stroke-width:0.5;');


        let dir = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        dir.setAttribute('x', '50%');
        dir.setAttribute('y', 8);
        dir.setAttribute('text-anchor', 'middle');
        dir.setAttribute('fill', 'var(--font-color)');
        dir.setAttribute('font-size', '0.5rem');
        switch (i) {
            case 0:
                dir.textContent = 'N';
                break;
            case 1:
                dir.textContent = 'E';
                break;
            case 2:
                dir.textContent = 'S';
                break;
            case 3:
                dir.textContent = 'W';
                break;
        }
        line.setAttribute('transform', `rotate(${i * 90}, ${baseW / 2}, ${baseW / 2})`);
        dir.setAttribute('transform', `rotate(${i * 90}, ${baseW / 2}, ${baseW / 2})`);

        dial.append(line);
        dial.append(dir);
    }

    for (let y = 1; y <= 360; y++) {
        if (y == degree) {
            let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            let arrowLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            arrowLine.setAttribute('x1', baseW / 2);
            arrowLine.setAttribute('y1', radius / 2);
            arrowLine.setAttribute('x2', baseW / 2);
            arrowLine.setAttribute('y2', radius);
            arrowLine.setAttribute('style', 'stroke:var(--font-faded); stroke-width:2;');

            let arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            arrow.setAttribute('style', 'stroke:var(--font-faded); stroke-width:1; fill:var(--font-color);');
            arrow.setAttribute('points', `${baseW / 2},16 ${(baseW / 2) - 4},20 ${(baseW / 2) + 4},20`);

            let arrowButt = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            arrowButt.setAttribute('x1', baseW / 2);
            arrowButt.setAttribute('y1', 2.25 * radius);
            arrowButt.setAttribute('x2', baseW / 2);
            arrowButt.setAttribute('y2', radius);
            arrowButt.setAttribute('style', 'stroke:var(--font-faded); stroke-width:2;');

            let butt = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            butt.setAttribute('cx', baseW / 2);
            butt.setAttribute('cy', 2.3 * radius);
            butt.setAttribute('r', 0.05 * radius);
            butt.setAttribute('stroke', 'var(--font-faded)'); // #fff8ed
            butt.setAttribute('fill', 'none');
            butt.setAttribute('stroke-width', 2);

            g.append(arrowLine);
            g.append(arrow);
            g.append(arrowButt);
            g.append(butt);

            g.setAttribute('transform', `rotate(${y}, ${baseW / 2}, ${baseW / 2})`);

            dial.append(g);
        }
    }

    let vel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    vel.setAttribute('x', '50%');
    vel.setAttribute('y', '50%');
    vel.setAttribute('text-anchor', 'middle');
    vel.setAttribute('fill', 'var(--font-color)');
    vel.setAttribute('font-size', '1rem');
    vel.textContent = `${velocity.toFixed(0)} MPH`;

    let gusts = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    gusts.setAttribute('x', '50%');
    gusts.setAttribute('y', '60%');
    gusts.setAttribute('text-anchor', 'middle');
    gusts.setAttribute('fill', 'var(--font-color)');
    gusts.setAttribute('font-size', '0.5rem');
    gusts.textContent = `Gusts: ${gust.toFixed(0)} MPH`;

    dial.append(circle);
    dial.append(vel);
    dial.append(gusts);

    currentWind.innerHTML = '';
    currentWind.append(dial);
}
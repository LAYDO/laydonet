let currElement = document.getElementById('currentWeather');
let loader = document.getElementById('loader');
let elForecast = document.getElementById('dailyForecast');
let forecast = document.getElementById('forecast');
let map = document.getElementById('map');
let wMap = document.getElementById('weatherMap');
let celestialT = document.getElementById('celestialTop');
let celestial = document.getElementById('celestial');
let hourly = document.getElementById('hourly');
let hfc = document.getElementById('hfc');
let currentTemp = document.getElementById('current-temp');
// let currentTempC = document.getElementById('current-temp-c');
let currentIcon = document.getElementById('current-icon');
let currentHigh = document.getElementById('current-high');
let currentLow = document.getElementById('current-low');
let currentDesc = document.getElementById('tempTitle');
let currentCloud = document.getElementById('cloudsData');
let currentPressure = document.getElementById('pressureData');
let currentWind = document.getElementById('windData');
let currentGust = document.getElementById('gustData');
let currentHumid = document.getElementById('humidData');
let currentAqi = document.getElementById('aqiData');
let currentPM = document.getElementById('pmData');
let currentRain = document.getElementById('precipData');
let searches = document.getElementById('citySection');
let cityName = document.getElementById('cityName');
let now = new Date();
let colorSunrise = '#FFE600';
let colorSunset = '#FF8700';
let animID, place = 0;
let animMoonID, moonPos;

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
    this.loading = false;

    document.addEventListener('keyup', (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            getCurrentWeather();
        }
    });

    // datas.forEach(d => {
    //     document.getElementById(d.object).addEventListener('click', () => {
    //         let titleStr = Object.keys(d)[1];
    //         let title = document.getElementById(titleStr);
    //         if (document.getElementById(d.elements[0]).style.display != 'none') {
    //             title.innerText = d[titleStr][1];
    //             document.getElementById(d.elements[0]).style.display = 'none';
    //             document.getElementById(d.elements[1]).style.display = 'inherit';
    //         } else {
    //             title.innerText = d[titleStr][0];
    //             document.getElementById(d.elements[0]).style.display = 'inherit';
    //             document.getElementById(d.elements[1]).style.display = 'none';
    //         }
    //     })
    // });

    if (navigator.geolocation) {
        document.getElementById('citySearch').value = '';
        navigator.geolocation.getCurrentPosition(getCurrentWeather);
    } else {
        document.getElementById('forecast').innerHTML = 'Geolocation is not supported by this browser.';
    }
}

async function getCurrentWeather(position) {
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
        buildCurrent(data);
        buildMap(data.latitude, data.longitude);
        buildForecasts(data.forecast);
        buildHourly(data.hourly);
        buildCelestial(data.todaily, data.tomorrow);
        setInterval(celestialRemaining.bind(null, data), 1000);
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    })
}

function load() {
    if (this.loading) {
        loader.style.display = 'none';
        map.style.display = 'inherit';
        currElement.style.display = 'inherit';
        elForecast.style.display = 'inherit';
        celestialT.style.display = 'inherit';
        cityName.style.display = 'inherit';
        hfc.style.display = 'flex';
    } else {
        currElement.style.display = 'none';
        elForecast.style.display = 'none';
        map.style.display = 'none';
        celestialT.style.display = 'none';
        hfc.style.display = 'none';

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
    currentIcon.className = icons[data.weatherIcon];
    currentTemp.innerText = `${Math.round(data.temp)}\xB0 F`;
    // currentTempC.innerText = `${Math.round(data.tempC)}\xB0 C`;
    currentCloud.innerText = `${Math.round(data.clouds)} \u0025`;
    currentHigh.innerText = `H: ${Math.round(data.high)}\xB0`;
    currentLow.innerText = `L: ${Math.round(data.low)}\xB0`;
    currentDesc.innerText = `${data.weatherDesc}`;
    currentPressure.innerText = `${Math.round(data.pressure)} hPa`;
    currentWind.innerText = `${Math.round(data.windSpeed)} ${windDirection(data.windDeg)}`;
    currentGust.innerText = `${Math.round(data.windGust)} mph`;
    currentHumid.innerText = `${data.humidity}\u0025`;
    currentAqi.innerText = `${data.aqi}`;
    currentPM.innerText = `${data.pm25}`;
    currentRain.innerText = `${Math.round(data.rain * 100)}\u0025`;
};

function windDirection(deg) {
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

    celestial.addEventListener('scroll', celestialTriggers.bind(null, data, place, moonPos));
    animID = window.requestAnimationFrame(generateSun.bind(null, data, place));
    // animMoonID = window.requestAnimationFrame(generateMoonPhase.bind(null, data.moon_phase, moonPos));

}

function celestialTriggers(data, place, moonPos) {
    let sunDiv = document.getElementById('sun');
    let sunTrigger = sunDiv.getBoundingClientRect();
    let moonDiv = document.getElementById('moon');
    let moonTrigger = moonDiv.getBoundingClientRect();

    if (sunTrigger.left >= 0) {
        animID = window.requestAnimationFrame(generateSun.bind(null, data, place));
    }

    if (moonTrigger.left <= 0) {
        animMoonID = window.requestAnimationFrame(generateMoonPhase.bind(null, data.moon_phase, moonPos));
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
    let sunElement = document.getElementById('sunGraphic');
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
    drawTextAlongArc(ctx, 'MIDNIGHT', radius * 0.85, 0.3 * Math.PI);
    drawTextAlongArc(ctx, 'NOON', -radius * 0.95, 0.25 * Math.PI);

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
    let element = document.getElementById('moonGraphic');
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

    let sunRemain = document.getElementById('sunRemaining');
    let moonRemain = document.getElementById('moonRemaining');

    if (sunrise > sunset) {
        if (n < sunset) {
            let diff = Math.abs(sunset - n);
            plugDiff(diff, sunRemain, 'Sunset');
        } else {
            let diff = Math.abs(sunrise - n);
            plugDiff(diff, sunRemain, 'Sunrise');
        }
    } else {
        let diff = Math.abs(sunrise - n);
        plugDiff(diff, sunRemain, 'Sunrise');
    }


    if (moonset < moonrise) {
        if (n < moonset) {
            let diff = Math.abs(moonset - n);
            plugDiff(diff, moonRemain, 'Moonset');
        } else {
            let diff = Math.abs(moonrise - n);
            plugDiff(diff, moonRemain, 'Moonrise');

        }
    } else {
        if (n < moonrise) {
            let diff = Math.abs(moonrise - n);
            plugDiff(diff, moonRemain, 'Moonrise');
        } else {
            let diff = Math.abs(moonset - n);
            plugDiff(diff, moonRemain, 'Moonset');

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
    div.innerText = `${hours}h ${mins}m ${secs}s\n until ${text}`;
}

function hourlyText(h) {
    if (h > 12) {
        return `${h - 12} PM`;
    } else if (h == 12) {
        return "Noon";
    } else if (h == 0) {
        return "MidNi";
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
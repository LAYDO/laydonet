"use strict";
let MAPBOX_ACCESS_TOKEN;
let OPENWEATHERMAP_ACCESS_TOKEN;
async function fetchTokens() {
    let response = await fetch('api/tokens');
    let tokens = await response.json();
    MAPBOX_ACCESS_TOKEN = tokens['mapbox_access_token'];
    OPENWEATHERMAP_ACCESS_TOKEN = tokens['open_weather_api_key'];
}
class WMap {
    constructor() {
        this.mapElement = document.getElementById('map');
        this.mapTitle = document.createElement('div');
        this.mapTitle.className = 'container-title';
        let span = document.createElement('span');
        span.className = 'fas fa-map pad-right';
        this.mapTitle.append(span);
        this.mapTitle.append('Weather Map');
        this.map = document.createElement('div');
        this.map.id = 'weatherMap';
        this.map.className = 'map-container';
        this.mapElement.append(this.mapTitle);
        this.mapElement.append(this.map);
        (async () => {
            await fetchTokens();
        })();
    }
    toggle(loaded) {
        if (loaded) {
            this.mapElement.style.display = 'inherit';
        }
        else {
            this.mapElement.style.display = 'none';
        }
    }
    populate(lat, lon) {
        this.map.innerHTML = '<div id="mapid"></div>'; // kudos to Artem Kovalov for this fix
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
            accessToken: MAPBOX_ACCESS_TOKEN,
        }).addTo(weatherMap);
        let precipMap = L.tileLayer(`http://maps.openweathermap.org/maps/2.0/weather/PR0/{z}/{x}/{y}?appid={accessToken}`, {
            attribution: '&copy; <a href="https://openweathermap.org/api">OWM</a>',
            opacity: 0.5,
            accessToken: OPENWEATHERMAP_ACCESS_TOKEN,
        }), windMap = L.tileLayer(`http://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?appid={accessToken}&use_norm=true&arrow_step=16`, {
            attribution: '&copy; <a href="https://openweathermap.org/api">OWM</a>',
            accessToken: OPENWEATHERMAP_ACCESS_TOKEN,
        }), cloudMap = L.tileLayer(`http://maps.openweathermap.org/maps/2.0/weather/CL/{z}/{x}/{y}?appid={accessToken}`, {
            attribution: '&copy; <a href="https://openweathermap.org/api">OWM</a>',
            opacity: 0.8,
            accessToken: OPENWEATHERMAP_ACCESS_TOKEN,
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
    }
}

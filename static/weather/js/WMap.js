"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WMap = void 0;
const L = __importStar(require("leaflet"));
let MAPBOX_ACCESS_TOKEN;
let OPENWEATHERMAP_ACCESS_TOKEN;
function fetchTokens() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('api/tokens');
        let tokens = yield response.json();
        MAPBOX_ACCESS_TOKEN = tokens['mapbox_access_token'];
        OPENWEATHERMAP_ACCESS_TOKEN = tokens['open_weather_api_key'];
    });
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
        (() => __awaiter(this, void 0, void 0, function* () {
            yield fetchTokens();
        }))();
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
exports.WMap = WMap;

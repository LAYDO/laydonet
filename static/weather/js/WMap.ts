class WMap {
    public mapElement: HTMLElement;
    private mapTitle: HTMLElement;
    private map: HTMLElement;

    constructor() {
        this.mapElement = document.getElementById('map')!;

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
    }

    toggle(loaded: Boolean) {
        if (loaded) {
            this.mapElement.style.display = 'inherit';
        } else {
            this.mapElement.style.display = 'none';
        }
    }

    populate(lat: number, lon: number) {
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

    }

    //     <div class="container-title" > <span class="fas fa-map pad-right" > </span>Weather Map</div >
    // <div id="weatherMap" class="map-container" > </div>
}
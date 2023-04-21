const updateInterval = 5000;

async function fetchCurrentPosition(satelliteId) {
    return fetch(`/orbiter/api/satellite/${satelliteId}/current_position/`)
        .then((response) => {
            return response.text();
        }).then((responseText) => {
            return JSON.parse(responseText);
        }).then((data) => {
            return data;
        });
}

async function fetchTrajectory(satelliteId) {
    return fetch(`/orbiter/api/satellite/${satelliteId}/trajectory/`)
        .then((response) => {
            return response.text();
        }).then((responseText) => {
            return JSON.parse(responseText);
        }).then((data) => {
            return data;
        });
}

document.addEventListener('DOMContentLoaded', async function () {
    const mapElement = document.getElementById('orbiterMap');
    const satelliteId = mapElement.dataset.satelliteId;
    if (typeof satelliteId !== 'undefined') {
        const currentPosition = await fetchCurrentPosition(satelliteId);
        const trajectory = await fetchTrajectory(satelliteId);

        const mapData = createMap(
            currentPosition.longitude,
            currentPosition.latitude,
            trajectory.past,
            trajectory.future,
        );

        const map = mapData.map;
        const currentPositionFeature = mapData.currentPositionFeature;

        setInterval(async () => {
            const currentPosition = await fetchCurrentPosition(satelliteId);

            currentPositionFeature.getGeometry().setCoordinates(ol.proj.fromLonLat([currentPosition.longitude, currentPosition.latitude]));
            map.getView().setCenter(ol.proj.fromLonLat([currentPosition.longitude, currentPosition.latitude]));

        }, updateInterval);
    }
});

function createMap(lon, lat, past_positions, future_positions) {
    // Create the map instance and set the view
    const map = new ol.Map({
        target: 'orbiterMap',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([lon, lat]),
            zoom: 1,
        }),
    });

    // Add the current position marker
    const currentPositionFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
    });

    const currentPositionLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [currentPositionFeature],
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({ color: 'red' }),
            }),
        }),
    });

    map.addLayer(currentPositionLayer);

    // Create function to add dot markers for positions
    const addPositionMarkers = (positions, color) => {
        const features = positions.map(
            (pos) => new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(pos)))
        );

        const layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: features,
            }),
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 3,
                    fill: new ol.style.Fill({ color: color }),
                }),
            }),
        });

        map.addLayer(layer);
    };

    // Add yellow dots for past positions
    addPositionMarkers(past_positions, 'yellow');

    // Add blue dots for future positions
    addPositionMarkers(future_positions, 'blue');

    return {
        map: map,
        currentPositionFeature: currentPositionFeature
    };
}


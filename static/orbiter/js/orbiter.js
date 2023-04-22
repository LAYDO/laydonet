const updateInterval = 5000;

async function fetchCurrentPosition(satelliteId) {
    return fetch(`/orbiter/api/satellite/${satelliteId}/current_position/`)
        .then(response => response.json())
        .then(data => data);
}

async function fetchTrajectory(satelliteId) {
    return fetch(`/orbiter/api/satellite/${satelliteId}/trajectory/`)
        .then(response => response.json())
        .then(data => data);
}

function createMap(lon, lat, past_positions, future_positions) {
    past_positions.push([lon, lat]);
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

    function addPositionMarkers(layer, positions) {
        const features = positions.map(
            pos => new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(pos)))
        );
        layer.getSource().addFeatures(features);
    };

    const pastTrajectoryLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 3,
                fill: new ol.style.Fill({ color: 'yellow' }),
            }),
        }),
    });

    map.addLayer(pastTrajectoryLayer);
    addPositionMarkers(pastTrajectoryLayer, past_positions);

    const futureTrajectoryLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 3,
                fill: new ol.style.Fill({ color: 'blue' }),
            }),
        }),
    });

    map.addLayer(futureTrajectoryLayer);
    addPositionMarkers(futureTrajectoryLayer, future_positions);

    return {
        map: map,
        currentPositionFeature: currentPositionFeature,
    };
}

document.addEventListener('DOMContentLoaded', async function () {
    const mapElement = document.getElementById('orbiterMap');
    const satelliteId = mapElement.dataset.satelliteId;
    if (typeof satelliteId !== 'undefined') {
        const currentPosition = await fetchCurrentPosition(satelliteId);
        const trajectory = await fetchTrajectory(satelliteId);

        const { map, currentPositionFeature } = createMap(
            currentPosition.longitude,
            currentPosition.latitude,
            trajectory.past,
            trajectory.future,
        );

        setInterval(async () => {
            const currentPosition = await fetchCurrentPosition(satelliteId);
            currentPositionFeature.getGeometry().setCoordinates(ol.proj.fromLonLat([currentPosition.longitude, currentPosition.latitude]));
            map.getView().setCenter(ol.proj.fromLonLat([currentPosition.longitude, currentPosition.latitude]));
        }, updateInterval);
    }
});


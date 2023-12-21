import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj';
import { Circle, Fill, Style } from 'ol/style';
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
    const map = new Map({
        target: 'orbiterMap',
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
        ],
        view: new View({
            center: fromLonLat([lon, lat]),
            zoom: 1,
        }),
    });

    const currentPositionFeature = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
    });

    const currentPositionLayer = new VectorLayer({
        source: new VectorSource({
            features: [currentPositionFeature],
        }),
        style: new Style({
            image: new Circle({
                radius: 5,
                fill: new Fill({ color: 'red' }),
            }),
        }),
    });

    map.addLayer(currentPositionLayer);

    function addPositionMarkers(layer, positions) {
        const features = positions.map(
            pos => new Feature(new Point(fromLonLat(pos)))
        );
        layer.getSource().addFeatures(features);
    };

    const pastTrajectoryLayer = new VectorLayer({
        source: new VectorSource(),
        style: new Style({
            image: new Circle({
                radius: 3,
                fill: new Fill({ color: 'yellow' }),
            }),
        }),
    });

    map.addLayer(pastTrajectoryLayer);
    addPositionMarkers(pastTrajectoryLayer, past_positions);

    const futureTrajectoryLayer = new VectorLayer({
        source: new VectorSource(),
        style: new Style({
            image: new Circle({
                radius: 3,
                fill: new Fill({ color: 'blue' }),
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
            currentPositionFeature.getGeometry().setCoordinates(fromLonLat([currentPosition.longitude, currentPosition.latitude]));
            map.getView().setCenter(fromLonLat([currentPosition.longitude, currentPosition.latitude]));
        }, updateInterval);
    }
});


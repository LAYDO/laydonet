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

    return map;
}




document.addEventListener('DOMContentLoaded', function () {
    const mapElement = document.getElementById('orbiterMap');
    const satelliteId = mapElement.dataset.satelliteId;
    if (typeof satelliteId !== 'undefined') {
        fetch(`/orbiter/api/satellite/${satelliteId}/positions/`)
            .then((response) => {
                return response.text();
            })
            .then((responseText) => {
                return JSON.parse(responseText);
            })
            .then((data) => {
                console.log('Satellite positions received:', data);
                const map = createMap(
                    data.current.longitude,
                    data.current.latitude,
                    data.positions.past,
                    data.positions.future,);
            });
    }
});


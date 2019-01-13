(function(tomtom) {
    // Define your product name and version
    tomtom.setProductInfo('Codepen Examples', '4.46.3');
    // Setting the TomTom keys
    tomtom.routingKey('9eA3U6IaQC3t12wT4NNgNmvdpWiGw9bn');
    tomtom.searchKey('9eA3U6IaQC3t12wT4NNgNmvdpWiGw9bn');
    // Creating map
    var map = tomtom.L.map('map', {
        key: '9eA3U6IaQC3t12wT4NNgNmvdpWiGw9bn',
        source: 'vector',
        basePath: '../sdk'
    });
    map.zoomControl.setPosition('topright');
    var unitSelector = tomtom.unitSelector.getHtmlElement(tomtom.globalUnitService);
    var languageSelector = tomtom.languageSelector.getHtmlElement(tomtom.globalLocaleService, 'search');
    var unitRow = document.createElement('div');
    var unitLabel = document.createElement('label');
    unitLabel.innerHTML = 'Unit of measurement';
    unitLabel.appendChild(unitSelector);
    unitRow.appendChild(unitLabel);
    unitRow.className = 'input-container';
    var langRow = document.createElement('div');
    var langLabel = document.createElement('label');
    langLabel.innerHTML = 'Search language';
    langLabel.appendChild(languageSelector);
    langRow.appendChild(langLabel);
    langRow.className = 'input-container';
    tomtom.controlPanel({
        position: 'bottomright',
        title: 'Settings',
        collapsed: true
    })
        .addTo(map)
        .addContent(unitRow)
        .addContent(langRow);
    // Creating route inputs widget
    var routeInputsInstance = tomtom.routeInputs()
        .addTo(map);
    // Creating route widget
    var routeOnMapView = tomtom.routeOnMap({
        generalMarker: {draggable: true}
    }).addTo(map);
    // Creating route summary widget
    var routeSummaryInstance = tomtom.routeSummary({
        size: [240, 230],
        position: 'topleft'
    }).addTo(map);
    // Connecting the route inputs widget with the route widget
    routeInputsInstance.on(routeInputsInstance.Events.LocationsFound, function(eventObject) {
        var first_lat = eventObject.points[0]["lat"]
        var first_lon = eventObject.points[0]["lon"]
        var sec_lat = eventObject.points[1]["lat"]
        var sec_lon = eventObject.points[1]["lon"]      
        console.log(eventObject.points)
        console.log(eventObject.points[eventObject.points.length-1])
        var hostname = `/transportlocation/?lat1=${first_lat},lon1=${first_lon},lat2={sec_lat},lon2={sec_lon}`;
        console.log(hostname);
        window.location.replace(hostname)
        // routeOnMapView.draw(eventObject.points);
    });
    routeInputsInstance.on(routeInputsInstance.Events.LocationsCleared, function(eventObject) {
        routeSummaryInstance.hide();
        routeOnMapView.draw(eventObject.points);
    });
    // Connecting the route widget with the route summary widget
    routeOnMapView.on(routeOnMapView.Events.RouteChanged, function(eventObject) {
        routeSummaryInstance.updateSummaryData(eventObject.object);
    });
    // Update the searchbox inputs when the user drag the markers
    routeOnMapView.on(routeOnMapView.Events.MarkerDragEnd, function(eventObject) {
        var location = eventObject.markerIndex === 0 ? routeInputsInstance.searchBoxes[0] :
            routeInputsInstance.searchBoxes.slice(-1)[0];
        location.setResultData(eventObject.object);
    });
    routeSummaryInstance.on()
})(tomtom);


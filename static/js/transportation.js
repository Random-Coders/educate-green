function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    console.log("reading file")
    rawFile.send(null);
}
readTextFile('../../secrets.txt')
// Define your product name and version
tomtom.setProductInfo('Codepen Examples', '4.46.3');
// Setting TomTom keys
tomtom.routingKey('9eA3U6IaQC3t12wT4NNgNmvdpWiGw9bn');
tomtom.searchKey('9eA3U6IaQC3t12wT4NNgNmvdpWiGw9bn');
// Creating map
var map = tomtom.L.map('map', {
    key: '9eA3U6IaQC3t12wT4NNgNmvdpWiGw9bn',
    source: 'vector',
    basePath: '../../templates/sdk'
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
// Adding the route inputs fields widget
var routeInputs = tomtom.routeInputs().addTo(map);
// Adding the route widget
var routeOnMapView = tomtom.routeOnMap().addTo(map);
// Connecting the routeInputs widget with the routeOnMap widget
routeInputs.on(routeInputs.Events.LocationsFound, function(eventObject) {
    routeOnMapView.draw(eventObject.points);
});
routeInputs.on(routeInputs.Events.LocationsCleared, function(eventObject) {
    routeOnMapView.draw(eventObject.points);
});
// Show error in widget when location cannot be autodetected
routeInputs.on(routeInputs.Events.LocationError, function() {
    routeInputs.showLocationNotFoundMessageBox();
});
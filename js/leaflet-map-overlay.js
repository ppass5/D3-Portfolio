// leaflet-map-overlay.js

var map = L.map("map").setView([38.01, -95.84], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 15,
	attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
}).addTo(map);

L.geoJson(statesData).addTo(map);

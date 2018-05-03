// leaflet-map-interactive.js

function addColor(n) {
  return  n > 6 ? "#005824" :
          n > 5 ? "#238b45" :
          n > 4 ? "#41ae76" :
          n > 3 ? "#66c2a4" :
          n > 2 ? "#99d8c9" :
          n > 1 ? "#ccece6" :
                  "#edf8fb"
}

function style(features) {
	return {
    fillColor: addColor(features.properties.teams),
    weight: 2,
    opacity: 1,
    color: "#ffffff",
    dashArray: '3',
    fillOpacity: 0.9
  };
};


// Count teams from each state
var stateCount = {};

for (i = 0; i < ncaaTeams.length; i++) {
  var state = ncaaTeams[i]["state"];
  if (stateCount[state]) {
    stateCount[state] += 1;
  } else {
    stateCount[state] = 1;
  }
};


// Add team count data to statesData object
for (i = 0; i < statesData["features"].length; i++) {
	var state = statesData["features"][i]["properties"]["name"];
	statesData["features"][i]["properties"]["teams"] = stateCount[state] || 0;
}


// Leaflet setup
var map = L.map("map").setView([38.01, -95.84], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 15,
	attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
}).addTo(map);

// Add GeoJSON overlay
L.geoJson(statesData, {style: style}).addTo(map);


// Adding a legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
        teams = [1, 2, 3, 4, 5, 7];
        // skipped 6 (since no states with 6)

    // loop through teams to create legend
    for (var i = 0; i < teams.length; i++) {

      // Our template:
      // <span style="background: #<value>"></span> #

      div.innerHTML +=
        "<span style='background:" + addColor(teams[i] + 1) + "'></span> " +
        teams[i] + "<br>";
    }

    return div;
};

legend.addTo(map);

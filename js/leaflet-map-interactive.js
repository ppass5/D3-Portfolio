

function addColor(n){
  return n > 5001 && n < 6000 ? "#bfd3e6":
         n > 4001 && n < 5000 ? "#9ebcda":
         n > 3001 && n < 4000 ? "#8c96c6":
         n > 2001 && n < 3000 ? "#8856a7":
         n > 1001 && n < 2000 ? "#810f7c":
         n > 0 && n < 1000 ?    "#edf8fb":
                                "#000000"
};

function style(feature) {
	return {
    fillColor: addColor(feature.properties.teams),
    weight: 2,
    opacity: 1,
    color: "#eeeeee",
    dashArray: '3',
    fillOpacity: 0.7
  };
};

// Interactive functions

// what happens when we mouseover
function highlightState(event) {
  var layer = event.target;

  layer.setStyle({
    weight: 4,
    color: "#999",
    dashArray: "",
    fillOpacity: 0.9
  });

  info.update(layer.feature.properties)

  // issues for other browsers:
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

// what happens when we mouseout
function resetHighlight(event) {
  geoJson.resetStyle(event.target);
  info.update();
}

// combine our features for one property in the geojson method
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightState,
    mouseout: resetHighlight
  });
}


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
// Modify to include variable, interactivity functions
var geoJson = L.geoJson(statesData,
  {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

// Add Legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
        teams = [1, 2, 3, 4, 5, 7];

    for (var i = 0; i < teams.length; i++) {
      div.innerHTML +=
        "<span style='background:" + addColor(teams[i] + 1) + "'></span> " +
        teams[i] + "<br>";
    }

    return div;
};

legend.addTo(map);



// Add Info Box

var info = L.control();

info.onAdd = function(map) {
  this.div = L.DomUtil.create("div", "info");
  this.update();
  return this.div;
};

// update the info box based on data
info.update = function(properties) {
  this.div.innerHTML = "<p>NCAA Teams</p>" + (properties ?
  "<p><strong>State</strong>: " + properties.name +
  "<strong>Teams:</strong> " + properties.teams + "</p>" :
  "Hover over a state.") // option when no details showing
};

info.addTo(map);

function addColor(n){
   return n > 5001 && n < 6000 ? "#bfd3e6":
          n > 4001 && n < 5000 ? "#9ebcda":
          n > 3001 && n < 4000 ? "#8c96c6":
          n > 2001 && n < 3000 ? "#8856a7":
          n > 1001 && n < 2000 ? "#810f7c":
          n > 0 && n < 1000 ?    "#edf8fb":
                                 "#000000"
 }

     //adding style
 function style(features) {
   return {
     fillColor: addColor(features.properties.students),
     weight: 1,
     opacity: 1,
     color: "#000000",
     dashArray: '3',
     fillOpacity: 0.7
   };
 }



     //counting students
 var studentCount = studentTotals.length;

 for (i = 0; i < studentTotals.length; i++){
   var students = studentTotals[i]["students"];
   if (studentCount[students]){
     studentCount[students] += 1;
   }else {
     studentCount[students] = 1;
       console.log(studentCount);
   }
 }




     //counting students
 for (i = 0; i < districtData["features"].length; i++) {
   var students = districtData["features"][i]["properties"]["name"];
   districtData["features"][i]["properties"]["students"] = studentCount[students] || 0;
   console.log("i work too");
 }


   //making the map
 var map = L.map("map").setView([27.6001253, -83.2468004], 6);

 L.tileLayer("https://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}", {
   maxZoom: 19,
   attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
 }).addTo(map);

     //adding geojson
 L.geoJson(districtData, {style: style}).addTo(map);

// Creating map object
var map = L.map("map", {
  center: [38., -96.],
  //center: [0,0],
  zoom: 4
});

L.tileLayer("https://api.mapbox.com/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  tileSize: 512,
  maxZoom: 18,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(map);


// Our style object
var mapStyle = {
  color: "white",
  fillColor: "pink",
  fillOpacity: 0.5,
  weight: 1.5
};

d3.json("static/resource/all_us_diocese.json", function(data) {
  // Creating a GeoJSON layer with the retrieved data
  var coords;
  console.log(data.features.dioceses)
  for (var i=0; i<data.features.dioceses.length; i++) {
  		if(data.features.dioceses[i].geometry.coordinates[0].length>1){
			console.log(data.features.dioceses[i].name)
			console.log(data.features.dioceses[i].geometry.coordinates[0].length)
		}
  		var polygons = L.polygon(data.features.dioceses[i].geometry.coordinates, {
  			color: '#0000FF',
			weight: 2,
			opacity: 0.2,
  			fillColor: '#0000FF',
  			fillOpacity: 0.2,
  			weight: 1
		}) //.addTo(map);
		polygons.addTo(map);
		//polygons.setStyle({fillColor: '#0000FF',fillOpacity:"0.5"});
		polygons.on('mouseover', function(ev) {
                	//console.log(ev.target); // ev is an event object (MouseEvent in this case)
                        ev.target.setStyle({fillOpacity:0.5});
			//console.log(ev.target.getBounds()); //useful to zoom into

        	}).on('mouseout', function(ev) {
			ev.target.setStyle({fillOpacity:0.2});
		});
   }
});

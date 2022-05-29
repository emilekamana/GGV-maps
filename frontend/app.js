
//  Initialize map
async function initMap(){

  // Fetch data from the backend
  const transponders = await fetch(`http://localhost:3000/api/transponder`).then(response => response.json())
  .then(data => {return data}).catch((error) => {
    console.error('Error:', error);
  });;

  // Create map with default values to show if there are no transponders
  var mapOptions = {
    center: {lat: -1.9306 , lng:30.1529 },
    zoom: 10
  }
  map = new google.maps.Map(document.getElementById("map"),mapOptions)

  newTransponder = document.createElement('div');

  // Check if there are trasponders
  if(typeof transponders == 'object' && transponders.length > 0){
    
    // Switch center of the map to intially show a transponder 
    map.setCenter({lat: transponders[0].latitude , lng:transponders[0].longitude });

    var infowindow = new google.maps.InfoWindow();
    markers = []
    incrementer = 0

    // Loop through all transponders returned
    transponders.forEach(function(transponder) {

      // Add a marker on each transponder
      const marker = new google.maps.Marker({
        position:{lat: transponder.latitude, lng: transponder.longitude},
        map:map,
        icon:"public/assets/images/icons8-signal-32.png"
      });

      // Circle the radius to show the reach
      const circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.6,
        strokeWeight: 1,
        fillColor: "#FF0000",
        fillOpacity: 0.05,
        map,
        center: {lat: transponder.latitude, lng: transponder.longitude},
        radius: transponder.radius,
      });

      // Check if the transponder has a name and if not give it an incremented name
      if(!transponder.name){
        transponder.name = "Transponder " + (incrementer++);
      }

      // Add click listener on marker to show details of the transponder
      google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          infowindow.setContent(transponder.name+ "<br>" +transponder.latitude + "\u00B0 N," + transponder.longitude + "\u00B0 E" + "<br>radius:" + transponder.radius + "m");
          infowindow.open(map, marker);
        }
      })(marker));

      // Markup for listing transponder on side bar  
      newTransponder.innerHTML =`<div class="card text-bg-light mt-2 mb-2 mx-auto" style="max-width: 95%;">
        <div class="card-body">
          <h5 class="card-title">${transponder.name}</h5>
          <p class="card-text">latitude: ${transponder.latitude} °N<br>longitude: ${transponder.longitude} °E<br>radius: ${transponder.radius} </p>
        </div>
        </div>
        `
      // Add listeners to show clicked transponder on the map
      newTransponder.addEventListener("click", function(){
        infowindow.setContent(transponder.name+ "<br>" +transponder.latitude + "\u00B0 N," + transponder.longitude + "\u00B0 E"  + "<br>radius:" + transponder.radius + "m");
        infowindow.open(map, marker);
        map.setCenter({lat: transponder.latitude, lng: transponder.longitude});
        close_sidebar();
      }, false);
    })
  }else{
  // Markup for when there are no transponders
  newTransponder.innerHTML =`<div class="card text-bg-light mt-2 mb-2 mx-auto" style="max-width: 95%;">
        <div class="card-body">
          <p class="card-text">No transponders added yet!</p>
        </div>
        </div>
        `
  }
  document.getElementById('transponders').appendChild(newTransponder);
}

// Open the sidebar and different paramaters based on window size
function open_sidebar() {
  var breakpoint = window.matchMedia("(max-width: 700px)")
  if(breakpoint.matches){
    document.getElementById("sidebar").style.width = "100%";
    document.getElementById("main").style.display = "none";
  }
  document.getElementById("sidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
  
}

// Close the sidebar and reset all styles to their initial
function close_sidebar() {
  document.getElementById("main").style.display = "initial";
  document.getElementById("sidebar").style.display = "none";
  document.getElementById("sidebar").style.width = "25%";
  document.getElementById("openNav").style.display = "inline-block";
}
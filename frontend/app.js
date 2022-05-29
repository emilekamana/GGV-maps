async function initMap(){
  const transponders = await fetch(`http://localhost:3000/api/transponder`).then(response => response.json())
  .then(data => {return data}).catch((error) => {
    console.error('Error:', error);
  });;

  var options = {
    center: {lat: -1.9306 , lng:30.1529 },
    zoom: 10
  }
  map = new google.maps.Map(document.getElementById("map"),options)

  newTransponder = document.createElement('div');

  if(typeof transponders == 'object' && transponders.length > 0){
    console.log("first option")
    map.setCenter({lat: transponders[0].latitude , lng:transponders[0].longitude });

    var infowindow = new google.maps.InfoWindow();
    markers = []
    incrementer = 0
    transponders.forEach(function(transponder) {
      const marker = new google.maps.Marker({
        position:{lat: transponder.latitude, lng: transponder.longitude},
        map:map,
        icon:"public/assets/images/icons8-signal-32.png"
      });


      const circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: {lat: transponder.latitude, lng: transponder.longitude},
        radius: transponder.radius,
      });
      google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          infowindow.setContent(transponder.name+ "<br>" +transponder.latitude + "\u00B0 N," + transponder.longitude + "\u00B0 E");
          infowindow.open(map, marker);
        }
      })(marker));
      if(!transponder.name){
        transponder.name = "Transponder " + (incrementer++);
      }

      newTransponder.innerHTML =`<div class="card text-bg-light mt-2 mb-2 mx-auto" style="max-width: 95%;">
        <div class="card-body">
          <h5 class="card-title">${transponder.name}</h5>
          <p class="card-text">latitude: ${transponder.latitude} <br>longitude: ${transponder.longitude} <br>radius: ${transponder.radius} </p>
        </div>
        </div>
        `
        newTransponder.addEventListener("click", function(){
          infowindow.setContent(transponder.name+ "<br>" +transponder.latitude + "\u00B0 N," + transponder.longitude + "\u00B0 E");
          infowindow.open(map, marker);
          map.setCenter({lat: transponder.latitude, lng: transponder.longitude});
          close_sidebar();
        }, false);
        document.getElementById('transponders').appendChild(newTransponder);
      
  })
  }else{
  newTransponder.innerHTML =`<div class="card text-bg-light mt-2 mb-2 mx-auto" style="max-width: 95%;">
        <div class="card-body">
          <p class="card-text">No transponders added yet!</p>
        </div>
        </div>
        `
  document.getElementById('transponders').appendChild(newTransponder);
  }
}

function open_sidebar() {
  var breakpoint = window.matchMedia("(max-width: 700px)")
  if(breakpoint.matches){
    document.getElementById("sidebar").style.width = "100%";
    document.getElementById("main").style.display = "none";
  }
  document.getElementById("sidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
  
}

function close_sidebar() {
  document.getElementById("main").style.display = "initial";
  document.getElementById("sidebar").style.display = "none";
  document.getElementById("sidebar").style.width = "25%";
  document.getElementById("openNav").style.display = "inline-block";
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
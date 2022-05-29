
// function getTransponders(){
//   try {
//     .then(response => {console.log(response.data);return response.data});


//     // const transponders = response.data;

//     // console.log(`GET: Here's the list of todos`, todoItems);

//     // return transponders;
//   } catch (errors) {
//     console.error(errors);
//   }
// }


async function initMap(){
  const transponders = await fetch(`http://localhost:3000/api/transponder`).then(response => response.json())
  .then(data => {return data}).catch((error) => {
    console.error('Error:', error);
  });;
  if(typeof transponders == 'object' && transponders.length > 0){
    console.log("first option")
    var options = {
    center: {lat: transponders[0].latitude , lng:transponders[0].longitude },
    zoom: 10
    }
    map = new google.maps.Map(document.getElementById("map"),options)
    var infowindow = new google.maps.InfoWindow();
    markers = []
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
          infowindow.setContent(transponder.latitude + "\u00B0 N," + transponder.longitude + "\u00B0 E");
          infowindow.open(map, marker);
        }
      })(marker));
  }) 
  }else{
    console.log("second option")
    var options = {
      center: {lat: -1.9306 , lng:30.1529 },
      zoom: 10
    }
    map = new google.maps.Map(document.getElementById("map"),options)
    infoWindow = new google.maps.InfoWindow();
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         const pos = {
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude,
    //         };
    //         infoWindow.setPosition(pos);
    //         infoWindow.setContent("Location found.");
    //         infoWindow.open(map);
    //         map.setCenter(pos);
    //       },
    //       () => {
    //         handleLocationError(true, infoWindow, map.getCenter());
    //         console.log("Not located");
    //       }
    //     );
    //   } else {
    //     // Browser doesn't support Geolocation
    //     handleLocationError(false, infoWindow, map.getCenter());
    //   }
  }
  // map = new google.maps.Map(document.getElementById("map"),options)
  //   // Map option

  //   var options = {
  //       center: {lat: 38.3460 , lng:-0.4907 },
  //       zoom: 10
  //   }

  //   //New Map
  //   // map = new google.maps.Map(document.getElementById("map"),options)
  //   // infoWindow = new google.maps.InfoWindow();
  //   // if (navigator.geolocation) {
  //   //     navigator.geolocation.getCurrentPosition(
  //   //       (position) => {
  //   //         const pos = {
  //   //           lat: position.coords.latitude,
  //   //           lng: position.coords.longitude,
  //   //         };
  //   //         infoWindow.setPosition(pos);
  //   //         infoWindow.setContent("Location found.");
  //   //         infoWindow.open(map);
  //   //         map.setCenter(pos);
  //   //       },
  //   //       () => {
  //   //         handleLocationError(true, infoWindow, map.getCenter());
  //   //         console.log("Not located");
  //   //       }
  //   //     );
  //   //   } else {
  //   //     // Browser doesn't support Geolocation
  //   //     handleLocationError(false, infoWindow, map.getCenter());
  //   //   }

  //     const marker = new google.maps.Marker({
  //       position:{lat: 37.9922, lng: -1.1307},
  //       map:map,
  //       icon:"public/assets/images/icons8-signal-32.png"
  //       });

  //       const cityCircle = new google.maps.Circle({
  //         strokeColor: "#FF0000",
  //         strokeOpacity: 0.8,
  //         strokeWeight: 2,
  //         fillColor: "#FF0000",
  //         fillOpacity: 0.35,
  //         map,
  //         center: {lat: 37.9922, lng: -1.1307},
  //         radius: 4 * 1000,
  //       });
}

function open_sidebar() {
  document.getElementById("sidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
}

function close_sidebar() {
  document.getElementById("sidebar").style.display = "none";
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
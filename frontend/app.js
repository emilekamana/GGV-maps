function initMap(){
    // Map option
    var options = {
        center: {lat: 38.3460 , lng:-0.4907 },
        zoom: 10
    }

    //New Map
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

      const marker = new google.maps.Marker({
        position:{lat: 37.9922, lng: -1.1307},
        map:map,
        icon:"public/assets/images/icons8-signal-32.png"
        });

        const cityCircle = new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map,
          center: {lat: 37.9922, lng: -1.1307},
          radius: 4 * 1000,
        });
}

function open_sidebar() {
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
  }

function close_sidebar() {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
  }
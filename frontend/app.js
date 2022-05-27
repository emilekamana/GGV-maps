function initMap(){
    // Map option
    var options = {
        center: {lat: 38.3460 , lng:-0.4907 },
        zoom: 10
    }

    //New Map
    map = new google.maps.Map(document.getElementById("map"),options)
    infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
            console.log("Not located");
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
}

function open_sidebar() {
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
  }

function close_sidebar() {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
  }
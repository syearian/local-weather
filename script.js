$(document).ready(function() {

  var lat = 0;
  var lon = 0;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
    });
  }

});
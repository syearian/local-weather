$(document).ready(function() {

  var lat = 0;
  var lon = 0;
  var apiUrl = "";
  var colors = {
    "thunderstorm" : "",
    "drizzle" : "",
    "rain" : "",
    "snow" : "",
    "atmosphere" : "",
    "clear" : "",
    "clouds" : "",
  };
 
  
  getLocation();
  getWeather(lat, lon);

});

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;        
        });
      }
  } // Get client location data

  function getWeather(lat, lon) {
    apiUrl = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&APPID=cfc2eaa1c51253a29ce7206e1aad37c9";
    $.getJSON(apiUrl, function(data) {
      $("#city").html(data.name);      
      $("#temp").html('<i class="wi wi-thermometer"></i> ' + data.main.temp + ' <i class="wi wi-fahrenheit"></i>');
      var id = data.weather[0].id;
      $("#icon").addClass("wi-owm-" + id);
      $("#description").html(data.weather[0].description);
      $("#humidity").html('<i class="wi wi-humidity"></i> ' + data.main.humidity + "&#37;");
      var windDir = Math.round(data.wind.deg);
      $("#wind").html('<i class="wi wi-wind from-' + windDir + '-deg"></i> ' + data.wind.speed + " mph");
    }); // get JSON weather data and add it to page
  }
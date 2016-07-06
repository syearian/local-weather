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
      $("#temp").html(data.main.temp + " &deg;F");
      $("#humidity").html(data.main.humidity + "&#37;");
      $("#description").html(data.weather[0].description);
      var iconCode = data.weather[0].icon;
      $("#icon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");
    }); // get JSON weather data and add it to page
  } 
  
  getLocation();
  getWeather(lat, lon);

});
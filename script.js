var lat = 0;
var lon = 0;
var city = "";
var country = "";
var location = "";
var units = "";
var apiUrl = "";

$(document).ready(function() {
  
  $('#cityBtn').click(function(event) {
    getLocation();
    getWeather(lat, lon);
  });

});

function getLocation() {
  
} // Get client location data

function getWeather(lat, lon) {
  apiUrl = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&APPID=cfc2eaa1c51253a29ce7206e1aad37c9";
  $.getJSON(apiUrl, function(data) {
    $("#location").html(data.name);      
    $("#temp").html('<i class="wi wi-thermometer"></i> ' + data.main.temp + ' <i class="wi wi-fahrenheit"></i>');
    var id = data.weather[0].id;
    $("#icon").addClass("wi-owm-" + id);
    $("#description").html(data.weather[0].description);
    $("#humidity").html(data.main.humidity + ' <i class="wi wi-humidity"></i>');
    var windDir = Math.round(data.wind.deg);
    $("#wind").html(data.wind.speed + ' <i class="wi wi-wind from-' + windDir + '-deg"></i> ');

    var group = data.weather[0].main;
    changeColors(group);
  }); // get JSON weather data and add it to page
}

function changeColors(group) {
  var colors = {
    "Thunderstorm" : "#424242",
    "Drizzle" : "#29B6F6",
    "Rain" : "#1976D2",
    "Snow" : "#E0E0E0",
    "Atmosphere" : "#795548",
    "Clear" : "#FFEE58",
    "Clouds" : "#757575",
  };
  var back = "";
  switch (group) {
    case "Thunderstorm":
      back = colors.Thunderstorm;
      break;
    case "Drizzle":
      back = colors.Drizzle;
      break;
    case "Rain":
      back = colors.Rain;
      break;
    case "Snow":
      back = colors.Snow;
      break;
    case "Atmosphere":
      back = colors.Atmosphere;
      break;
    case "Clear":
      back = colors.Clear;
      break;
    case "Clouds":
      back = colors.Clouds;
      break;
  }
  $("body").css("background-color", back);
}

// function findCity(lat, lon) {
//   $.getJSON('https://crossorigin.me/nominatim.openstreetmap.org/reverse?json_callback=?&format=json&lat=' + lat + '&lon=' + lon + '&email=syearian@gmail.com', function(data) {
//       country = data.address.country;
//       city = data.address.city;
//   });
// } 

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       lat = position.coords.latitude;
//       lon = position.coords.longitude;        
//       });
//     }
// } // Get client location data
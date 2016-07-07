$(document).ready(function() {

  var city = "";
  var country = "";
  var clientLoc = "";
  var units = "";
  var apiUrl = "";

 $.ajaxSetup({ 
    cache: false 
  }); // disable ajax cashe to load a new quote everytime the button is clicked 
  
  $('#go').click(function(event) {
    event.preventDefault();
    getLocation();
  });

});

function getUnits(country) {
  if (country === 'us' || country === 'lr') {
    units = "imperial";
  } else {
    units = "metric";
  }
}

function getLocation() {
  clientLoc = document.getElementById("cityInput").value;
  var array = clientLoc.split(",");
  city = array[0];
  country = array[1].trim();
  clientLoc = city + ', ' + country.toUpperCase();
  country = country.toLowerCase();
  getUnits(country);
  getWeather(city, country, clientLoc, units);
} // Get client location data

function getWeather(city, country, clientLoc, units) {
  apiUrl = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&units=" + units + "&APPID=cfc2eaa1c51253a29ce7206e1aad37c9";
    console.log(apiUrl);
  $.getJSON(apiUrl, function(data) {
    console.log(data);
    $("#weatherCard").css("visibility", "visible");
    $("#location").html(clientLoc);      
    $("#temp").html('<i class="wi wi-thermometer"></i> ' + data.main.temp + ' <i class="wi wi-fahrenheit"></i>');
    var id = data.weather[0].id;
    $("#icon").addClass("wi-owm-" + id);
    $("#description").html(data.weather[0].description);
    $("#humidity").html(data.main.humidity + ' <i class="wi wi-humidity"></i>');
    var windDir = Math.round(data.wind.deg);
    $("#wind").html(data.wind.speed + ' <i class="wi wi-wind from-' + windDir + '-deg"></i> ');

    var group = data.weather[0].main;
    changeBackImg(group);
  }); // get JSON weather data and add it to page
}

function changeBackImg(group) {
  var backImages = {
    "Thunderstorm" : "img/thunderstorm.jpg",
    "Drizzle" : "img/drizzle.jpg",
    "Rain" : "img/rain.jpg",
    "Snow" : "img/snow.jpg",
    "Atmosphere" : "img/atmosphere.jpg",
    "Clear" : "img/clear.jpg",
    "Clouds" : "img/clouds.jpg",
  };
  var backImg = "";
  switch (group) {
    case "Thunderstorm":
      backImg = backImages.Thunderstorm;
      break;
    case "Drizzle":
      backImg = backImages.Drizzle;
      break;
    case "Rain":
      backImg = backImages.Rain;
      break;
    case "Snow":
      backImg = backImages.Snow;
      break;
    case "Atmosphere":
      backImg = backImages.Atmosphere;
      break;
    case "Clear":
      backImg = backImages.Clear;
      break;
    case "Clouds":
      backImg = backImages.Clouds;
      break;
  }
  $("body").css("background-image", "url(" + backImg + ")");
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
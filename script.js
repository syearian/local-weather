  var city = "";
  var country = "";
  var clientLoc = "";
  var units = "";
  var apiUrl = "";
  var temp = 0;
  var fIcon = '<i class="wi wi-fahrenheit"></i>';
  var cIcon = '<i class="wi wi-celsius"></i>';

$(document).ready(function() {

 $.ajaxSetup({ 
    cache: false 
  }); // disable ajax cashe to load a new quote everytime the button is clicked 
  
  $('#go').click(function(event) {
    event.preventDefault();
    getLocation();
  });

  $('#switchFC').click(function(event) {
    event.preventDefault();
    changeTemp();
  });

});

function getUnits(country) {
  if (country === 'us' || country === 'lr') {
    units = "imperial";
  } else {
    units = "metric";
  }
} // set units to correct value for country

function changeUnitIcon(icon) {
  if (units === "imperial") {
    icon = fIcon;
  } else {
    icon = cIcon;
  }
  return icon;
}

function convertFC() {
  if (units === "imperial") {
    temp = (temp - 32) * 5 / 9;
  } else {
    temp = temp * 9 / 5 + 32;
  }
  unitIcon = changeUnitIcon(unitIcon);
}

function changeTemp() {
  convertFC();
  $("#temp").html('<i class="wi wi-thermometer"></i> ' + temp + ' ' + unitIcon);
}

function capitalize(str) { 
  var first = str[0].slice(0, 1); 
  first = first.toUpperCase(); 
  var rest = str.slice(1); 
  rest = rest.toLowerCase(); 
  return first + rest; 
} // capitalize a string

function getLocation() {
  clientLoc = document.getElementById("cityInput").value;
  var array = clientLoc.split(",");
  city = array[0];
  city = capitalize(city);
  country = array[1].trim();
  clientLoc = city + ', ' + country.toUpperCase();
  country = country.toLowerCase();
  getUnits(country);
  getWeather(city, country, clientLoc, units);
} // Get client location data and call getWeather()

function getWeather(city, country, clientLoc, units, unitIcon, temp) {
  apiUrl = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&units=" + units + "&APPID=cfc2eaa1c51253a29ce7206e1aad37c9";
  var unitIcon
  if (units === "imperial") {
    unitIcon = fIcon;
  } else {
    unitIcon = cIcon;
  }
  $.getJSON(apiUrl, function(data) {
    console.log(data);
    $("#weatherCard").css("visibility", "visible");
    $("#location").html(clientLoc);
    temp = data.main.temp;
    $("#temp").html('<i class="wi wi-thermometer"></i> ' + temp + ' ' + unitIcon);
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
} // Change the background image

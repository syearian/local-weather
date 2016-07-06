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

$(document).ready(function() {

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      apiUrl = "api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&APPID=cfc2eaa1c51253a29ce7206e1aad37c9";
    });
  } // Get client location data

  $.getJSON(apiUrl, function(data) {
    $("#city").html(data.name);
    var dateObject = new Date(data.dt);
    var month = "";
    switch (dateObject.getMonth()) {
      case 0:
      month = "Jan";
      break;
      case 1:
      month = "Feb";
      break;
      case 2:
      month = "March";
      break;
      case 3:
      month = "April";
      break;
      case 4:
      month = "May";
      break;
      case 5:
      month = "June";
      break;
      case 6:
      month = "July";
      break;
      case 7:
      month = "Aug";
      break;
      case 8:
      month = "Sept";
      break;
      case 9:
      month = "Oct";
      break;
      case 10:
      month = "Nov";
      break;
      case 11:
      month = "Dec";
      break;
    }
    var date = month + " " + dateObject.getDate();
    $("#date").html(date);
    $("#temp").html(data.main.temp + " &deg;F");
    $("#humidity").html(data.main.humidity + "&#37;");
    $("#decription").html(data.weather.description);
    var iconCode = data.weather.icon;
    $("#icon").attr("src", + "http://openweathermap.org/img/w/" + iconCode + ".png");
  }); // get JSON weather data and add it to page

});

// function getWeather() {
  
// } 

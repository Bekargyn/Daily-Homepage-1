// BEGIN NEWS JAVASCRIPT

// Create variable to hold news API call
var queryURL =
  "https://newsapi.org/v2/top-headlines?" +
  "country=us&" +
  "apiKey=95e634b5d6494d2daacb34c392508b43";

// Creating an AJAX call for news API
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

  // Create a container for the articles
  var articleContainer = $("<div id='articleContainer'>");
  articleContainer.css("width", "300px");

  // Append article container to body
  $("body").append(articleContainer);

  // Loop through the array of articles
  for (var i = 0; i < response.articles.length; i++) {
    // Create div for article
    var articleButton = $("<button class='article'>");
    articleButton.attr("href", response.articles[i].url);

    // Append article div to article container
    articleContainer.append(articleButton);
    articleButton.css("border-style", "solid");

    // Store article title in a variable
    var title = response.articles[i].title;

    // Create an element to have the title displayed
    pTitle = $("<p>").text(title);

    // Append title element to article div
    articleButton.append(pTitle);

    // Store article image URL in a variable
    var imgURL = response.articles[i].urlToImage;

    // Create an element to hold the image
    var image = $("<img>").attr("src", imgURL);
    image.css("height", "100px");

    // Append the image element to the title element
    pTitle.append(image);
  }
  $(document).on("click", "button", function(e) {
    e.preventDefault();
    var url = $(this).attr("href");
    window.open(url, "_blank");
  });
});

// END NEWS JAVASCRIPt

// EVENTS JAVASCRIPT

// Ticketmaster's API key utNZSTGMX1zeTwLA5z5ppyXFAxACrTrb
var ticketMasterApi = "utNZSTGMX1zeTwLA5z5ppyXFAxACrTrb";

function getEventsInCity(city) {
  console.log(city);
  $.ajax({
    type: "GET",
    url:
      "https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=utNZSTGMX1zeTwLA5z5ppyXFAxACrTrb&city=" +
      city,
    async: true,
    dataType: "json",
    success: function(json) {
      console.log(json);
    },

    error: function(xhr, status, err) {
      console.log("error", status);
    }
  }).then(function(response) {
    for (var i = 0; i < response._embedded.events.length; i++) {
      var articleDiv = $("<button class='article'>");
      var title = response._embedded.events[i].name;
      var date = response._embedded.events[i].dates.start.localDate;
      var buyTicket = response._embedded.events[i].url;
      var pTitle = $("<p>").text(title);
      var link = $("<a>")
        .text("Buy tickets")
        .attr("href", buyTicket)
        .attr("target", "_blank");
      var imgURL = response._embedded.events[i].images[0].url;
      var image = $("<img>").attr("src", imgURL);
      image.css("height", "100px");
      pTitle.append(link);
      pTitle.append("<br>");
      pTitle.append(date);
      pTitle.append("<br>");

      pTitle.append(image);
      articleDiv.append(pTitle);
      $("body").append(articleDiv);
    }
  });
}

//  Weather and Date

const apiKey = "7bb4b8b4c54f73c9621bee4e6c4a3bf9";

function renderWeather(forecast) {
  var j = 0;
  $("#current-city-weather").html("");
  $("#fivedayforecast").html("");
  $.each(forecast, function(index, el) {
    if (j) {
      renderListItem(el);
    } else {
      renderCurrentItem(el);
    }
    j++;
    console.log(el);
  });
}

function renderListItem(el) {
  var listItem = $("<div class='listItem'></div>");
  listItem.append("<h3>" + moment.unix(el.dt).format("MM/DD/YYYY") + "</h3>");
  listItem.append(
    "<img width='32' src='http://openweathermap.org/img/wn/" +
      el.weather[0].icon +
      "@2x.png'>"
  );
  listItem.append(
    "<p>Temprature: " + convertKelvinToFarenheit(el.main.temp) + "F</p>"
  );
  listItem.append("<p>Humidity: " + el.main.humidity + "%</p>");
  $("#fivedayforecast").append(listItem);
}

function renderCurrentItem(el) {
  $("#current-city-weather").append(
    "<h1>" +
      currentLocation.city +
      " (" +
      moment.unix(el.dt).format("MM/DD/YYYY") +
      ") <img width='32' src='http://openweathermap.org/img/wn/" +
      el.weather[0].icon +
      "@2x.png'></h1>"
  );
  $("#current-city-weather").append(
    "<p>Temprature: " + convertKelvinToFarenheit(el.main.temp) + "F</p>"
  );
  $("#current-city-weather").append(
    "<p>Humidity: " + el.main.humidity + "%</p>"
  );
}

function getForecast(currentLocation) {
  var url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    currentLocation.city +
    ",US&appid=" +
    apiKey;
  $.ajax({
    url: url,
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function(forecast) {
      var currentForecast = {};
      console.log(forecast);
      forecast.list.forEach(function(el) {
        if (
          currentForecast.hasOwnProperty(
            moment.unix(el.dt).format("MM/DD/YYYY")
          )
        ) {
          return 0;
        }
        //saving
        currentForecast[moment.unix(el.dt).format("MM/DD/YYYY")] = el;
      });
      renderWeather(currentForecast);
    }
  });
}

//#################################################
function getCurrentCityAndCountry() {
  $.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function(location) {
      console.log(location);
      currentLocation = location;
      getForecast(location);
    }
  });
}

//#################################################
function convertKelvinToCelsius(kelvin) {
  if (kelvin < 0) {
    return "below absolute zero (0 K)";
  } else {
    return kelvin - 273.15;
  }
}

function convertKelvinToFarenheit(kelvin) {
  valNum = parseFloat(kelvin);
  return Math.round((valNum - 273.15) * 1.8 + 32);
}

getCurrentCityAndCountry();
getEventsInCity("Austin");

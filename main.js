// #####################
// BEGIN NEWS JAVASCRIPT
// #####################

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
  // console.log(response);

  // Loop through the array of articles
  for (var i = 0; i < 10; i++) {
    // // Create button for article
    // var articleDiv = $("<div class='article'>");
    // articleDiv.attr("href", response.articles[i].url);

    // // Append article button to article container
    // $("#articleContainer").append(articleDiv);

    // // Store article title in a variable
    // var title = response.articles[i].title;

    // // Create an element to have the title displayed
    // pTitle = $("<p>").text(title);

    // // Append title element to article div
    // articleButton.append(pTitle);

    // // Store article image URL in a variable
    // var imgURL = response.articles[i].urlToImage;

    // // Create an element to hold the image
    // var image = $("<img>").attr("src", imgURL);

    // // Append the image element to the title element
    // pTitle.append("<br>");
    // pTitle.append(image);
    var article = $("<div class='article'></div>");
    article.append("<h5>" + response.articles[i].title + "</h5>");
    article.append("<img src='" + response.articles[i].urlToImage + "'>");
    article.append(
      "<div><a href='" + response.articles[i].url + "'>Show More Info</a></div>"
    );
    $("#articleContainer").append(article);
  }
  // $(document).on("click", "button", function (e) {
  //   e.preventDefault();
  //   var url = $(this).attr("href");
  //   window.open(url, "_blank");
  // });
});

// ###################
// END NEWS JAVASCRIPT
// ###################

// EVENTS JAVASCRIPT

var eventSearchParams = {
  page: 0,
  keyword: null,
  size: 10,
  city: ""
};

var ticketMasterApi = "utNZSTGMX1zeTwLA5z5ppyXFAxACrTrb";

function getEventsInCity() {
  let url =
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=utNZSTGMX1zeTwLA5z5ppyXFAxACrTrb";
  $.each(eventSearchParams, function(index, el) {
    if (el) url += "&" + index + "=" + el;
  });

  console.log(url);
  $.ajax({
    type: "GET",
    url: url,
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
      var event = $("<div class='event'></div>");

      event.append("<h5>" + response._embedded.events[i].name + "</h5>");
      event.append(
        "<h6>" + response._embedded.events[i].dates.start.localDate + "</h6>"
      );
      event.append(
        "<img src='" + response._embedded.events[i].images[0].url + "'>"
      );
      event.append(
        "<div><a href='" +
          response._embedded.events[i].url +
          "'>Show More Info</a></div>"
      );
      $("#eventscontainer").append(event);
    }
  });
}

// Load more events button

$("#more-events").click(function() {
  eventSearchParams.page++;
  getEventsInCity();
});

// Search Events by Keyword

$("#searchByKeyword button").click(function() {
  eventSearchParams.keyword = $("#searchByKeyword input").val();
  eventSearchParams.page = 0;
  eventSearchParams.city = "";
  $("#eventscontainer").html("");
  getEventsInCity();
});

// Search Events by City

$("#searchByCity button").click(function() {
  eventSearchParams.city = $("#searchByCity input").val();
  eventSearchParams.page = 0;
  eventSearchParams.keyword = "";
  $("#eventscontainer").html("");
  getEventsInCity();
});

//  Weather and Date

setInterval(function() {
  $("#clock").html(moment().format("h:mm:ss a"));
}, 1000);

const apiKey = "7bb4b8b4c54f73c9621bee4e6c4a3bf9";

function renderCurrentItem(el) {
  $("#weather").append(
    "<h1>" +
      currentLocation.city +
      " (" +
      moment().format("MM/DD/YYYY") +
      ") <img width='32' src='http://openweathermap.org/img/wn/" +
      el.weather[0].icon +
      "@2x.png'></h1>"
  );
  $("#weather").append(
    "<p>Temprature: " + convertKelvinToFarenheit(el.main.temp) + "F</p>"
  );
  $("#weather").append("<p>Humidity: " + el.main.humidity + "%</p>");
}

function getForecast(currentLocation) {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    currentLocation.city +
    ",US&appid=" +
    apiKey;
  $.ajax({
    url: url,
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function(forecast) {
      renderCurrentItem(forecast);
    }
  });
}

function getCurrentCityAndCountry() {
  $.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function(location) {
      console.log(location);
      currentLocation = location;
      getForecast(location);
      eventSearchParams.city = location.city;
      getEventsInCity();
    }
  });
}

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

// ###################
// BEGIN TO-DO LIST JS
// ###################

// Create a div to store saved to-do items
var savedToDos = $("<div id='savedToDos'>");
// Append saved to-do div to toDoColumn
$("#toDoColumn").append(savedToDos);
// Create a div for input box
var inputBox = $("<input>");
inputBox.css("width", "75%");
// Append input box to savedToDos
savedToDos.append(inputBox);
// Create a save button for users to save their input
var saveButton = $("<button>");
saveButton.text("Save");
// Append save button to inputBox
savedToDos.append("<br>");
savedToDos.append(saveButton);

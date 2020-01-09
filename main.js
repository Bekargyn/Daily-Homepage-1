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
}).then(function (response) {
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
    article.append("<div><a href='" + response.articles[i].url + "'>Show More Info</a></div>");
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
    success: function (json) {
      console.log(json);
    },
    error: function (xhr, status, err) {
      console.log("error", status);
    }
  }).then(function (response) {
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

//  Weather and Date

setInterval(function () {
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
    success: function (forecast) {
      renderCurrentItem(forecast);
    }
  });
}

function getCurrentCityAndCountry() {
  $.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function (location) {
      console.log(location);
      currentLocation = location;
      getForecast(location);
      getEventsInCity(location.city);
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
getEventsInCity("Austin");

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




// // Create table for to-do list
// var toDoTable = $("<table>");
// // Append table to toDoColumn
// $("#toDoColumn").append(toDoTable);

// // Create loop to make table with 24 rows
// for (var i = 0; i < 24; i++) {
//   // Create table row
//   var tableRow = $("<tr>");
//   // Append table row to toDoTable
//   toDoTable.append(tableRow);
//   // Create time table header for toDoTable row
//   var tableHeaderTime = $("<th class='time'>");
//   tableHeaderTime.text(i + 1 + "am");
//   if (i > 12) {
//     tableHeaderTime.text(i + 1 + "pm");
//   }
//   // tableHeaderTime.text(moment('00:00 AM', 'hh:mm A').format('hh:mm A'));
//   // Append time table header to toDoTable row
//   tableRow.append(tableHeaderTime);
//   // Create input table header for toDoTable row
//   var tableHeaderInput = $("<th>");
//   // Append input table header to toDoTable row
//   tableRow.append(tableHeaderInput);
//   // Create input box for input
//   var inputBox = $("<input class='input'>");
//   // Append input box to input table header
//   tableHeaderInput.append(inputBox);
//   // Create save table header for toDoTable row
//   var tableHeaderSave = $("<th>");
//   // Append save table header to toDoTable row
//   tableRow.append(tableHeaderSave);
//   // Create a button for save table header
//   var saveButton = $("<button href=''>");
//   saveButton.text("Save");
//   // Append save button to save table header
//   tableHeaderSave.append(saveButton);
// };

// // // Create save events
// // $("button").on("click", function (event) {
// //   // alert("Button Clicked!");
// //   event.preventDefault();
// //   var input = inputBox.val();
// //   console.log(input);

// //   localStorage.setItem("input", JSON.stringify(input));

// // });

// $("table button").click(function () {
//   //Saving all fields at once
//   var map = {};
//   //foreach field
//   $("#table input").each(function () {
//     //find input attr and use it as key in json
//     map[$(this).attr("input")] = $(this).val();
//   });
//   //save to storage as string
//   localStorage.setItem("userInput", JSON.stringify(map));
// });

// Calendar
$("#calendar").tuiCalendar({
  defaultView: "month",
  taskView: true,
  template: {
    monthDayname: function (dayname) {
      return (
        '<span class="calendar-week-dayname-name">' + dayname.label + "</span>"
      );
    }
  }
});

// #####################
// BEGIN NEWS JAVASCRIPT
// #####################

// Create variables to hold parameters of news API call
var url = "https://newsapi.org/v2/top-headlines?";
var countryCode = "country=us&";
// var articleSearch = "q=trump&";
var articleSearch = "";
var articleApiKey = "apiKey=95e634b5d6494d2daacb34c392508b43";
var queryURL = url + countryCode + articleSearch + articleApiKey;

// Create a function to perform AJAX request
function getNews() {
  // Creating an AJAX call for news API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    // Loop through the array of articles
    for (var i = 0; i < 10; i++) {
      var article = $("<div class='article'></div>");
      article.append("<h5>" + response.articles[i].title + "</h5>");
      article.append("<img src='" + response.articles[i].urlToImage + "'>");
      article.append(
        "<div><a target='_blank' href='" +
        response.articles[i].url +
        "'>Show More Info</a></div>"
      );

      $("#articleContainer").append(article);
    }
  });
};
getNews();
// Load more articles button
$("#moreArticles").click(function () {
  queryURL.page++;
  getNews();
});
// Search for articles by keyword
$("#articlesByKeyword button").click(function () {
  var articleKeyword = $("#articlesByKeyword input").val();
  articleSearch = "q=" + articleKeyword + "&";
  queryURL = url + countryCode + articleSearch + articleApiKey;
  $("#articleContainer").html("");
  getNews();
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
  $.each(eventSearchParams, function (index, el) {
    if (el) url += "&" + index + "=" + el;
  });

  console.log(url);
  $.ajax({
    type: "GET",
    url: url,
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
        "<div><a target='_blank' href='" +
        response._embedded.events[i].url +
        "'>Show More Info</a></div>"
      );
      $("#eventscontainer").append(event);
    }
  });
}

// Load more events button

$("#more-events").click(function () {
  eventSearchParams.page++;
  getEventsInCity();
});

// Search Events by Keyword

$("#searchByKeyword button").click(function () {
  eventSearchParams.keyword = $("#searchByKeyword input").val();
  eventSearchParams.page = 0;
  eventSearchParams.city = "";
  $("#eventscontainer").html("");
  getEventsInCity();
});

// Search Events by City

$("#searchByCity button").click(function () {
  eventSearchParams.city = $("#searchByCity input").val();
  eventSearchParams.page = 0;
  eventSearchParams.keyword = "";
  $("#eventscontainer").html("");
  getEventsInCity();
});

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
var todoForm = $("<form id='todoForm'>");
// Append saved to-do div to toDoColumn
$("#toDoColumn").append(todoForm);
// Create a div for input box
var todoInput = $("<input>");
todoInput.css("width", "75%");
// Append input box
todoForm.append(todoInput);
// Create save button
var saveButton = $("<button>");
saveButton.text("Save");
// Append save button
todoForm.append(saveButton);
// Create unordered list for saved to-do's
var todoList = $("<ul>");
// Append list to saved to-do's div
todoForm.append(todoList);

var todos = [];

init();

function renderTodos() {
  // Clear todoList element
  todoList.empty();

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete";

    li.appendChild(button);
    todoList.append(li);
  }
}

function init() {
  // Get stored todos from localStorage
  // Parsing the JSON string to an object
  var storedTodos = JSON.parse(localStorage.getItem("todos"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedTodos !== null) {
    todos = storedTodos;
  }

  // Render todos to the DOM
  renderTodos();
}

function storeTodos() {
  // Stringify and set "todos" key in localStorage to todos array
  localStorage.setItem("todos", JSON.stringify(todos));
}

// When save button is clicked...
saveButton.on("click", function (event) {
  event.preventDefault();

  var todoText = todoInput.val();

  // Return from function early if submitted todoText is blank
  if (todoText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  todos.push(todoText);
  todoInput.val("");

  // Store updated todos in localStorage, re-render the list
  storeTodos();
  renderTodos();
});

// When a element inside of the todoList is clicked...
todoList.on("click", function (event) {
  var element = event.target;

  // If that element is a button...
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
    storeTodos();
    renderTodos();
  }
});

// ###################
// END TO-DO LIST JS
// ###################

const weatherApiKey = "7bb4b8b4c54f73c9621bee4e6c4a3bf9";

// BEGIN NEWS JAVASCRIPT

// Create variable to hold news API call
var queryURL = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=95e634b5d6494d2daacb34c392508b43';

// Creating an AJAX call for news API
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    // console.log(response);

    // Loop through the array of articles
    for (var i = 0; i < response.articles.length; i++) {

        // Create div for article
        var articleDiv = $("<div class='article'>");

        // Append article div to body
        $("body").append(articleDiv);

        // Store article title in a variable
        var title = response.articles[i].title;

        // Create an element to have the title displayed
        pTitle = $("<p>").text(title);

        // Append title element to article div
        articleDiv.append(pTitle);

        // Store article image URL in a variable
        var imgURL = response.articles[i].urlToImage;

        // Create an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        // Append the image element to the title element
        pTitle.append(image);

    }
});

// END NEWS JAVASCRIPT

// TOMTOM's API key
const eventApiKey = "kecAu5C3f80LkEgYXGQvZgfLk0dpZGE4";
// Ticketmaster's API key utNZSTGMX1zeTwLA5z5ppyXFAxACrTrb


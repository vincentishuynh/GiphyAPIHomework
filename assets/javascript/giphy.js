//creates animals array that will store user input
var animals = ["dog","cat","bird"];

function displayAnimalGif(){
	  var animalName = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-state","still");
            animalImage.attr("data-animate",results[i].images.fixed_height.url);
            animalImage.attr("data-still",results[i].images.fixed_height_still.url)
            animalImage.addClass("gif");

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#animal-images").prepend(gifDiv);

            $(".gif").on("click", function() {
        
        		var state = $(this).attr("data-state");

        		if(state == "still"){
          		$(this).attr("src", $(this).attr("data-animate"));
          		$(this).attr("data-state", "animate");

        		}else if(state == "animate"){
           		$(this).attr("src", $(this).attr("data-still"));
          		$(this).attr("data-state", "still");
        		}

   				});
          }

        });
}
//displays buttons
function renderButtons(){

	$("#animal-button").empty();

	for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#animal-button").append(a);
        }
}

//adds user input to array and runs renderButtons function
$("#submit").on("click",function(){
event.preventDefault();

userInput = $("#userInput").val().trim();
animals.push(userInput);

renderButtons();



});
//listens to document on click for animal buttons and runs displayAnimalGif
$(document).on("click", ".animal", displayAnimalGif);
renderButtons();

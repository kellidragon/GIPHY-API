$(document).ready(function(){

var nature = ['beach', 'mountains', 'cliff',  'waterfall', 'river', 'ocean', 'forest', 'flowers']



function renderButtons() {
$("#buttonsDiv").empty();
     //loops through nature array to add button for each index
    for(let i=0; i<nature.length; i++){
        var buttons = $('<button>').addClass("natureButton btn-block btn-outline-dark btn-light btn-lg").attr("data-name", nature[i])
            buttons.text(nature[i]);
            $("#buttonsDiv").append(buttons);
    }

};


//event to handle when a user input button is added 
$("#add-nature").on("click", function(event) {

    event.preventDefault();
    // grab the text from the input box
    var natureInput = $("#word-input").val().trim();
    // input is then added to nature array
    nature.push(natureInput);
    renderButtons();
   
  });
 
  renderButtons();
//event to handle when a nature button is clicked
$("#buttonsDiv").on("click", ".natureButton" , function(){
   
    var natureClick = $(this).attr("data-name")
    //creating a URL to search Giphy for the button pressed
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    natureClick + "&api_key=JWhL2ed6vqoOJ8M4sih5sL0ABc5Espu3";
        console.log(natureClick)
      
//performing AJAX GET request
$.ajax({
    url: queryURL,
    method: "GET"
    }) .then(function(response) {
        $("#view-gifs").empty();
    var results = response.data
    console.log(results)
    for (var i = 0; i < 9; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var natureImage = $("<img>").addClass("natureGif animated bounceInDown slow");

        // Giving the image tag an src attribute of a property pulled off the
        // result item
        
        natureImage.attr("src", results[i].images.fixed_height_still.url);
        natureImage.attr("data-still", results[i].images.fixed_height_still.url);
        natureImage.attr("data-animate", results[i].images.fixed_height.url);
        natureImage.attr("data-state", "still")

        // Appending the paragraph and natureImage to the "gifDiv" div 
        gifDiv.append(p);
        gifDiv.append(natureImage);

        // Prepending the gifDiv to the "#view-gifs" div in the HTML
        $("#view-gifs").prepend(gifDiv);

    }
    });
});

//event to load extra gifs
$("#add-more").on("click", ".natureButton" , function(){



})

//event to display still and animated gifs when clicked
$("#view-gifs").on("click", ".natureGif" ,function() {

        var state = $(this).attr("data-state")
        console.log(state)

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
           
        
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        
    }
      });

    

});
$(document).ready(function(){

var nature = ['beach', 'cave', 'mountains', 'cliff', 'meadow', 'waterfall', 'river', 'ocean', 'island', 'forest', 'flowers']

//loops through nature array to add button for each index
for(let i=0; i<nature.length; i++){
   var buttons = $('<button>').addClass("natureButton").attr("data-nature", nature[i])
    buttons.text(nature[i]);
    $("#buttonsDiv").append(buttons);
}

//button on click 

$(".natureButton").on("click", function(){
    var natureClick = $(this).attr("data-nature")
    //creating a URL to search Giphy for the button pressed
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    natureClick + "&api_key=JWhL2ed6vqoOJ8M4sih5sL0ABc5Espu3";
console.log(natureClick)
    //performing AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
      }) .then(function(response) {
        var results = response.data
        console.log(results)
        for (var i = 0; i < 10; i++) {
              // Only taking action if the photo has a rating
            // if (results[i].rating) {
                // Creating a div for the gif
                var gifDiv = $("<div>");
  
                // Storing the result item's rating
                var rating = results[i].rating;
         
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
  
                // Creating an image tag
                var natureImage = $("<img>");
  
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                var animatedGif = natureImage.attr("src", results[i].images.fixed_height.url);
                var stillGif = natureImage.attr("src", results[i].images.fixed_height_still.url);
       
                // Appending the paragraph and natureImage we created to the "gifDiv" div 
                gifDiv.append(p);
                gifDiv.append(stillGif);
  
                // Prepending the gifDiv to the "#view-gifs" div in the HTML
                $("#view-gifs").prepend(gifDiv);
            }
        
$("img").on("click", function() {

   
    for (var i = 0; i < 10; i++) {
        if (stillGif) {
            stillGif.attr("src", results[i].images.fixed_height.url);
        
        } else if(animatedGif) {
            animatedGif.attr("src", results[i].images.fixed_height_still.url);
        
        }
    }
    });
     
      //TODO: make gif play after pause 
      //capture form input and add function to make new button and adds to topic array 
      //CSS 


      //BONUS 
      //mobile responsive
      //3. List additional metadata (title, tags, etc) for each gif in a clean and readable format.
      });

    
    });
  
});
// original array
var basedGifs = ["spongebob", "doge", "meme", "troll", "ouch", "patrick", "fail", "dank", "trump","wtf", "kermit", "lol internet", "dab"];
var playing = false;
//function runners :)
$(window).ready(renderButtons);
$(document).on("click", ".gif-button", gifClick);
$(document).on("click", "#add-gif", addButton);
$(document).on("click", ".dynamos", gifState);
$(document).on("click", "#titlePic", music);


function renderButtons(){
//initial button display
$(".buttons").empty();
for (var i = 0; i < basedGifs.length; i++) {
    var buttonGifs =  $("<button>");
    buttonGifs.addClass("gif-button")
    buttonGifs.attr("gif-name", basedGifs[i]);
    buttonGifs.text(basedGifs[i]);
    $(".buttons").append(buttonGifs);

};
}

//music plays on image click
function music(){
    if (playing == false){
        playing = true;
        $("#stress").get(0).play(); 
    }
    else {
        playing = false;
        $("#stress").get(0).pause();
    }
}
//button function to dynamically insert gifs into the "giferator" div

    function gifClick() {
        $(".giferator").empty();
        var newGif = $(this).attr("gif-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          newGif + "&api_key=aATpI4W1nl6fAvk52vVRaiAk6D1p9nG2&limit=10";
//ajax call
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            console.log(queryURL);
  
            console.log(response);
 // storing the data from the AJAX request
            var gifGet = response.data;
  
 // Looping through each result item
            for (var i = 0; i < gifGet.length; i++) {
  
// Creating and storing a div tag
              var giferation = $("<div class='gif-card'>");
  
 // Creating a paragraph tag with the result item's rating
              var rating = $("<p class= ratings>").text("Rating: " + gifGet[i].rating);
  
// Creating and storing an image tag
              var gifs = $("<img>");
// Setting the src attribute of the image to a property pulled off the result item
              gifs.attr("src", gifGet[i].images.fixed_height.url);
              gifs.addClass("dynamos");
//this line allows still images to be added to the image dump
              $(".dynamos").append('<img class="gif" src="' + gifGet[i].images.fixed_height_still.url + '">');
 // Appending the paragraph and image tag to the giferation
               giferation.append(rating);
              giferation.append(gifs);
  
// Adding the giferation to the HTML page in the "giferator" div
              $(".giferator").prepend(giferation);
            }
          });
        }
//add button function
      function addButton () {    
        event.preventDefault();
        // This line will grab the text from the input box
        var userGif = $("#new-gif").val().trim();
        basedGifs.push(userGif);
//emptys the input field
//somehow this function stopped repeat entries into the array so I'll take it
        $("#new-gif").val(" ");
        renderButtons();
        console.log(basedGifs);
    };

//functions that stops/plays gifs
   function gifState() {
        var src = $(this).attr("src");
  if($(this).hasClass('playing')){
     //stop
     //found method on stackoverflow
     $(this).attr('src', src.replace("200.gif", "200_s.gif"))
     $(this).removeClass('playing');
  } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace("200_s.gif", "200.gif"))
  }
   };

//api key

// "&api_key=aATpI4W1nl6fAvk52vVRaiAk6D1p9nG2&limit=10"
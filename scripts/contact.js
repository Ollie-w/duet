$message = $("#message");

$('.send-message-form').submit(function(e) {
     e.preventDefault();    
    if ( !$("#message").val() || !$("#email").val() || !$("#name").val() ) {

        var allFieldsRequired = document.querySelector(".right small");
        allFieldsRequired.setAttribute("role", "alert");

if ( !$("#message").val() ) {
    $("#no-message").css("visibility", "visible");
     $("#message").addClass("red-focus");
    $("#message").focus();
}
  if ( !$("#email").val() ) {
        $("#no-email").css("visibility", "visible");
         $("#email").addClass("red-focus");
        $("#email").focus();
    }
  if( !$("#name").val() ) {
        $("#no-name").css("visibility", "visible");
        $("#name").addClass("red-focus");
        $("#name").focus();
    }
}
else {
  //HELLO JENNY

showPopup();

}
});






/* REMOVE MESSAGES WHEN USER HAS FILLED IN THE RELEVANT FIELD */

$("#name").change(function() {
     if( $("#name").val() ) {
    $("#no-name").css("visibility", "hidden");
     }
});

$("#email").change(function() {
     if ( $("#email").val() ) {
    $("#no-email").css("visibility", "hidden");
     }
});

$("#message").change(function() {
    if ( $("#message").val() ) {
    $("#no-message").css("visibility", "hidden");
    }
});


//close popup animation 

var sendBtn = document.getElementById("send-message-form-button");
var closePopButton = document.querySelector(".success-popup button");
var successPopup = document.querySelector(".success-popup");
var inputs = Array.from(document.querySelectorAll("input, textarea"));

 var frames = [
  {opacity: 0, filter: 'blur(3px)', transform: 'translateY(-100vh) scaleX(.7)'},
  {filter: 'blur(0)'},
  {opacity: 1, transform: 'translateY(0) scaleX(1)'}
]


var animationOptions = {
  duration: 350,
  easing: 'ease-out',
  fill: 'both'
}


var popAnimation = successPopup.animate(frames, animationOptions);
popAnimation.pause()
function showPopup() {
popAnimation.playbackRate = 1;
popAnimation.play()
}

function closePopup() {
inputs.forEach(function(input) {
    input.value = "";
})
popAnimation.reverse();
/*popAnimation.onfinish = function() {successPopup.remove()} */   
}

closePopButton.addEventListener("click", closePopup)
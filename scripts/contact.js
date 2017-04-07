$message = $("#message");

$('.send-message-form').submit(function(e) {
    if ( !$("#message").val() || !$("#email").val() || !$("#name").val() ) { 
    e.preventDefault();    
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
   $("main").addClass('blurfilter');
   $("success-popup").addClass('success-open');
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



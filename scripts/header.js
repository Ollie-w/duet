var $hamburger =  $(".hamburger");
var $dropbtn = $(".drop-btn");
var $wrapper =  $(".wrapper");
var $mainmenu = $(".main-menu");
var $searchbar = $(".search-bar");
var searchMobile = document.querySelector(".search-bar-mobile");
var mobileInput = searchMobile.querySelector("input")
var $btntext = $(".btn-text");
var $body =  $("body");


function stuffToDoAtVariousSizes() {

    if (window.matchMedia("(max-width: 1200px)").matches) {

        //OPEN SUBMENUS AND TURN SVG ICONS AROUND. ONLY ONE SUBMENU CAN BE OPEN AT A TIME, OPENING ONE CLOSES OTHERS
       $dropbtn.off("click.submenu").on("click.submenu", function (e) {
           e.preventDefault();
            $dropbtn.not(this).removeClass("blue-background");
            if ($(this).hasClass("blue-background")) {
                $(this).removeClass("blue-background");
            }
            else {
                $(this).addClass("blue-background");
            }
        });

            //TOGGLE DROPDOWN. Doesn't effect searchbar
            $hamburger.off("click.dropdown").on("click.dropdown", function () {
                   $mainmenu.removeClass("closed");  
                 $body.css("overflow", "hidden"); 
            });
             $("#close-menu").off("click.close").on("click.close", function() {
                     $mainmenu.addClass("closed");
                      $body.css("overflow", "initial");
                      $dropbtn.each(function() {
                          if ($(this).hasClass("blue-background")) {
                              $(this).removeClass("blue-background");
                          }
                      })
             })
        }

        if (window.matchMedia("(max-width: 768px)").matches) {


            //HIDE AND SHOW SEARCH BAR. 

            $(".search-btn").off("click.search").on("click.search", function () {
                if (searchMobile.classList.contains("display-none")) {
                    searchMobile.classList.remove("display-none");
                    mobileInput.focus();
                }
                else {
                     mobileInput.blur();
                    searchMobile.classList.add("display-none")
                }
                });
        }
 if (window.matchMedia("(min-width: 1200px)").matches) {
        $dropbtn.off("click.submenu");
         $dropbtn.removeClass("blue-background");
           $mainmenu.addClass("closed");
           $("body").css("overflow", "initial");  
 }
}


/* trigger the above function on page load */

$(document).ready(function() {
    stuffToDoAtVariousSizes();
});

/* trigger the above function when user adjusts their screen size */
var resizeTimer;
$(window).on('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        stuffToDoAtVariousSizes();
    }, 250);
});

/* code for displaying IE message */
$(".message").click(function() {
    this.css("display", "none");
});

$(".clear-search").on("click", function() {
    $(".search-inner input").value = "";
})
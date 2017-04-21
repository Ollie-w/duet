var dropdownOpen = false;
var searchBarShowing = false;

var $hamburger =  $(".hamburger");
var $dropbtn = $(".drop-btn");
var $wrapper =  $(".wrapper");
var $mainmenu = $(".main-menu");
var $searchbar = $(".search-bar");
var $btntext = $(".btn-text");


function stuffToDoAtVariousSizes() {

    if (window.matchMedia("(max-width: 1200px)").matches) {

        //HAMBURGER ANIMATION
        $hamburger.off("click.hamburger").on("click.hamburger",function () {
            $(this).toggleClass("is-active");
        });
        //OPEN SUBMENUS AND TURN SVG ICONS AROUND. ONLY ONE SUBMENU CAN BE OPEN AT A TIME, OPENING ONE CLOSES OTHERS
       $dropbtn.off("click.submenu").on("click.submenu", function (e) {
            $dropbtn.not(this).removeClass("blue-background");
            if ($(this).hasClass("blue-background")) {
                $(this).removeClass("blue-background");
            }
            else {
                $(this).addClass("blue-background");
            }
        });
    };
       
    

    if (window.matchMedia("(min-width: 768px) and (max-width: 1200px)").matches)  {
            //TOGGLE DROPDOWN. Doesn't effect searchbar
            $hamburger.off("click.dropdown").on("click.dropdown", function () {
                if (dropdownOpen) {
                    $wrapper.removeClass("blur-filter");
                   $mainmenu.addClass("closed");
                    dropdownOpen = false;
                    $btntext.text("INSTRUMENTS");
                }

                else if (!dropdownOpen) {
                   $wrapper.addClass("blur-filter");
                   $mainmenu.removeClass("closed");
                    $btntext.text("CLOSE");
                    dropdownOpen = true;
                }
            })
        }

        if (window.matchMedia("(max-width: 768px)").matches) {

            //HIDE AND SHOW SEARCH BAR. OPENING SEARCH BAR HIDES DROPDOWN MENU

            $(".search-btn").off("click.search").on("click.search", function () {
                if (searchBarShowing) {
                   $searchbar.addClass("display-none");
                    $wrapper.removeClass("blur-filter");
                    searchBarShowing = false;
                }

                else if (dropdownOpen && !searchBarShowing) {
                   $hamburger.removeClass("is-active");
                    $btntext.text("INSTRUMENTS");
                   $mainmenu.addClass("closed");
                    dropdownOpen = false;
                    $searchbar.removeClass("display-none");
                    searchBarShowing = true;
                }
                else if (!dropdownOpen && !searchBarShowing) {
                    $wrapper.addClass("blur-filter");
                    $searchbar.removeClass("display-none");
                    searchBarShowing = true;
                }
            });

            //TOGGLE DROPDOWN. WHEN DROPDOWN IS OPENED SEARCH BAR IS HIDDEN

            $hamburger.off("click.toggledrop").on("click.toggledrop", function () {
                if (dropdownOpen) {
                    $wrapper.removeClass("blur-filter");
                    $mainmenu.addClass("closed");
                    dropdownOpen = false;
                   $btntext.text("INSTRUMENTS");
                }
                else if (!dropdownOpen && searchBarShowing) {
                   $searchbar.addClass("display-none");
                    searchBarShowing = false;
                    $mainmenu.removeClass("closed");
                    $btntext.text("CLOSE");
                    dropdownOpen = true;
                }
                else if (!dropdownOpen && !searchBarShowing) {
                   $wrapper.addClass("blur-filter");
                    $mainmenu.removeClass("closed");
                    $btntext.text("CLOSE");
                    dropdownOpen = true;
                }
            });

        }
        if (window.matchMedia("(min-width: 768px)").matches) {
        var $desktopsearch = $searchbar.clone();
            $desktopsearch.removeClass("display-none");
            $desktopsearch.appendTo("#fixed-header");
        }
}





$(document).ready(function() {
    stuffToDoAtVariousSizes();
});



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
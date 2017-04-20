var dropdownOpen = false;
var searchBarShowing = false;
function stuffToDoAtVariousSizes() {

    if (window.matchMedia("(max-width: 1200px)").matches) {

        //HAMBURGER ANIMATION
        $(".hamburger").click(function () {
            $(this).toggleClass("is-active");

        });
        //OPEN SUBMENUS AND TURN SVG ICONS AROUND. ONLY ONE SUBMENU CAN BE OPEN AT A TIME, OPENING ONE CLOSES OTHERS
        $(".drop-btn").click(function (e) {
            $(".drop-btn").not(this).removeClass("blue-background");
            if ($(this).hasClass("blue-background")) {
                $(this).removeClass("blue-background");
            }
            else {
                $(this).addClass("blue-background");
            }
        });
    }

    if (window.matchMedia("(min-width: 768px) and (max-width: 1200px)").matches)  {
            //TOGGLE DROPDOWN. Doesn't effect searchbar
            $(".hamburger").click(function () {
                if (dropdownOpen) {
                    $(".wrapper").removeClass("blur-filter");
                    $(".main-menu").addClass("closed");
                    dropdownOpen = false;
                    $(".btn-text").text("INSTRUMENTS");
                }

                else if (!dropdownOpen) {
                    $(".wrapper").addClass("blur-filter");
                    $(".main-menu").removeClass("closed");
                    $(".btn-text").text("CLOSE");
                    dropdownOpen = true;
                }
            });
        }

        if (window.matchMedia("(max-width: 768px)").matches) {

            //HIDE AND SHOW SEARCH BAR. OPENING SEARCH BAR HIDES DROPDOWN MENU

            $(".search-btn").click(function () {
                if (searchBarShowing) {
                    $(".search-bar").addClass("display-none");
                    $(".wrapper").removeClass("blur-filter");
                    searchBarShowing = false;
                }

                else if (dropdownOpen && !searchBarShowing) {
                    $(".hamburger").removeClass("is-active");
                    $(".btn-text").text("INSTRUMENTS");
                    $(".main-menu").addClass("closed");
                    dropdownOpen = false;
                    $(".search-bar").removeClass("display-none");
                    searchBarShowing = true;
                }
                else if (!dropdownOpen && !searchBarShowing) {
                    $(".wrapper").addClass("blur-filter");
                    $(".search-bar").removeClass("display-none");
                    searchBarShowing = true;
                }
            });

            //TOGGLE DROPDOWN. WHEN DROPDOWN IS OPENED SEARCH BAR IS HIDDEN

            $(".hamburger").click(function () {
                if (dropdownOpen) {
                    $(".wrapper").removeClass("blur-filter");
                    $(".main-menu").addClass("closed");
                    dropdownOpen = false;
                    $(".btn-text").text("INSTRUMENTS");
                }
                else if (!dropdownOpen && searchBarShowing) {
                    $(".search-bar").addClass("display-none");
                    searchBarShowing = false;
                    $(".main-menu").removeClass("closed");
                    $(".btn-text").text("CLOSE");
                    dropdownOpen = true;
                }
                else if (!dropdownOpen && !searchBarShowing) {
                    $(".wrapper").addClass("blur-filter");
                    $(".main-menu").removeClass("closed");
                    $(".btn-text").text("CLOSE");
                    dropdownOpen = true;
                }
            });

        }
        if (window.matchMedia("(min-width: 768px)").matches) {
            $(".search-bar").appendTo("#fixed-header");
            $(".search-bar").removeClass("display-none");
            var searchBarShowing = true;
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

$(".message").click(function() {
    this.css("display", "none");
});
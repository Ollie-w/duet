var dropdownOpen = false;
var searchBarShowing = false;
function stuffToDoAtVariousSizes() {

    if (window.innerWidth < 1000) {

        function scrollHeader() {



            var st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                // downscroll code
                if (!dropdownOpen) {
                    $("#fixed-header").removeClass("sticky");
                }

            } else if (st < lastScrollTop) {
                // upscroll code
                if (!$("#fixed-header").hasClass("sticky")) {
                    $("#fixed-header").addClass("sticky");
                    /* $(".main-menu").css("top",  ($("#fixed-header").offset().top - $(window).scrollTop()) + $("#fixed-header").height() + "px"); */
                }
            }
            lastScrollTop = st;

        };

        var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.addEventListener("scroll", _.throttle(scrollHeader, 300));

        //HAMBURGER ANIMATION
        $(".hamburger").click(function () {
            $(this).toggleClass("is-active");

        });

        if (window.innerWidth >= 768) {

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
        //OPEN SUBMENUS AND TURN SVG ICONS AROUND. ONLY ONE SUBMENU CAN BE OPEN AT A TIME, OPENING ONE CLOSES OTHERS
        $(".drop-btn").click(function(e) {
            $(".drop-btn").not(this).siblings(".dropdown-content").addClass("max-height-zero");
            $(".drop-btn").not(this).closest("div").find(".chevron").removeClass("swivel");
            $(".drop-btn").not(this).removeClass("blue-background");
            $(this).siblings(".dropdown-content").toggleClass("max-height-zero");
            $(this).closest("div").find(".chevron").toggleClass("swivel");
            $(this).toggleClass("blue-background");
        });


        if (window.innerWidth < 768) {

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

        } else if (window.innerWidth >= 768) {
            $(".search-bar").appendTo("#fixed-header");
            $(".search-bar").removeClass("display-none");
            var searchBarShowing = true;
        }
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
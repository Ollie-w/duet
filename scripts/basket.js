// Source: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca
;(function() {
    // helpers
    var regExp = function(name) {
        return new RegExp('(^| )'+ name +'( |$)');
    };
    var forEach = function(list, fn, scope) {
        for (var i = 0; i < list.length; i++) {
            fn.call(scope, list[i]);
        }
    };

    // class list object with basic methods
    function ClassList(element) {
        this.element = element;
    }

    ClassList.prototype = {
        add: function() {
            forEach(arguments, function(name) {
                if (!this.contains(name)) {
                    this.element.className += this.element.className.length > 0 ? ' ' + name : name;
                }
            }, this);
        },
        remove: function() {
            forEach(arguments, function(name) {
                this.element.className =
                    this.element.className.replace(regExp(name), '');
            }, this);
        },
        toggle: function(name) {
            return this.contains(name) 
                ? (this.remove(name), false) : (this.add(name), true);
        },
        contains: function(name) {
            return regExp(name).test(this.element.className);
        },
        // bonus..
        replace: function(oldName, newName) {
            this.remove(oldName), this.add(newName);
        }
    };

    // IE8/9, Safari
    if (!('classList' in Element.prototype)) {
        Object.defineProperty(Element.prototype, 'classList', {
            get: function() {
                return new ClassList(this);
            }
        });
    }

    // replace() support for others
    if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
        DOMTokenList.prototype.replace = ClassList.prototype.replace;
    }
})();


/* FADE and display: none removed items */

var products = document.querySelectorAll(".product");
for (let i = 0; i < products.length; i++) {
    products[i].addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-btn")) {
            this.classList.add("vanish");
        }
    })

         products[i].addEventListener("transitionend", function (event) {
         if (event.propertyName === "opacity") {
            this.classList.add("collapse");
        }
           if (event.propertyName === "max-height") {
            this.remove();
        }
    })
}

// open and close WHAT YOU'll NEED TO APPLY text
$(".what-you-will-need").hide();
$(".need-btn").on("click", function () {
    $(this).next().slideToggle();
})

/* FOR SMALL SCREENS, OPEN AND CLOSE PROMO INPUT AND DELIVERY INSTRUCTIONS TEXTAREA */


function resizer() {
    if (window.matchMedia("(max-width: 766px)").matches) {
        $(".submit-promo").hide();
        $("textarea").hide();

        $(".left-side h5").off("click.slide").on("click.slide", function () {
            $(".submit-promo").slideToggle();
        })

        $(".left-side label").off("click.toggle").on("click.toggle", function () {
            $("textarea").toggle();
        })
    } else {
        $(".submit-promo").show();
        $("textarea").show();
        $(".left-side h5").off();
        $(".left-side label").off();

    }
}

$(document).ready(resizer());

/* trigger the above function when user adjusts their screen size */
var resizeTimer;
$(window).on('resize', function (e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizer, 250);
});


//CODE FOR ATTEMPTING TO CHECK IF RENTAL PLAN IS OVER £2.50
/*var selects = Array.from(document.querySelectorAll(".quantity select"));

selects.forEach(function (selectElement) {
    itemprice = selectElement.parentElement.parentElement.querySelector(".plan-price")
    var producttotal = parseInt(this.value) * parseInt(itemprice);
    console.log(producttotal);
}) */

//POPUP

//POPUP
var popup = document.querySelector('.popup');
var $popup = $('.popup');
var $maincontainer = $('.maincontainer');
var maincontainer = document.querySelector('.maincontainer');
var $infoHowWorks = $(".info-how-works");
var $editPopup = $(".edit-popup");
var editTotalButton = document.querySelector(".total-cost-container .edit-btn");


$infoHowWorks.click(openpopup);

function openpopup() {
    $popup.css("display", "initial");
    setTimeout(function () {
        $(".how-works").addClass('popup--open');
        $maincontainer.addClass('blurfilter')
        $("body").addClass("fixed-for-popup-on-small-screen");
    }, 10);
}

$(".close-btn").click(function () {
    $popup.removeClass('popup--open');
    $maincontainer.removeClass('blurfilter');
    $("body").removeClass("fixed-for-popup-on-small-screen");
});

/* CLOSE POPUP BY CLICKING OUTSIDE OF POPUP */

$maincontainer.click(function (e) {
    if (e.target != popup) {
        $popup.removeClass('popup--open');
        $maincontainer.removeClass('blurfilter');
        $("body").removeClass("fixed-for-popup-on-small-screen");
    }
});

/* CLOSE POPUP WITH ESCAPE KEY!!! */
$(document).keydown(function (e) {
    if (e.which == 27) {
        $popup.removeClass('popup--open');
        $maincontainer.removeClass('blurfilter');
        $("body").removeClass("fixed-for-popup-on-small-screen");
    }
});


var editButtons = Array.from(document.querySelectorAll(".product .edit-btn"));
editButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        $editPopup.css("display", "initial");
        setTimeout(function () {
            $editPopup.addClass('popup--open');
            $maincontainer.addClass('blurfilter')
            $("body").addClass("fixed-for-popup-on-small-screen");
        }, 10);
    })
})

editTotalButton.addEventListener("click", function () {
    $editPopup.css("display", "initial");
    setTimeout(function () {
        $(".edit-total-plan").addClass('popup--open');
        $maincontainer.addClass('blurfilter')
        $("body").addClass("fixed-for-popup-on-small-screen");
    }, 10);
})
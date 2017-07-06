/* CODE FOR ACCESSORY BUTTONS */

var $price = $('.instrument-form__priceinfo');


var accessoriesTotal = 0;

function addAccessory() {
  $price.toggleClass('instrument-form__priceinfo--alert');
  if ($(this).hasClass('is-on-plan-already')) {
    $(this).removeClass('is-on-plan-already');
    $(this).text("ADD TO PLAN");
    $(this).prev().remove();
    accessoriesTotal = accessoriesTotal - Number(this.value);
    var total = parseFloat(selectPlan.value) + accessoriesTotal;
    var total2decimals = total.toFixed(2);
    $price.html('<div class="priceinfo__top"><p class="priceinfo__largetext">YOUR PLAN</p> \xA3' + total2decimals + ' per month for ' + months + ' months</div> <div class="priceinfo__btm"> <p>Plans can be cancelled penalty-free anytime after 3 months</p> <p>Complete the plan and the instrument is yours to keep</p> <p>First installment of \xA3' + total2decimals + ' payable on checkout</p></div>');
  } else if (!$(this).hasClass('is-on-plan-already')) {
    $(this).addClass('is-on-plan-already');
    $(this).text("REMOVE");
    $(this).before("<span class='added'>Added to plan</span>");
    accessoriesTotal = accessoriesTotal + Number(this.value);
    var total = parseFloat(selectPlan.value) + accessoriesTotal;
    var total2decimals = total.toFixed(2);
    $price.html('<div class="priceinfo__top"><p class="priceinfo__largetext">YOUR PLAN</p> \xA3' + total2decimals + ' per month for ' + months + ' months</div> <div class="priceinfo__btm"> <p>Plans can be cancelled penalty-free anytime after 3 months</p> <p>Complete the plan and the instrument is yours to keep</p> <p>First installment of \xA3' + total2decimals + ' payable on checkout</p></div>');
  }
}

/* LOTS OF VARIABLES */
var $infoHowWorks = $('.info-how-works');
var $firststepselect = $(".js-instrument-opt");
var $accessories = $(".accessories");
var $rentalplan = $('.rentalplan');
var selectPlan = document.getElementById('selectrentalplan');
var $selectPlan = $('#selectrentalplan');
var $errormessage = $('.error-message');
var $selectplanmessage = $('.selectplanmessage');
var $selectsize =  $('#selectsize');

function showErrorMessage() {
  if ($firststepselect[0].value == '') {
    $errormessage.removeClass('js-visibility-hidden');
    $selectsize.focus();
  } 
}

//prevent form submission before everything is filled out
$('.instrument-form__btn').click(function (e) {
  if (selectPlan.value == '') {
    e.preventDefault();
  }
});

$infoHowWorks.hide();
$('.js-noclickme').click(showErrorMessage);


//remove error message & open rental plan

function openplan() {
  if ($selectsize.value !== "") {
     $errormessage.addClass('js-visibility-hidden');
    $rentalplan.addClass('rentalplan--open');
    $infoHowWorks.show();
  }
}

//open recommended accessories
$(".add-accessory").hide();
var selectPlanValue = 0;
var addedaccessories = false;

var regex = /\s[0-9][0-9]\s/;

var months;

$("#selectrentalplan").change(function () {
  $accessories.addClass('accessories--open');
  $('.amend-message').removeClass('amend-message-disabled');
  $('.instrument-form__btn').addClass('instrument-form__btn--enabled');
  var total = parseFloat(selectPlan.value) + accessoriesTotal;
  var total2decimals = total.toFixed(2);
  selectPlanValue = selectPlan.value;
  var string = this.value;
  months = regex.exec(string);
  $(".instrument-form").addClass("two-rows");
  $price.css("borderRadius", "5px 5px 5px 5px");
  $price.css("paddingTop", "0");
  $price.css("paddingBottom", "0");
  $price.html('<div class="priceinfo__top"><p class="priceinfo__largetext">YOUR PLAN</p> \xA3' + total2decimals + ' per month for '+ months +' months months</div>\n<div class="priceinfo__btm"> <p>Plans can be cancelled penalty-free anytime after 3 months</p> <p>Complete the plan and the instrument is yours to keep</p> <p>First installment of \xA3' + total2decimals + ' payable on checkout</p></div>\n');

  if (addedaccessories == false) {
    $(".add-accessory").show();
    addedaccessories = true;
  }
  $selectplanmessage.css('display', 'none');
});


$('.seconderrormsg').click(function () {
  if ($rentalplan.hasClass('rentalplan--open') && (addedaccessories == false)) {
    $('#selectrentalplan').focus();
    $selectplanmessage.css('display', 'block');
  }
});

var tabLinks = document.querySelectorAll("tablinks");
var tabBox = document.querySelector(".tab_box");


tabBox.addEventListener("click", function(e) {
if (e.target.matches(".tablinks")) {
  e.target.classList.toggle("rotated")
}

}
)


//POPUP
var popup = document.querySelector('.popup');
var $popup = $('.popup');
var $popupAccessory = $('.popup--accessory');
var $maincontainer = $('.maincontainer');
var maincontainer = document.querySelector('.maincontainer');


$infoHowWorks.click(openpopup);

function openpopup() {
  $popup.css("display", "initial");
  setTimeout(function () {
    $popup.addClass('popup--open');
    $maincontainer.addClass('blurfilter')
    $("body").addClass("fixed-for-popup-on-small-screen");
  }, 10);
}

$(".close-btn").click(function () {
  $popup.removeClass('popup--open');
  $popup.css("display", "none");
  $popupAccessory.removeClass('popup--accessory--open');
  $maincontainer.removeClass('blurfilter');
  $("body").removeClass("fixed-for-popup-on-small-screen");
});


function showAccessoryPopup() {
  setTimeout(function () {
    $popupAccessory.addClass('popup--accessory--open');
    $maincontainer.addClass('blurfilter')
     $("body").addClass("fixed-for-popup-on-small-screen");
  }, 10);
}

/* CLOSE POPUP BY CLICKING OUTSIDE OF POPUP */

$maincontainer.click(function (e) {
  if (e.target != popup) {
    $popup.removeClass('popup--open');
    $popupAccessory.removeClass('popup--accessory--open');
    $maincontainer.removeClass('blurfilter');
     $("body").removeClass("fixed-for-popup-on-small-screen");
  }
});

/* CLOSE POPUP WITH ESCAPE KEY!!! */
$(document).keydown(function (e) {
  console.log("keydown");
  if (e.which == 27) {
    $popup.removeClass('popup--open');
    $popupAccessory.removeClass('popup--accessory--open');
    $maincontainer.removeClass('blurfilter');
     $("body").removeClass("fixed-for-popup-on-small-screen");
     checkoutpopup.style.display = "none";
  }
});


function changePicture(pictureclicked) {
  var mainpic = document.querySelector('.accessory__main-img > img');
  mainpic.src = pictureclicked.src;
}


//STUFF TO HAPPEN WHEN YOU CLICK THE "ADD TO BASKET" button
var form = document.forms[0];
var checkoutpopup = document.querySelector(".checkout-popup");


var frames = [
  {opacity: 0, transform: "scale(0)"},
  {opacity: 1, transform: "scale(1)"}
];

var options = {
  duration: 200,
  fill: 'both',
  easing: 'cubic-bezier(0,-0.75,1,1)'
}


form.addEventListener("submit", function(event) {
event.preventDefault();

document.body.classList.add("fixed-for-popup-on-small-screen");
checkoutpopup.style.display = "flex";
checkoutpopup.animate(frames, options);
})

var continuebutton = document.querySelector(".continue-button");
continuebutton.addEventListener("click", function() {
  checkoutpopup.style.display = "none";
  document.body.classList.remove("fixed-for-popup-on-small-screen");
})

var howRevealButton = document.querySelector(".how-reveal-button");
var toReveal = document.querySelector(".to-be-revealed");

toReveal.style.opacity = 0;

var revealFrames = [
  {opacity: 0},
  {opacity: 1}
]
var revealOptions = {
  duration: 200,
  easing: 'ease-out',
  fill: 'forwards'
}

howRevealButton.addEventListener("click", function() {
toReveal.animate(revealFrames, revealOptions);
})


var checkoutInner = document.querySelector(".checkout-inner")


 if (window.matchMedia("(min-width: 767px)").matches) {
var tablinks = document.querySelectorAll(".tablinks");
  tablinks[0].classList.add("rotated");
 }
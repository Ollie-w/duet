/* CODE FOR ACCESSORY BUTTONS */

var $price = $('.instrument-form__priceinfo');

var accessoriesTotal = 0;

function addAccessory() {
    $price.toggleClass('instrument-form__priceinfo--alert');
  if ($(this).hasClass('is-on-plan-already')) {
    $(this).removeClass('is-on-plan-already');
 $(this).text("ADD TO PLAN");
  $(this).parent().children().first().removeClass('ticked');
  accessoriesTotal = accessoriesTotal - Number(this.value);
  var total = parseFloat(selectPlan.value) + accessoriesTotal;
  var total2decimals = total.toFixed(2);
$price.html(`<div class="priceinfo__top"><span class="priceinfo__largetext">YOUR PLAN</span> £${total2decimals} per month for 36 months</div> <div class="priceinfo__btm"> <p>Plans can be cancelled penalty-free anytime after 3 months</p> <p>Complete the plan and the instrument is yours to keep</p> <p>First installment of £${total2decimals} payable on checkout</p></div>`);
  }
 else if (!$(this).hasClass('is-on-plan-already')) {
   $(this).addClass('is-on-plan-already');
    $(this).text("REMOVE FROM PLAN");
  $(this).parent().children().first().addClass('ticked');
  accessoriesTotal = accessoriesTotal + Number(this.value);
  var total = parseFloat(selectPlan.value) + accessoriesTotal;
  var total2decimals = total.toFixed(2);
 $price.html(`<div class="priceinfo__top"><span class="priceinfo__largetext">YOUR PLAN:</span> £${total2decimals} per month for 36 months</div> <div class="priceinfo__btm"> <p>Plans can be cancelled penalty-free anytime after 3 months</p> <p>Complete the plan and the instrument is yours to keep</p> <p>First installment of £${total2decimals} payable on checkout</p></div>`);
 }
}


/* LOTS OF VARIABLES */

var $firststepselect = $(".js-instrument-opt");
var $accessories = $(".accessories");
var $rentalplan = $('.rentalplan');
var selectPlan = document.getElementById('selectrentalplan');
var $selectPlan = $('#selectrentalplan');
var $errormessage = $('.error-message');
var $selectplanmessage = $('.selectplanmessage');

//prevent form submission before everything is filled out
  $('.instrument-form__btn').click(function(e) {
    if (selectPlan.value == '') {
    e.preventDefault();
  }
});


function showErrorMessage() {
  if($firststepselect[0].value == "") {
$errormessage.removeClass('js-visibility-hidden');
  $('#selectsize').focus();
}
else if ((($firststepselect[0].value != "") && ($firststepselect[1].value == ""))) {
  $errormessage.removeClass('js-visibility-hidden');
  $('#selectcolor').focus();
}
}

//error click event

$('.js-noclickme').click(showErrorMessage);

//remove error message

var $selectsize = $("#selectsize");
$selectsize.change(function() {
    $errormessage.addClass('js-visibility-hidden');
});


//remove error message & open rental plan
$('.js-instrument-opt').on('input', function() {
    if ($firststepselect[0].value !== "" && $firststepselect[1].value !== "") {
        $rentalplan.addClass('rentalplan--open');
        $errormessage.addClass('js-visibility-hidden');
    }
});



//open recommended accessories
$(".add-accessory").hide();
var selectPlanValue = 0;
var addedaccessories = false;

$("#selectrentalplan").change(function() {
$accessories.addClass('accessories--open');
$('.amend-message').removeClass('amend-message-disabled');
$('.instrument-form__btn').addClass('instrument-form__btn--enabled');
var total = parseFloat(selectPlan.value) + accessoriesTotal;
var total2decimals = total.toFixed(2);
selectPlanValue = selectPlan.value;
$price.css("borderRadius", "5px 5px 5px 5px");
$price.css("paddingTop", "0");
$price.css("paddingBottom", "0");
$price.html(`<div class="priceinfo__top"><p class="priceinfo__largetext">YOUR PLAN</p> £${total2decimals} per month for 36 months</div>
<div class="priceinfo__btm"> <p>Plans can be cancelled penalty-free anytime after 3 months</p> <p>Complete the plan and the instrument is yours to keep</p> <p>First installment of £${total2decimals} payable on checkout</p></div>
`);

if (addedaccessories == false) {
$(".add-accessory").show();
addedaccessories = true;
      }
$selectplanmessage.css('display', 'none');
});

$('.seconderrormsg').click(function() {
if ($rentalplan.hasClass('rentalplan--open') && (addedaccessories == false)) {
  $('#selectrentalplan').focus();
  $selectplanmessage.css('display', 'block');
}
});

//TABS!!!

/*function openTab(sectionName) {
    // Get all elements with class="tabcontent" and hide them
    $('.tabcontent').css("display", "none");
    // Get all elements with class="tablinks" and remove the class "active"
    $(".tablinks").removeClass("active");
    // Show the current tab, and add an "active" class to the link that opened the tab. Use the argument passed into the function as a jquery selector
    $("#" + sectionName).css("display", "block");
    $(this).addClass(" active");
}*/

 if (window.matchMedia("(max-width: 768px)").matches) {

$(".tabcontent").hide();
$(".tablinks").on("click", function() {
  $(this).next().slideToggle();
})
 }

 else if (window.matchMedia("(min-width: 769px)").matches) {
   $(".tabcontent").hide();
$(".tablinks").on("click", function() {
  $(this).next().appendTo($(".tablinks")[2]);
})
 }
 

//Have the description tag display its content
// $('#description').css("display", "block");

//POPUP
var popup = document.querySelector('.popup');
var $popup = $('.popup');
var $popupAccessory = $('.popup--accessory');
var $maincontainer = $('.maincontainer');
var maincontainer = document.querySelector('.maincontainer');


$('.info-how-works').click(openpopup);

function openpopup() {
$popup.css("display", "initial");
setTimeout(function(){
$popup.addClass('popup--open');
  $maincontainer.addClass('blurfilter')}, 10);
}

$(".close-btn").click(function() {
    $popup.removeClass('popup--open');
    $popupAccessory.removeClass('popup--accessory--open');
    $maincontainer.removeClass('blurfilter');
});


function showAccessoryPopup() {
    setTimeout(function(){
    $popupAccessory.addClass('popup--accessory--open');
      $maincontainer.addClass('blurfilter')}, 10);
}

/* CLOSE POPUP BY CLICKING OUTSIDE OF POPUP */

$maincontainer.click(function(e) {
  if (e.target != popup)  {
    $popup.removeClass('popup--open');
  $popupAccessory.removeClass('popup--accessory--open');
  $maincontainer.removeClass('blurfilter');
  }
});

/* CLOSE POPUP WITH ESCAPE KEY!!! */
$(document).keydown(function(e) {
if (e.which == 27) {
   $popup.removeClass('popup--open');
  $popupAccessory.removeClass('popup--accessory--open');
  $maincontainer.removeClass('blurfilter');
}
});


function changePicture(pictureclicked) {
var mainpic =  document.querySelector('.accessory__main-img > img');
mainpic.src = pictureclicked.src;
}

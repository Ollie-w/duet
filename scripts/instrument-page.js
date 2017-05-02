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
  $price.html(`
<div class="priceinfo__top"><span class="priceinfo__largetext">Your plan:</span> £${total2decimals} per month for 36 months</div>
<div class="priceinfo__btm">First installment of £${total2decimals} payable on checkout</div>
`);
  }
 else if (!$(this).hasClass('is-on-plan-already')) {
   $(this).addClass('is-on-plan-already');
    $(this).text("REMOVE FROM PLAN");
  $(this).parent().children().first().addClass('ticked');
  accessoriesTotal = accessoriesTotal + Number(this.value);
  var total = parseFloat(selectPlan.value) + accessoriesTotal;
  var total2decimals = total.toFixed(2);
  $price.html(`<div class="priceinfo__top"><span class="priceinfo__largetext">Your plan:</span> £${total2decimals} per month for 36 months</div>
<div class="priceinfo__btm">First installment of £${total2decimals} payable on checkout</div>`);
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
$price.html(`<div class="priceinfo__top"><span class="priceinfo__largetext">Your plan:</span> £${total2decimals} per month for 36 months</div>
<div class="priceinfo__btm">First installment of £${total2decimals} payable on checkout</div>
`);

if (addedaccessories == false) {
$accessories.append(`<div class="add-accessory">
<img class='checkbox_container__img' src="LMS02-BK-category.jpg" alt="">
<div>
<button type="button" onclick="showAccessoryPopup()" class="accessory-popup-btn accessory-description">Opus LMS02 lightweight folding music stand supplied with carrying bag in black</button>
        <legend>£0.27p for 60 months</legend>
        <button onclick="addAccessory.call(this);" value="0.27" type="button" class="add-to-plan">ADD TO PLAN</button>
        </div>
        </div>

       <div class="add-accessory">
         <input value="0.99" id="shoulderrest" type="checkbox">
<img class='checkbox_container__img' src="STN1175A.jpg" alt="">
<div><button type="button" onclick="showAccessoryPopup()" class="accessory-popup-btn accessory-description">Kun violin shoulder rest 4/4</button>
        <legend>£0.99p for 60 months</legend>
         <button onclick="addAccessory.call(this);" value="0.99" type="button" class="add-to-plan">ADD TO PLAN</button>
        </div>
        </div>
`);

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


function openTab(sectionName) {
    $('.tabcontent').css("display", "none");
    $(".tablinks").removeClass("active");
   var elem = $("#" + sectionName);
 
    $(this).addClass(" active");
    console.log($(this))
}

//Have the description tag display its content
$('#description').css("display", "block");

//POPUP
var popup = document.querySelector('.popup');
var $popup = $('.popup');
var $popupAccessory = $('.popup--accessory');
var $maincontainer = $('.maincontainer');
var maincontainer = document.querySelector('.maincontainer');

$('#js-more-info-btn').click(openpopup);
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

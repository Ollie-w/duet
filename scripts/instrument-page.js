
var regexforamount = /[0-9]?,?[0-9]{1,3}\.[0-9][0-9]/
var months;
var displaytabbox = false;

var newImage;
var newDiv, newSubDiv, newSubSubDiv, newPopupDiv, newPopupSubDiv, newPopupSubSubDiv;
var newOpt;
var newLi;
var newElement;
var xmlNode;
var DOMNode;

function removeit(int) {
  this.closest(".popup--accessory").classList.remove("is-on-plan");
  addAccessory.call(this, int)
}

/* refresh data when product selected or changed. Don't have to test for product-not-found as the _refresh page handles that */
function variantselected() {
  var temp = '';
  var n = 0;
  var m = 0;
  var actioncount = 0;
  var productselected = document.getElementById('selectsize').value;
  if (productselected != document.getElementById("activeproduct").value) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "_productdetailrefresh.asp?productid=" + productselected, false);
    xhttp.send();
    var xmlDoc = xhttp.responseXML;
    /* we know we have variants (!) as that is what we are processing and we know we have plan selection */
    actioncount++;
    document.getElementById("ajax_actionselectvariant").innerHTML = actioncount.toString();
    actioncount++;
    document.getElementById("ajax_actionselectplan").innerHTML = actioncount.toString();
    temp = xmlDoc.getElementsByTagName("Title")[0].childNodes[0].nodeValue;
    document.getElementById("ajax_breadcrumbtitle").innerHTML = temp;
    document.getElementById("h1-title").innerHTML = temp;
    temp = xmlDoc.getElementsByTagName("numBullets")[0].childNodes[0].nodeValue;
    if (temp == '0')
      document.getElementById("ajax_bullet1").innerHTML = '';
    else {
      xmlNode = xmlDoc.getElementsByTagName("BulletList")[0];
      xmlNode = xmlNode.getElementsByTagName("Bullet")[0];
      temp = xmlNode.childNodes[0].nodeValue;
      document.getElementById("ajax_bullet1").innerHTML = temp;
    }
    //unhide the productcode section and set the values
    DOMNode = document.getElementsByClassName("ajax_productcodeblock")
    for (i = 0; i <= DOMNode.length - 1; i++)
      DOMNode[i].style.display = "inline";
    temp = xmlDoc.getElementsByTagName("Product")[0].childNodes[0].nodeValue;
    DOMNode = document.getElementsByClassName("ajax_productcode")
    for (i = 0; i <= DOMNode.length - 1; i++)
      DOMNode[i].innerHTML = temp;
    xmlNode = xmlDoc.getElementsByTagName("Manufacturer")[0];
    xmlNode = xmlNode.getElementsByTagName("Name")[0];
    temp = xmlNode.childNodes[0].nodeValue;
    DOMNode = document.getElementsByClassName("ajax_manufacturer")
    for (i = 0; i <= DOMNode.length - 1; i++)
      DOMNode[i].innerHTML = temp;
    xmlNode = xmlDoc.getElementsByTagName("Manufacturer")[0];
    xmlNode = xmlNode.getElementsByTagName("URL")[0];
    temp = xmlNode.childNodes[0].nodeValue;
    DOMNode = document.getElementsByClassName("ajax_manufacturerURL")
    for (i = 0; i <= DOMNode.length - 1; i++)
      DOMNode[i].href = temp;

    // remove image carousel cells, add new images, refresh carousel 
    n = parseInt(xmlDoc.getElementsByTagName("numImages")[0].childNodes[0].nodeValue);
    DOMNode = document.getElementsByClassName("main-carousel")[0];

      var newitems = [];

var cellimages = Array.from(document.querySelectorAll(".primary-images .carousel-cell > img"));

cellimages.forEach(function(cell) {
newitems.push({
src: cellimages.src,
w: 1200,
h: 900
})
})

    if (n == 1)
      DOMNode.innerHTML = '';
    else {
      var cells = document.querySelectorAll(".carousel-cell");
      flkty.remove(cells);

      
    }
    for (i = 0; i <= n - 1; i++) {
      newImage = document.createElement("img")
      xmlNode = xmlDoc.getElementsByTagName("ImageList")[0];
      xmlNode = xmlNode.getElementsByTagName("Image")[i];
      xmlNode = xmlNode.getElementsByTagName("ImageFile")[0];
      temp = xmlNode.childNodes[0].nodeValue;
      newImage.src = temp;
      xmlNode = xmlDoc.getElementsByTagName("ImageList")[0];
      xmlNode = xmlNode.getElementsByTagName("Image")[i];
      xmlNode = xmlNode.getElementsByTagName("Style")[0];
      temp = xmlNode.childNodes[0].nodeValue;
      xmlNode = xmlDoc.getElementsByTagName("ImageList")[0];
      xmlNode = xmlNode.getElementsByTagName("Image")[i];
      xmlNode = xmlNode.getElementsByTagName("Alt")[0];
      temp = xmlNode.childNodes[0].nodeValue;
      newImage.alt = temp;
      newDiv = document.createElement("div")
      newDiv.appendChild(newImage);
      newDiv.className = "carousel-cell";
      if (n == 1) {
        DOMNode.appendChild(newDiv)
            var ccell = document.querySelector(".carousel-cell")
    ccell.addEventListener("click", function() {
        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, newitems);
gallery.init();
    })
      }
      else {
        flkty.append(newDiv);
    }
    }

    n = parseInt(xmlDoc.getElementsByTagName("numLinkedProds")[0].childNodes[0].nodeValue);
    document.getElementById("NumLinkedProds").value = n;
    DOMNode = document.getElementById("ajax_linkedprodslist");
    DOMNode.innerHTML = '';
    DOMNode.style.display = "none";
    DOMNode = document.getElementById("ajax_linkedprodspopupslist");
    DOMNode.innerHTML = '';

    if (n == 0)
      document.getElementById("ajax_linkedwrapper").style.display = "none";
    else {
      document.getElementById("ajax_linkedwrapper").style.display = "block";
      actioncount++;
      document.getElementById("ajax_actionselectlinked").innerHTML = actioncount.toString();

      for (i = 0; i <= (n - 1); i++) {

        xmlNode = xmlDoc.getElementsByTagName("LinkedList")[0].getElementsByTagName("LinkedProductData")[i];

        newDiv = document.createElement("div");
        newDiv.className = "add-accessory";
        newDiv.id = "add-accessory-" + parseInt(i + 1);

        newPopupDiv = document.createElement("div");
        newPopupDiv.className = "popup--accessory";
        newPopupDiv.id = "popup--accessory" + parseInt(i + 1).toString();
        newPopupDiv.innerHTML = '<button class="close-btn" type="button"><svg stroke="white" stroke-width="5" viewbox="0 0 40 40"><path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg></button>'

        newElement = document.createElement("input");
        newElement.type = "hidden";
        newElement.id = "LinkedProd" + parseInt(i + 1);
        newElement.value = xmlNode.getElementsByTagName("Product")[0].childNodes[0].nodeValue;
        newDiv.appendChild(newElement);

        newSubDiv = document.createElement("div");
        newSubDiv.className = "accessory-flex";

        newPopupSubDiv = document.createElement("div");
        newPopupSubDiv.className = "popup__left";
        m = parseInt(xmlNode.getElementsByTagName("numImages")[0].childNodes[0].nodeValue);
        if (m > 0) {
          newImage = document.createElement("img");
          newImage.src = xmlNode.getElementsByTagName("ImageList")[0].getElementsByTagName("Image")[0].getElementsByTagName("ImageFile")[0].childNodes[0].nodeValue;
          newImage.alt = xmlNode.getElementsByTagName("ImageList")[0].getElementsByTagName("Image")[0].getElementsByTagName("Alt")[0].childNodes[0].nodeValue;
          newImage.className = "checkbox_container__img";
          newSubDiv.appendChild(newImage);
          newPopupSubSubDiv = document.createElement("div");
          newPopupSubSubDiv.className = "accessory__main-img";
          newImage = document.createElement("img");
          newImage.id = "accessory__main-img" + (i + 1).toString();
          newImage.src = xmlNode.getElementsByTagName("ImageList")[0].getElementsByTagName("Image")[0].getElementsByTagName("ImageFile")[0].childNodes[0].nodeValue;
          newImage.alt = xmlNode.getElementsByTagName("ImageList")[0].getElementsByTagName("Image")[0].getElementsByTagName("Alt")[0].childNodes[0].nodeValue;
          newPopupSubSubDiv.appendChild(newImage);
          newPopupSubDiv.appendChild(newPopupSubSubDiv);
          if (m > 1) {
            newPopupSubSubDiv = document.createElement("div");
            newPopupSubSubDiv.className = "popup__thumbnails";
            for (j = 0; j <= (m - 1); j++) {
              newElement = document.createElement("div");
              newElement.className = "accessory__img__container";
              newImage = document.createElement("img");
              newImage.onmouseover = "changePicture('" & (i + 1).toString() & "', this)";
              newImage.src = xmlNode.getElementsByTagName("ImageList")[0].getElementsByTagName("Image")[j].getElementsByTagName("ImageFile")[0].childNodes[0].nodeValue;
              newImage.alt = xmlNode.getElementsByTagName("ImageList")[0].getElementsByTagName("Image")[j].getElementsByTagName("Alt")[0].childNodes[0].nodeValue;
              newElement.appendChild(newImage);
              newPopupSubSubDiv.appendChild(newElement);
            }
            newPopupSubDiv.appendChild(newPopupSubSubDiv);
          }
        }
        newPopupDiv.appendChild(newPopupSubDiv);

        newSubSubDiv = document.createElement("div");
        newSubSubDiv.innerHTML = '<button type="button" onclick="showAccessoryPopup(' + parseInt(i + 1).toString() + ')" class="accessory-popup-btn accessory-description">' + xmlNode.getElementsByTagName("Title")[0].childNodes[0].nodeValue + '</button>';
        m = parseInt(xmlDoc.getElementsByTagName("numLeases")[0].childNodes[0].nodeValue);
        for (j = 0; j <= m - 1; j++) {
          newElement = document.createElement("legend")
          temp = xmlNode.getElementsByTagName("LeaseList")[0].getElementsByTagName("Lease")[j].getElementsByTagName("Months")[0].childNodes[0].nodeValue;
          newElement.id = "accessorylegend-" + parseInt(i + 1).toString() + "-" + temp;
          newElement.style.display = "none";
          newElement.innerHTML = "\xA3" + xmlNode.getElementsByTagName("LeaseList")[0].getElementsByTagName("Lease")[j].getElementsByTagName("Cost")[0].childNodes[0].nodeValue + " per month for " + temp + " months";
          newSubSubDiv.appendChild(newElement);
        }
        newSubDiv.appendChild(newSubSubDiv);
        newDiv.appendChild(newSubDiv);

        newSubDiv = document.createElement("div");
        newSubDiv.className = "add-btn-wrapper";
        newSubDiv.innerHTML = '<button id="add-accessory-btn-' + parseInt(i + 1).toString() + '" onclick="addAccessory.call(this,' + parseInt(i + 1).toString() + ');" value="" type="button" class="add-to-plan">ADD TO PLAN</button>';
        newDiv.appendChild(newSubDiv);

        document.getElementById("ajax_linkedprodslist").appendChild(newDiv);

        newPopupSubDiv = document.createElement("div");
        newPopupSubDiv.className = "popup__right";
        newElement = document.createElement("h3");
        newElement.innerHTML = xmlNode.getElementsByTagName("Title")[0].childNodes[0].nodeValue;
        newPopupSubDiv.appendChild(newElement);
        m = parseInt(xmlNode.getElementsByTagName("numBullets")[0].childNodes[0].nodeValue);
        if (m > 0) {
          newElement = document.createElement("p");
          newElement.innerHTML = xmlNode.getElementsByTagName("BulletList")[0].getElementsByTagName("Bullet")[0].childNodes[0].nodeValue;
          newPopupSubDiv.appendChild(newElement);
          if (m > 1) {
            newElement = document.createElement("ul");
            for (j = 1; j <= m - 1; j++) {
              newLi = document.createElement("li");
              newLi.innerHTML = xmlNode.getElementsByTagName("BulletList")[0].getElementsByTagName("Bullet")[j].childNodes[0].nodeValue;
              newElement.appendChild(newLi);
            }
            newPopupSubDiv.appendChild(newElement);
          }
        }
        newPopupDiv.appendChild(newPopupSubDiv);

        newElement = document.createElement("p");
        newElement.className = "popup__only-extra";
        newElement.id = "popup__only-extra-" + (i + 1).toString();
        newPopupDiv.appendChild(newElement);
        newElement = document.createElement("button");
        newElement.type = "button";
        newElement.id = "popup-add-to-plan-" + (i + 1).toString();
        newElement.innerHTML = "CLOSE";

        newPopupDiv.appendChild(newElement);

        document.getElementById("ajax_linkedprodspopupslist").appendChild(newPopupDiv);
      }
    }
    // write out the lease options and change the lowest-cost flash
    DOMNode = document.getElementById("selectrentalplan");
    DOMNode.innerHTML = '';
    newOpt = document.createElement("option");
    newOpt.value = '';
    newOpt.disabled = true;
    newOpt.selected = true;
    newOpt.text = "Select rental plan";
    DOMNode.appendChild(newOpt);
    n = parseInt(xmlDoc.getElementsByTagName("numLeases")[0].childNodes[0].nodeValue);
    for (i = 0; i <= n - 1; i++) {
      xmlNode = xmlDoc.getElementsByTagName("LeaseList")[0];
      xmlNode = xmlNode.getElementsByTagName("Lease")[i];
      months = xmlNode.getElementsByTagName("Months")[0].childNodes[0].nodeValue
      temp = xmlNode.getElementsByTagName("Cost")[0].childNodes[0].nodeValue
      newOpt = document.createElement("option");
      newOpt.value = months;
      newOpt.disabled = false;
      newOpt.selected = false;
      newOpt.text = '\xA3' + temp + ' per month for ' + months + ' months';
      DOMNode.appendChild(newOpt);
    }
    // at this point xmlNode is the last lease i.e. the cheapest and temp is the lowest price
    document.getElementById("ajax_lowestlease").innerHTML = 'Rent for as little as \xA3' + temp + ' per month';

    // write the remaining bullets
    DOMNode = document.getElementsByClassName("features")[0];
    n = parseInt(xmlDoc.getElementsByTagName("numBullets")[0].childNodes[0].nodeValue);
    if (n <= 1)
      DOMNode.style.display = 'none';
    else {
      DOMNode.style.display = 'block';
      document.getElementById("ajax_bulletlist").innerHTML = '';
      //start with second bullet, first one is at top of page
      for (i = 1; i <= n - 1; i++) {
        xmlNode = xmlDoc.getElementsByTagName("BulletList")[0];
        xmlNode = xmlNode.getElementsByTagName("Bullet")[i];
        temp = xmlNode.childNodes[0].nodeValue;
        newLi = document.createElement("li");
        newLi.innerHTML = "<span>" + temp + "</span>";
        document.getElementById("ajax_bulletlist").appendChild(newLi);
      }
    }
    // Description / extra description / size flyouts
    displaytabbox = false;
    DOMNode = document.getElementById("ajax_tabbox");
    DOMNode.innerHTML = '<div class="tab"></div>';
    temp = '';
    if (xmlDoc.getElementsByTagName("Description")[0].childNodes.length > 0) temp = xmlDoc.getElementsByTagName("Description")[0].childNodes[0].nodeValue;
    settabsection(temp, 'description', 'description', 'DESCRIPTION');
    temp = '';
    if (xmlDoc.getElementsByTagName("ExtraDescription")[0].childNodes.length > 0) temp = xmlDoc.getElementsByTagName("ExtraDescription")[0].childNodes[0].nodeValue;
    settabsection(temp, 'extradescription', 'moreinfo', 'MORE INFO');
    temp = '';
    if (xmlDoc.getElementsByTagName("Size")[0].childNodes.length > 0) temp = xmlDoc.getElementsByTagName("Size")[0].childNodes[0].nodeValue;
    settabsection(temp, 'size', 'size', 'SIZE');
    DOMNode = document.getElementById("ajax_tabbox");
    if (displaytabbox)
      DOMNode.style.display = 'block'
    else
      DOMNode.style.display = 'none';

    // alternative products
    n = parseInt(xmlDoc.getElementsByTagName("numAlternatives")[0].childNodes[0].nodeValue);
    document.getElementById("NumAlts").value = n;
    DOMNode = document.getElementById("ajax_alternatives");
    DOMNode.innerHTML = '';
    if (n == 0)
      DOMNode.style.display = "none";
    else {
      DOMNode.style.display = "inline-block";
      newElement = document.createElement("h4");
      newElement.innerHTML = "Alternatives";
      DOMNode.appendChild(newElement);
      for (i = 0; i <= n - 1; i++) {
        xmlNode = xmlDoc.getElementsByTagName("AlternativesList")[0].getElementsByTagName("AltProductData")[i];
        newDiv = document.createElement("div");
        newDiv.className = "item";
        newElement = document.createElement("a");
        newElement.href = xmlNode.getElementsByTagName("URL")[0].childNodes[0].nodeValue;
        m = parseInt(xmlNode.getElementsByTagName("numImages")[0].childNodes[0].nodeValue);
        if (m > 0) {
          newImage = document.createElement("img");
          newImage.src = xmlNode.getElementsByTagName("ImageList")[0].getElementsByTagName("Image")[0].getElementsByTagName("ImageFile")[0].childNodes[0].nodeValue;
          newImage.alt = xmlNode.getElementsByTagName("ImageList")[0].getElementsByTagName("Image")[0].getElementsByTagName("Alt")[0].childNodes[0].nodeValue;
          newElement.appendChild(newImage);
        }
        newDiv.appendChild(newElement);
        newSubDiv = document.createElement("div")
        newSubDiv.className = "item_text";
        newElement = document.createElement("a");
        newElement.href = xmlNode.getElementsByTagName("URL")[0].childNodes[0].nodeValue;
        newElement.innerHTML = "<h5>" + xmlNode.getElementsByTagName("Title")[0].childNodes[0].nodeValue + "</h5?"
        newSubDiv.appendChild(newElement);
        if (xmlDoc.getElementsByTagName("Bullet1")[0].childNodes.length > 0) {
          if (!xmlNode.getElementsByTagName("Bullet1")[0].childNodes[0].nodeValue == '') {
            newElement = document.createElement("p");
            newElement.innerHTML = xmlNode.getElementsByTagName("Bullet1")[0].childNodes[0].nodeValue;
            newSubDiv.appendChild(newElement); }}
        m = parseInt(xmlDoc.getElementsByTagName("numLeases")[0].childNodes[0].nodeValue);
        for (j = 0; j <= m - 1; j++) {
          newElement = document.createElement("p")
          newElement.className = "pricings";
          temp = xmlNode.getElementsByTagName("LeaseList")[0].getElementsByTagName("Lease")[j].getElementsByTagName("Months")[0].childNodes[0].nodeValue;
          newElement.id = "alternativelegend-" + parseInt(i + 1).toString() + "-" + temp;
          if (j < (m - 1))
            newElement.style.display = "none";
          else
            newElement.style.display = "block";
          newElement.innerHTML = "\xA3" + xmlNode.getElementsByTagName("LeaseList")[0].getElementsByTagName("Lease")[j].getElementsByTagName("Cost")[0].childNodes[0].nodeValue + " for " + temp + " months";
          newSubDiv.appendChild(newElement);
        }
        newDiv.appendChild(newSubDiv);
        DOMNode.appendChild(newDiv);
      }
    }

    document.getElementById("activeproduct").value = xmlDoc.getElementsByTagName("Product")[0].childNodes[0].nodeValue;

  } // end if item selected is different
}

function settabsection(tabtext, tabname, fieldname, tabtitle) {
  if (!tabtext == '') {
    newDiv = document.createElement("div");
    newDiv.id = 'ajax_' + tabname + 'tab';
    newElement = document.createElement("a");
    newElement.href = "javascript:void(0)";
    newElement.className = "tablinks";
    if (!displaytabbox)
      newElement.classList.add("active");
    newElement.innerHTML = tabtitle + '   <svg class="chevron" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 8.6"><path d="M7.5 8.6L0 1.1 1.1 0l6.4 6.4L13.9 0 15 1.1 7.5 8.6z" /></svg>'
    newDiv.appendChild(newElement);
    newSubDiv = document.createElement("div");
    newSubDiv.id = fieldname;
    newSubDiv.className = "tabcontent";
    newElement = document.createElement("p");
    newElement.innerHTML = tabtext;
    newSubDiv.appendChild(newElement);
    newDiv.appendChild(newSubDiv);
    DOMNode.appendChild(newDiv);
    displaytabbox = true;
  }
}

/* CODE FOR ACCESSORY BUTTONS */

var $price = $('.instrument-form__priceinfo');
var accessoriesTotal = 0;

function addAccessory() {
  $price.toggleClass('instrument-form__priceinfo--alert');
  if ($(this).hasClass('is-on-plan-already')) {
    $(this).removeClass('is-on-plan-already');
    $(this).text("ADD TO PLAN");
    $(this).prev().remove();
    console.log(this)
    var btnToChange = document.getElementById("popup-add-to-plan-" + arguments[0]);
    accessoriesTotal = accessoriesTotal - Number(this.value);
  } else if (!$(this).hasClass('is-on-plan-already')) {
    $(this).addClass('is-on-plan-already');
    $(this).text("REMOVE");
    $(this).before("<span class='added'>Added to plan</span>");
    accessoriesTotal = accessoriesTotal + Number(this.value);
  }
  var plantext = selectPlan.options[selectPlan.selectedIndex].text;
  var planamount = regexforamount.exec(plantext)
  planamount = planamount[0].replace(",", "");
  var total2decimals = format_number((parseFloat(planamount) + accessoriesTotal).toFixed(2), 2, false);
  $price.html('<div class="priceinfo__top"><p class="priceinfo__largetext">YOUR PLAN</p> \xA3' + total2decimals + ' per month for ' + months + ' months</div> <div class="priceinfo__btm"> <p>Plans can be cancelled penalty-free anytime after 3 months</p> <p>Complete the plan and the instrument is yours to keep</p> <p>First installment of \xA3' + total2decimals + ' payable on checkout</p></div>');
}

/* LOTS OF VARIABLES */
var $infoHowWorks = $('.info-how-works');
var infohowworks = document.querySelector('.info-how-works');
var $firststepselect = $(".js-instrument-opt");
var $accessories = $(".accessories");
var $rentalplan = $('.rentalplan');
var selectPlan = document.getElementById('selectrentalplan');
var $selectPlan = $('#selectrentalplan');
var $errormessage = $('.error-message');
var $selectplanmessage = $('.selectplanmessage');
var $selectsize = $('#selectsize');
var selectsize = document.getElementById('selectsize');

function showErrorMessage() {
  if (document.getElementById("selectsize")) { // added by JMS
    if ($firststepselect[0].value == '') {
      $errormessage.removeClass('js-visibility-hidden');
      $selectsize.focus();
    }
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
 
    $errormessage.addClass('js-visibility-hidden');
    $rentalplan.addClass('rentalplan--open');
    $infoHowWorks.show();
}

//open recommended accessories
$(".add-accessory").hide();
//var selectPlanValue = 0; //JMS I can't see that this is used anywhere
var addedaccessories = false;

  function rentalplanstuff() {
  $accessories.addClass('accessories--open');
  $('.amend-message').removeClass('amend-message-disabled');
  $('.instrument-form__btn').addClass('instrument-form__btn--enabled');
  var plantext = selectPlan.options[selectPlan.selectedIndex].text;
  var tempamount = regexforamount.exec(plantext)
  tempamount = tempamount[0].replace(",", "");
  var total = parseFloat(tempamount) + accessoriesTotal;
  var total2decimals = format_number(parseFloat(total).toFixed(2), 2, false);
  months = this.value;
  var accessorycost = '';
  $(".instrument-form").addClass("two-rows");
  $price.css("borderRadius", "5px 5px 5px 5px");
  $price.css("paddingTop", "0");
  $price.css("paddingBottom", "0");
  $price.html('<div class="priceinfo__top"><p class="priceinfo__largetext">YOUR PLAN</p> \xA3' + total2decimals + ' per month for ' + months + ' months</div>\n<div class="priceinfo__btm"> <p>Plans can be cancelled penalty-free anytime after 3 months</p> <p>Complete the plan and the instrument is yours to keep</p> <p>First installment of \xA3' + total2decimals + ' payable on checkout</p></div>\n');
  // pick the text for linked products and alternatives to match the lease period selected NB start at 1, the first option (0) is the dummy "select x"
  var numLinked = parseInt(document.getElementById("NumLinkedProds").value);
  if (numLinked > 0) {
    document.getElementById("ajax_linkedprodslist").style.display = "block";
    for (i = 1; i <= this.options.length - 1; i++) {
      for (j = 1; j <= numLinked; j++)
        document.getElementById("accessorylegend-" + j.toString() + "-" + this.options[i].value).style.display = "none";
    }
    for (j = 1; j <= numLinked; j++) {
      document.getElementById("accessorylegend-" + j.toString() + "-" + months).style.display = "block";
      accessorycost = regexforamount.exec(document.getElementById("accessorylegend-" + j.toString() + "-" + months).innerHTML);
      accessorycost = accessorycost[0].replace(",", "");
      document.getElementById("add-accessory-btn-" + j.toString()).value = accessorycost;
      document.getElementById("popup-add-to-plan-" + j.toString()).value = accessorycost;
      document.getElementById("popup__only-extra-" + j.toString()).innerHTML = 'Add to your plan for only <br/> <span class="twentypixels">&pound;' + accessorycost + ' per month</span>';
    }
  }
  var numAlts = parseInt(document.getElementById("NumAlts").value);
  if (numAlts > 0) {
    document.getElementById("ajax_alternatives").style.display = "inline-block";
    for (i = 1; i <= this.options.length - 1; i++) {
      for (j = 1; j <= numAlts; j++)
        document.getElementById("alternativelegend-" + j.toString() + "-" + this.options[i].value).style.display = "none";
    }
    for (j = 1; j <= numAlts; j++)
      document.getElementById("alternativelegend-" + j.toString() + "-" + months).style.display = "block";
  }

  if (addedaccessories == false) {
    $(".add-accessory").show();
    addedaccessories = true;
  }
  $selectplanmessage.css('display', 'none');
}

$("#selectrentalplan").change(rentalplanstuff);


$('.seconderrormsg').click(function () {
  if ($rentalplan.hasClass('rentalplan--open') && (addedaccessories == false)) {
    $('#selectrentalplan').focus();
    $selectplanmessage.css('display', 'block');
  }
});


var tabLinks = document.querySelectorAll("tablinks");
var tabBox = document.querySelector(".tab_box");

tabBox.addEventListener("click", function (e) {
  if (e.target.matches(".tablinks")) {
    console.log("pressed" + e.target.classList)
    e.target.classList.toggle("rotated")
  }
})


//POPUP
var popup = document.getElementsByClassName('popup')[0];
var $popup = $('.popup');
var $popupAccessory = $('.popup--accessory');
var popupAccessory = document.getElementsByClassName('popup--accessory');
var $maincontainer = $('.maincontainer');
var maincontainer = document.querySelector('.maincontainer');

$infoHowWorks.click(openpopup);

function openpopup() {
  popup.style.display = "block"
  setTimeout(function () {
    popup.classList.add('popup--open');
    document.body.classList.add("fixed-for-popup-on-small-screen");
  }, 10);
}

var ajaxPopups = document.getElementById("ajax_linkedprodspopupslist");
ajaxPopups.addEventListener("click", function(e) {
  if (e.target.classList.contains("close-btn")) {
    console.log(e.target + "clicked")
    e.target.parentElement.classList.remove("popup--accessory--open")
    popup.classList.remove('popup--open')
  popup.style.display = "none";
  document.body.classList.remove("fixed-for-popup-on-small-screen")
  }
})

var closeButton = document.querySelector("svg.close-btn");
closeButton.addEventListener("click", function() {
  this.parentElement.classList.remove("popup--open")
  document.body.classList.remove("fixed-for-popup-on-small-screen")
  popup.style.display = "none"
})


function showAccessoryPopup(inx) {
  setTimeout(function () {
    var thisPopup = document.getElementById("popup--accessory" + inx);
    var tempclass = document.getElementById("popup--accessory" + inx).className; //JMS
    tempclass = tempclass + ' popup--accessory--open'; //JMS
    document.getElementById("popup--accessory" + inx).className = tempclass; //JMS

    var thisButton = document.getElementById("add-accessory-btn-" + inx);

    $("body").addClass("fixed-for-popup-on-small-screen");
    var buttonToChange = document.getElementById("popup-add-to-plan-" + inx)
    
        buttonToChange.addEventListener("click", function () {
        thisPopup.classList.remove("popup--accessory--open")
        $("body").removeClass("fixed-for-popup-on-small-screen");
      })
 
  }, 10);
}
/* CLOSE POPUP BY CLICKING OUTSIDE OF POPUP */

$maincontainer.click(function (e) {
  if ((e.target != popup) && (e.target != infohowworks)) {
    $(".popup").removeClass('popup--open');
    $('.popup--accessory').removeClass('popup--accessory--open');
    $("body").removeClass("fixed-for-popup-on-small-screen");
    checkoutpopup.style.display = "none";
      popup.style.display = "none"
  }
});

/* CLOSE POPUP WITH ESCAPE KEY!!! */
$(document).keydown(function (e) {
  console.log("keydown");
  if (e.which == 27) {
    $(".popup").removeClass('popup--open');
    $('.popup--accessory').removeClass('popup--accessory--open');
    $("body").removeClass("fixed-for-popup-on-small-screen");
    checkoutpopup.style.display = "none";
    popup.style.display = "none"
  }
});

function changePicture(inx, pictureclicked) {
  var mainpic = document.getElementById("accessory__main-img" + inx);
  //var mainpic = document.querySelector('.accessory__main-img > img');
  mainpic.src = pictureclicked.src;
}

//STUFF TO HAPPEN WHEN YOU CLICK THE "ADD TO BASKET" button
var form = document.querySelector(".instrument-form");
var checkoutpopup = document.querySelector(".checkout-popup");

var frames = [{
    opacity: 0,
    transform: "scale(0)"
  },
  {
    opacity: 1,
    transform: "scale(1)"
  }
];

var options = {
  duration: 200,
  fill: 'both',
  easing: 'cubic-bezier(0,-0.75,1,1)'
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var numlines = 1; //main product even if no accessories
  var qs = "action=A&return=Y&P1=" + document.getElementById("activeproduct").value;
  for (i = 1; i <= document.getElementById("NumLinkedProds").value; i++) {
    if (document.getElementById("add-accessory-btn-" + i.toString()).classList.contains("is-on-plan-already")) {
      numlines++;
      qs = qs.concat("&P", numlines.toString() + "=" + document.getElementById("LinkedProd" + i.toString()).value); }}
  qs = qs.concat("&numlines=", numlines.toString());
  months = document.getElementById("selectrentalplan").options[selectPlan.selectedIndex].value;
  qs = qs.concat("&months=" + months);
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "_addtobasket.asp?" + qs, false);
  xhttp.send();
  var xmlDoc = xhttp.responseXML;
  document.getElementsByClassName("number-in-basket").innerHTML = xmlDoc.getElementsByTagName("Items")[0].childNodes[0].nodeValue;

  var addedproductslist = document.getElementById("ajax_addedproductslist");
  addedproductslist.innerHTML = "";
  numlines = parseInt(xmlDoc.getElementsByTagName("Items")[0].childNodes[0].nodeValue);
  for (i = 0; i <= numlines - 1; i++) {
    newDiv = document.createElement("div");
    newSubDiv = document.createElement("div");
    newSubDiv.className = "product";
    if (xmlDoc.getElementsByTagName("OrderLine")[i].getElementsByTagName("ImageFile")[0].childNodes.length > 0) {
      if (!xmlDoc.getElementsByTagName("OrderLine")[i].getElementsByTagName("ImageFile")[0].childNodes[0].nodeValue == '') {
        newImage = document.createElement("img");
        newImage.className = "product-image";
        newImage.src = xmlDoc.getElementsByTagName("OrderLine")[i].getElementsByTagName("ImageFile")[0].childNodes[0].nodeValue;
        newImage.alt = xmlDoc.getElementsByTagName("OrderLine")[i].getElementsByTagName("ImageAlt")[0].childNodes[0].nodeValue;
        newSubDiv.appendChild(newImage);
      }
    }
    newSubSubDiv = document.createElement("div");
    newSubSubDiv.className = "product-title-and-stuff";
    newElement = document.createElement("h4");
    newElement.innerHTML = xmlDoc.getElementsByTagName("OrderLine")[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue;
    newSubSubDiv.appendChild(newElement);
    if (xmlDoc.getElementsByTagName("OrderLine")[i].getElementsByTagName("VariationLabel")[0].childNodes.length > 0) {
      if (!xmlDoc.getElementsByTagName("OrderLine")[i].getElementsByTagName("VariationLabel")[0].childNodes[0].nodeValue == '') {
        newElement = document.createElement("p");
        newElement.innerHTML = xmlDoc.getElementsByTagName("OrderLine")[i].getElementsByTagName("VariationLabel")[0].childNodes[0].nodeValue + ": " + xmlDoc.getElementsByTagName("OrderLine")[i].getElementsByTagName("VariationValue")[0].childNodes[0].nodeValue;
        newSubSubDiv.appendChild(newElement);
      }
    }
    newSubDiv.appendChild(newSubSubDiv);
    newDiv.appendChild(newSubDiv);
    addedproductslist.appendChild(newDiv);
  }
  document.getElementById("ajax_omgtotal").innerHTML = "\xA3" + xmlDoc.getElementsByTagName("PlanValue")[0].childNodes[0].nodeValue;
  document.getElementById("ajax_omgmonths").innerHTML = "for " + xmlDoc.getElementsByTagName("PlanPeriod")[0].childNodes[0].nodeValue + " months";

  document.body.classList.add("fixed-for-popup-on-small-screen");
  checkoutpopup.style.display = "flex";
  checkoutpopup.animate(frames, options);
})

var continuebutton = document.querySelector(".continue-button");
continuebutton.addEventListener("click", function () {
 location.reload();
})

var checkoutInner = document.querySelector(".checkout-inner")

if (window.matchMedia("(min-width: 767px)").matches) {
  var tablinks = document.querySelectorAll(".tablinks");
  if (tablinks.length > 0) tablinks[0].classList.add("rotated");
}



var checkoutPopup = document.querySelector(".checkout-popup");
function closeCheckout(e) {
if (e.target == checkoutPopup) {
location.reload();
}
}
checkoutPopup.addEventListener("click", function(e) { 
  closeCheckout(e)
})


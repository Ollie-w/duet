/* FADE and display: none removed items */

function collapse(element) {
    element.classList.add("collapse");
}

function vanish() {
    this.classList.add("vanish");
}

//turn transitionend into a promise that resolves with a return value of the element that was passed into the function
function addPromisifiedtransitionendEventListener(element) {
return new Promise(function(resolve, reject) {
    element.addEventListener("transitionend", function() {
        resolve(element);
})
})
}

var products = document.querySelectorAll(".product");

var qs;
var xmlNode;
var DOMNode;
var regexforamount = /[0-9]?,?[0-9]{1,3}\.[0-9][0-9]/
var newDiv, newSubDiv, newElement, newImage;

for (let i = 0; i < products.length; i++) {
    products[i].addEventListener("click", function disappear(e) {
        if (e.target.classList.contains("remove-btn")) {
          qs = 'action=C&Q=0&L=';
          qs = qs.concat(document.getElementById(products[i].id.replace('basketline', 'orderlinenumber')).value);
          makeajaxcall(qs);
          /* meanwhile tweak screen values pending ajax data return and authoritative screen rebuild from that */
          vanish.call(this);
          changebasketcount('sub', 1);
          changeordertotal('sub', document.getElementById(products[i].id.replace('basketline', 'orderlinevalue')).value);
          rebuildplanlist();
          setmonthlypayment();
        }
    })

    addPromisifiedtransitionendEventListener(products[i])
    .then((element) => {
    collapse(element)
    return element;
    })
    .then(element => 
    element.remove()
    ) 
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
var $submitPopup = $(".application");
var submitApplyButton = document.querySelector(".checkout-btn");

$infoHowWorks.click(openpopup);

function openpopup() {
    $popup.css("display", "initial");
    setTimeout(function () {
        $(".how-works").addClass('popup--open');
        $("body").addClass("fixed-for-popup-on-small-screen");
    }, 10);
}

$(".close-btn").click(function () {
    $popup.removeClass('popup--open');
    $("body").removeClass("fixed-for-popup-on-small-screen");
});

/* CLOSE POPUP BY CLICKING OUTSIDE OF POPUP */

$maincontainer.click(function (e) {
    if (e.target != popup && e.target.classList.contains("edit-btn") != true ) {
        $popup.removeClass('popup--open');
        $("body").removeClass("fixed-for-popup-on-small-screen");
    }
});

/* CLOSE POPUP WITH ESCAPE KEY!!! */
$(document).keydown(function (e) {
    if (e.which == 27) {
        $popup.removeClass('popup--open');
        $("body").removeClass("fixed-for-popup-on-small-screen");
    }
});

/*var editButtons = Array.from(document.querySelectorAll(".product .edit-btn"));
editButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        $editPopup.css("display", "initial");
        setTimeout(function () {
            $editPopup.addClass('popup--open');
            $maincontainer.addClass('blurfilter')
            $("body").addClass("fixed-for-popup-on-small-screen");
        }, 10);
    })
}) */

editTotalButton.addEventListener("click", function () {
    $editPopup.css("display", "initial");
    setTimeout(function () {
        $(".edit-total-plan").addClass('popup--open');
        $("body").addClass("fixed-for-popup-on-small-screen");
    }, 10);
})

submitApplyButton.addEventListener("click", function () {
  $submitPopup.css("display", "initial");
  setTimeout(function () {
    $(".application").addClass('popup--open');
    $maincontainer.addClass('blurfilter')
    $("body").addClass("fixed-for-popup-on-small-screen");
  }, 10);
})

function showEditPopup(inx) {
  var thispopup = document.getElementById("edit-popup" + inx);
  thispopup.style.display = "initial";
  thispopup.classList.add("popup--open");
  document.getElementsByTagName("body")[0].classList.add("fixed-for-popup-on-small-screen");
}

function changeorderline(inx) {
  var originalqty = parseInt(document.getElementById('orderlinequantity' + inx).value);
  var newqty = parseInt(document.getElementById('ajax_linequantity' + inx).value);
  if (newqty != originalqty) {
    var originalvalue = parseFloat(document.getElementById('orderlinevalue' + inx).value);
    var newvalue = parseFloat((originalvalue / originalqty) * newqty);
    qs = 'action=C&L=';
    qs = qs.concat(document.getElementById('orderlinenumber' + inx).value);
    qs = qs.concat("&Q=" + newqty.toString());
    makeajaxcall(qs);
    /* meanwhile tweak screen values pending ajax data return and authoritative screen rebuild from that */
    if (newqty > originalqty) {
      changebasketcount('add', (newqty - originalqty).toString());
      changeordertotal('add', (newvalue - originalvalue).toFixed(2)); }
    else {
      changebasketcount('sub', (originalqty - newqty).toString());
      changeordertotal('sub', (originalvalue - newvalue).toFixed(2)); }
    document.getElementById('orderlinequantity' + inx).value = newqty.toString();
    document.getElementById('orderlinevalue' + inx).value = newvalue.toFixed(2);
    rebuildplanlist();
    setmonthlypayment();
  }
}

function makeajaxcall(qs) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () { refreshafterajax(this); };
  xhttp.open("POST", "_addtobasket.asp?" + qs, true);
  xhttp.send();
}
function refreshafterajax(xhttpobject) {
  if (xhttpobject.readyState == 4) {
    if (xhttpobject.status == 200) {
      var xmlDoc = xhttpobject.responseXML;

      /* if there are no items on the order the quickest thing is to reload the page */
      var numlines = parseInt(xmlDoc.getElementsByTagName("Items")[0].childNodes[0].nodeValue); 
      if (numlines == 0)  
        location.reload(true);
      else {
        DOMNode = document.getElementById("ajax_basketgrid");
        DOMNode.innerHTML = '';
        for (i = 1; i <= numlines; i++) {

          xmlNode = xmlDoc.getElementsByTagName("OrderData")[0].getElementsByTagName("OrderLine")[i-1];

          newDiv = document.createElement("div");
          newDiv.className = "product";
          newDiv.id = "basketline" + i.toString();

          newElement = document.createElement("input");
          newElement.type = "hidden";
          newElement.id = "orderlinenumber" + i.toString();
          newElement.value = xmlNode.getElementsByTagName("LineNumber")[0].childNodes[0].nodeValue;
          newDiv.appendChild(newElement);
          newElement = document.createElement("input");
          newElement.type = "hidden";
          newElement.id = "orderlinevalue" + i.toString();
          newElement.value = xmlNode.getElementsByTagName("LineValue")[0].childNodes[0].nodeValue;
          newDiv.appendChild(newElement);
          newElement = document.createElement("input");
          newElement.type = "hidden";
          newElement.id = "orderlinequantity" + i.toString();
          newElement.value = xmlNode.getElementsByTagName("Quantity")[0].childNodes[0].nodeValue;
          newDiv.appendChild(newElement);

          if (xmlNode.getElementsByTagName("ImageFile")[0].childNodes.length > 0) {
            newImage = document.createElement("img");
            newImage.src = xmlNode.getElementsByTagName("ImageFile")[0].childNodes[0].nodeValue;
            newImage.alt = xmlNode.getElementsByTagName("ImageAlt")[0].childNodes[0].nodeValue;
            newImage.className = "product-image";
            newDiv.appendChild(newImage); }

          newSubDiv = document.createElement("div");
          newSubDiv.className = "product-title-and-stuff";
          newElement = document.createElement("a");
          newElement.className = "product-title";
          newElement.href = xmlNode.getElementsByTagName("LineURL")[0].childNodes[0].nodeValue;
          newElement.innerHTML = xmlNode.getElementsByTagName("Title")[0].childNodes[0].nodeValue;
          newSubDiv.appendChild(newElement);
          newSubDiv.innerHTML = newSubDiv.innerHTML.concat("<small>" + xmlNode.getElementsByTagName("Product")[0].childNodes[0].nodeValue + "</small>");
          if (xmlNode.getElementsByTagName("VariationLabel")[0].childNodes.length > 0) {
            newElement = document.createElement("p");
            newElement.innerHTML = xmlNode.getElementsByTagName("VariationLabel")[0].childNodes[0].nodeValue + ': ' + xmlNode.getElementsByTagName("VariationValue")[0].childNodes[0].nodeValue;
            newSubDiv.appendChild(newElement);
            newElement = document.createElement("button");
            newElement.type = "button";
            newElement.className = "edit-btn";
            newElement.innerHTML = "EDIT";
            newSubDiv.appendChild(newElement); }

          newDiv.appendChild(newSubDiv);

          newSubDiv = document.createElement("div");
          newSubDiv.className = "quantity";
          
          newElement = document.createElement("h3");
          newElement.className = "quantity-title";
          newElement.innerHTML = "Qty";
          newSubDiv.appendChild(newElement);

          var temp = '<select id="ajax_linequantity' + i.toString() + '" onchange="changeorderline(' + i.toString() + ');">';
          for (j = 1; j <= 5; j++) {
            temp = temp.concat('<option value="' + j.toString() + '"');
            if (parseInt(xmlNode.getElementsByTagName("Quantity")[0].childNodes[0].nodeValue) == j) 
              temp = temp.concat(' selected="selected"');
            temp= temp.concat('>' + j.toString() + '</option>');
          }
          temp = temp.concat('</select>');

          newSubDiv.innerHTML = newSubDiv.innerHTML.concat(temp);

          newElement = document.createElement("button");
          newElement.type = "button";
          newElement.className = "remove-btn";
          newElement.innerHTML = "Remove";
          newSubDiv.appendChild(newElement);

          newDiv.appendChild(newSubDiv);
          DOMNode.appendChild(newDiv);
          
        }        
      }
    }
  }
}
function changebasketcount(action, amt) {
  var newamt = 0;
  switch (action) {
    case 'set': { document.getElementsByClassName("number-in-basket").innerHTML = amt; break; }
    case 'sub': {
      newamt = parseInt(document.getElementsByClassName("number-in-basket")[0].innerHTML) - parseInt(amt);
      for (i = 0; i <= document.getElementsByClassName("number-in-basket").length - 1; i++)
        document.getElementsByClassName("number-in-basket")[i].innerHTML = newamt.toString();
      break; }
    case 'add': {
      newamt = parseInt(document.getElementsByClassName("number-in-basket")[0].innerHTML) + parseInt(amt);
      for (i = 0; i <= document.getElementsByClassName("number-in-basket").length - 1; i++)
        document.getElementsByClassName("number-in-basket")[i].innerHTML = newamt.toString();
      break; }
  }
  var temp = '';
  if (newamt == 0) {
    temp = "Your shopping basket is empty";
    document.getElementById("ajax_orderform").style.display = 'none'; }
  else {
    temp = "You have " + newamt.toString() + " item";
    if (newamt > 1) temp = temp.concat("s");
    temp = temp.concat(" in your basket"); }
  document.getElementById("ajax_itemscount").innerHTML = temp;
}
function changeordertotal(action, amtstring) {
  var amt = parseFloat(amtstring.replace(",", ""));
  var oldamt = parseFloat(document.getElementById("txtOrderTotal").value.replace(",", ""));
   switch (action) {
     case 'set': { document.getElementById("txtOrderTotal").value = format_number(amt, 2); break; }
     case 'sub': { document.getElementById("txtOrderTotal").value = format_number(oldamt - amt, 2); break; }
     case 'add': { document.getElementById("txtOrderTotal").value = format_number(oldamt + amt, 2); break; }
  }
}
function rebuildplanlist() {
  var ordertotal = parseFloat(document.getElementById("txtOrderTotal").value.replace(",", ""));
  DOMNode = document.getElementById("hireperiod");
  for (i = 0; i <= DOMNode.options.length - 1; i++)
    DOMNode.options[i].innerHTML = "\xA3" + format_number(calcinstalment(ordertotal, DOMNode.options[i].value), 2) + " per month for " + DOMNode.options[i].value + " months";
}
function setmonthlypayment() {
  var plantext = document.getElementById('hireperiod').options[document.getElementById('hireperiod').selectedIndex].text;
  var planamount = regexforamount.exec(plantext)
  planamount = planamount[0].replace(",", "");
  var total2decimals = '\xA3' + format_number(planamount, 2, false);
  var spans = document.getElementsByClassName("monthlypayment");
  for (i = 0; i <= spans.length - 1; i++)
    spans[i].innerHTML = total2decimals;
  spans = document.getElementsByClassName("ajax_mnonths");
  for (i = 0; i <= spans.length - 1; i++)
    spans[i].innerHTML = document.getElementById('hireperiod').value;
  document.getElementById("txtPeriodSelected").value = document.getElementById('hireperiod').value;
  if (document.getElementById("ajax_editplan").classList.contains("popup--open")) {
    document.getElementById("ajax_editplan").classList.remove("popup--open");
    document.getElementsByTagName("body")[0].classList.remove("fixed-for-popup-on-small-screen");
  }
}
function calcinstalment(total, months) {
  var factor = parseFloat(document.getElementById('txtFactor' + months).value);
  var d = 0, s = '';
  d = (months / 12) * total * factor;
  s = format_number(d, 2).replace(/,/gi, '');
  if (d > parseFloat(s)) d = parseFloat(s) + 0.01;
  s = format_number(d, 2).replace(/,/gi, '');
  d = (parseFloat(s) + total) / months;
  s = format_number(d, 2).replace(/,/gi, '');
  if (d > parseFloat(s)) d = parseFloat(s) + 0.01;
  return d
}
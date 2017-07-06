var pswpElement = document.querySelectorAll('.pswp')[0];

var cells = Array.from(document.querySelectorAll(".primary-images .carousel-cell > img"));
// build items array

var items = [];

cells.forEach(function(cell) {
items.push({
    src: cell.src,
    w: 1200,
    h: 900
})
})

 var ccell = document.querySelector(".carousel-cell")

function dothings() {
  if (flkty != null) {

   $(".carousel-cell").on('click', function() {
var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, {
    // optionName: 'option value'
    // for example:
    index: cells.length == 1 ? 0 : flkty.selectedIndex
});
gallery.init();
});
}
else {
   
    ccell.addEventListener("click", function() {
        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items);
gallery.init();
    })
}
}

// Initializes and opens PhotoSwipe
$(".main-carousel img").imagesLoaded(dothings)
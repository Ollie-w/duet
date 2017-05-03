var pswpElement = document.querySelectorAll('.pswp')[0];

var cells = document.querySelectorAll(".primary-images .carousel-cell > img");
// build items array
var items = [
    {
        src: cells[0].src,
        w: 600,
        h: 400
    },
    {
        src: cells[1].src,
        w: 1200,
        h: 900
    },
     {
        src: cells[2].src,
        w: 1200,
        h: 900
    }
];



// Initializes and opens PhotoSwipe



    $(".primary-images .carousel-cell > img").click(function() {
var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, {
    // optionName: 'option value'
    // for example:
    index: flkty.selectedIndex// start at first slide
});
gallery.init();
});



var $carousel = $('.main-carousel').flickity({
  // options
  cellAlign: 'left',
  contain: true,
  wrapAround: true
});

var flkty = $carousel.data('flickity');
console.log( flkty.selectedIndex);
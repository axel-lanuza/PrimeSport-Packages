$(document).ready(function () {
  //show cart modal

  var cartSlideDown;

  function cartShow() {
    cartSlideDown = setTimeout(function(){
        $('.cart-modal-wrapper').slideDown('slow');
        $('.cart-modal-wrapper').parent().addClass('active');
      }, 1000);
  }

  $('.icon-primesport-cart').mouseenter(function(){
    cartShow();
  });

  $('.icon-primesport-cart').mouseleave(function(){
    clearTimeout(cartSlideDown);
  });

  //hide cart modal
  $('.cart-modal-wrapper, .continue-shopping').click(function(e){
    if( e.target == this ) {
      $('.cart-modal-wrapper').slideUp('fast');
      $('.icon-primesport-cart').parent().removeClass('active');
    }
  });
});

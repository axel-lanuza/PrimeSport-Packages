$(document).ready(function () {
  //show cart modal
  $('.icon-primesport-cart').mouseenter(function(){
    $('.ec-cart-modal-wrapper').slideDown('fast');
    $('.ec-cart-modal').css('margin-top', $(window).scrollTop());
    $(this).parent().addClass('active');
  });

  //hide cart modal
  $('.ec-cart-modal-wrapper, .ec-continue-shopping').click(function(e){
    if( e.target == this ) {
      $('.ec-cart-modal-wrapper').slideUp('fast');
      $('.icon-primesport-cart').parent().removeClass('active');
    }
  });
});

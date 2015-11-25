(function($, window, document){

    $(document).on('click', function(e){
        var _element = $(e.target);
        var _collapase = $('.collapse[data-parent="#father"]');
        if(!_element.closest('#father').length && !_element.closest('#contact-us-pop').length
        && !_element.closest('.popup-bg').length && !_element.closest('#forgot-password-popup').length && !_element.closest('#signup-popup').length && !_element.closest('.popup-bg').length) _collapase.collapse('hide');
    })


    $(function(){
        var _thisPrinc = $('#menu_princ'), _thisFav = $('#menu_fav');

        _thisPrinc.on('shown.bs.dropdown', function () {
            _thisPrinc.find('.nav-link-title').not('.open').addClass('hidden-xs');
        })

        _thisPrinc.on('hide.bs.dropdown', function () {
            _thisPrinc.find('.nav-link-title').not('.open').removeClass('hidden-xs');
        });

        _thisFav.on('shown.bs.dropdown', function () {
            _thisFav.find('.nav-link-title').not('.open').addClass('hidden-xs');
        })

        _thisFav.on('hide.bs.dropdown', function () {
            _thisFav.find('.nav-link-title').not('.open').removeClass('hidden-xs');
        });
    });
}(window.jQuery, window, document));

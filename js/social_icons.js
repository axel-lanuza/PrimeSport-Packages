/*Social Icons Js*/
 $(document).ready(function(e) {

        $('.social-icon.share').on('click', function () {
            var $thisMenu = $(this).find('.share-menu');
            /*$('.share-menu.active').removeClass('active');*/
            $thisMenu.toggleClass('active');
            return false;
        });

        /*$(document).on('click', function (e) {
                $('.share-menu').removeClass('active');
            });
        */
        $(document).on('click', function(e) {
            $('.share-menu, .social-icon.share').removeClass('active');
        });

        $(".social-icon.like").on("click", function(e) {
            e.preventDefault();
            $(this).toggleClass("active");
        });

        $(".social-icon .icon-primesport-mail").on("click", function () {
            $("#email-share-popup").openPopup();
        });

        $(".social-icon-pack .fa-envelope").on("click", function () {

            $("#email-share-popup").openPopup();
        });

        $(".social-icon .icon-primesport-twitter").on("click", function () {
            $("#twitter-share-popup").openPopup();
        });

        $(".social-icon-pack .fa-twitter").on("click", function () {
            $("#twitter-share-popup").openPopup();
        });

        $(".social-icon .icon-primesport-google").on("click", function () {
            $("#google-plus-share-popup").openPopup();
        });

        $(".social-icon-pack .fa-google-plus").on("click", function () {
            $("#google-plus-share-popup").openPopup();
        });

        $(".social-icon .icon-primesport-facebook").on("click", function () {
            $("#facebook-share-popup").openPopup();
        });

        $(".social-icon-pack .fa-facebook").on("click", function () {
            $("#facebook-share-popup").openPopup();
        });

            //    $('.social-icon.share').on('click', function() {
    		//        var $thisMenu = $(this).siblings('.share-menu');
    		//        $(this).addClass('active');
    		//        $('.share-menu.active').removeClass('active');
    		//        $thisMenu.toggleClass('active');
    		//        return false;
    		//    });
    });

jQuery(document).ready(function ($) {

    var $forgotPasswordPopup = $('#forgot-password-popup');

    $(document).on("click", ".forgot-password", function(e) {
        e.preventDefault();
        $forgotPasswordPopup.removeClass("hidden").openPopup();
    });

    $(document).on("click", "[data-toggle='#login'], [data-toggle='#create-account']", function(e) {
        var $activeLi = $(".nav-steps").find("a[href="+$(this).data('toggle')+"]").parents('li');
        $(".nav-steps li[data-switch=1]").addClass("hidden");
        $activeLi.removeClass("hidden");

        $activeLi.find('a').trigger("click");
    });

    var $loginForm = $('.login-form'),
        $submitBtn = $loginForm.find('[type="submit"]');

    $submitBtn.click(function (e) {
        e.preventDefault();
        // ajax request returns error
        // error message is following
        var $this = $(this),
            errorMessages = [
                {
                    field: 'all',
                    message: 'Invalid email address and/or password. Please try again.'
                }
            ];

        for ( var i = 0; i < errorMessages.length; i++ ) {
            if ( errorMessages[i].field === 'all' ) {
                $loginForm.find('input:not([type="submit"])').addClass('invalid');
            }
            else {
                $loginForm.find('input[name="' + errorMessages[i].field + '"])').addClass('invalid');
            }
            $('.alerts').append('<div class="message error">' + errorMessages[i].message + '</div>');
        }

        $this.addClass('disabled');
    });


    var $createAccount = $('.create-account-user-form'),
        $editForm = $('.edit-form'),
        $getPaid = $('.get-paid-user-form');

    $getPaid
        .add($editForm)
        .on(':error', function () {
            $(this).find('[type="submit"]').addClass('disabled');
        });

    $createAccount
        .add($editForm)
        .on(':error', function () {
            $(this).find('[type="submit"]').addClass('disabled');
        });

    $loginForm.find('input:not([type="submit"])')
        .add($createAccount.find('input:not([type="submit"])'))
        .add($editForm.find('input:not([type="submit"])'))
        .on('change', function () {
            var $this = $(this);

            $this.removeClass('invalid');
            $this.parents('.prime-form').find('[type="submit"]').removeClass('disabled');
        });

    // make table review scrollable through buttons
    // $('.review-table-wrapper .left-arrow').click(function(e) {
    //     var $reviewTable = $(this).siblings('.review-table');
    //     var currentScroll = $reviewTable.scrollLeft();
    //     var windowSize = window.innerWidth;
    //     var newScroll = currentScroll - windowSize;

    //     $reviewTable.scrollLeft(newScroll);
    // });

    // $('.review-table-wrapper .right-arrow').click(function(e) {
    //     var $reviewTable = $(this).siblings('.review-table');
    //     var currentScroll = $reviewTable.scrollLeft();
    //     var windowSize = window.innerWidth;
    //     var newScroll = currentScroll + windowSize;

    //     $reviewTable.scrollLeft(newScroll);
    // });

    // $('.review-table').on('scroll touchmove', function (e) {
    //     var $this = $(this),
    //         scrollLeft = $this.scrollLeft();

    //     $this.siblings('.arrow').show();
    //     if ( scrollLeft === 0 ) {
    //         $this.siblings('.left-arrow').hide();
    //     }

    //     if ( scrollLeft === $this.children().outerWidth() - $this.width() ) {
    //         $this.siblings('.right-arrow').hide();
    //     }
    // });

    // $('.review-table').trigger('scroll');

    //review table scroll code

    var a = 0;

    $('.right_ctrl').on("click", function() {
        var id = $(this).parents(':eq(1)').attr("id");
        console.log(id);
        var classes = $(this).parents(':eq(0)').attr("class").split(' ');
        console.log(classes);

        var i = 0;
        var k = 0;
        a = $('#' + id + " .cart_details_li.active_SC").height();

        switch (classes[1]) {
            case 'section_a':
                $('#' + id + " ." + classes[1]).removeClass("active_SC");
                $('#' + id + " ." + "section_b").addClass("active_SC");
                $('#' + id + " ." + "section_b").height(a);

                //Header
                $(".page-cart_header_li.section_a").removeClass("active_SC");
                $(".cart_header_li.section_c").removeClass("active_SC");

                $(".page-cart_header_li.section_b").addClass("active_SC");
                // $(".page-cart_header_li.section_a").parents(':eq(1)').removeClass("padding-left");
                // $(".page-cart_header_li.section_a").parents(':eq(1)').removeClass("padding-right");
                break;

            case 'section_b':
                $('#' + id + " ." + classes[1]).removeClass("active_SC");
                $('#' + id + " ." + "section_c").addClass("active_SC");
                $('#' + id + " ." + "section_c").height(a);

                //Header
                $(".page-cart_header_li.section_a").removeClass("active_SC");
                $(".page-cart_header_li.section_b").removeClass("active_SC");

                $(".page-cart_header_li.section_c").addClass("active_SC");
                // $(".page-cart_header_li.section_b").parents(':eq(1)').addClass("padding-right");
                // $(".page-cart_header_li.section_b").parents(':eq(1)').removeClass("padding-left");

                break;

            case 'section_c':
                break;
        }
    });

    $('.left_ctrl').on("click", function() {
        var id = $(this).parents(':eq(1)').attr("id");
        var classes = $(this).parents(':eq(0)').attr("class").split(' ');

        switch (classes[1]) {
            case 'section_a':
                break;
            case 'section_b':
                $('#' + id + " ." + classes[1]).removeClass("active_SC");
                $('#' + id + " ." + "section_a").addClass("active_SC");

                //Header
                $(".page-cart_header_li.section_b").removeClass("active_SC");
                $(".page-cart_header_li.section_c").removeClass("active_SC");

                $(".page-cart_header_li.section_a").addClass("active_SC");
                // $(".page-cart_header_li.section_a").removeClass("padding-center");
                // $(".page-cart_header_li.section_b").parents(':eq(1)').addClass("padding-left");
                // $(".page-cart_header_li.section_b").parents(':eq(1)').removeClass("padding-right");
                break;
            case 'section_c':
                $('#' + id + " ." + classes[1]).removeClass("active_SC");
                $('#' + id + " ." + "section_b").addClass("active_SC");

                //Header
                $(".page-cart_header_li.section_c").removeClass("active_SC");
                $(".page-cart_header_li.section_a").removeClass("active_SC");

                $(".page-cart_header_li.section_b").addClass("active_SC");
                // $(".page-cart_header_li.section_b").parents(':eq(1)').removeClass("padding-right");
                // $(".page-cart_header_li.section_b").parents(':eq(1)').removeClass("padding-left");
                break;
        }
    });


    /*$('#father').click(function() {
            $(".remove_ctrl").css("display", "none");
            //$("#c-state-shopping-cart .cart_details_li").css("margin-left", "0");
            $("#c-state-shopping-cart .cart_details_li").removeClass("margin-left-cartshopping");
            $("#c-state-shopping-cart .right_ctrl").css("display","block");
      });

      $('.remove_ctrl').click(function(event){
      event.stopPropagation();
      });

      $('.left_ctrl').click(function(event){
      event.stopPropagation();
      });

      $('.right_ctrl').click(function(event){
      event.stopPropagation();
    });*/
});

$(function() {
    $(".cart_details_li").swipe({
        //Generic swipe handler for all directions

        swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData) {
            var id = $(this).parents(':eq(0)').attr("id");
            var classes = $(this).attr("class").split(' ');

            a = $(this).height();
            var i = 0;
            var k = 0;

            switch (classes[1]) {
                case 'section_a':
                    $('#' + id + " ." + classes[1]).removeClass("active_SC");
                    $('#' + id + " ." + "section_b").addClass("active_SC");
                    $('#' + id + " ." + "section_b").height(a);

                    //Header
                    $(".page-cart_header_li.section_a").removeClass("active_SC");
                    $(".page-cart_header_li.section_c").removeClass("active_SC");

                    $(".page-cart_header_li.section_b").addClass("active_SC");
                    // $(".cart_header_li.section_a").parents(':eq(1)').removeClass("padding-left");
                    // $(".cart_header_li.section_a").parents(':eq(1)').removeClass("padding-right");
                    break;

                case 'section_b':
                    $('#' + id + " ." + classes[1]).removeClass("active_SC");
                    $('#' + id + " ." + "section_c").addClass("active_SC");
                    $('#' + id + " ." + "section_c").height(a);

                    //Header
                    $(".page-cart_header_li.section_a").removeClass("active_SC");
                    $(".page-cart_header_li.section_b").removeClass("active_SC");

                    $(".page-cart_header_li.section_c").addClass("active_SC");
                    // $(".cart_header_li.section_b").parents(':eq(1)').addClass("padding-right");
                    // $(".cart_header_li.section_b").parents(':eq(1)').removeClass("padding-left");
                    break;

                case 'section_c':
                    $('#' + id + " " + ".cart_details_li").addClass("margin-left-cartshopping");
                    $('#' + id + " " + ".remove_ctrl").height(a);
                    $('#' + id + " " + ".remove_ctrl").css("display", "table");
                    break;
            }

        },

        swipeRight: function(event, direction, distance, duration, fingerCount, fingerData) {

            var id = $(this).parents(':eq(0)').attr("id");
            var classes = $(this).attr("class").split(' ');

            a = $(this).height();
            var i = 0;
            var k = 0;

            switch (classes[1]) {
                case 'section_a':

                    break;
                case 'section_b':
                    $('#' + id + " ." + classes[1]).removeClass("active_SC");
                    $('#' + id + " ." + "section_a").addClass("active_SC");

                    //Header
                    $(".page-cart_header_li.section_b").removeClass("active_SC");
                    $(".page-cart_header_li.section_c").removeClass("active_SC");

                    $(".page-cart_header_li.section_a").addClass("active_SC");
                    // $(".cart_header_li.section_a").removeClass("padding-center");
                    // $(".cart_header_li.section_b").parents(':eq(1)').addClass("padding-left");
                    // $(".cart_header_li.section_b").parents(':eq(1)').removeClass("padding-right");
                    break;
                case 'section_c':

                    if ($(this).hasClass("margin-left-cartshopping")) {
                        $('#' + id + " " + ".cart_details_li").removeClass("margin-left-cartshopping");
                        $('#' + id + " " + ".remove_ctrl").css("display", "none");

                        //Header
                        $(".page-cart_header_li.section_a").removeClass("active_SC");
                        $(".page-cart_header_li.section_b").removeClass("active_SC");

                        $(".page-cart_header_li.section_c").addClass("active_SC");
                        // $(".cart_header_li.section_a").parents(':eq(1)').removeClass("padding-left");
                        // $(".cart_header_li.section_a").parents(':eq(1)').addClass("padding-right");

                    } else {
                        $('#' + id + " ." + classes[1]).removeClass("active_SC");
                        $('#' + id + " ." + "section_b").addClass("active_SC");

                        //Header
                        $(".page-cart_header_li.section_c").removeClass("active_SC");
                        $(".page-cart_header_li.section_a").removeClass("active_SC");

                        $(".page-cart_header_li.section_b").addClass("active_SC");
                        // $(".cart_header_li.section_b").parents(':eq(1)').removeClass("padding-right");
                        // $(".cart_header_li.section_b").parents(':eq(1)').removeClass("padding-left");
                    }
                    break;
            }
        }
    });


    $(".custom-quantity").selectspinner({
        classes: ['small-select']
    });

    $(".custom-quantity-mobile").selectspinner();


    $(".custom-datepicker").datepicker({
        beforeShow: function(input, inst) {
            $('#ui-datepicker-div').removeClass(function() {
                return $('input').get(0).id;
            });
            $('#ui-datepicker-div').addClass(this.id);
        }
    });

    $(".custom-datepicker, .calendar-icon").on("click", function(){
        $(this).parents(".custom-radio").find("input[type='radio']").last().click();
    });

    var toggleSeatsAssigment = function(enable) {

        if (enable) {

            $(".assigned-seats-fields")
                .removeClass("disabled")
                .find("input")
                .attr("data-validate", "true")
                .attr("disabled", false);

            $("#assignedSeatsQuantity").show();
            $("#generalAdmissionQuantity").hide();

            $('[name=general-admission]').val('');
            $('[name=row]').val('');

            if (isMobile) {
                $(".quantity-label").show();
            }

        } else {

            $(".assigned-seats-fields")
                .addClass("disabled")
                .find("input")
                .val('')
                .attr("data-validate", "false")
                .removeClass("invalid")
                .attr("disabled", true);

            $("#assignedSeatsQuantity").text(1);

            $("#assignedSeatsQuantity").hide();
            $("#generalAdmissionQuantity").show();

            $('[name=general-admission]').val('General Admission');
            $('[name=row]').val('GA');

            if (isMobile) {
                $(".quantity-label").hide();
            }

        }
    };

    toggleSeatsAssigment($(".custom-radio.seats input[type='radio']").first().is(":checked"));

    $(".custom-radio.seats input[type='radio']").on("change", function(){
        toggleSeatsAssigment($(".custom-radio.seats input[type='radio']").first().is(":checked"));
    });

    $(".assigned-seats-fields input").on("input", function(){

        var startVal = $(".assigned-seats-fields input[name='seat-from']").val(),
            endVal = parseInt($(".assigned-seats-fields input[name='seat-to']").val()) + 1;

        if (startVal  && endVal) {
            if (startVal > endVal) {
                $("#assignedSeatsQuantity").text(0);
            } else {
                $("#assignedSeatsQuantity").text(endVal - startVal);
            }
        }


    });

    $(document).on("click", ".nav-steps li:not(.disabled)", function(){
        var step = $(this).data('switch') - 1;
        var $panelLink = $(".steps-content-wrapper .panel").eq(step).find("a[data-toggle='collapse']");
        if (($panelLink).is('.collapsed')) {
            $panelLink.click();
        }
    });

    $(document).on("form:validated", function(e, form){

        var $form = $(form);

        if ($form.attr("id") === "review-form") {

            $(".tab-pane").removeClass("active");
            $(".tab-pane.final").addClass("active");

            $(".nav-steps li")
                .removeClass("active")
                .addClass("completed")
                .find("a")
                .attr("data-toggle", "");

            $('html,body').animate({
                scrollTop: $('.steps-wrapper').offset().top -20
            }, 500);

            return;
        }

        $form
            .parents('.panel')
            .nextAll('.panel')
            .first()
            .find('a[data-toggle]')
            .attr('data-toggle', 'collapse');

        $form
            .parents('.steps')
            .find('li.active')
            .addClass('completed')
            .nextAll('li.disabled')
            .first()
            .removeClass('disabled')
            .find('a')
            .attr('data-toggle', 'tab')
            .click();

    });

    // fix for placeholder text on tablets
    var isTablet = window.matchMedia && window.matchMedia('only screen and (min-width: 768px) and (max-width: 991px)').matches;
    if (isTablet) {
        $('[name=payment-card-security-code]').attr('placeholder', 'code');
    }

    // set height of the page
    var $header = $('.main-header'),
        $footerLink = $('.footer-link'),
        $footerPage = $('.page-footer'),
        $page = $('.sell-page'),
        setPageHeight = function () {
            var height = window.innerHeight - $header.outerHeight();
            if ( $footerLink.is(':visible') ) {
                height -= $footerLink.outerHeight();
            }
            if ( $footerPage.is(':visible') ) {
                height -= $footerPage.outerHeight();
            }

            // debugger
            $page.css({
                'min-height': height
            });
        };

    $(window).on('resize :change', setPageHeight);
    setPageHeight();
});

$('.custom-select').each(function () {
    var $this = $(this);

    $this.ddslick({
        selectText: $this.data('text'),
        defaultSelectedIndex: null,
        background: "#f6f6f6"
    });
});

$(document).on("click", ".calendar-icon", function(){
    $(this).prev().datepicker("show");
});

$(document).on("change", "#other-dates", function(){
    if ( $(this).is(":checked") ) {
        $(".other-dates-wrapper").slideDown();
    } else {
        $(".other-dates-wrapper").slideUp();
    }
});

// footer toggle
$(document).on("click", ".footer-toggle a", function(){
    $(".footer-link").slideUp();
    $("footer").slideDown({
        step: function () {
            $(window).trigger(':change');
        }
    });

    return false;
});

$(function () {
    $('#accordion-sell').on('shown.bs.collapse', function (e) {
        var offset = $('.panel-collapse.in').offset();
        if(offset) {
            $('html,body').animate({
                scrollTop: $(this).find('a.collapse').offset().top -20
            }, 500);
        }
    });

    // fix for border last element of accordion
    $('#accordion-sell').on('shown.bs.collapse', function(e) {
        var $this = $(this); // #accordion-sell element

        var $links = $this.find('a');
        var $expandedElementTitle = $this.find('a[aria-expanded=true]');
        var $expandedElement = $expandedElementTitle.parents('.panel').eq(0);

        if ($expandedElement.is(':last-child')) {
            $expandedElement.css('border-bottom-width', 0);
        }
    });

    $('#accordion-sell').on('hidden.bs.collapse', function(e) {
        var $this = $(this); // #accordion-sell element

        var $lastPanel = $this.find('.panel:last-child');
        $lastPanel.css('border-bottom-width', 1);
    });
});

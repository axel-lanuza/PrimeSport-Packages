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


    //billing address same as shipping

    var sameShipping = 0;

    $('.billing-same-label').click(function (){
        $('.shipping-address').slideToggle();
        $('.form-row.shipping-address input.shipping-field').toggleClass('required');
        $('.form-row.shipping-address select.shipping-field').toggleClass('required');
        if(sameShipping === 0) {
            $('.form-row.shipping-address input.shipping-field').attr('data-validate', 'false');
            sameShipping = 1;
        } else {
            $('.form-row.shipping-address input.shipping-field').attr('data-validate', 'true');
            sameShipping = 0;
        }
    });


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


    $(document).on("click", ".nav-steps li:not(.disabled)", function(){
        var step = $(this).data('switch') - 1;
        var $panelLink = $(".steps-content-wrapper .panel").eq(step).find("a[data-toggle='collapse']");
        if (($panelLink).is('.collapsed')) {
            $panelLink.click();
        }
    });

    $(document).on("form:validated", function(e, form){

        var $form = $(form);

        if ($form.attr("id") === "buy-tickets-user-form") {
            $('.order-info').addClass('reviewing');
            $('.summary-delivery-method').removeClass('underline');
        }

        if ($form.attr("id") === "review-form") {

            $(".tab-pane").removeClass("active");
            $(".tab-pane.final").addClass("active");

            $(".nav-steps li")
                .removeClass("active")
                .addClass("completed")
                .find("a")
                .attr("data-toggle", "");

            $('.order-info').removeClass('reviewing');

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
        $page = $('.buy-page'),
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



$('#credit-card-type').ddslick({
    selectText: $('#credit-card-type').data('text'),
    defaultSelectedIndex: null,
    background: "#f6f6f6",
});

$('#credit-card-type').on('click', function () {
    var ddData = $('#credit-card-type').data('ddslick');
    selectedCard = ddData.selectedIndex;
    if (selectedCard > 0) {
        $('#buy-tickets-user-form .col-md-10.col-sm-8 .form-row:not(.initial), #buy-tickets-user-form .hidden-first').slideDown();
        $('#credit-card-type a label').css('color', '#000000');
    } else {
        $('#buy-tickets-user-form .col-md-10.col-sm-8 .form-row:not(.initial), #buy-tickets-user-form .hidden-first').slideUp();
    }
});

$('#payment-card-month').on('click', function () {
    var ddData = $('#payment-card-month').data('ddslick');
    selectedCard = ddData.selectedIndex;
    if (selectedCard > 0) {
        $('#payment-card-month a label').css('color', '#000000');
    }
});

$('#payment-card-year').on('click', function () {
    var ddData = $('#payment-card-year').data('ddslick');
    selectedCard = ddData.selectedIndex;
    if (selectedCard > 0) {
        $('#payment-card-year a label').css('color', '#000000');
    }
});

$('#payment-card-state').on('click', function () {
    var ddData = $('#payment-card-state').data('ddslick');
    selectedCard = ddData.selectedIndex;
    if (selectedCard > 0) {
        $('#payment-card-state a label').css('color', '#000000');
    }
});

$('#payment-card-country').on('click', function () {
    var ddData = $('#payment-card-country').data('ddslick');
    selectedCard = ddData.selectedIndex;
    if (selectedCard > 0) {
        $('#payment-card-country a label').css('color', '#000000');
    }
});

$('#billing-state').on('click', function () {
    var ddData = $('#billing-state').data('ddslick');
    selectedCard = ddData.selectedIndex;
    if (selectedCard > 0) {
        $('#billing-state a label').css('color', '#000000');
    }
});

$('#billing-country').on('click', function () {
    var ddData = $('#billing-country').data('ddslick');
    selectedCard = ddData.selectedIndex;
    if (selectedCard > 0) {
        $('#billing-country a label').css('color', '#000000');
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
    $('#accordion-buy').on('shown.bs.collapse', function (e) {
        var offset = $('.panel-collapse.in').offset();
        if(offset) {
            console.log($(this));
            $('html,body').animate({
                scrollTop: $(this).find('a.collapse').offset().top -20
            }, 500);
        }
    });

    // fix for border last element of accordion
    $('#accordion-buy').on('shown.bs.collapse', function(e) {
        var $this = $(this); // #accordion-buy element

        var $links = $this.find('a');
        var $expandedElementTitle = $this.find('a[aria-expanded=true]');
        var $expandedElement = $expandedElementTitle.parents('.panel').eq(0);

        if ($expandedElement.is(':last-child')) {
            $expandedElement.css('border-bottom-width', 0);
        }
    });

    $('#accordion-buy').on('hidden.bs.collapse', function(e) {
        var $this = $(this); // #accordion-buy element

        var $lastPanel = $this.find('.panel:last-child');
        $lastPanel.css('border-bottom-width', 1);
    });


    //Payment information review toggle, add "reviewing" class for QA purposes
    $('.panel-review a.collapsed').click(function(){
            $('.order-info').addClass('reviewing');
            $('.summary-delivery-method').removeClass('underline');
    });

    var couponState = 0;
    //Coupon code for QA purposes
    $('.coupon-apply').click(function(){
        if (couponState === 0) {
            $('.coupon-code').addClass('invalid');
            $('#review-errors').addClass('active').append('<div class="message error">Invalid or expired coupon code</div>');
            couponState = 1;
        } else {
            $('.prime-form.coupon-form').hide();
            $('.coupon-confirmed ').show();
            $('#review-errors').empty().removeClass('active');
            couponstate = 0;
        }
    });

    // mobile order info toggle function *AKD
    $('.order-info-toggle').click(function(){
        $('.order-details-modal').toggle();
        $('.buy-page .order-info').slideToggle('fast').toggleClass('toggle-opened');
        $(this).toggleClass('open');
        return false;
    });

    $('.buy-page .event-tickets-info h3').click(function(){
        $('.buy-page .event-tickets-details').slideToggle('fast');
        $(this).toggleClass('open');
        return false;
    });

    $('.buy-page .event-order-summary h3').click(function(){
        $('.buy-page .event-summary-details').slideToggle('fast');
        $(this).toggleClass('open');
        return false;
    });

});

jQuery(document).ready(function($) {
    window.isMobile = window.isMobile || (window.matchMedia && window.matchMedia('only screen and (max-width: 767px)').matches);

    //     Underscore.js 1.8.3
    //     http://underscorejs.org
    //     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
    //     Underscore may be freely distributed under the MIT license.
    function debounce(func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function() {
            var last = Date.now() - timestamp;

            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };

        return function() {
            context = this;
            args = arguments;
            timestamp = Date.now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    }

    /* Sliders */
    var $incomingEventsSlider = $(".upcoming-events .container-cards"),
        $featuredEventsSlider = $(".featured-events .container-cards"),
        $homeSlider = $(".carousel");

    if ($homeSlider.length) {
        $homeSlider.owlCarousel({
            slideSpeed: 400,
            paginationSpeed: 400,
            pagination: false,
            singleItem: true,
            addClassActive: true,
            touchDrag: false,
            mouseDrag: false,
            afterAction: syncPosition,
            autoHeight: true
        });
    }

    function syncPosition() {
        var _slideIdx = this.currentItem;
        $(".carousel-controls .owl-page").removeClass("active");
        $("[data-pagination-index='" + _slideIdx + "']").addClass("active");
    }

    $(".carousel-controls .owl-page").on("click", function() {
        var _slideIdx = parseInt($(this).data("pagination-index"));
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(".owl-carousel").data('owlCarousel').goTo(_slideIdx);
    });


    function initializeUpcomingEventsSlider() {
        if ($incomingEventsSlider.length) {
            $incomingEventsSlider.owlCarousel({
                autoPlay: false,
                items: 4,
                itemsDesktop: [1600, 3],
                itemsTablet: [768, 2],
                itemsMobile: [487, 1],
                navigation: true,
                navigationText: ["<span class='prev'></span>", "<span class='next'></span>"],
                scrollPerPage: true
            });
        }
    }

    function initializeFeaturedEventsSlider() {
        if ($featuredEventsSlider.length) {
            $featuredEventsSlider.owlCarousel({
                autoPlay: false,
                items: 6,
                itemsDesktop: 6,
                itemsDesktopSmall: 6,
                itemsTablet: [768, 6],
                itemsTabletSmall: [767, 5],
                itemsMobile: [487, 2],
                navigation: true,
                navigationText: ["<span class='prev'></span>", "<span class='next'></span>"],
                scrollPerPage: true
            });
        }
    }

    function validation(type, value) {

        var result = false;

        if (type === 'email') {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            result = re.test(value);
        }

        return result;
    }

    function destroySlider($slider) {
        if ($slider.length && $slider.hasClass("owl-carousel")) {
            $slider.data('owlCarousel').destroy();
        }
    }

    initializeUpcomingEventsSlider();
    initializeFeaturedEventsSlider();


    $(".slide-countdown").each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');

        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('' +
                '<div class="cd-num">%D<span class="cd-label">days</span></div>:' +
                '<div class="cd-num">%H<span class="cd-label">hrs</span></div>:' +
                '<div class="cd-num">%M<span class="cd-label">min</span></div>:' +
                '<div class="cd-num">%S<span class="cd-label">sec</span></div>' +
                ''));
        });
    });

    var videoGallery = $('#video-gallery');

    if (videoGallery.length) {
        videoGallery.slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            focusOnSelect: true,
            centerMode: true,
            draggable: false,
            arrows: true,
            prevArrow: $('.icon-primesport-left-arrow'),
            nextArrow: $('.icon-primesport-right-arrow'),
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    }


    videoGallery.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        console.log(nextSlide);
    });

    $('#events-select').ddslick({
        background: "#b3b3b3"
    });

    $(".see-quick").on("click", function() {
        $(".footer-placement").toggle();
    });

    // video popup
    $('.play-ico').on('click', function(e) {
        var vidId = $(this).closest('.item').data('video');
        var vidScr = 'https://www.youtube.com/embed/' + vidId + '?modestbranding=1&autoplay=0&showinfo=0&controls=0';
        var $vidPopup = $('#video-modal-popup');
        $('iframe', $vidPopup).attr('src', vidScr);

        $vidPopup.openPopup();
    });
    // video popup ~

    $(document).on('click', function(e) {
        $('.share-menu').removeClass('active');
    });


    $('.social-icon.share').on('click', function() {
        var $thisMenu = $(this).find('.share-menu');
        $('.share-menu.active').removeClass('active');
        $thisMenu.toggleClass('active');
        return false;
    });

    $('.send-form').on('submit', function() {
        var emailField = $(this).find('input[type=email]');
        if (validation('email', emailField.val())) {
            // TODO: submit form
        } else {
            emailField
                .addClass('form-error')
                .val('*Please enter a valid email address');
        }

        return false;
    });

    $(document).on('focus input click', '.form-error', function() {
        $(this)
            .removeClass('form-error')
            .val('');
    });

    $(".social-icon .icon-primesport-mail").on("click", function() {
        $("#email-share-popup").removeClass('hidden').openPopup();
    });

    $(".social-icon .icon-primesport-twitter").on("click", function() {
        $("#twitter-share-popup").removeClass('hidden').openPopup();
    });

    $(".social-icon .icon-primesport-google").on("click", function() {
        $("#google-plus-share-popup").removeClass('hidden').openPopup();
    });

    $(".social-icon .icon-primesport-facebook").on("click", function() {
        $("#facebook-share-popup").removeClass('hidden').openPopup();
    });

    var $loginPopup = $("#login-popup"),
        $forgotPasswordPopup = $('#forgot-password-popup');
    $(".login-link, .log-in-link").on("click", function(e) {
        e.preventDefault();
        $loginPopup.removeClass("hidden").openPopup();
    });

    var $signupPopup = $("#signup-popup");
    $(".sign-up-link").on("click", function(e) {
        e.preventDefault();
        $signupPopup.removeClass("hidden").openPopup();
    });

    var $welcomePopup = $("#welcome-popup")
    $(".login").on("click", function(e) {
        e.preventDefault();
        $loginPopup.addClass("hidden").closePopup();
        $welcomePopup.removeClass("hidden").openPopup();
    });




    $('.create-account').on("click", function(e) {
        e.preventDefault();
        !$loginPopup.hasClass('hidden') && $loginPopup.addClass('hidden').closePopup();
        !$forgotPasswordPopup.hasClass('hidden') && $forgotPasswordPopup.addClass('hidden').closePopup();
        $("#signup-popup").removeClass("hidden").openPopup();
    });

    $(document).on("click", ".forgot-password", function(e) {
        e.preventDefault();
        !$loginPopup.hasClass('hidden') && $loginPopup.addClass('hidden').closePopup();
        $forgotPasswordPopup.removeClass("hidden").openPopup();
    });

    $(".social-icon.like").on("click", function(e) {
        e.preventDefault();
        $(this).toggleClass("active");
    });

    // Slideout footer
    (function() {
        var $footer = $('.slideout-footer');
        var $footerContent = $('.slideout-footer-content');

        function updateFooterSize() {
            if (window.innerWidth < 768) {
                $footer.removeClass('enabled');
                $footer.css('height', 'auto');
            } else {
                $footer.addClass('enabled');
                $footer.height($footerContent.outerHeight());
            }
        }

        $(window).on('resize', debounce(updateFooterSize, 100));
        updateFooterSize();
    }());
});


// Experience page
jQuery(document).ready(function($) {

    if (($('.quote-gallery')).length) {
        $('.quote-gallery').slick({
            draggable: false
        });
    }

    var $heroSlider = $('.experience-hero-slider');

    if ($heroSlider.length) {
        $heroSlider.slick({
            infinite: true,
            draggable: false,
            arrows: true,
            prevArrow: "<div class='icon icon-primesport-left-arrow'></div>",
            nextArrow: "<div class='icon icon-primesport-right-arrow'></div>",
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
        });
    }


    //popup close event
    $(".popup-close").on("click", function() {
        $(this).closest(".popup").addClass("hidden");
    });

    //popup open favorite event
    $(".icon-primesport-favorite-inactive").on("click", function() {
        //make sure it's not within the menu
        if(!$(this).parent().hasClass('menu_mobile_link')) {
            $('.favorite-popup:not(.small)').removeClass("hidden");
        }
    });

    $("#search_order").ddslick({
        background: "#b3b3b3"
    });

    // $priceFilter.on('click', function(e){
    //     var ddSelectedUp = $('#tickets-price-dropdown').find($('.dd-selected'));
    //     if (ddSelectedUp.hasClass('dd-selected-up')) {
    //         ddSelectedUp.removeClass('dd-selected-up');
    //     }
    //     else {
    //         ddSelectedUp.addClass('dd-selected-up');
    //     }
    // });

    // Experience sections video players
    var experienceHeroPlayer = (function() {
        var $section = $('.experience-hero-section');
        var $videoContainer = $section.find('.experience-section-bg-video');
        var $playBtn = $section.find('.experience-video-play');
        var video = $videoContainer.find('video')[0];
        var currentMode = $section.data('mode');

        var modes = {
            'bg-video': {
                onEnter: $.noop,
                onLeave: function() {
                    video.pause();
                }
            },
            'video-play': {
                onEnter: function(options) {
                    video.src = options.videoSrc;
                    video.load();
                    video.play();
                },
                onLeave: function() {
                    video.pause();
                    $playBtn.text('Replay Video');
                }
            },
            'video-end': {
                onEnter: $.noop,
                onLeave: $.noop
            },
            'gallery': {
                onEnter: function(options) {
                    video.pause();
                    $heroSlider.slick('slickGoTo', 0, true);
                },
                onLeave: $.noop
            }
        };

        var api = {
            initialize: initialize,
            setMode: setMode
        };

        function initialize() {
            if (!$videoContainer.length) {
                $videoContainer = $('<div/>', {
                    'class': 'experience-section-layer experience-section-bg-video'
                }).prependTo($section);
            }

            if (!video) {
                video = document.createElement('video');
                $videoContainer.append(video);
            }

            $section.on('click', '[data-set-mode]', function(evt) {
                evt.preventDefault();
                var $btn = $(evt.currentTarget);
                var mode = $btn.data('setMode');
                var options = $btn.data();
                setMode(mode, options);
            });

            video.addEventListener('ended', function() {
                if (currentMode === 'video-play') {
                    setMode('video-end');
                }
            });
        }

        function setMode(mode, options) {
            if (!modes[mode]) return;
            modes[currentMode].onLeave(options);
            currentMode = mode;
            $section.attr('data-mode', mode);
            modes[mode].onEnter(options);
        }

        return api;
    }());

    experienceHeroPlayer.initialize();

    if (!window.isMobile) {
        var firstBgVideo = $('.experience-section-bg-video video[data-autoplay]')[0];
        if (firstBgVideo) {
            firstBgVideo.load();
            firstBgVideo.play();
        }
    }



    // search placeholder fix
    $('.area-search').on('focus', function(e) {
        var $this = $(this);
        $this.attr('placeholder', '');
    });
    $('.area-search').on('focusout', function(e) {
        var $this = $(this);
        if (!$(this).val()) {
            $(this).attr('placeholder', $this.data('placeholder'));
        }
    });

    // functionality to show/hide left menu
    var $menuButton = $('.menu-button'),
        $toggleMenuLink = $('.toggle-left-menu'),
        $menu = $($toggleMenuLink.data('target')),
        $leftMenu = $menu.find('.left-menu'),
        $window = $(window);

    $toggleMenuLink.on('click', function(e) {
        // cancel the hamburger menu opening for mobiles
        if (window.innerWidth < 767) {
            $('.menu_mobile_link').addClass('collapsed').attr('aria-expanded', 'false');
            $('.menu_mobile_link.principle').toggleClass('opened');
            $('.navbar-collapse').removeClass('in');
            $('.content-wrapper').removeClass('content-wrapper-overlay');
            $('#menu-dropdown-mobile').toggle();
            if ($('.menu_mobile_link.principle').hasClass('opened')) {
                $('.menu_mobile_link.principle').click();
            }
            return false;
        }

        var menuWidth, leftDistance, left, menuLinkWidth;

        e.preventDefault();

        leftDistance = parseFloat($menuButton.css('padding-left'), 10) + parseFloat($toggleMenuLink.css('margin-left'), 10);
        menuWidth = $leftMenu.width();
        menuLinkWidth = $toggleMenuLink.width();

        if ($menu.hasClass('menu-hidden')) {
            left = 0;
        } else {
            left = menuWidth;
        }
        $menu.add($toggleMenuLink).toggleClass('menu-hidden');

        $leftMenu.animate({
            left: -left
        }, {
            duration: 500,
            step: function(now) {
                var leftPos = now + menuWidth - leftDistance;
                leftPos = Math.max(leftPos, 0);
                $menuButton.css({
                    left: leftPos
                });
            }
        });
    });

    $window.on('resize', function() {
        if (!$menu.hasClass('menu-hidden')) {
            $menuButton.css('left', $leftMenu.width());
        }
    });
});

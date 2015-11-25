// Experience page
jQuery(document).ready(function ($) {


    $('.quote-gallery').slick({
        draggable: false
    });

    var $heroSlider = $('.experience-hero-slider');
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


    // Experience sections video players
    var experienceHeroPlayer = (function () {
        var $section = $('.experience-hero-section');
        var $videoContainer = $section.find('.experience-section-bg-video');
        var $playBtn = $section.find('.experience-video-play');
        var video = $videoContainer.find('video')[0];
        var currentMode = $section.data('mode');

        var modes = {
            'bg-video': {
                onEnter: $.noop,
                onLeave: function () {
                    if (video) video.pause();
                }
            },
            'video-play': {
                onEnter: function (options) {
                    ensureVideoElement();
                    video.src = options.videoSrc;
                    video.load();
                    video.play();
                },
                onLeave: function () {
                    if (video) video.pause();
                    $playBtn.text('Replay Video');
                }
            },
            'video-end': {
                onEnter: $.noop,
                onLeave: $.noop
            },
            'gallery': {
                onEnter: function (options) {
                    if (video) video.pause();
                    $heroSlider.slick('slickGoTo', 0, true);
                },
                onLeave: $.noop
            }
        };

        var api = {
            initialize: initialize,
            setMode: setMode
        };

        function initialize () {
            $section.on('click', '[data-set-mode]', function (evt) {
                evt.preventDefault();
                var $btn = $(evt.currentTarget);
                var mode = $btn.data('setMode');
                var options = $btn.data();
                setMode(mode, options);
            });

        }

        function setMode(mode, options) {
            if (!modes[mode]) return;
            modes[currentMode].onLeave(options);
            currentMode = mode;
            $section.attr('data-mode', mode);
            modes[mode].onEnter(options);
        }

        function ensureVideoElement() {
            if (!$videoContainer.length) {
                $videoContainer = $('<div/>', {
                    'class': 'experience-section-layer experience-section-bg-video'
                }).prependTo($section);
            }

            if (!video) {
                video = document.createElement('video');
                $videoContainer.append(video);
            }

            video.addEventListener('ended', function () {
                if (currentMode === 'video-play') {
                    setMode('video-end');
                }
            });
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
        if(!$(this).val()) {
            $(this).attr('placeholder', $this.data('placeholder'));
        }
    });
});

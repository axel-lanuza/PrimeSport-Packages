(function ($) {

    var zIndex = 40;

    $.fn.animateType = function (action, callback) {
        var el = this;
        if ($('html').css('font-family') !== 'desktop') {
            if (action === 'open') {
                el.show(0, callback);
            } else {
                el.hide(0, callback);
            }
        } else {
            if (action === 'open') {
                el.fadeIn(400, callback);
            } else {
                el.fadeOut(400, callback);
            }
        }
    };

    $.fn.closePopup = function (options) {
        options = options || {};
        var id = $(this).attr('id');

        $('[popup="' + id + '"]').unbind('click.popup');

        zIndex -= 2;

        $(this).animateType('close', function(){
            $('.popup-bg[popup="' + id + '"]').remove();
            if ($.isFunction(options.closed)) {
                options.closed();
            }
        });

    };

    $.fn.openPopup = function (options) {
        options = options || {};
        var self = this;


        if ($.isFunction(options.beforeOpen)) {
            options.beforeOpen(self);
        }
        var css = {},
            width = this.outerWidth(),
            height = this.outerHeight(),
            wHeight = $(window).height(),
            id = this.attr('id'),
            bg = '<div class="popup-bg" popup="' + id + '" style="z-index: ' + (zIndex + 1) + '"></div>';

        $('body').append(bg);

        this.find('.popup-close,[data-close-popup]').attr('popup', id);

        zIndex += 2;
        if (height > wHeight) {
            css = {
                'left': '50%',
                'margin-left': -width / 2 + 'px',
                'top': $(document).scrollTop(),
                'position': 'absolute',
                'z-index': zIndex
            };
        } else {
            css = {
                'left': '50%',
                'margin-left': -width / 2 + 'px',
                'top': '50%',
                'margin-top': -height / 2 + 'px',
                'position': 'fixed',
                'z-index': zIndex
            };
        }

        this.attr('style','').css(css).animateType('open', function(){
            if ($.isFunction(options.opened)) {
                options.opened(self);
            }
        });

        function hideErrors(popup) {
            var form = popup.find('form')[0];
            if (form && form.validation){
                form.validation.$errors.hide();
                form.validation.$errorsContainer.html('');
                popup.find('input').removeClass('error');
            }
        }

        var close = function (popupId) {
            zIndex -= 2;
            $('#' + popupId).animateType('close', function(){
                $('.popup-bg[popup="' + popupId + '"]').remove();
                if ($.isFunction(options.closed)) {
                    options.closed(zIndex);
                }
            });
        };

        $(this).find('.popup-close,[data-close-popup]').on('click.popup', function (evt) {
            evt.preventDefault();
            $('[popup="'+id+'"]').unbind('click.popup');
            var popup = $(this).attr('popup');
            close(popup);
            hideErrors(self);
        });

        $('.popup-bg[popup="' + $(this).attr('id') + '"]').on('click.popup', function () {
            var popupId = $(this).attr('popup');
            var $popup = $('#' + popupId);
            var isVisible =
                $popup.is(':visible') &&
                Number($popup.css('opacity')) === 1;
            if (isVisible) {
                $('[popup="' + id + '"]').unbind('click.popup');
                close(popupId);
                hideErrors(self);
            }
        });

        return this;
    };

})(jQuery);

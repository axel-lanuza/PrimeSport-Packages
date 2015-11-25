        var resizeWindow = function () {
            var $contract = $("#contract"),
                $transact = $("#transact"),
                $window = $(window),
                $carousel = $("#myCarousel"),
                $carouselMobile = $("#myCarouselMobile");

            $('#myCarousel').carousel({
                interval: 4000
            });

            jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up"><i class="fa fa-caret-up"></i></div><div class="quantity-button quantity-down"><i class="fa fa-caret-down"></i></div></div>').insertAfter('.quantity input');
            jQuery('.quantity').each(function () {
                var spinner = jQuery(this),
                    input = spinner.find('input[type="number"]'),
                    btnUp = spinner.find('.quantity-up'),
                    btnDown = spinner.find('.quantity-down'),
                    min = input.attr('min'),
                    max = input.attr('max');

                btnUp.click(function () {
                    var oldValue = parseFloat(input.val());
                    if (oldValue >= max) {
                        var newVal = oldValue;
                    } else {
                        var newVal = oldValue + 1;
                    }
                    spinner.find("input").val(newVal);
                    spinner.find("input").trigger("change");
                });

                btnDown.click(function () {
                    var oldValue = parseFloat(input.val());
                    if (oldValue <= min) {
                        var newVal = oldValue;
                    } else {
                        var newVal = oldValue - 1;
                    }
                    spinner.find("input").val(newVal);
                    spinner.find("input").trigger("change");
                });

                /*input.click(function () {
                    $(this).css("height", "60px");
                });*/
            });

            if (window.innerWidth < 768) {
                console.log("click");
                $contract.attr("role", "tabpanel")
                    .addClass("tab-panel active");
                $transact.attr("role", "tabpanel")
                    .addClass("tab-panel")
                    .removeClass("bg-grey");
                $carousel.remove();
                $carouselMobile.append($carousel);
                $('#myCarousel').carousel({
                    interval: 6000
                });

                $("#myCarousel .carousel-inner").swipe({
                    //Generic swipe handler for all directions
                    swipeLeft: function (event, direction, distance, duration, fingerCount) {
                        $(this).parent().carousel('next');
                    },
                    swipeRight: function () {
                        $(this).parent().carousel('prev');
                    },
                    //Default is 75px, set to 0 for demo so any distance triggers swipe
                    threshold: 0
                });
            } else {
                $contract.removeAttr("role")
                    .removeClass("tab-panel active");
                $transact.removeAttr("role")
                    .removeClass("tab-panel active");
                $carousel.remove();
                $("#carouselDesktop").append($carousel);
            }
        }
        resizeWindow();
        $(window).resize(resizeWindow);
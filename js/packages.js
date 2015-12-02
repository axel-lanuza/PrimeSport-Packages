        var resizeWindow = function () {
            var $contract = $("#contract"),
                $transact = $("#transact"),
                $window = $(window),
                $carousel = $("#myCarousel"),
                $carouselMobile = $("#myCarouselMobile");

            $('#myCarousel').carousel({
                interval: 4000
            });

            $(".spinner").find("button.up").each(function () {
                $(this).bind("click", function (e) {
                    var value = parseInt($(this).parent().parent().find(".amount").val(), 10);
                    var maximo = parseInt($(this).parent().parent().find(".amount").attr("max"), 10);
                    value = isNaN(value) ? 0 : value;
                    if (value == maximo) {
                        value = maximo;
                    } else {
                        value++;
                    }
                    $(this).parent().parent().find(".amount").val(value);
                })

            });

            $(".spinner").find("button.down").each(function () {
                $(this).bind("click", function (e) {
                    var value = parseInt($(this).parent().parent().find(".amount").val(), 10);
                    value = isNaN(value) ? 0 : value;
                    if (value == 1) {
                        value = 1;
                    } else {
                        value--;
                    }
                    $(this).parent().parent().find(".amount").val(value);
                });
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
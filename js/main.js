/**
 * Created by rscnt on 9/11/15.
 */

// globals MegaMenu

$(function() {
    // init mega-menu
    new MegaMenu().render();
    return true;
});

$(document).ready(function() {
    var a = 0;

    $('.right_ctrl').on("click", function() {
        var id = $(this).parents(':eq(1)').attr("id");
        var classes = $(this).parents(':eq(0)').attr("class").split(' ');

        var i = 0;
        var k = 0;
        a = $('#' + id + " .cart_details_li.active_SC").height();

        switch (classes[1]) {
            case 'section_a':
                $('#' + id + " ." + classes[1]).removeClass("active_SC");
                $('#' + id + " ." + "section_b").addClass("active_SC");
                $('#' + id + " ." + "section_b").height(a);

                //Header
                $(".cart_header_li.section_a").removeClass("active_SC");
                $(".cart_header_li.section_c").removeClass("active_SC");

                $(".cart_header_li.section_b").addClass("padding-center active_SC");
                $(".cart_header_li.section_a").parents(':eq(1)').removeClass("padding-left");
                $(".cart_header_li.section_a").parents(':eq(1)').removeClass("padding-right");
                break;

            case 'section_b':
                $('#' + id + " ." + classes[1]).removeClass("active_SC");
                $('#' + id + " ." + "section_c").addClass("active_SC");
                $('#' + id + " ." + "section_c").height(a);

                //Header
                $(".cart_header_li.section_a").removeClass("active_SC");
                $(".cart_header_li.section_b").removeClass("active_SC");

                $(".cart_header_li.section_c").addClass("padding-center active_SC");
                $(".cart_header_li.section_b").parents(':eq(1)').addClass("padding-right");
                $(".cart_header_li.section_b").parents(':eq(1)').removeClass("padding-left");

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
                $(".cart_header_li.section_b").removeClass("active_SC");
                $(".cart_header_li.section_c").removeClass("active_SC");

                $(".cart_header_li.section_a").addClass("active_SC");
                $(".cart_header_li.section_a").removeClass("padding-center");
                $(".cart_header_li.section_b").parents(':eq(1)').addClass("padding-left");
                $(".cart_header_li.section_b").parents(':eq(1)').removeClass("padding-right");
                break;
            case 'section_c':
                $('#' + id + " ." + classes[1]).removeClass("active_SC");
                $('#' + id + " ." + "section_b").addClass("active_SC");

                //Header
                $(".cart_header_li.section_c").removeClass("active_SC");
                $(".cart_header_li.section_a").removeClass("active_SC");

                $(".cart_header_li.section_b").addClass("padding-center active_SC");
                $(".cart_header_li.section_b").parents(':eq(1)').removeClass("padding-right");
                $(".cart_header_li.section_b").parents(':eq(1)').removeClass("padding-left");
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
                    //$(this).text("You swiped " + direction );
                    //alert("you swiped" + direction);
                    var id = $(this).parents(':eq(0)').attr("id");
                    var classes = $(this).attr("class").split(' ');

                    a = $(this).height();
                    var i = 0;
                    var k = 0;
                    //alert(direction+" "+classes[1]);
                    switch (classes[1]) {
                        case 'section_a':
                            $('#' + id + " ." + classes[1]).removeClass("active_SC");
                            $('#' + id + " ." + "section_b").addClass("active_SC");
                            $('#' + id + " ." + "section_b").height(a);

                            //Header
                            $(".cart_header_li.section_a").removeClass("active_SC");
                            $(".cart_header_li.section_c").removeClass("active_SC");

                            $(".cart_header_li.section_b").addClass("padding-center active_SC");
                            $(".cart_header_li.section_a").parents(':eq(1)').removeClass("padding-left");
                            $(".cart_header_li.section_a").parents(':eq(1)').removeClass("padding-right");
                            break;

                        case 'section_b':
                            $('#' + id + " ." + classes[1]).removeClass("active_SC");
                            $('#' + id + " ." + "section_c").addClass("active_SC");
                            $('#' + id + " ." + "section_c").height(a);

                            //Header
                            $(".cart_header_li.section_a").removeClass("active_SC");
                            $(".cart_header_li.section_b").removeClass("active_SC");

                            $(".cart_header_li.section_c").addClass("padding-center active_SC");
                            $(".cart_header_li.section_b").parents(':eq(1)').addClass("padding-right");
                            $(".cart_header_li.section_b").parents(':eq(1)').removeClass("padding-left");
                            break;

                        case 'section_c':
                            $('#' + id + " " + ".cart_details_li").addClass("margin-left-cartshopping");
                            $('#' + id + " " + ".remove_ctrl").height(a);
                            $('#' + id + " " + ".remove_ctrl").css("display", "table");
                            break;
                    }
                },

                swipeRight: function(event, direction, distance, duration, fingerCount, fingerData) {
                    //$(this).text("You swiped " + direction );
                    //alert("you swiped" + direction);
                    var id = $(this).parents(':eq(0)').attr("id");
                    var classes = $(this).attr("class").split(' ');

                    a = $(this).height();
                    var i = 0;
                    var k = 0;
                    //alert(direction+" "+classes[1]);
                    switch (classes[1]) {
                        case 'section_a':
                            break;
                        case 'section_b':
                            $('#' + id + " ." + classes[1]).removeClass("active_SC");
                            $('#' + id + " ." + "section_a").addClass("active_SC");

                            //Header
                            $(".cart_header_li.section_b").removeClass("active_SC");
                            $(".cart_header_li.section_c").removeClass("active_SC");

                            $(".cart_header_li.section_a").addClass("active_SC");
                            $(".cart_header_li.section_a").removeClass("padding-center");
                            $(".cart_header_li.section_b").parents(':eq(1)').addClass("padding-left");
                            $(".cart_header_li.section_b").parents(':eq(1)').removeClass("padding-right");
                            break;
                        case 'section_c':
                            if ($(this).hasClass("margin-left-cartshopping")) {
                                $('#' + id + " " + ".cart_details_li").removeClass("margin-left-cartshopping");
                                $('#' + id + " " + ".remove_ctrl").css("display", "none");

                                //Header
                                $(".cart_header_li.section_a").removeClass("active_SC");
                                $(".cart_header_li.section_b").removeClass("active_SC");

                                $(".cart_header_li.section_c").addClass("padding-center active_SC");
                                $(".cart_header_li.section_a").parents(':eq(1)').removeClass("padding-left");
                                $(".cart_header_li.section_a").parents(':eq(1)').addClass("padding-right");

                            } else {
                                $('#' + id + " ." + classes[1]).removeClass("active_SC");
                                $('#' + id + " ." + "section_b").addClass("active_SC");

                                //Header
                                $(".cart_header_li.section_c").removeClass("active_SC");
                                $(".cart_header_li.section_a").removeClass("active_SC");

                                $(".cart_header_li.section_b").addClass("padding-center active_SC");
                                $(".cart_header_li.section_b").parents(':eq(1)').removeClass("padding-right");
                                $(".cart_header_li.section_b").parents(':eq(1)').removeClass("padding-left");
                            }
                            break;
                    }
                }
            });
        });

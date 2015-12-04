  /**********************
    Carousel Init
    ***********************/

  $('#myCarousel').carousel({
      interval: 8000
  });

  /**********************
  Spinner functions
  ***********************/

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


  /**********************
  Tabs steps for checkout
  ***********************/

  $("#step-1").bind("click", function () {
      $("#faq2").click();
  });

  $("#step-2").bind("click", function () {
      $("#faq3").click();
      $("#pagePackages .checkout").slideToggle();
  });

  $("#faq3").click(function () {
      $("#pagePackages .checkout").slideUp();
  });

  /**********************
  Morphing functions for mobile
  ***********************/

  var resizeWindow = function () {
      var $contract = $("#contract"),
          $transact = $("#transact"),
          $window = $(window),
          $carousel = $("#myCarousel"),
          $carouselMobile = $("#myCarouselMobile");


      if (window.innerWidth < 1199) {
          $("#paddTop").removeClass("container")
              .addClass("container-fluid");
      } else {
          $("#paddTop").removeClass("container-fluid")
              .addClass("container");
      }

      if (window.innerWidth < 768) {
          console.log("resizing");
          $contract.attr("role", "tabpanel")
              .addClass("tab-panel active");
          $transact.attr("role", "tabpanel")
              .addClass("tab-panel")
              .removeClass("bg-grey");
          if ($transact.hasClass('active')) {
              $contract.toggleClass("active");
          }
          $carousel.remove();
          $carouselMobile.append($carousel);
          $('#myCarousel').carousel({
              interval: 9000
          });

          /*********************
            Touch support for 
            bootstrap carousel
          *********************/
          
          $("#myCarousel .carousel-inner").swipe({
              swipeLeft: function (event, direction, distance, duration, fingerCount) {
                  $(this).parent().carousel('next');
              },
              swipeRight: function () {
                  $(this).parent().carousel('prev');
              },
              threshold: 0
          });

      } else {
          $contract.removeAttr("role")
              .removeClass("tab-panel active");
          $transact.removeAttr("role")
              .removeClass("tab-panel active");
          $carousel.remove();
          $("#carouselDesktop").append($carousel);
          $contract.show();
          $transact.show();
      }
  }
  resizeWindow();
  $(window).resize(resizeWindow);
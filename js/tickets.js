$(document).ready(function () {
	var $window = $(window),
		$body = $('body');

	window.userAgent = window.userAgent || navigator.userAgent.toLowerCase(),
	window.isDevice = window.userAgent || (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent));
	window.isDesktop = window.userAgent || (window.matchMedia && window.matchMedia('only screen and (max-width: 992px)').matches);
	window.isMobile = window.userAgent || (window.matchMedia && window.matchMedia('only screen and (max-width: 767px)').matches);

	var $ticketsWrapper = $('.tickets-section-wrapper'),
		$ticketsSection = $ticketsWrapper.find('.tickets-section'),
		$priceFilter = $ticketsSection.find('#tickets-price-dropdown'),
		$slider = $ticketsSection.find(".price-slider"),
		$quantity = $ticketsSection.find('.big-select select'),
		$columnQuantity = $ticketsSection.find('.col-quantity select'),
		$tableHead = $ticketsSection.find('.table-head'),
		$tableBody = $ticketsSection.find('.table-body'),
		$tooltips = $ticketsSection.find('.tooltip-wrapper');
	var $toggleSportMenu = $('.toggle-sport-menu'),
		$sportMenu = $('.sport-menu'),
		$menuOptions = $sportMenu.find('ul');

	var ticketBodyOffset = $tableBody.offset();

	var $back = $('.back-arrow'),
		$seeQuick = $('.see-quick'),
		$popupOpen = $(".popup-open"),
		$fullFooter = $('.ticket-full-footer'),
		$footerOverlay = $('.footer-overlay');

	var $header = $('.main-header'),
		$secondHeader = $('.rose-bowl-tickets-header'),
		$stadium = $('.stadium-graphic'),
        $stadiumContainer = $stadium.find('.stadium-container'),
		$sellTickets = $stadium.find('.sell-tickets'),
		$footer = $('.ticket-footer'),
		$ticketFilters = $('.tickets-filters'),
		$bottomFooter = $('.bottom-footer'),
		$mobileHeader = $('.mobile-header'),
		$seeMoreWrapper = $('.see-more-wrapper'),
		$seeMore = $seeMoreWrapper.find('.see-more-tickets'),
		minTableHeight = Math.min(230, $tableBody.height()),
		minTableHeightMobile = Math.min(138, $tableBody.height());

	var $infoButton = $('.info-button'),
		$mobileHeader = $('.mobile-header'),
		$infoAccordion = $('.info-accordion'),
		$additionalAccordion = $('.additional-info-accordion');

	var $settingsButton = $('.toggle-setting');

	var $filters = $ticketFilters.children(),
		filtersHeight = 0,
        tableHeight = 0,
        prevTableHeight = 0,
        enableExpand = true,
        wasExpanded = false;

	var isExpanded = false;

	var $mobileQTY = $('.ticket-full-information .qty');

	var $page = $('.page'),
		$backButton = $('.back-button'),
		$fullInfo = $('.ticket-full-information'),
		info = {
			stadium: $fullInfo.find('.stadium'),
			section: $fullInfo.find('.section'),
			row: $fullInfo.find('.ticket-row'),
			notes: $fullInfo.find('.notes'),
			instantTooltip: $fullInfo.find('.instant-download .tooltip'),
			paperlessTooltip: $fullInfo.find('.paperless .tooltip'),
			available: $fullInfo.find('.available'),
			price: $fullInfo.find('.price'),
			select: $fullInfo.find('.qty')
		};

    var table = {
        siblings: $ticketsWrapper.siblings(),
        pageSiblings: $page.siblings()
    };

	var setContentheight = function () {
		var contentHeight  = window.innerHeight;

        table.siblings.add(table.pageSiblings).each(function () {
            var $this = $(this);
            if ( !$this.hasClass('overlay') ) {
                contentHeight -= $this.outerHeight();
            }
        });

        $stadiumContainer.css('min-height', 0);

        if ( !isDesktop && !isMobile ) {
            if ( contentHeight > $stadium.height() ) {
                $stadiumContainer.css('min-height', contentHeight - $sellTickets.outerHeight(true));
                contentHeight = contentHeight - $tableHead.outerHeight() - $ticketFilters.height();

            }
            else {
                contentHeight = $stadium.height() - $tableHead.outerHeight() - $ticketFilters.height();
            }
		}
		else if ( isDesktop && !isMobile ) {
			contentHeight = contentHeight - $stadium.height() - $tableHead.outerHeight() - $ticketFilters.height();
			contentHeight = Math.max(minTableHeight, contentHeight);

		}
		else if ( isMobile ) {
			contentHeight = contentHeight - $stadium.outerHeight() - $tableHead.outerHeight() - $seeMoreWrapper.height();
			contentHeight = Math.max(minTableHeightMobile, contentHeight);
		}

		$tableBody.height(contentHeight);
        tableHeight = contentHeight;
	};

    // refresh isMobile and isDevice variables
    $window.on('resize', function () {
        window.isDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent));
        window.isDesktop = window.matchMedia && window.matchMedia('only screen and (max-width: 992px)').matches;
        window.isMobile = window.matchMedia && window.matchMedia('only screen and (max-width: 767px)').matches;
    });

    $priceFilter.ddslick({
        background: "#043b5c"
    });

    $priceFilter.on('click', function(e){
        var ddSelectedUp = $('#tickets-price-dropdown').find($('.dd-selected'));
        if (ddSelectedUp.hasClass('dd-selected-up')) {
            ddSelectedUp.removeClass('dd-selected-up');
        }
        else {
            ddSelectedUp.addClass('dd-selected-up');
        }
    });

    //tickets-price-bar
    $slider.slider({
      orientation: "horizontal",
      range: "min",
      max: 255,
      value: 50
    });

    //tickets-quantity-select
    $quantity.selectspinner({
    	direction: {
    		mobile: 'top'
    	}
    });
    $columnQuantity.selectspinner({
        classes: ['small-select'],
        overflowWrapperSelector: '.ticket-table-body'
    });

    // show tooltip in top or bottom {
   	$tooltips.each(function () {
   		var $this = $(this),
   			$tooltip = $this.find('.tooltip');

   		if ( ticketBodyOffset.top > $this.offset().top - $tooltip.outerHeight() ) {
   			$this.addClass('bottom');
   		}
   	});

   	$sportMenu
   		.css('height', $menuOptions.height())
   		.addClass('menu-hidden');

    // clicking anywhere else makes the menu hide
    $(document.body).click( function() {
        $sportMenu.addClass('menu-hidden');
    });

   	$toggleSportMenu.on('click', function (e) {
   		if ( !isMobile ) {
	   		e.preventDefault();
            e.stopPropagation();
	   		$sportMenu.toggleClass('menu-hidden');
   		}
   	});

   	// functionality of the back arrow
   	$back.on('click', function (e) {
   		e.preventDefault();
   		window.history.back();
   	});

    setContentheight();
    (!isDevice) && $tableBody.perfectScrollbar();
    $bottomFooter.height($footer.outerHeight());
    $window.resize(function () {
    	if ( !isExpanded && !$ticketsSection.hasClass('filters-visible') ) {
	    	setContentheight();
	    	(!isDevice) && $tableBody.perfectScrollbar('update');
    	}
    });

   	$popupOpen.on("click", function(e) {
   		e.preventDefault();

   		var $this = $(this),
   			$popupContent = $this.parent().find('.popup-content'),
   			$popup;

        $popup = $($this.data('target'));

        if ( $popupContent.length ) {
        	$popup.find('.popup-container')
        		.empty()
        		.append($popupContent.clone());
        }

        $popup
        	.removeClass("hidden")
        	.openPopup();

    });

   	// functionality of the hide/ show footer
    $seeQuick.on('click', function (e) {
    	var text = $seeQuick.text(),
    		height = $fullFooter.children().outerHeight(),
    		footerHeight = $bottomFooter.height(),
    		bodyHeight = height + footerHeight;

    	e.preventDefault();

		if ( isMobile ) {
			if ( window.innerHeight > bodyHeight ) {
				$fullFooter.height(window.innerHeight - footerHeight);
				bodyHeight = window.innerHeight;
			}
			else {
	   			$fullFooter.height(height);
			}

			if ( $body.css('overflow') !== 'hidden' ) {
	   			$body.css({
		   			height: bodyHeight + 'px',
		   			overflow: 'hidden'
		   		});
			}
			else {
				$body.css({
		   			height: 'auto',
		   			overflowY: 'visible'
		   		});
			}

			$(window).scrollTop(0);
    	}
    	else {
    		$fullFooter.height(height);
    	}

    	$fullFooter.toggleClass('hidden-footer');
    	$footerOverlay.toggleClass('active');

    	$seeQuick
    		.text($seeQuick.data('toggletext'))
    		.data('toggletext', text);
    });

    // mobile info section and accordion
    $infoButton.on('click', function () {
    	$body.toggleClass('info-visible');
    });

    // set filter height and create animation of the open/close
    filtersHeight = 0;
    $filters.each(function (argument) {
    	filtersHeight += $(this).outerHeight();
    });
    $ticketFilters.height(filtersHeight);

	$settingsButton.on('click', function () {
    	$ticketsSection.toggleClass('filters-visible');

        if ( isMobile ) {
            var top;
            if ( $ticketsSection.hasClass('filters-visible') ) {
                if ( $ticketsWrapper.hasClass('expanded-table') ) {
                    $seeMore.trigger('click');
                    wasExpanded = true;
                }

                enableExpand = false;
                $tableBody.height( filtersHeight );
            }
            else {
                $tableBody.height( tableHeight );

                enableExpand = true;
                if ( wasExpanded ) {
                    $seeMore.trigger('click');
                    wasExpanded = false;
                }
            }
        }
    });

    // functionality of the "expand" button on the mobile
    $seeMore.on('click', function () {
    	var top;
        if ( !enableExpand ) {
            return;
        }
    	if ( $ticketsSection.css('top') === '0px' ) {
	    	top = - $stadium.height() + $sellTickets.outerHeight(true);
	    	$tableBody.css({ height: '-=' + top });
            prevTableHeight = tableHeight;
            tableHeight -= top;
    	}
    	else {
    		top = 0;
    		$tableBody.css({ height: '+=' + $ticketsSection.css('top') });
            tableHeight = prevTableHeight;
    	}

    	isExpanded = !isExpanded;
    	$ticketsWrapper.toggleClass('expanded-table');
    	$ticketsSection.css({
    		top: top,
    		marginBottom: top
    	});
    });

    // second header accordions on mobile
    $infoAccordion.accordion({
    	heightStyle: 'content',
    	active: false,
    	collapsible: true
    });

    $additionalAccordion.accordion({
    	heightStyle: 'content',
    	active: false,
    	collapsible: true
    });

    // functionality to show full ticket information on mobile
    $tableBody.on('click', '.ticket', function () {
    	var $this = $(this);
    	var $stadium, $options, section, row, available, notes, instantTooltip, paperlessTooltip, qty, price;

    	if ( isMobile ) {
	    	$stadium = $this.find('.full-info .stadium').html();
	    	section = $this.find('.col-section').text();
	    	row = $this.find('.col-row').text();
	    	notes = $this.find('.col-notes .popup-content').text();
	    	instantTooltip = $this.find('.instant-download .tooltip').text();
	    	paperlessTooltip = $this.find('.paperless .tooltip').text();
	    	available = $this.find('.qty-available').text();
	    	price = $this.find('.col-price').html();

	    	qty = [];
	    	$options = $this.find('.col-quantity option');
	    	$options.each(function () {
	    		qty.push(this.value);
	    	});

	    	info.stadium.html($stadium);
	    	info.section.text(section);
	    	info.row.text(row);
	    	info.notes.text(notes);
	    	info.instantTooltip.text(instantTooltip);
	    	info.paperlessTooltip.text(paperlessTooltip);
	    	info.available.text(available);
	    	info.price.html(price);
	    	info.select.selectspinner('update', qty);

	    	$page.addClass('show-full-info');
    	}
        else {
            $tableBody.find('.active').removeClass('active');
            $this.addClass('active');
        }
    });

	// click on the back button to hide full ticket information
	$backButton.on('click', function () {
        if ( $page.hasClass('show-full-info') ) {
            $page.removeClass('show-full-info');
        }
        else {
            window.history.back();
        }
	});

    // initializing custom select for qty on mobile
    $mobileQTY.selectspinner({
    	direction: {
    		mobile: 'top'
    	}
    });

    $(window).load(function () {
    	$window.trigger('resize');

		//hidden arrows on devices
		var spinnerPrice = $('.xdsoft_spinner');
		if( isDevice ){
			spinnerPrice.hide();
		}

		// show arrow on sell page
		if (spinnerPrice.parents('.sell-page').length) {
			if( isDevice ){
				spinnerPrice.show();
			}
		}
    });

});

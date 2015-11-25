$(document).ready(function () {
	'use strict';

	var $customSelect = $('.custom-select'),
		showEditSection = false;

	var menu = {
		wrapper : $('.mobile-nav-wrapper'),
		nav: $('.slide-navigation-mobile'),
		ul: $('.slide-navigation-mobile .mobile-nav'),
		navBtn: $('.slide-navigation-mobile .nav-btn'),
		translate: 0
	};

	var toggleCheckbox = $('.checkbox-toggle'),
		setCheckVisibility = function (checkbox) {
			var $check = $(checkbox);
			if ( checkbox.checked ) {
				$($check.data('toggle')).addClass('toggle');
				$($check.data('section')).addClass('toggle');
			}
			else {
				$($(checkbox).data('toggle')).removeClass('toggle');
				$($check.data('section')).removeClass('toggle');
			}
		};

	// set start position of the mobile navigation menu
	var setMobileMenu = function () {
		var activeItem = menu.ul.find('.active').parent();

		menu.translate = -activeItem.index() * 100;
		menu.ul.css({
			'-webkit-transform': 'translateX('+ menu.translate +'%)',
			'transform': 'translateX('+ menu.translate +'%)'
		});
	};

	// handling clicks on the 
	menu.navBtn.on('click', function () {
		var newLeft, newActive, newRight, left, active, right, $this, firstItem, lastItem, change;

		$this = $(this);
		menu.ul.stop();

		active = menu.ul.find('.active').parent();
		left = active.prev();
		right = active.next();

		if ( $this.hasClass('prev-btn') ) {
			newActive = left;

			lastItem = menu.ul.find('.item-wrapper:last');
			change = 100;
			menu.ul.prepend(lastItem);
		}
		else {
			newActive = right;

			firstItem = menu.ul.find('.item-wrapper:first');
			change = -100;
			menu.ul.append(firstItem);
		}

		setMobileMenu();

		left.find('.item').removeClass('left-item');
		right.find('.item').removeClass('right-item');
		active.find('.item').removeClass('active');

		menu.ul
			.animate({
				item: change
			}, {
				step: function(now, fx) {
					$(this).css({
							'-webkit-transform': 'translateX('+ (menu.translate + now) +'%)',
							'transform': 'translateX('+ (menu.translate + now) +'%)'
						});
			    },
			    duration: 500
			})
			.promise()
			.done(function () {
				// change content
				$('.side-navigation a[href="' + newActive.find('.item').data('href') + '"]').tab('show');
			})
			.always(function () {
				newActive.prev().find('.item').addClass('left-item');
				newActive.next().find('.item').addClass('right-item');
				newActive.find('.item').addClass('active');
			})
	});

	// handling swipe of the mobile menu
	menu.nav.swipe({
		swipeLeft: function () {
			menu.nav.find('.next-btn').trigger('click');
		},
		swipeRight: function () {
			menu.nav.find('.prev-btn').trigger('click');
		}
	});

	$customSelect.each(function () {
		var $this = $(this);

		$this.ddslick({
			selectText: $this.data('text'),
			defaultSelectedIndex: null,
	        background: "#f6f6f6"
	    });
	});

	$(".edit, .save").on("click", function (e) {
		e.preventDefault();

		var $this = $(this),
			status = $this.data('status'),
			parent = $this.data('parent');
	
		$this.hide();
		if ( parent ) {
			parent = $this.parents(parent).first();

			parent.find($this.data('show')).show();
			parent.find($this.data('hide')).hide();
			parent.find($this.data('form')).toggleClass('edit-form');

			if ( $this.data('parenttrigger') ) {
				parent.trigger($this.data('parenttrigger'));
			}
		}
		else {
			$($this.data('show')).show();
			$($this.data('hide')).hide();
			$($this.data('form')).toggleClass('edit-form');
		}
		showEditSection = !showEditSection;

		// set visibility of the blocks
		toggleCheckbox.each(function () {
			setCheckVisibility(this);
		});
	});

	toggleCheckbox.on('click', function () {
		setCheckVisibility(this);
	});


	$(".expanded-arrow").on("click", function() {
		var $this = $(this),
			parent = $this.data('parent');

		$this.toggleClass('active');

		if(showEditSection) {
			$this.parents(parent).find(".details-row.selling-edit").slideToggle();
		}
		else {
			$this.parents(parent).find(".details-row.selling-info").slideToggle();
		}
	});

	var $confirmPopup = $("#confirmation-popup"),
		$saveBtn = $confirmPopup.find('.second-btn');

	$(document).on("click", ".btn, .icon-close", function(){

		var $this = $(this),
			parent = $this.data('parent');

			if($this.data('confirmation') == true) {
				$confirmPopup.parent = null;
				if ( parent ) {
					parent = $this.parents(parent).first();
					$confirmPopup.parent = parent;
				}
				$confirmPopup.removeClass('hidden').openPopup();
			}

		return false;
	});

	// set functionality when we click on button in the confirmation popup
	$saveBtn.on('click', function (e) {
		e.preventDefault();
		if ( $confirmPopup.parent ) {
			$confirmPopup.parent.trigger(':save');
		}
	});

	$('.table-content.selling')
		.on(':save', function () {
			var $this = $(this),
				$edit = $this.find('.edit'),
				parent = $edit.data('parent');

			$edit.show();
			if ( parent ) {
				parent = $edit.parents(parent).first();

				parent.find($edit.data('hide')).show();
				parent.find($edit.data('show')).hide();
				parent.find($edit.data('form')).toggleClass('edit-form');
			}
			else {
				$($edit.data('hide')).show();
				$($edit.data('show')).hide();
				$($edit.data('form')).toggleClass('edit-form');
			}
		})
		.on(':show', function () {
			$(this).removeClass('show-buttons')
		});

	$('#my-information .prime-form').on(':save', function () {
		var $this = $(this),
			$edit = $this.find('.save:first');

		// debugger
		// $edit.show();
		$($edit.data('hide')).hide();
		$($edit.data('show')).show();
		$($edit.data('form')).toggleClass('edit-form');
	});
	// show/hide edit and remove button on user swipe
	$('.user-buttons').swipe({
		swipeLeft: function (event, direction, distance) {
			var $this = $(this);
			$this.addClass('show-buttons');
		},
		swipeRight: function (event, direction, distance) {
			var $this = $(this);
			$this.removeClass('show-buttons');
		}
	});

	//sticky mobile navigation
	var $window = $(window),
		$body = $('body');
	$window.on('touchstart touchmove touchend scroll', function () {
		if ( menu.wrapper.offset().top <= window.scrollY ) {
			// fix menu
			$body.addClass('fixed-menu');
		}
		else {
			$body.removeClass('fixed-menu');
		}
	});
	
	setMobileMenu();
});
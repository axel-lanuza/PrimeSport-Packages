/**
 * Created by rscnt on 9/11/15.
 */

/* globals: $ */

(function () {

    var root = this;

    var MegaMenu;
    MegaMenu = function (opts) {
	/**
	 * */
	var self = this;
	this.opts = {
		selectorPageContainer: '.content-wrapper',
		selectorPageContainerParent: 'body',
		// we assume these elements are bootstrap-dropdown enabled components.
		selectorMenuItems: '.nav-link-title',
		selectorMenuMobileItems: '.menu_mobile_link',
		//overlay class
		overlayClass: 'content-wrapper-overlay',
		overlayParentClass: 'content-wrapper-overlay-parent',
		selectorMenuCollapses: ['#menu_princ', '#menu_login', '#menu_fav', '#menu_cart'],
		menuBreakPointSize: 767
	    } || opts /* sorry, it will take some time to write a merge, link 2m... */;

	self.current_width = 0;
	self.previous_width = 0;

	/* jQuery.Event callback */
	this.onMenuItemsShow = function (e) {
	    self.showingOverlay = true;
	    $(self.opts.selectorPageContainerParent).addClass(self.opts.overlayParentClass);
	    $(self.opts.selectorPageContainer).addClass(self.opts.overlayClass);
	    return true;
	};

	/* jQuery.Event callback */
	this.onMenuItemsHide = function (e) {
	    self.showingOverlay = false;
	    $(self.opts.selectorPageContainerParent).removeClass(self.opts.overlayParentClass);
	    $(self.opts.selectorPageContainer).removeClass(self.opts.overlayClass);
	};

	this.reachedBreakPoint = function () {
	    var result = true;

	    if (self.previous_width >= self.opts.menuBreakPointSize) {
		if (self.current_width <= self.opts.menuBreakPointSize) {
		    result = true;
		}
	    } else {
		if (self.current_width >= self.opts.menuBreakPointSize) {
		    result = true;
		}
	    }
	    return result;
	};

	this.dropdownSelected = function () {
	    return $(".dropdown-toggle[aria-expanded='true']").length;
	};

	this.mobileMenuShowing = function() {
	  return $(".menu_mobile_link[aria-expanded='true']").length;
	};

	this.onWindowResize = function (e) {
	    if (self.reachedBreakPoint()) {
		if (self.current_width >= self.opts.menuBreakPointSize) {
		    $(".menu_mobile_link[aria-expanded='true']").attr('aria-expanded', 'false');
		}
	    }

	    var $this = $(this),
		expanded = self.dropdownSelected(),
		mobileMenuShown = self.mobileMenuShowing();
	    self.previous_width = self.current_width;
	    self.current_width = $this.width();

	    // don't ask...
	    if (self.reachedBreakPoint()) {
		if (!expanded && !mobileMenuShown) {
		    self.onMenuItemsHide();
		}
	    }
	};

	this.render = function () {
	    var $selectorMenuItems = $(this.opts.selectorMenuItems),
		$window = $(window);

	    self.current_width = $window.width();
	    self.previous_width = self.current_width;
	    $window.resize(this.onWindowResize);

	    // ----------
	    $selectorMenuItems.on(
		'shown.bs.dropdown', this.onMenuItemsShow);
	    $selectorMenuItems.on(
		'hidden.bs.dropdown', function() {
		    // ignore this event if faced with disgrace... (if the window is the size of a tablet [?])
		    if (self.current_width >= self.opts.menuBreakPointSize) {
		    self.onMenuItemsHide();
		}
	    });
	    // ----------
	    for (var i = 0, l = this.opts.selectorMenuCollapses.length; i < l; i++) {
		var $dom = $(this.opts.selectorMenuCollapses[i]);
		$dom.on(
		    'shown.bs.collapse', self.onMenuItemsShow);
		$dom.on(
		    'hidden.bs.collapse', self.onMenuItemsHide);
	    }
	};
    };

    root.MegaMenu = MegaMenu;
})();

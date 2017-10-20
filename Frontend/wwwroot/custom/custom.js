jQuery(function() {
	
	//allow :active styles to work in your CSS on a page in Mobile Safari (https://css-tricks.com/snippets/css/remove-gray-highlight-when-tapping-links-in-mobile-safari/)
	document.addEventListener("touchstart", function(){}, true);
	
	// Custom Form (https://github.com/Dimox/jQueryFormStyler)
	jQuery(".l-form-elem-custom").styler({
		onFormStyled: function() {
			if (jQuery("input.l-form-checkbox").is(':checked')) {
				jQuery(".l-form-extra").css("display","block");
			}
		}
	});
	
	jQuery('input.l-form-checkbox').on('change', function() {
        if (jQuery(this).is(':checked')) {
            jQuery(".l-form-extra").slideDown();  
        } else {
			jQuery(".l-form-extra").slideUp();  
        }
    });
	
	// Menu Dropdown
	jQuery(".c-header__nav li.has-dropdown").hover(Handler);

	function Handler(event) {
		jQuery(this).toggleClass("show-dropdown");
	}

	// Login Dropdown
    jQuery(".c-header__login-toggle").click(function() {
        toggleLogin();
    });

    function toggleLogin() {
		if (jQuery(".c-header__login-toggle").hasClass("open")) {
            if (jQuery("body").hasClass("logged-in")) {
				jQuery(".l-dropdown--user-menu").fadeOut();
			} else {
				jQuery(".l-dropdown--login").fadeOut();
			}
            jQuery(".c-header__login-toggle").removeClass("open");
        } else {
			if (jQuery("body").hasClass("logged-in")) {
				jQuery(".l-dropdown--user-menu").fadeIn();
			} else {
				jQuery(".l-dropdown--login").fadeIn();
			}
            jQuery(".c-header__login-toggle").addClass("open");
        }
    }

	function setElemPosition(){
		$footerHeight = jQuery(".c-footer").height();
		jQuery(".c-content").css('padding-bottom', $footerHeight);
	}

    setElemPosition();

	jQuery(window).bind("resize", function () {
		setElemPosition();
	});
	
	// Mobile Wrap
	jQuery(".c-header__nav-toggle").click(function() {
		toggleWrap();
	});

	function toggleWrap() {
		if (jQuery("body").hasClass("show-nav")) {
			jQuery(".c-mobile-wrap").stop().animate({
				left: "100%",
				bottom: "100%",
				opacity: "0"
			}, 300,"");
			jQuery("body").removeClass("show-nav");
		} else {
			jQuery(".c-mobile-wrap").stop().animate({
				left: "0",
				bottom: "0",
				opacity: "1"
			}, 300, "");
			jQuery("body").addClass("show-nav");
		}
	}
	
	// Mobile Navigation
	jQuery(".c-mobile-wrap__nav li.has-dropdown").on("click", function() {
		var accountItem = jQuery(this);
		if (accountItem.hasClass("form-toggle") && (!jQuery("body").hasClass("logged-in"))) {
			// Mobile Form
			jQuery(".c-mobile-form-wrap").stop().animate({
				left: "0",
				bottom: "0",
				opacity: "1"
			}, 300,"");
		} else {
			var currentnav=jQuery(this).closest("li").find(".l-dropdown--mobile");
			if(!currentnav.is(":visible")){
				currentnav.slideDown();
				var $this = jQuery(this);
				$this.toggleClass("show-dropdown").children("ul").toggleClass("is-visible");
			} else {
				currentnav.slideUp();
				var $this = jQuery(this);
				$this.toggleClass("show-dropdown").children("ul").toggleClass("is-visible");
			}
		}
	});
	
	jQuery(".c-mobile-form__close").on("click", function() {
		jQuery(".c-mobile-form-wrap").stop().animate({
			left: "100%",
			bottom: "100%",
			opacity: "0"
		}, 300,"");
	});
	
	
	  
/*---------------------------------------- 
			Search Bottom
---------------------------------------- */	
	// Create the select
	jQuery("<div class='select-style'></div>").insertAfter(".c-content__search-list").wrapInner("<select />");

	// Create the default option "Search for Homes by City"
	jQuery("<option />", {
		"selected": "selected",
		"value"   : "",
		"text"    : "Search for Homes by City"
	}).appendTo(".c-content__search-bottom select");

	// Add options to select
	jQuery(".c-content__search-list a").each(function() {
		var el = jQuery(this);
		jQuery("<option />", {
		   "value"   : el.attr("href"),
		   "text"    : el.text()
		}).appendTo(".c-content__search-bottom select");
	});

	// Make select working
	jQuery(".c-content__search-bottom select").on('change', function() {
		window.location = jQuery(this).find("option:selected").val();
	});
});
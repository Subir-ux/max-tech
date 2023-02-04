(function ($) {
  ("use strict");
  /*------------------------------------
        Call the variable
    --------------------------------------*/

  let win = $(window);

  //Function callback

  $(document).ready(function () {
    toggleMobileNavigation();
    venoboxInit();
    isotopFilterGallery();
  });

  // Toggle mobile navigation
  function toggleMobileNavigation() {
    var navbar = $(".navigation-holder");
    var openBtn = $(".navbar-header .open-btn");
    var closeBtn = $(".navigation-holder .close-navbar");

    closeBtn.on("click", function () {
      if (navbar.hasClass("slideInn")) {
        navbar.removeClass("slideInn");
        openBtn.removeClass("d-none");
      }
      $("body").removeClass("overflow-hidden");
      return false;
    });

    openBtn.on("click", function (e) {
      e.stopImmediatePropagation();
      navbar.toggleClass("slideInn");
      $("body").addClass("overflow-hidden");
      $(this).addClass("d-none");
      return false;
    });
  }

  // Function for toggle class for small menu
  function toggleClassForSmallNav() {
    var windowWidth = window.innerWidth;
    var mainNav = $("#navbar > ul");

    if (windowWidth <= 991) {
      mainNav.addClass("small-nav");
    } else {
      mainNav.removeClass("small-nav");
    }
  }

  toggleClassForSmallNav();

  // Function for small menu
  function smallNavFunctionality() {
    var windowWidth = window.innerWidth;
    var mainNav = $(".navigation-holder");
    var smallNav = $(".navigation-holder > .small-nav");
    var subMenu = smallNav.find(".sub-menu");
    var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

    if (windowWidth <= 991) {
      subMenu.hide();
      menuItemWidthSubMenu.on("click", function (e) {
        var $this = $(this);
        $this.siblings().slideToggle();
        $this.parent().toggleClass("active-menu");
        e.preventDefault();
        e.stopImmediatePropagation();
      });
    } else if (windowWidth > 991) {
      mainNav.find(".sub-menu").show();
    }
  }

  smallNavFunctionality();

  /*-------------------------------------------
        Sticky Header
    --------------------------------------------- */

  let stickyHeader = $(".scrollStickyheader");
  let stickyLogo = $(".navbar-brand");
  win.on("scroll", function () {
    let scroll = win.scrollTop();
    if (scroll < 100) {
      stickyHeader.removeClass("sticky-header");
      // stickyLogo.addClass('d-lg-none');
    } else {
      stickyHeader.addClass("sticky-header");
      // stickyLogo.removeClass('d-lg-none');
    }
  });

  /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
  $(window).on("load", function () {
    // preloader();
    toggleMobileNavigation();
    smallNavFunctionality();
  });

  /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
  $(window).on("resize", function () {
    toggleClassForSmallNav();

    clearTimeout($.data(this, "resizeTimer"));
    $.data(
      this,
      "resizeTimer",
      setTimeout(function () {
        smallNavFunctionality();
      }, 200)
    );
  });

  // MAIN SLIDER
  /* parallax slider script on Home 1*/
  const bannerSlider = new Swiper(".bannerSlider", {
    speed: 800,
    loop: true,
    parallax: true,
    simulateTouch: false,
    preventInteractionOnTransition: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    // If we need pagination
    navigation: {
      nextEl: ".bannerSlider .next_swiper",
      prevEl: ".bannerSlider .prev_swiper",
    },
  });

  // Veno box initialize

  function venoboxInit() {
    $(".venobox").venobox();
  }

  // Isotope for filter gallery
  function isotopFilterGallery() {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
    });

    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");

      portfolioIsotope.isotope({
        filter: $(this).data("filter"),
      });
    });
  }
})(window.jQuery);

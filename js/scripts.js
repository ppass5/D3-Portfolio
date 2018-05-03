
(function($) {
    "use strict";
    /*==============================
        Is mobile
    ==============================*/
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }

    function footerMatchHeight()
    {
        $("#footer")
    }


    /*==============================
        Image cover
    ==============================*/
    $.fn.imageCover = function() {
        $(this).each(function() {

            var self = this;
            cover(self);
            $(this).data('isCover')
            $(window).resize( function () {
                cover(self);
            });

        });

        function cover (el) {
            var self = $(el),
                image = self.find('img');

            if(image.length) {
                var naturalHeight = image[0].naturalHeight,
                naturalWidth = image[0].naturalWidth,
                heightWrap = self.outerHeight(),
                widthWrap = self.outerWidth();

                if ((widthWrap/ heightWrap) < (naturalWidth/naturalHeight)) {

                    image.css({
                        'height': '100%',
                        'width': 'auto',
                        'max-width' : 'initial'
                    });
                }
                else {

                    image.css({
                        'height': '',
                        'width': '',
                        'max-width': ''
                    });
                }
            }
        }
    }

    // SET HEIGHT
    $.fn.venusHeight = function (opts) {
        var $self = $(this),
            defaults = {
                height: 0,
                breakSize : 0,
                offset: 0
            };

        $self.each(function(index, el) {

            var $this = $(this),
                options =  $.extend(defaults, $this.data(), opts);
            var venusHeight = {
                init: function () {
                    var _this = this;
                    _this.calculate();
                    $(window).resize( function () {
                        _this.calculate();
                    })
                },
                calculate: function () {
                    var height = options.height,
                        ww = window.innerWidth,
                        offsets = options.offset,
                        offset = 0;

                    if(height && options.breakSize < ww)  {

                        if(height == "screen") {
                            height = $(window).height();
                        }

                        if(offsets) {
                            offsets = offsets.split(',');
                            for (var i = offsets.length - 1; i >= 0; i--) {
                                var $target = $(offsets[i].trim());
                                if( $target.length ) {
                                    offset = offset + $target.innerHeight();
                                }
                            }
                        }

                        $this.css('min-height', (height - offset) + 'px');
                    } else {
                        $this.css('min-height', '');
                    }
                }
            }
            venusHeight.init();
        });
    }

    // CANVAS BALL
    function canvasBall() {

        $('.bg-canvas').each( function () {
            $(this).piCircleCanvas();
        })
    }

    // SET BACKGROUND
    function setBackground() {
        $('[data-background-image]').each(function(index, el) {

            var $this = $(this), src = $this.attr('data-background-image');

            if(src)  {
                $this.css('background-image', 'url('+src+')');
            }
        });
    }

    // TYPE TEXT BANNER
    function typerText() {
        if ($('.typer').length) {
            $('[data-typer-targets]').typer({
                highlightSpeed    : 20,
                typeSpeed         : 100,
                clearDelay        : 500,
                typeDelay         : 200,
                clearOnHighlight  : true,
                typerDataAttr     : 'data-typer-targets',
                typerInterval     : 2000
            });
        }
    }

    // PROJECT ISOTOP
    function projectIsotope() {
        if($('.project-isotope').length) {
            var $container = $('.project-isotope');

            $container.imagesLoaded( function() { 
                $container.isotope({
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.grid-size'
                    },
                    itemSelector: '.grid-item',
                    percentPosition: true,
                    stamp: '.stamp'
                });
                $container.isotope('layout');
            });

            $(document).on( 'click', '.project-filter a', function() {
                var $this = $(this), filterValue = $this.attr('data-filter');
                $container.isotope({ filter: filterValue });
                $this.closest('ul').find('.active').removeClass('active');
                $this.parent('li').addClass('active');
                if($this.closest('.project-filter')) {
                    $this.closest('.project-filter').find('.filter-label').text($this.text());
                }
                $container.isotope('layout');
                return false;
            });

            
        }
    }

    // SHOW FILTER PORTFOLIO
    function toggleFilterPortfolio() {
        $('.project-filter.filter-3').on('click', function(event) {
            event.preventDefault();

            var $this = $(this);
            if($this.hasClass('active')) {
                $this.removeClass('active');
            } else {
                $this.addClass('active');
            }
        });

        $(document).on('click', function(event) {
            if (!$(event.target).closest('.project-filter.filter-3').length) {
                $('.project-filter.filter-3').removeClass('active');
            }
        });
    }

    // PROJECT FILTER
    function projectFilterMove() {
        if($('#header').length && $('#header').data('has-filter') == true) {
            var $filter = $('#header').find('.project-filter').clone(),
                $wrap = $('.project-wrap'),
                win_w = window.innerWidth;

            if(win_w <= 991) {
                if( !$wrap.find('.project-filter').length ) {
                    $filter.attr('class','project-filter filter-5').css({
                        'margin-top': '70px',
                        'margin-bottom': '30px'
                    });;
                    $wrap.prepend($filter);
                }
            } else if ($wrap.find('.project-filter').length) {
                $wrap.find('.project-filter').remove();
            }
        }
    }

    // DIVIDER
    function setDivider() {
        $('.divider').each(function(index, el) {
            var $this = $(this),
                this_w = $this.attr('data-width'),
                this_h = $this.attr('data-height');

            if(!this_w) {
                this_w = 30;
            }

            if(!this_h) {
                this_h = 2;
            }

            $this.width(this_w).height(this_h);
        });
    }

    // OWLCAROSEL
    function owlCarosel() {

        if ($('.widget-slider').length > 0) {
            $('.widget-slider').owlCarousel({
                autoPlay: false,
                slideSpeed: 300,
                navigation: true,
                pagination: false,
                singleItem: true,
                autoHeight: true,
                navigationText: ['<i class="arrow_triangle-left"></i>', '<i class="arrow_triangle-right"></i>'], 
            });
        }

        if($('.venus-slider').length) {
            $('.venus-slider').owlCarousel({
                autoPlay: false,
                slideSpeed: 300,
                navigation: true,
                pagination: true,
                singleItem: true,
                navigationText: ['', ''], 
                transitionStyle: 'fade'
            });
        }

        if($('.slide-featured').length) {
            $('.slide-featured').owlCarousel({
                autoPlay: false,
                slideSpeed: 300,
                navigation: false,
                pagination: true,
                singleItem: true
            });
        }

        if( $('.clients-slider').length ) {
            $('.clients-slider').owlCarousel({
                items: 5,
                autoPlay: false,
                slideSpeed: 300,
                navigation: false,
                pagination: true,
                addClassActive: true
            });
        }

        if( $('.thumnail-img').length ) {
            $('.thumnail-img').owlCarousel({
                items: 4,
                autoPlay: false,
                slideSpeed: 300,
                navigation: true,
                pagination: false,
                itemsCustom:[[0,3], [320,4], [480,5], [768,4], [992,4], [1200,4]],
                navigationText: ['<i class="arrow_carrot-left"></i>', '<i class="arrow_carrot-right"></i>'], 
            });
        }

        if($('.architecture-slider').length) {
            $('.architecture-slider').owlCarousel({
                autoPlay: false,
                slideSpeed: 300,
                navigation: true,
                pagination: false,
                singleItem: true,
                navigationText: ['<i class="arrow_carrot-left"></i>', '<i class="arrow_carrot-right"></i>'], 
            });
        }

    }

    // TOGGLE FILTER PRODUCRT
    function toggleFilterProduct() {
        $('.shop-filter-icon').on('click', function(event) {

            event.preventDefault();
            
            var $this = $(this),
                $wrap = $this.closest('.shop-filter'),
                $target = $('.shop-filter-widget', $wrap);

            if($wrap.hasClass('active')) {
                $wrap.removeClass('active');
                $target.slideUp();
            } else {
                $wrap.addClass('active');
                $target.slideDown();
            }
        });
    }

    // TOOLTIP
    function setTooltip() {
        $('[data-tooltip]').each(function(index, el) {
            var $this = $(this),
                text = $this.data().tooltip;
            if(typeof text != undefined) {
                $this.append('<span class="pi-tooltip">'+ text +'</span>');
            }
        });
    }

    // REMOVE CART
    function removeCart() {
        $('.cart-mini-content').on('click', '.cart-remove', function(event) {
            event.stopPropagation();
            var $this = $(this);
            $this.closest('li').remove();
        });
    }

    // SHOW CART MINI
    function cartActive() {
        $('.cart-close .icon-cart-close, .cart-mini .cart-icon').on('click',  function(event) {
            event.stopPropagation();
            
            if($('body').hasClass('cart-active')) {
                $('body').removeClass('cart-active');
            } else {
                $('body').addClass('cart-active');
            }
        });

        $(document).on('click', function(event) {
            if (!$(event.target).closest('.cart-mini-wrap').length ) {
                $('body').removeClass('cart-active');
            }
        });
    }

    // SCROLL TOP
    function ScrollTop() {
        $('.scroll-top').on('click', 'span', function(event) {
            event.preventDefault();
            $('body').animate({
                scrollTop: 0,
                }, 500);
        });
    }

    // CART MINI SCROLLBAR
    function cartScrollbar() {
        if($('#cart-mini-content').length) {
            var $cart_mini = $('.cart-mini-wrap'),
                $cart_close = $('.cart-close', $cart_mini),
                $cart_total = $('.cart-mini-total', $cart_mini),
                $cart_btn = $('.group-button', $cart_mini),
                $cart_content = $('#cart-mini-content', $cart_mini),
                window_h = $(window).height(),
                offset = 0, max_height = 0;

            if($cart_close.length) {
                offset += $cart_close.innerHeight();
            }

            if($cart_total.length) {
                offset += $cart_total.innerHeight();
            }

            if($cart_btn.length) {
                offset += $cart_btn.innerHeight();
            }

            max_height = window_h - offset;

            if(max_height < 95) {
                max_height = 95;
            }

            $cart_content.css('max-height', max_height + 'px');

            if(!$cart_content.data('isCallperfectScrollbar')) {
                $cart_content.data('isCallperfectScrollbar', true);
                $cart_content.perfectScrollbar();    
            }
            
        }
    }

    // PRICE SLIDER
    function priceSlider() {
        $('.widgetpriceslider').each(function(index, el) {
            var $this = $(this),
                $slider = $('.price_slider_wrapper', $this),
                $min = $('input[name="min_price"]', $this),
                $max = $('input[name="max_price"]', $this),
                $label_min = $('.from', $this),
                $label_max = $('.to', $this),
                min_value = 50, max_value = 1000, currency = '$';

            if($min.length) {
                min_value = $min.data().min;
                $min.val(min_value);
            }

            if($max.length) {
                max_value = $max.data().max;
                $max.val(max_value);
            }

            if($slider.length) {
                currency = $slider.data().currency;
                $label_min.text(currency + min_value);
                $label_max.text(currency + max_value);

                $slider.slider({
                    min: 0,
                    max: 1000,
                    step: 5,
                    values: [min_value, max_value],
                    range: true,
                    slide: function( event, ui ) {
                        var values = ui.values;
                        $min.val(values[0]);
                        $max.val(values[1]);
                        $label_min.text(currency + values[0]);
                        $label_max.text(currency + values[1]);
                    }
                });
            }

        });
    }

    function inputPlaceholder() {
        var $ph = $('input[type="search"], input[type="text"], input[type="email"], textarea');
        $ph.each(function() {
            var value = $(this).val();
            $(this).focus(function() {
                if ($(this).val() === value) {
                    $(this).val('');
                }
            });
            $(this).blur(function() {
                if ($(this).val() === '') {
                    $(this).val(value);
                }
            });
        });
    }

    // CONTACT MAP
    function contactMaps() {
        $('.venus-map').each(function(index, el) {
            var $this       = $(this),
                center      = $this.data().center,
                location    = $this.data().latlng,
                icon        = $this.data().icon,
                style       = $this.data().style;

                console.log()

            if(typeof center != 'undefined' && center != '') {
                var latLng_center = center.split(',');

                if(latLng_center.length == 2) {
                    var latlng = new google.maps.LatLng(latLng_center[0],latLng_center[1]);

                    var options = {
                        zoom: 16,
                        center: latlng,
                        scrollwheel: false,
                    };

                    var map = new google.maps.Map($this[0], options);

                    if(typeof style != 'undefined' && style !='' ) {
                        map.set('styles', mapstyle[style]);
                    }

                    if(typeof icon != 'undefined' && icon !='') {
                        var marker = new google.maps.Marker({
                            position: latlng,
                            map: map,
                            zIndex: 1,
                            icon: icon
                        });

                        marker.setMap(map);
                    }

                    google.maps.event.addDomListener(window, 'resize', function() {
                        map.setCenter(latlng);
                    });
                }
            }
        });
    }

    // SEARCH BOX
    function searchBox() {
        $('#header').on('click', '.search', function(event) {
            event.preventDefault();
            $('body').addClass('search-box-active');
        });

        $('.search-box').on('click', '.search-box-close', function(event) {
            event.preventDefault();
            $('body').removeClass('search-box-active');
        });
    }

    // MENU STICKY
    function menuSticky() {
        if( $('#header').length && $('#header').hasClass('has-sticky') ) {
            var $this = $('#header'),
                win_scroll = $(window).scrollTop(),
                this_height = $this.outerHeight(true),
                offsets = $this.data().offset,
                offset = this_height;

            if(offsets) {
               offsets = offsets.split(',');
               for (var i = 0; i < offsets.length; i++) {
                    if( $(offsets[i]).length ) {
                        offset += $(offsets[i]).innerHeight();
                    }
               }
            }

            if( win_scroll >= offset ) {
                if( !$this.hasClass('sticky') ) {

                    if( $this.css('position') == 'relative' || $this.css('position') == 'static' ) {
                        $this.before('<div class="clearfix" id="fix-sticky" style="height:'+ this_height +'px"></div>');
                    }

                    $this.addClass('sticky');
                }
            } else {
                $('#fix-sticky').remove();
                $this.removeClass('sticky');
            }
        }
    }

    // MENU MOBILE
    function menuMobile() {
        if( $('#header nav').length ) {
            var win_w = window.innerWidth,
                $menu =  $('#header nav');


            if( win_w <= 991 ) {
                if( $menu.hasClass('menu-nav')) {
                    $menu.removeClass('menu-nav').addClass('menu-mobile-nav');

                    if( !$('#menu-mobile-bar').length ){
                        $('#header .header-content').prepend('<div id="menu-mobile-bar" class="menu-bar"><span class="line"></span><span class="line"></span><span class="line"></span></div>');
                    }

                    $menu.find('.menu').prepend('<li class="menu-mobile-close">Back</li>');
                    $menu.find('li > .sub-menu').parent().find('>a').append('<i class="icon-dropdown"></i>');
                }

            } else if( $menu.hasClass('menu-mobile-nav')) {
                $menu.removeClass('menu-mobile-nav').addClass('menu-nav');
                $('#menu-mobile-bar').remove();
                $('body').removeClass('menu-mobile-active');
                $('.menu-mobile-close, .icon-dropdown', $menu).remove();
            }

            $(document).on('click', '.menu-mobile-nav .icon-dropdown', function(event) {
                event.preventDefault();
                var $this = $(this);
                $this.addClass('active');
            });
            
        }
    }

    function menuMobileClose() {

        $(document).on('click', '.menu-mobile-close', function(event) {
            event.preventDefault();
            $('body').removeClass('menu-mobile-active');
        });
        $(document).on('click', '#menu-mobile-bar', function(event) {
            event.preventDefault();
            if($('.menu-mobile-nav').length) {
                if( $('body').hasClass('menu-mobile-active') ) {
                    $('body').removeClass('menu-mobile-active')
                } else {
                    $('body').addClass('menu-mobile-active')
                }
            }
        });
    }

    // MENU POPUP
    function menuPopup() {
        $('#header').on('click', '#menu-bar-popup', function(event) {
            event.preventDefault();
            $('body').addClass('menu-popup-active');
        });

        $('.menu-popup').on('click', '.popup-menu-close', function(event) {
            event.preventDefault();
            $('body').removeClass('menu-popup-active');
        });
    }

    function menuPopupSubDrop() {
        if( $('.menu-popup-nav .menu').length ) {
            $('.menu-popup-nav .menu').find('.sub-menu').parent('li').find('> a').append('<span class="sub-dropdown"></span>');
            $('.menu-popup-nav .menu').on('click', '.sub-dropdown', function(event) {
                event.preventDefault();

                var $this = $(this);

                if($this.hasClass('active'))
                    $this.removeClass('active'); 
                else
                    $this.addClass('active');

                $this.closest('li').find('> .sub-menu').toggle(300);
            });
        }
    }

    // MENU POPUP SCROLL
    function menuPopupScroll() {
        if( $('.menu-popup .menu-popup-nav').length ) {
            $('.menu-popup .menu-popup-nav').perfectScrollbar({
                suppressScrollX: true
            });
        }

        if( $('.menu-popup .sidebar-menu').length ) {
            $('.menu-popup .sidebar-menu').perfectScrollbar({
                suppressScrollX: true
            });
        }
    }

    // ABOUT SCROLL
    function aboutScroll() {

        if( $('.about-story[data-style="2"] .text').length ) {
            $('.about-story[data-style="2"] .text').perfectScrollbar({
                suppressScrollX: true
            });
        }
    }

    function venusImageCover() {
        $('.project1 .project-item .img, \
            .about2 .content-box .img, \
            .architecture-item .img, \
            .project2 .project-item .img, \
            .product-item .img \
        ').imageCover();
    }

    $(document).ready(function() {
        setBackground();
        typerText();
        setDivider();
        owlCarosel();
        ScrollTop();
        toggleFilterPortfolio();
        removeCart();
        canvasBall();
        cartActive();
        cartScrollbar();
        priceSlider();
        toggleFilterProduct();
        setTooltip();
        contactMaps();
        searchBox();
        menuPopup();
        menuPopupScroll();
        aboutScroll();
        menuMobile();
        menuMobileClose();
        menuPopupSubDrop();
        
        $('.architecture-item, .contact-venus4, .contact-venus2, .venus-canvas, .venus-slider .item-slider, .about2, .page-404').venusHeight();
    });

    $(window).load(function() {
        projectFilterMove();
        projectIsotope();
        venusImageCover();
    });

    $(window).resize(function(event) {
        menuMobile();
        cartScrollbar();
        projectFilterMove();
    });

    $(window).scroll(function(event) {
        menuSticky();
    });
    
})(jQuery);
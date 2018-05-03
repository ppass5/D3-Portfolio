(function($){
	"use strict";

	$.fn.piPortfolioScroll = function (opts) {
		var $self = $(this),
			defaults = {
				duration: 1000,
				easing: 'easeInOutCirc'
			},
			PiPortfolioScroll = {
				$el: $self,
				options: $.extend(defaults, $self.data(), opts),
				$control: $('.pi-portfolio-control', $self),
				$show: $('.pi-portfolio-show', $self),
				$fixHeight: $('.fix-height', $self),
				topStart: $self.offset().top,
				init: function () {
					var _this = this;

					/* Fix height */
					_this.$fixHeight.height(_this.$control.height());

					$('.pi-parallax', _this.$show).each( function () {
						_this.setTransleateY($(this),0);	
					})

					_this.events();

				},
				events: function() {
					var _this = this;

					$(window).scroll( function (event) {
						event.preventDefault();

						_this.fixedControl();

						$('.pi-parallax', _this.$show).each( function () {
							_this.parallax($(this));		
						})
						
						
					});

				},
				fixedControl: function () {
					var _this = this,
						ws = $(window).scrollTop();

					if (ws >= _this.topStart) {
						if (!_this.$el.hasClass('fixed')) {
							_this.$el.addClass('fixed');
						}	
					}
					else {
						if (_this.$el.hasClass('fixed')) {
							_this.$el.removeClass('fixed');
						}
					}
				},
				parallax: function ($el) {
					var _this = this,
						defaults = {
							duration: 1000,
							easing: 'easeOutExpo',
							percent: 100,
						},
						options = $.extend(defaults, $el.data()),
						scrollTop = $(window).scrollTop(),
						start = scrollTop - _this.topStart,
						transform = $el.css('transform'),
						matrix = transform.replace(/[^0-9\-.,]/g, '').split(','),
						currentY =  parseInt(matrix[13] || matrix[5]),
						targetY = -start * options.percent/100,
						delta = targetY - currentY;

					$el.stop().animate({
						prop: 1000
					},
					{
						start: function (object) {
						},
						step: function (now,fx) {
							var positionY; 

							positionY = currentY  + delta * fx.pos;
							_this.setTransleateY($el, positionY);
						},
						progress: function (now,fx) {
							
						},
						complete: function (now, fx) {
							_this.setTransleateY($el,targetY);
						},
						queue : true,
						duration  : options.duration,
						easing : options.easing
					})

				},
				setTransleateY: function ($el, y) {
					var _this = this;

					if (typeof (y) == 'string') {
						$el.css({
							'-webkit-transform': '',
					  		'-moz-transform': '',
					  		'-ms-transform': '',
					  		'-o-transform': '',
					  		'transform': ''
						});
					}
					else {
						y = parseFloat(y);
						$el.css({
							'-webkit-transform': 'translate3d(0, '+ y +'px, 0)',
					  		'-moz-transform': 'translate3d(0, '+ y +'px, 0)',
					  		'-ms-transform': 'translate3d(0, '+ y +'px, 0)',
					  		'-o-transform': 'translate3d(0, '+ y +'px, 0)',
					  		'transform': 'translate3d(0, '+ y +'px, 0)'
						});
					}
				}

			}

		return PiPortfolioScroll.init();
	}

  $.fn.enusScroll = function (opts) {

    var $self = $(this),
        defaults = {
          duration: 1000,
          easing: 'easeOutExpo'
        };

    var EnusScroll = {
      $el: $self,
      options: $.extend(defaults, $self.data(), opts),
      $projectWrap: $('.project-wrap', $self),
      init: function () {

        var _this = this;

        _this.prepare();
        _this.events();
      },

      prepare: function() {

        var _this = this,
            maxHeight = 0;

        _this.$el.css({
          position: 'fixed',
          width: '100%'
        })
        $(window).scrollTop(0);
        /* Setting height for page */
        var $project = $('.section-project'),
            top = $project.offset().top,
            $footer = $('#footer'),
            bottom = $footer.innerHeight(),
            margin = $project.innerHeight() - $project.children().innerHeight(),
            percentFooter = 0,
            percentTop = $('#section-banner ').data('percent');
          if (!percentTop) {
            percentTop = 100;
          }
          else {
           percentTop = parseInt(percentTop); 
          }

        $('.pi-parallax', _this.$projectWrap).each( function() {
          var height = $(this).innerHeight(),
              percent = 100,
              result = 0;
          if ($(this).data('percent') && parseInt($(this).data('percent'))) {
            percent = parseInt($(this).data('percent'));
          }
          result = top * 100 / percentTop + ( height + bottom) * 100/ percent;
          if (result > maxHeight) {
            maxHeight = result;
            percentFooter = percent;
          }
        });
        // maxHeight += margin;
        $footer.attr('data-percent', percentFooter);

        $('body').height(maxHeight);

        $('.pi-parallax', _this.$el).each( function () {
          _this.setTransleateY($(this),0);
        })
      },
      events: function() {
        var _this = this;

        $(window).scroll( function () {

          /*Each scroll children of #page-wrap*/
          //_this.$el.children().each( function () {
          //  _this.enusScoll($(this));
          //});
          $('.pi-parallax', _this.$el).each( function () {
            _this.enusScoll($(this));
          })

        }).trigger('scroll');
      },
      enusScoll: function ($el) {
        var _this = this,
            defaults = {
              duration: 1000,
              easing: 'easeOutExpo',
              percent: 100
            },
            options = $.extend(defaults, $el.data()),
            scrollTop = $(window).scrollTop(),
            start = scrollTop,
            transform = $el.css('transform'),
            matrix = transform.replace(/[^0-9\-.,]/g, '').split(','),
            currentY =  parseInt(matrix[13] || matrix[5]),
            targetY = -start * options.percent/100,
            delta = targetY - currentY;
        $el.stop().animate({
            prop: 1000
          },
          {
            start: function (object) {
            },
            step: function (now,fx) {
              var positionY;

              positionY = currentY  + delta * fx.pos;
              _this.setTransleateY($el, positionY);
            },
            progress: function (now,fx) {

            },
            complete: function (now, fx) {
              _this.setTransleateY($el,targetY);
            },
            queue : true,
            duration  : options.duration,
            easing : options.easing
          })
      },
      setTransleateY: function ($el, y) {
        var _this = this;

        if (typeof (y) == 'string') {
          $el.css({
            '-webkit-transform': '',
            '-moz-transform': '',
            '-ms-transform': '',
            '-o-transform': '',
            'transform': ''
          });
        }
        else {
          y = parseFloat(y);
          $el.css({
            '-webkit-transform': 'translate3d(0, '+ y +'px, 0)',
            '-moz-transform': 'translate3d(0, '+ y +'px, 0)',
            '-ms-transform': 'translate3d(0, '+ y +'px, 0)',
            '-o-transform': 'translate3d(0, '+ y +'px, 0)',
            'transform': 'translate3d(0, '+ y +'px, 0)'
          });
        }
      }
    };

    return EnusScroll.init();
  };

  $(window).load(function () {
    $('#page-wrap').enusScroll();
  })

	
})(jQuery)


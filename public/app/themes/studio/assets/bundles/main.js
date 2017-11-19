(function($) {
	// Quick Search Bedroom Filter
	$('#quick-search ul li a').click(function (event) {
		event.preventDefault();
		$('#quick-search ul li a.selected').removeClass('selected');
		$(this).addClass('selected');
		$('#quick-search--bedroom').val($(this).attr('data-value'));
	});

	$('#quick-search--submit').click(function () {
		$('#quick-search').submit();
	});

	// nav__button
	$('.nav__button').on('click', function() {
		$(this).closest('.nav').toggleClass('open');
		$(this).toggleClass('active');
	});

	// Home page
	if ( $('body').hasClass('page-template-home') ) {

		// scroll-next-section
		$('.scroll-next-section').on('click', function(event) {
			// Make sure this.hash has a value before overriding default behavior
	    	if (this.hash !== "") {
	      		// Prevent default anchor click behavior
				event.preventDefault();

				// Store hash
				var hash = this.hash;

				// Using jQuery's animate() method to add smooth page scroll
				// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
				$('html, body').animate({
					scrollTop: $(hash).offset().top
				}, 800, function(){

					// Add hash (#) to URL when done scrolling (default click behavior)
					window.location.hash = hash;
				});
			} 	// End if
		});

		// verticalSlider
		var verticalSlider = document.getElementById('slider-vertical');
	    var homebg = $('.page-template-home .block-header__thumb');

		noUiSlider.create(verticalSlider, {
			start: 50,
			orientation: 'vertical',
			range: {
				'min': 0,
				'max': 100
			}
		});

		verticalSlider.noUiSlider.on('slide', setBgPosition);

		// setBgPosition
		function setBgPosition() {
			// Get the slider values,
			// stick them together.
			var position = verticalSlider.noUiSlider.get();
			console.log(position);

			// Set position bg.
			homebg.css('background-position', 'center ' + position + '%');
		};

		// init controller
		var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 500}});

		// get all life__item
		var life__items = document.querySelectorAll(".block-general__item");

		// create scene for every life__item
		for (var i=0; i<life__items.length; i++) {
			new ScrollMagic.Scene({
					triggerElement: life__items[i]
				})
				.setClassToggle(life__items[i], "is-visible")
				// .addIndicators() // add indicators (requires plugin)
				.addTo(controller);
		}

	} else {
		// Internal page
		// scroll-next-section
		$('.scroll-next-section').on('click', function(event) {
			// Make sure this.hash has a value before overriding default behavior
	    	if (this.hash !== "") {
	      		// Prevent default anchor click behavior
				event.preventDefault();

				// Store hash
				var toDiv = $('.quick-search').next();

				// Using jQuery's animate() method to add smooth page scroll
				// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
				$('html, body').animate({
					scrollTop: $(toDiv).offset().top
				}, 800);
			} 	// End if
		});

		// scroll-content-block
		$('.scroll-content-block').on('click', function(event) {
			// Make sure this.hash has a value before overriding default behavior
	    	if (this.hash !== "") {
	      		// Prevent default anchor click behavior
				event.preventDefault();

				// Store hash
				var hash = this.hash;

				// Using jQuery's animate() method to add smooth page scroll
				// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
				$('html, body').animate({
					scrollTop: $(hash).offset().top
				}, 800, function(){

					// Add hash (#) to URL when done scrolling (default click behavior)
					window.location.hash = hash;
				});
			} 	// End if
		});

		$("#datepicker").datepicker({
			months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			monthsShort: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		}); 

		$('#apartment-type').select2({
		  placeholder: 'Apartment Type',
		  minimumResultsForSearch: -1
		}); 

		$('#price-range').select2({
		  placeholder: 'Price Range',
		  minimumResultsForSearch: -1
		}); 

		$('#contact-me').select2({
		  placeholder: 'Contact Me',
		  minimumResultsForSearch: -1
		}); 

		$(".wpcf7-form-control-wrap").hover(function(){
			$(this).find(".wpcf7-not-valid-tip").hide(400);
		}, function(){});

		$(".redirect-submit").click(function(e){
			e.preventDefault();
			var go = $(".go-address").val();
			var come = $(".come-address").val();
			var url = 'https://www.google.com/maps/dir/'+go+'/'+come;
			if(go){
				window.open(url, '_blank');
			}	
		});
			
	    //Flex Slider
	    $('.gallery-slider').slick({
	        dots: false,
	        infinite: false,
	        speed: 300,
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-caret-left' aria-hidden='true'></i></button>",
	        nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-caret-right' aria-hidden='true'></i></button>"
	    });

	    // slider scroll
        if ( $('.is-scroll').length ) {
            $('.is-scroll').each(function () {
                // scrollSlider
                var scrollSlider = $(this).find('[data-scroll]').children('.slider-scroll').get(0);
                var ulContainer = $(this).find('[data-content]').children('ul');
                var heightUl = ulContainer.outerHeight();
                var heightParent = $(this).find('[data-content]').outerHeight();

                if ( heightUl >= heightParent ) {
                    noUiSlider.create(scrollSlider, {
                        start: 0,
                        orientation: 'vertical',
                        range: {
                            'min': 0,
                            'max': (heightUl - heightParent) + 30
                        }
                    });

                    scrollSlider.noUiSlider.on('slide', setPosition);

                    // setBgPosition
                    function setPosition() {
                        // Get the slider values,
                        // stick them together.
                        var position = scrollSlider.noUiSlider.get();

                        // Set position bg.
                        ulContainer.css('top', - position + 'px');
                    };
                } else {
                    $(this).find('[data-scroll]').hide();
                }
            });
        }

        // slider image scroll
        if ( $('.is-scroll-image').length ) {
            $('.is-scroll-image').each(function () {
                // scrollSlider
                var scrollSlider = $(this).find('[data-scroll-image]').children('.slider-scroll-image').get(0);
                var img = $(this).find('[data-content-image]').children('img');
                var widthtParent = $(this).find('[data-content-image]').width();
                var heightImg = img.height();
                var widthImg = img.width();

                if ( heightImg*widthtParent == widthImg*450 ) {
                	$(this).find('[data-scroll-image]').hide();
                }

                if ( heightImg*widthtParent > widthImg*450 ) {
                	img.addClass('w-100');
                	var newHeight = heightImg*widthtParent/widthImg;

                	img.css('margin-top', -((newHeight - 450)/2));

                	if ( (newHeight - 450)/2 > 10 ) {
                		noUiSlider.create(scrollSlider, {
	                        start: 0,
	                        direction: 'rtl',
	                        orientation: 'vertical',
	                        range: {
	                            'min': -((newHeight - 450)/2),
	                            'max': (newHeight - 450)/2
	                        }
	                    });

	                    scrollSlider.noUiSlider.on('slide', setTranslate);

	                    // setBgPosition
	                    function setTranslate() {
	                        // Get the slider values,
	                        // stick them together.
	                        var position = scrollSlider.noUiSlider.get();

	                        // Set position bg.
	                        img.css({
						    	"-webkit-transform":"translate(0,"+ position +"px)",
						    	"-ms-transform":"translate(0,"+ position +"px)",
						    	"transform":"translate(0,"+ position +"px)"
						  	});
	                    };
                	} else {
                		$(this).find('[data-scroll-image]').hide();
                	}

	                    
                } else {
                	img.addClass('h-100');
                	var newWidth = widthImg*450/heightImg;
                    $(this).find('[data-scroll-image]').removeClass('wrap-vertical').addClass('wrap-horizontal');

                	img.css('margin-left', -((newWidth - widthtParent)/2));

                	if ( (newWidth - widthtParent)/2 > 10 ) {
                		noUiSlider.create(scrollSlider, {
	                        start: 0,
	                        direction: 'rtl',
	                        range: {
	                            'min': -((newWidth - widthtParent)/2),
	                            'max': (newWidth - widthtParent)/2
	                        }
	                    });

	                    scrollSlider.noUiSlider.on('slide', setTranslate);

	                    // setBgPosition
	                    function setTranslate() {
	                        // Get the slider values,
	                        // stick them together.
	                        var position = scrollSlider.noUiSlider.get();

	                        // Set position bg.
	                        img.css({
						    	"-webkit-transform":"translate("+ position +"px, 0)",
						    	"-ms-transform":"translate("+ position +"px, 0)",
						    	"transform":"translate("+ position +"px, 0)",
						  	});
	                    };
                	} else {
                		$(this).find('[data-scroll-image]').hide();
                	}
                }
            });
        }
	}

})(jQuery);
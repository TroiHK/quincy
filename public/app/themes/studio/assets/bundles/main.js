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

	// nav__button
	$('.nav__button').on('click', function() {
		$(this).closest('.nav').toggleClass('open');
		$(this).toggleClass('active');
	});

	// Home page
	if ( $('body').hasClass('home') ) {

		// verticalSlider
		var verticalSlider = document.getElementById('slider-vertical');
	    var homebg = $('.home .block-header__thumb');

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
		var life__items = document.querySelectorAll(".block-life__item");

		// create scene for every life__item
		for (var i=0; i<life__items.length; i++) {
			new ScrollMagic.Scene({
					triggerElement: life__items[i]
				})
				.setClassToggle(life__items[i], "is-visible")
				// .addIndicators() // add indicators (requires plugin)
				.addTo(controller);
		}

	}

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

})(jQuery);
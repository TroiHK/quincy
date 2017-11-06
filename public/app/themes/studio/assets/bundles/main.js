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

	// Home page
	if ( $('body').hasClass('home') ) {

		// verticalSlider
		var verticalSlider = document.getElementById('slider-vertical');
	    var homebg = $('.home .block-banner__thumb');

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

	};

})(jQuery);
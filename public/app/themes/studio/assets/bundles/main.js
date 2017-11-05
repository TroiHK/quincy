(function($) {
	// Quick Search Bedroom Filter
	$('#quick-search ul li a').click(function (event) {
		event.preventDefault()
		$('#quick-search ul li a.selected').removeClass('selected')
		$(this).addClass('selected')
		$('#quick-search--bedroom').val($(this).attr('data-value'))
	});

	$('#quick-search--submit').click(function () {
		$('#quick-search').submit() 
	});

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

})(jQuery);
(function($) {

	// nav__button
	$('.nav__button').on('click', function() {
		$(this).closest('.nav').toggleClass('open');
		$(this).toggleClass('active');
	});

	// sightmap
	// $('.sightmap a').addClass('fancybox').attr({ 'data-type':'iframe', 'data-fancybox' : '', 'data-src' : sightmap_url });

	$(document).ready(function() {

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
					var scrollMB = $(window).width() < 850 ? 50 : 0;
					$('html, body').animate({
						scrollTop: $(hash).offset().top - scrollMB
					}, 800, function(){

						// Add hash (#) to URL when done scrolling (default click behavior)
						window.location.hash = hash;
					});
				} 	// End if
				return false;
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
					var scrollMB = $(window).width() < 850 ? 50 : 0;
					$('html, body').animate({
						scrollTop: $(toDiv).offset().top - scrollMB
					}, 800);
				} 	// End if
				return false;
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
					var scrollMB = $(window).width() < 850 ? 50 : 0;
					$('html, body').animate({
						scrollTop: $(hash).offset().top - scrollMB
					}, 800, function(){

						// Add hash (#) to URL when done scrolling (default click behavior)
						// window.location.hash = hash;
					});
					return false;
				} 	// End if

			});

			// contact page
			$("#datepicker").datepicker({
				months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				monthsShort: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			}).on("change", function (e) {
				$(this).datepicker('hide');
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

			// get-dir
			$('.get-dir input[type=submit]').click(function(event) {
				event.preventDefault();
				var myDir = $(this).attr('data-address').replace(/[\,\s]+/g, '+');
				myDir = myDir.replace(/[\+]+/g, '+');

				var yourDir = $(this).closest('form').find('input[type=text]').val().replace(/[\,\s]+/g, '+');
				// yourDir = yourDir.replace(/[\+]+/g, '+');
				yourDir = yourDir.replace(/[^\w\s]/gi, '+')

				var win = window.open('https://www.google.com/maps/dir/' + yourDir + '/' + myDir, '_blank');
				win.focus();

				return false;
			});

			// floorplan page
			// 
			$('#fp-filters--bedrooms').select2({
			  	minimumResultsForSearch: -1
			});

			$('#fp-filters--price').select2({
			  	minimumResultsForSearch: -1
			});

			// scroll to top
			$(".back-to-top a").click(function() {
				$("html, body").animate({ scrollTop: 0 }, "slow");
				return false;
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

		    // stacktable
		    $('.list-available table').stacktable();
		    $('.stacktable.small-only .apply-row').each(function(){
				var buttonSelect = $(this).clone();
				$(this).closest('tr').find('.st-key').append(buttonSelect);
			});
			$('.stacktable.small-only .viewlocation-row').each(function(){
				var buttonView = $(this).clone();
				$(this).closest('tr').prev().find('.st-val').empty().append(buttonView);
				$(this).closest('tr').remove();
			});

		}

	});
	
	// loaded
	$(window).on('load', function(){
		if ( !$('body').hasClass('page-template-home') ) {

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

	        // init Isotope
			var $grid = $('.residences__container').isotope({
				itemSelector: '.residences__item',
				layoutMode: 'fitRows',
				getSortData: {
					name: '.name',
					symbol: '.symbol',
					number: '.number parseInt',
					category: '[data-category]',
					weight: function( itemElem ) {
						var weight = $( itemElem ).find('.weight').text();
						return parseFloat( weight.replace( /[\(\)]/g, '') );
					}
				}
			});

			// filter
			function goFilter($this) {

				var filter = '';
				$('.residences__filters select,.residences__filters input').each(function() {

					var value = $(this).val();
					if ($(this).attr('data-reset')) {
						value = '';
					}
					var bed = $(this).attr('filter-bed');

					if ( $(this).hasClass('datepicker') ) {

						if (value) {
							var filtered_date = value.replace(/\//g, '-');
							filter += ('.date-' + filtered_date);

							dateFilter(filtered_date);
						}

					} else {
						if (value) {

							filter += ('.' + value);
						}	
						if (bed) {

							filter += ('.' + bed);
						}				
					}

				});

				if (filter) {
					window.location = "#" + filter;
				} else {
					history.pushState("", document.title, window.location.pathname);
				}

				filter = filter ? filter : '*';

				$grid.isotope({ filter: filter });
				showNoResultsMessage($grid);

			}

			function dateFilter(filtered_date) {

				var parts_filtered = filtered_date.split('-');
				var filtered_date_obj = new Date( parts_filtered[2], parseInt(parts_filtered[0]) - 1, parts_filtered[1] );

				$('.residences__container .residences__item').each(function() {

					var parts = $(this).attr('data-date').split('-');
					var item_date = new Date( parts[2], parseInt(parts[0]) - 1, parts[1] );

					if (item_date.getTime() <= filtered_date_obj.getTime()) {

						$(this).addClass('date-' + filtered_date);

					}
				});

				$('.residences__container .residences__item.now').addClass('date-' + filtered_date);
			}

			
			function showNoResultsMessage($container) {

				$container.each(function() {
					var filteredData = $(this).data('isotope');
					$(this).next('.filters-orig-message').fadeOut();
					
					if (! filteredData.filteredItems.length ) {
						$(this).next('.filters-orig-message').fadeIn();
					}
				});
			}

			$('.residences__filters select').on('change', function() {
				goFilter($(this));
			});
			
			$('.datepicker').datepicker({
				startDate: new Date(),
				autoclose: true,
				todayHighlight: true,
			}).attr('readonly', 'readonly').on("change", function (e) {
				$(this).datepicker('hide');
			
				if ( $('.apartment-date').length ) {
					$(this).attr('data-reset','');
					goFilter($(this));
				}
			});

			$( ".datepicker" ).click(function(){
				$(this).attr('data-reset','reset-date').val('');
				goFilter($(this));
			});

			if ( $('body').hasClass('page-template-floorplans') ) {

				// Function to get hash from URL
				var filter = window.location.hash;
				if ( filter ) {
					filter = filter.replace("#.", "");

					var vars = filter.split(".");
					for (var i=0;i<vars.length;i++) {
						console.log(vars[i]);
						n = vars[i].search("bed");
						console.log(n);
						if ( n ) {
							$("#fp-filters--bedrooms").val(vars[i]).trigger('change');
							return false;
						}
					}
				}

			}

		}
 	});
		
	document.addEventListener( 'wpcf7mailsent', function() {
		$('.contact__page--left .wpcf7').hide();
	    $('.contact__page--left .content-thanks').show();
	}, false );

})(jQuery);
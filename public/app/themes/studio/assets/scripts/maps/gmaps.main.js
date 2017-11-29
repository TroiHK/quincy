if (typeof google !== 'undefined' && typeof GMaps !== 'undefined') {
    // if neighborhood page
    if (typeof location_categories !== 'undefined') {
        $(function() {
            var map;

            var settings = gmaps_config.settings.neighborhood();
            settings.div = gmaps_config.maps.neighborhood;
            settings.lat = properties[0].latitude;
            settings.lng = properties[0].longitude;

            map = new GMaps(settings);

            /* Set up the Google Maps styles */
            var styles = gmaps_config.styles.neighborhood;

            map.addStyle({
                styledMapName: 'Styled Map',
                styles: styles,
                mapTypeId: 'map_style'
            });

            map.setStyle('map_style');
            /* Properties Markers */
            for (var key in properties) {
                var property = properties[key];
                map.addMarker({
                    lat: property.latitude,
                    lng: property.longitude,
                    title: property.name,
                    optimized: !1,
                    icon: gmaps_config.markers.properties[key].neighborhood,
                    click: function() {
                        map.hideInfoWindows();
                    },
                    infoWindow: {
                        content: gmaps_config.info_windows.property.neighborhood(property)
                    },
                    draggable: false,
                    animation: google.maps.Animation.DROP
                });
            }

            /* Add the location links */
            GMaps.on('marker_added', map, function(marker) {
                var index = map.markers.indexOf(marker);
                $('#' + gmaps_config.locations_container.id + marker.details.category).append(gmaps_config.locations_container.item.template(marker, index));
            });

            var markers_data = [];
            for (var category in location_categories) {
                var locations = location_categories[category].links.locations;
                var visible = (category === '0');
                if (locations.length > 0) {
                    for (var location in locations) {
                        /* Tells jshint to not worry about */
                        /* the function in the click event */
                        /* jshint loopfunc: true */

                        location = locations[location];
                        if (location.latitude !== undefined && location.longitude !== undefined) {
                            markers_data.push({
                                lat: location.latitude,
                                lng: location.longitude,
                                title: location.name,
                                optimized: !1,
                                icon: gmaps_config.markers.location_categories[category],
                                click: function() {
                                    map.hideInfoWindows();
                                },
                                visible: visible,
                                details: {
                                    category: category,
                                    address: location.address,
                                    city: location.city,
                                    state: location.state,
                                    zip: location.zip,
                                    phone: location.phone,
                                    url: location.url
                                },
                                infoWindow: {
                                    content: gmaps_config.info_windows.location.neighborhood(location),
                                },
                                draggable: false,
                                animation: google.maps.Animation.DROP,
                            });
                        }
                    }
                }
                $('#' + gmaps_config.locations_container.id + category).empty();
            }
            map.addMarkers(markers_data);

            /* Fit all of the visible markers in a map */
            map.fitZoom();
            $('.' + gmaps_config.locations_container.parent_class).not(':first').hide();
            $('.' + gmaps_config.location_category.class + ':first').addClass(gmaps_config.location_category.selected_class);

            // scroll bar custom
            setTimeout(function(){ 
                if ( jQuery('#content0.is-scroll').length ) {
                    jQuery('#content0.is-scroll').each(function () {
                        // scrollSlider
                        var scrollSlider = jQuery(this).find('[data-scroll]').children('.slider-scroll').get(0);
                        var ulContainer = jQuery(this).find('[data-content]').children('ul');
                        var heightUl = ulContainer.outerHeight();
                        var heightParent = jQuery(this).find('[data-content]').outerHeight();

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
                            jQuery(this).find('[data-scroll]').show();
                            jQuery(this).addClass('install')
                        } else {
                            jQuery(this).find('[data-scroll]').hide();
                        }
                    });
                }
            }, 500);

            if (gmaps_config.tinyscrollbar.use) {
              tinyscrollbar();
            }

            /* Category select */
            $('.' + gmaps_config.location_category.class + ' a').click(function(event) {
                event.preventDefault();

                $('.' + gmaps_config.location_category.selected_class + '.' + gmaps_config.location_category.class).removeClass(gmaps_config.location_category.selected_class);
                $(this).parent().addClass(gmaps_config.location_category.selected_class);

                var category = parseInt($(this).attr('data-category'));

                var show = [];
                // Properties' markers
                for (var i = 0; i < properties.length; i++) {
                    show[i] = true;
                }

                $('#' + gmaps_config.locations_container.id + category + ' span').each(function() {
                    var index = parseInt($(this).attr('data-marker-index'));
                    show[index] = true;
                });

                map.hideInfoWindows();

                for (var key in map.markers) {
                    if (show[key]) {
                        map.markers[key].setVisible(true);
                    } else {
                        map.markers[key].setVisible(false);
                    }
                }

                $('.' + gmaps_config.locations_container.parent_class).not('#' + gmaps_config.locations_container.parent_id + category).hide();
                $('#' + gmaps_config.locations_container.parent_id + category).fadeIn(400, function() {
                    /* Fit all of the visible markers in a map */
                    map.fitZoom();
                    map.refresh();

                    if (gmaps_config.tinyscrollbar.use) {
                      tinyscrollbar();
                    }
                });

                console.log('#' + gmaps_config.locations_container.parent_id + category);

                // scroll bar custom
                setTimeout(function(){ 
                    if ( jQuery('#' + gmaps_config.locations_container.parent_id + category + '.is-scroll:not(.install)').length ) {
                        jQuery('#' + gmaps_config.locations_container.parent_id + category + '.is-scroll:not(.install)').each(function () {
                            // scrollSlider
                            var scrollSlider = jQuery(this).find('[data-scroll]').children('.slider-scroll').get(0);
                            var ulContainer = jQuery(this).find('[data-content]').children('ul');
                            var heightUl = ulContainer.outerHeight();
                            var heightParent = jQuery(this).find('[data-content]').outerHeight();

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
                                jQuery(this).find('[data-scroll]').show();
                                jQuery(this).addClass('install');
                            } else {
                                jQuery(this).find('[data-scroll]').hide();
                            }
                        });
                    }
                }, 500);
                
            });

            /* Location link to marker */
            $(gmaps_config.locations_container.item.selector).click(function(event) {
                event.preventDefault();
                var position, lat, lng, $index;
                $index = $(this).data('marker-index');
                $(this).closest('.neighborhood-list').find('span').removeClass('active');
                $(this).addClass('active');

                map.hideInfoWindows();
                /* Open the infoWindow */
                (map.markers[$index].infoWindow).open(map.map, map.markers[$index]);

                position = map.markers[$index].getPosition();
                lat = position.lat();
                lng = position.lng();
                map.setCenter(lat, lng);
            });

            /*
             * Only need if using tinyscrollbar
             *
             */
            function tinyscrollbar() {
                var showCategory = $('.' + gmaps_config.location_category.selected_class + '.' + gmaps_config.location_category.class + ' a').attr('data-category');

                // Set up scroll bar for category:
                $('#' + gmaps_config.tinyscrollbar.id + showCategory).tinyscrollbar();
            }

        });

        if ($(gmaps_config.maps.contact).length !== 0) {
            $(function() {
                var map;

                var settings = gmaps_config.settings.contact();
                settings.div = gmaps_config.maps.contact;
                settings.lat = properties[0].latitude;
                settings.lng = properties[0].longitude;

                map = new GMaps(settings);

                /* Set up the Google Maps styles */
                var styles = gmaps_config.styles.contact;

                map.addStyle({
                    styledMapName: 'Styled Map',
                    styles: styles,
                    mapTypeId: 'map_style'
                });

                map.setStyle('map_style');

                for (var key in properties) {
                    var property = properties[key];
                    map.addMarker({
                        lat: property.latitude,
                        lng: property.longitude,
                        title: property.name,
                        optimized: !1,
                        icon: gmaps_config.markers.properties[key].contact,
                        click: function() {
                            map.hideInfoWindows();
                        },
                        infoWindow: {
                            content: gmaps_config.info_windows.property.contact(property)
                        },
                        draggable: false,
                        animation: google.maps.Animation.DROP
                    });
                }
            });
        }
    } else { // contact page
        if ($(gmaps_config.maps.contact).length !== 0) {
            $(function() {
                var map;

                var settings = gmaps_config.settings.contact();
                settings.div = gmaps_config.maps.contact;
                settings.lat = properties[0].latitude;
                settings.lng = properties[0].longitude;

                map = new GMaps(settings);

                /* Set up the Google Maps styles */
                var styles = gmaps_config.styles.contact;

                map.addStyle({
                    styledMapName: 'Styled Map',
                    styles: styles,
                    mapTypeId: 'map_style'
                });

                map.setStyle('map_style');

                for (var key in properties) {
                    var property = properties[key];
                    map.addMarker({
                        lat: property.latitude,
                        lng: property.longitude,
                        title: property.name,
                        optimized: !1,
                        icon: gmaps_config.markers.properties[key].contact,
                        click: function() {
                            map.hideInfoWindows();
                        },
                        infoWindow: {
                            content: gmaps_config.info_windows.property.contact(property)
                        },
                        draggable: false,
                        animation: google.maps.Animation.DROP
                    });
                }
            });
        }

    }
}

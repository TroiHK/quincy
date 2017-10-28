/**
 * Configure values unique to your gmaps
 *
 * @author Patrick Douglas <patrick@engrain.com>
 */

var gmaps_config = {
    tinyscrollbar: {
        use: false,
        id: 'scrollbar'
    },

    info_windows: {
        property: {
            neighborhood: function (property) {
                return '' +
                '<div class="info_window">' +
                    '<p>' +
                        '<strong>' + property.name + '</strong>' +
                        '<br/>' +
                        property.address +
                        '<br />' +
                        property.city + ', ' + property.state + ' ' + property.zip +
                    '</p>' +
                '</div>';
            },
            contact: function (property) {
                return '' +
                '<div class="info_window">' +
                    '<p>' +
                        '<strong>' + property.name + '</strong>' +
                        '<br/>' +
                        property.address +
                        '<br />' +
                        property.city + ', ' + property.state + ' ' + property.zip +
                    '</p>' +
                '</div>';
            }
        },
        location: {
            neighborhood: function (location) {
                return '' +
                '<div class="info_window">' +
                    '<p>' +
                        '<strong>'+location.name+'</strong>' +
                        '<br/>' +
                        location.address +
                        '<br/>' +
                        location.city + ', ' + location.state + ' ' + location.zip +
                        '<br />' +
                        location.phone +
                        '<br />' +
                        '<a class="location-url" target="_blank" href="http://'+location.url+'">' +
                            location.url +
                        '</a>' +
                    '</p>' +
                '</div>';
            }
        }
    },

    location_category: {
        class: 'category',
        selected_class: 'selected'
    },

    locations_container: {
        parent_class: 'neighborhood-list-wrap',
        parent_id: 'content',
        class: 'neighborhood-list',
        id: 'results',
        item: {
            selector: '.pan-to-marker',
            template: function (marker, index) {
                var address = phone = link = city = state = zip = '';

                if (marker.details.address !== '') {
                    address = marker.details.address;
                }

                if (marker.details.phone !== '') {
                    phone = marker.details.phone;
                }

                if (marker.details.city !== '') {
                    city = marker.details.city;
                }

                if (marker.details.state !== '') {
                    state = marker.details.state;
                }

                if (marker.details.zip !== '') {
                    zip = marker.details.zip;
                }

                if (marker.details.url !== '') {
                    var prefix = 'http://';
                    var url = marker.details.url;
                    if (marker.details.url.substr(0, prefix.length) !== prefix) {
                        url = prefix + marker.details.url;
                    }
                    link = '<a href="' + url + '" target="_blank">' + marker.details.url + '</a>';
                }

                return '' +
                '<li>' +
                    '<a href="#" class="pan-to-marker" data-marker-index="' + index + '">' +
                        marker.title + '<br/>' +
                        address + '<br/>' +
                        city + ', ' + state + ' ' + zip + '<br/>' +
                        phone + '<br/>' +
                    '</a>' +
                '</li>';
            }
        }
    },

    settings: {
        neighborhood: function () {
            return {
                zoom: 15,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                },
                disableDefaultUI: true,
                scrollwheel: false,
                streetViewControl: true,
                scaleControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        },
        contact: function () {
            return {
                zoom: 15,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.BOTTOM_CENTER
                },
                disableDefaultUI: true,
                scrollwheel: false,
                streetViewControl: true,
                scaleControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        }
    },

    maps: {
        neighborhood: '#map-area',
        contact: '#map-contact'
    },

    markers: {
        location_categories: [
            {
                size: new google.maps.Size(50, 50),
                url: site_url + '/assets/images/icons/location.png'
            },
            {
                size: new google.maps.Size(50, 50),
                url: site_url + '/assets/images/icons/location.png'
            },
            {
                size: new google.maps.Size(50, 50),
                url: site_url + '/assets/images/icons/location.png'
            },
            {
                size: new google.maps.Size(50, 50),
                url: site_url + '/assets/images/icons/location.png'
            },
            {
                size: new google.maps.Size(50, 50),
                url: site_url + '/assets/images/icons/location.png'
            }
        ],
        properties: [
            {
                neighborhood: {
                    url: site_url + '/assets/images/icons/location.png',
                    size: new google.maps.Size(50, 50)
                },
                contact: {
                    url: site_url + '/assets/images/icons/location.png',
                    size: new google.maps.Size(50, 50)
                }
            }
        ]
    },

    /**
     * Google Maps Styles
     *
     * @type {Object}
     */
    styles: {
        neighborhood: [
            {
                "stylers": [
                    { "saturation": -100 }
                ]
            }
        ],
        contact: [
            {
                "stylers": [
                    { "saturation": -100 }
                ]
            }
        ]
    }
};

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

                $('#' + gmaps_config.locations_container.id + category + ' a').each(function() {
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
            });

            /* Location link to marker */
            $(gmaps_config.locations_container.item.selector).click(function(event) {
                event.preventDefault();
                var position, lat, lng, $index;
                $index = $(this).data('marker-index');

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

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
                    url: site_url + '/assets/svg/sources/location.svg',
                    size: new google.maps.Size(66, 84)
                },
                contact: {
                    url: site_url + '/assets/svg/sources/location.svg',
                    size: new google.maps.Size(66, 84)
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
        neighborhood: google_map_styler,
        contact: google_map_styler
    }
};

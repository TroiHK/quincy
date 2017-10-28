if (typeof floorplans !== 'undefined') {
    $(function() {
        loadFilterEvents(floorplans, config);
        filterFloorplans(floorplans, config);
    });
}

/**
 * Loops through each filter and creates the events for each depending on the
 * type of the filter set in the config
 *
 * @param {Object} config  Payload object for each sitemap
 */
function loadFilterEvents(floorplans, config) {
    for (var key in config.filters) {
        var current_filter = config.filters[key];
        if (current_filter.type === 'list') {
            listFilterClickEvent(current_filter.list_id, floorplans, config);
        } else if (current_filter.type === 'select') {
            selectFilterChangeEvent(current_filter.select_id, floorplans, config);
        } else if (current_filter.type === 'slider') {
            sliderFilterSlideEvent(current_filter, floorplans, config);
        } else if (current_filter.type === 'input') {
            inputFilterChangeEvent(current_filter.input_id, floorplans, config);
        }
    }
}

/**
 * Creates
 *
 * @param {Object} filter   Describes what the selectors to use for the slider
 *                          and it's input field
 * @param {Object} floorplans  Payload object for each sitemap
 */
function sliderFilterSlideEvent(filter, floorplans, config) {
    var range = {
        min: 9999999999999,
        max: 0
    };
    if (typeof filter.min === 'undefined' || typeof filter.max === 'undefined') {
        // Generates the min and max based on the available units
        for (var key in floorplans) {
            var floorplan = floorplans[key];
            for (var unit_key in floorplan.links.units) {
                var unit = floorplan.links.units[unit_key];
                var field_value = parseInt(unit[filter.field_to_filter_on]);
                if (typeof filter.min === 'undefined') {
                    if (field_value < range.min) {
                        range.min = field_value;
                    }
                } else {
                    range.min = filter.min;
                }
                if (typeof filter.max === 'undefined') {
                    if (field_value > range.max) {
                        range.max = field_value;
                    }
                } else {
                    range.max = filter.max;
                }
            }
        }
    } else {
        range.min = filter.min;
        range.max = filter.max;
    }
    range.min = parseInt(range.min);
    range.max = parseInt(range.max);

    // if no values set in the input (ie. the first sitemap to run through):
    if ($(filter.input_id).val() === '') {
        // Set default slider values:
        var initial_min = filter.format.before + range.min + filter.format.after;
        var initial_max = filter.format.before + range.max + filter.format.after;
        $(filter.input_id).val(initial_min + ' ' + filter.format.split + ' ' + initial_max);
    }

    // Initialize slider if not already initialized

    if (!$(filter.input_id).data('ui-slider-handle-index')) {
        $(filter.slider_id).slider({
            range: true,
            min: range.min,
            max: range.max,
            values: [range.min, range.max],
            /**
             * Changes the input field based on the values from the slider
             *
             * @param {Object} event    The details of the slide event
             * @param {Object} ui       Data from the slide
             * @return
             */
            slide: function(event, ui) {
                var slider_min = filter.format.before + ui.values[0] + filter.format.after;
                var slider_max = filter.format.before + ui.values[1] + filter.format.after;
                $(filter.input_id).val(slider_min + ' ' + filter.format.split + ' ' + slider_max);
            }
        });
    }

    // Apply all filters once the user stops sliding the slider

    $(filter.slider_id).on('slidestop', function(event, ui) {
        filterFloorplans(floorplans, config);
    });
}

/**
 * Description
 *
 * @param {} selector
 * @param {Object} floorplans - Payload object for each sitemap
 */
function selectFilterChangeEvent(selector, floorplans, config) {
    $(selector).change(function() {
        filterFloorplans(floorplans, config);
    });
}

/**
 * Description
 *
 * @param {} selector
 * @param {Object} floorplans - Payload object for each sitemap
 */
function listFilterClickEvent(selector, floorplans, config) {
    $(selector + ' li a').click(function(event) {
        event.preventDefault();

        // figure out what filter we are dealing with
        var filter_id = $(this).parent('li').parent('ul').attr('id');
        var current_filter = [];
        for (var key in config.filters) {
            var loop_filter = config.filters[key];
            if (loop_filter.list_id == '#' + filter_id) {
                current_filter = loop_filter;
                break;
            }
        }

        if (current_filter !== []) {
            // toggle the selected class
            $(current_filter.list_id + ' li.' +
                    current_filter.selected_class)
                .removeClass(current_filter.selected_class);
            $(this)
                .parent()
                .addClass(current_filter.selected_class);

            filterFloorplans(floorplans, config);
        } else {
            console.log('filter not found');
        }

    });
}

/**
 * Description
 *
 * @param {} selector
 * @param {Object} floorplans - Payload object for each sitemap
 */
function inputFilterChangeEvent(selector, floorplans, config) {
    $(selector).change(function() {
        filterFloorplans(floorplans, config);
    });
}

/**
 * Description
 *
 * @param {Object} payload - Payload object for each sitemap
 * @return filters
 */
function getFilters(config) {
    var filters = [];

    if (config.filters.building.type !== null) {
        filters.building = getCurrentBuilding(config);
    }

    for (var key in config.filters) {
        var filter = config.filters[key];
        if (filter.type === 'list') {
            filters[key] = $(filter.list_id + ' li.' + filter.selected_class + ' a').attr('data-value');
        } else if (filter.type === 'select') {
            filters[key] = $(filter.select_id).val();
        } else if (filter.type === 'slider') {
            var value = $(filter.input_id).val();
            var range = value.match(/(\d+)/g);

            filters[key] = [];
            filters[key].length = 2;
            filters[key].min = parseInt(range[0]);
            if (isNaN(filters[key].min)) {
                filters[key].min = filter.min;
            }
            filters[key].max = parseInt(range[1]);
            if (isNaN(filters[key].max)) {
                filters[key].min = filter.max;
            }
        } else if (filter.type === 'input') {
            filters[key] = $(filter.input_id).val();
        }
    }

    if (typeof config.filters.moveindate !== 'undefined') {
        var max = filters.moveindate;

        filters.moveindate = [];

        var min_date = new Date();
        min_date.setDate(min_date.getDate() + config.filters.moveindate
            .min);
        min_date.setHours(0);
        min_date.setMinutes(0);
        min_date.setSeconds(0);
        min_date.setMilliseconds(0);

        var max_date;
        if (max === 'false' || max === '') {
            max = config.filters.moveindate.max;
        } else if (config.filters.moveindate.type == 'input') {
            max_date = new Date(max);
        }

        if (max_date === undefined) {
            max_date = new Date();
            max_date.setDate(max_date.getDate() + max);
        }
        max_date.setHours(0);
        max_date.setMinutes(0);
        max_date.setSeconds(0);
        max_date.setMilliseconds(0);

        filters.moveindate.min = min_date;
        filters.moveindate.max = max_date;
    }

    return filters;
}

function filterFloorplans(floorplans, config) {
    if (config.before_filter_callback !== undefined &&
        config.before_filter_callback !== null) {
        config.before_filter_callback(floorplans, config);
    }

    var filters = getFilters(config);

    var floorplans_to_show = [];
    var floorplans_to_hide = [];

    $.each(floorplans, function() {
        var pass = true;
        for (var filter_key in config.filters) {
            var filter = config.filters[filter_key];
            if (filter.filter_function !== undefined) {
                pass = filter.filter_function(this, filters);
                if (!pass) {
                    break;
                }
            }
        }

        if (pass) {
            floorplans_to_show.push(this);
        } else {
            floorplans_to_hide.push(this);
        }
    });

    $.each(floorplans_to_hide, function() {
        $('#' + config.floorplan_id_start_with + this.id)
            .hide();
    });

    $.each(floorplans_to_show, function() {
        $('#' + config.floorplan_id_start_with + this.id)
            .show();
    });

    if (config.after_filter_callback !== undefined &&
        config.after_filter_callback !== null) {
        config.after_filter_callback(floorplans, config);
    }
}

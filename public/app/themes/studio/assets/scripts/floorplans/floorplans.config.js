/**
 * Configure values unique to your sitemaps
 *
 * @author Patrick Douglas <patrick@engrain.com>
 */

var config = {

	floorplan_id_start_with: 'fp',

	/**
	 * Collection of filters
	 *
	 * @type {Object}
	 */
	filters: {

		/**
		 * A filter, if not using, set to type: null
		 *
		 * @typedef  {Object} Filter
		 * @property {String} type              The type of filter (`select`,
		 *                                      `list`, `slider`, `input` or
		 *                                      null)
		 * @property {String} select_id         (Optional) If the type is
		 *                                      select, the id of select tag,
		 *                                      including the `#`
		 * @property {String} list_id           (Optional) If the type is list,
		 *                                      the id of ul tag, including the
		 *                                      `#`
		 * @property {String} selected_class    (Optional) If the type is list,
		 *                                      the class of select tag, do not
		 *                                      include `.`
		 * @property {String} slider_id         (Optional) If the type is
		 *                                      slider, the id of div tag being
		 *                                      used by jquery-ui, including the
		 *                                      `#`
		 * @property {String} input_id          (Optional) If the type is
		 *                                      slider, the id of input tag
		 *                                      that displays the slider values,
		 *                                      including the `#`.  If the type
		 *                                      is input, the id of the input
		 *                                      tag we are getting the input
		 *                                      from
		 *
		 * Example value:
		 *
		 *  foo_filter: {
		 *      type: 'list',
		 *      list: '#unordered_list',
		 *      selected_class: 'current'
		 *  }
		 *
		 */

		/**
		 * The building filter
		 *
		 * @type {Filter}
		 *
		 */
		building: {
			type: null
		},

		/**
		 * The bedrooms filter
		 *
		 * @type {Filter}
		 *
		 */
		bedrooms: {
			type: 'list',
			list_id: '#fp-filters--bedrooms',
			selected_class: 'selected',
			filter_function: function (floorplan, filters) {
				var bedroomcount = floorplan.bedroomcount;
				var filter_bedroom_string = filters.bedrooms.toString();
				var bedrooms = parseInt(filters.bedrooms).toString();

				if (filters.bedrooms === 'false') {
					return true;
				} else if (!isNaN(filters.bedrooms)) {
					return (bedroomcount === bedrooms);
				}
			}
		},

		/**
		 * The moveindate filter
		 *
		 * @type    {Object} Filter
		 * @param   {Number} min    The minimum date in days
		 * @param   {Number} max    The maximum date in days
		 */
		moveindate: {
			type: null
		},
		// moveindate: {
		// 	type: 'select',
		// 	select_id: '#fp-filters--date',
		// 	min: 0,
		// 	max: 365,
		// 	filter_function: function (floorplan, filters) {
		// 		var date = moment(floorplan.soonest_date, 'MM-DD-YYYY').toDate()
		// 		return (date >= filters.moveindate.min && date <= filters.moveindate.max)
		// 	}
		// },
		
		/* Move In Date With datepicker */
		// moveindate: {
		// 	type: 'input',
		// 	input_id: '#fp-filters--date',
		// 	min: 0,
		// 	max: 365,
		// 	filter_function: function (floorplan, filters) {
		// 		var date = moment(floorplan.soonest_date, 'MM-DD-YYYY').toDate()
		// 		return (date >= filters.moveindate.min &&
		// 			date <= filters.moveindate.max);
		// 	}
		// },

		/**
		 * The floor filter
		 *
		 * @type {Object} Filter
		 *
		 */
		floor: {
			type: null
		},

		/**
		 * The price filter
		 *
		 * @type {Object} Filter
		 *
		 */
		price: {
			type: null
		}
		// price: {
		// 	type: 'select',
		// 	select_id: '#fp-filters--price',
		// 	filter_function: function (floorplan, filters) {
		// 		if (filters.price === 'false') {
		// 			return true
		// 		} else if (typeof filters.price === 'string') {
		// 			var split_price = filters.price.split('-')
		// 			filters.price = {
		// 				min: split_price[0],
		// 				max: split_price[1]
		// 			}
		// 		}

		// 		return (
		// 		(
		// 			parseInt(filters.price.min) <= parseInt(floorplan.pricemin)
		// 			&& parseInt(floorplan.pricemin) <= parseInt(filters.price.max)
		// 		)
		// 	||
		// 		(
		// 			parseInt(filters.price.min) <= parseInt(floorplan.pricemax)
		// 			&& parseInt(floorplan.pricemax) <= parseInt(filters.price.max)
		// 		)
		// 	)
		//   }
		// }
		/* Price With Slider */
		// price: {
		// 	type: 'slider',
		// 	slider_id: '#fp-filters--slider',
		// 	input_id: '#fp-filters--price',
		// 	field_to_filter_on: 'price',
		// 	format: {
		// 		before: '$',
		// 		split: '-',
		// 		after: ''
		// 	},
		// 	min: price_range.min,
		// 	max: price_range.max,
		// 	filter_function: function(floorplan, filters) {
		// 		return (parseInt(floorplan.pricemin) >= parseInt(filters.price.min) &&
		// 		parseInt(floorplan.pricemax) <= parseInt(filters.price.max));
		// 	}
		// }
	},
	before_filter_callback: function(floorplans, config) {},
	after_filter_callback: function(floorplans, config) {}
};

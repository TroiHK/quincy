<?php
/*
 *
 * Taxonomies
 *
 */
// Note that you only need the arguments and register_taxonomy function here.
// They are hooked into WordPress in functions.php.

register_taxonomy(
	'location_categories',
	'location-items',
	array(
		'labels' => array(
			'name'					=> __( 'Location Categories' ),
			'add_new_item'	=> __( 'Add New Location Category' ),
			'new_item_name'	=> __( 'Add New Location Category' )
		),
		'show_ui'				=> true,
		'show_tagcloud'	=> false,
		'hierarchical'	=> true
	)
);

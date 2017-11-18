<?php
/**
 * Template Name: Locations Page
 *
 * */

// Gets all Location categories from taxonomy
$location_categories = get_terms( 'location_categories', array(
	'orderby'			=> 'id',
	'order'				=> 'ASC',
	'hide_empty'	=> 0,
	'nopaging'		=> true, //tells wordpress to pull all posts instead of limiting to 10
));

// Create an empty array
$locations = [];

// Loop through the location categories and get post associated with that category
foreach ($location_categories as $index => $location_category) {
	$args = array(
		'post_type'		=> 'location-items',
		'post_status'	=> 'publish',
		'tax_query'		=> array(
			array(
				'taxonomy'	=> 'location_categories',
				'field'			=> 'slug',
				'terms'			=> $location_category->slug
			)
		),
	);

	// Push location category with associated post to the locations array
	$locations[$index] = new WP_Query( $args );
	// Add the location category name for easy access
	$locations[$index]->location_category_name = $location_category->name;
	// Add the location category icon so locations can reference
	$locations[$index]->location_category_icon = get_field('icon', 'location_categories_' . $location_category->term_id);
	// Add the location category id so locations can reference
	$locations[$index]->location_category_id = $index;
}

$context = Timber::get_context();
$context['locations'] = $locations;

// Create a empty variable for location json array
$locations_json = [];

// Loop over location categories and pull out the values needed
foreach ($locations as $location) {
	$location_items = [];
	// Loop over locations and pull out the values needed
	foreach ($location->posts as $item) {
		$location_item_location = get_field( 'map_location', $item->ID );
		$location_items[] = array(
			 'id'										=>	$item -> ID,
			 'property_id'					=>	0,
			 'location_category_id'	=>	$location->location_category_id,
			 'name'									=>	$item -> post_title,
			 'address'							=>	get_field( 'street', $item->ID ),
			 'city'									=>	get_field( 'city', $item->ID ),
			 'state'								=>	get_field( 'state', $item->ID ),
			 'zip'									=>	get_field( 'zip', $item->ID ),
			 'phone'								=>	get_field( 'phone', $item->ID ),
			 'url'									=>	get_field( 'website', $item->ID ),
			 'latitude'							=>	$location_item_location['lat'],
			 'longitude'						=>	$location_item_location['lng']
		);
	}

	$locations_json[] = [
		'id'		=> $location->location_category_id,
		'name'	=> $location->location_category_name,
		'links'	=> array(
			'locations'	=> $location_items
		)
	];
}

$context['locations_json'] = json_encode($locations_json);

$post = new TimberPost();
$context['post'] = $post;

Timber::render( array( 'pages/locations.twig', 'pages/page.twig' ), $context );

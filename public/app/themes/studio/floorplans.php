<?php
/**
 * Template Name: Floorplans Page
 *
 * */

$context = Timber::get_context();

$args = array(
	'post_type'			=>	'floorplan-items',
	'post_status'		=>	'publish',
	'nopaging'		=> true, //tells wordpress to pull all posts instead of limiting to 10
	'meta_query' => array(
        'relation' => 'AND',
        'bed_clause' => array(
            'key' => 'bedroom_count',
            'compare' => 'EXISTS',
        ),
        'area_clause' => array(
            'key' => 'area_min',
            'compare' => 'EXISTS',
        ), 
    ),
    'orderby' => array(
        'bed_clause' => 'ASC',
        'area_clause' => 'ASC',
    ),
);

// Push location category with associated post to the locations array
$floorplans_data = new WP_Query( $args );

// Loop over floorplan post and pull out values needed
foreach ($floorplans_data->posts as $floorplan) {
	$floorplan_image = wp_get_attachment_url( get_post_thumbnail_id($floorplan->ID), 'full' );

	$floorplans[] = [
		'id'							=>	$floorplan->ID,
		'floorplan_id'			=>	get_field( 'floorplan_id', $floorplan->ID ),
		'property_id'			=>	get_field( 'property_id', $floorplan->ID ),
		'name'						=>	$floorplan->post_title,
		'bedroomcount'		=>	get_field( 'bedroom_count', $floorplan->ID ),
		'bathroomcount'		=>	get_field( 'bathroom_count', $floorplan->ID ),
		'areamin'					=>	get_field( 'area_min', $floorplan->ID ),
		'areamax'					=>	get_field( 'area_max', $floorplan->ID ),
		'pricemin'				=>	'',
		'pricemax'				=>	'',
		'floorplan_image'	=>	$floorplan_image,
		'floorplan_link'	=>	get_permalink( $floorplan->ID )
	];
}

$context['floorplans'] = $floorplans;
$context['floorplans_json'] = json_encode($floorplans);

$post = new TimberPost();
$context['post'] = $post;

Timber::render( array( 'pages/floorplans.twig', 'pages/page.twig' ), $context );

<?php
/*
 *
 * Custom Post Types
 *
 */
// Note that you only need the arguments and register_post_type function here.
// They are hooked into WordPress in functions.php.

// Custom Post Type for Locations
$location_args = array(
	'label'				=> __('Locations'),
	'description'	=> __(''),
	'labels'			=> array(
		'name'								=> __( 'Locations' ),
		'singular_name'				=> __( 'Location' ),
		'add_new'							=> __( 'Add New' ),
		'add_new_item'				=> __( 'Add New Location' ),
		'edit'								=> __( 'Edit' ),
		'edit_item'						=> __( 'Edit Location' ),
		'new_item'						=> __( 'New Location' ),
		'view'								=> __( 'View' ),
		'view_item'						=> __( 'View Location' ),
		'search_items'				=> __( 'Search Locations' ),
		'not_found'						=> __( 'No Locations found' ),
		'not_found_in_trash'	=> __( 'No Locations found in Trash' ),
		'parent'							=> __( 'Parent Locations' )
	),
	'supports'						=> array( 'title','thumbnail' ),
	'hierarchical'				=> false,
	'public'							=> true,
	'show_ui'							=> true,
	'show_in_menu'				=> true,
	'show_in_nav_menus'		=> true,
	'show_in_admin_bar'		=> true,
	'taxonomies'					=> array( '' ),
	'menu_icon'						=> 'dashicons-location',
	'menu_position'				=> 5,
	'has_archive'					=> true,
	'publicly_queryable'	=> true,
	'capability_type'			=> 'page',
);

register_post_type( 'location-items', $location_args );

// Custom Post Type for Floorplans
$floorplan_args = array(
	'label'				=> __( 'floorplans' ),
	'description'	=> __( '' ),
	'labels'			=> array(
		'name'								=> __( 'Floor Plans' ),
		'singular_name'				=> __( 'Floor Plan' ),
		'menu_name'						=> __( 'Floor Plans' ),
		'all_items'						=> __( 'All Floor Plans' ),
		'view_item'						=> __( 'View Floor Plan' ),
		'add_new_item'				=> __( 'Add New Floor Plan' ),
		'add_new'							=> __( 'Add New' ),
		'edit_item'						=> __( 'Edit Floor Plan' ),
		'update_item'					=> __( 'Update Floor Plan' ),
		'search_items'				=> __( 'Search Floor Plan' ),
		'not_found'						=> __( 'Not Found' ),
		'not_found_in_trash'	=> __( 'Not found in Trash' ),
	),
	'supports'						=> array( 'title','thumbnail' ),
	'hierarchical'				=> false,
	'public'							=> true,
	'show_ui'							=> true,
	'show_in_menu'				=> true,
	'show_in_nav_menus'		=> true,
	'show_in_admin_bar'		=> true,
	'menu_icon'						=> 'dashicons-welcome-widgets-menus',
	'menu_position'				=> 5,
	'has_archive'					=> true,
	'publicly_queryable'	=> true,
	'capability_type'			=> 'page',
	'rewrite'							=> array(
		'slug'				=> 'floorplans',
		'with_front'	=> false,
		'feeds'				=> false,
		'pages'				=> true
	)
);

register_post_type( 'floorplan-items', $floorplan_args );

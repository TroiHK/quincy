<?php

if ( !class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . admin_url('plugins.php#timber') . '">' . admin_url('plugins.php') . '</a></p></div>';
	});
	return;
}

/*
 * This is where you should add/link any JS and CSS files
 * to the current theme.
 */
require_once('functions/enqueue.php');


class BootstrapSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats', array( ) );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'init', array( $this, 'register_menus' ) );
		add_action( 'init', array( $this, 'register_widgets' ) );
		add_action( 'widgets_init', array( $this, 'register_sidebars' ) );
		add_action( 'init', array( $this, 'tsk_acf_utils' ) );

		// Weird thing that is required for custom post type single pages
		flush_rewrite_rules();

		parent::__construct();
	}

	// Note that the following included files only need to contain the taxonomy/CPT/Menu arguments and register_whatever function. They are initialized here.
	function register_post_types() {
		require( 'lib/custom-types.php' );
	}

	function register_taxonomies() {
		require( 'lib/taxonomies.php' );
	}

	function register_menus(){
		require( 'lib/menus.php' );
	}

	function register_widgets(){
		require( 'lib/widgets.php' );
	}

	function register_sidebars() {
		require( 'lib/widgets.php' );
	}

	function tsk_acf_utils() {
		require( 'lib/acf-utilities.php' );
	}

	// Global Context of Site
	function add_to_context( $context ) {
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;
		// Site-wide Settings
		$context['global'] = get_fields( 'options' );

		return $context;
	}

	function add_to_twig( $twig ){
		require( 'lib/twig-extension-url.php' );

		/* This is where you can add your own fuctions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addExtension( new Studio_Twig_Extension_Url() );

		return $twig;
	}
}

/* pass google maps api key from the options menu to the ACF backend map */
function my_acf_init() {

	acf_update_setting('google_api_key', get_option( 'options_api_key' ));
}

add_action('acf/init', 'my_acf_init');

new BootstrapSite();

// This file customizes the wordpress admin ui to match needs
require( 'lib/wordpress-admin-cleanup.php' );

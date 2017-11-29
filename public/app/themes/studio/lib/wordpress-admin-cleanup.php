<?php

// Allows SVG files to be added to Media Uploader
function cc_mime_types( $mimes ) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}

add_filter( 'upload_mimes', 'cc_mime_types' );

// Clean Up Wordpress Sidebar
function remove_menus(){
	global $submenu;
	// remove_menu_page( 'index.php' );                // Dashboard
	remove_menu_page( 'edit.php' );                    // Posts
	// remove_menu_page( 'upload.php' );               // Media
	// remove_menu_page( 'edit.php?post_type=page' );  // Pages
	remove_menu_page( 'edit-comments.php' );           // Comments
	// remove_menu_page( 'themes.php' );               // Appearance
	unset( $submenu['themes.php'][6] );                // Customizer
	// remove_menu_page( 'plugins.php' );              // Plugins
	// remove_menu_page( 'users.php' );                // Users
	// remove_menu_page( 'tools.php' );                // Tools
	// remove_menu_page( 'options-general.php' );      // Settings
}

add_action( 'admin_menu', 'remove_menus' );

// Clean Up Wordpress Top Bar
function my_admin_bar_render() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu( 'wp-logo' );                // Wordpress Logo
    $wp_admin_bar->remove_menu( 'comments' );               // Comments
    // $wp_admin_bar->remove_node( 'new-content' );         // New
    $wp_admin_bar->remove_menu( 'new-post' );               // Post
    // $wp_admin_bar->remove_menu( 'new-media' );           // Media
    // $wp_admin_bar->remove_menu( 'new-page' );            // Page
    // $wp_admin_bar->remove_menu( 'new-locations' );       // Locations
    // $wp_admin_bar->remove_menu( 'new-floorplan-items' ); // Floorplans
    // $wp_admin_bar->remove_menu( 'new-user' );            // User
}

add_action( 'wp_before_admin_bar_render', 'my_admin_bar_render' );

// Clean up Dashboard 
function remove_dashboard_widgets() {
	global $wp_meta_boxes;

	unset( $wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press'] );
	unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links'] );
	// unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now'] );
	// unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins'] );
	// unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_drafts'] ); // Recent Drafts
	unset( $wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments'] );  // Recent Comments
	unset( $wp_meta_boxes['dashboard']['side']['core']['dashboard_primary'] );            // News
	unset( $wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary'] );
}

remove_action( 'welcome_panel', 'wp_welcome_panel' );
add_action( 'wp_dashboard_setup', 'remove_dashboard_widgets' );

/**
 * Enqueue scripts and styles.
 */
function master_scripts() {

	$url_obj = new Studio_Twig_Extension_Url();

	if ( is_singular() && get_option( 'thread_comments' ) )
		wp_enqueue_script( 'comment-reply' );

	if (WP_DEBUG === true) {
		wp_enqueue_style( 'main-libs-style', $url_obj->styleUrl('libs', true), array(), null );
		wp_enqueue_style( 'main-style', $url_obj->styleUrl('custom', true), array(), null );

		wp_enqueue_script( 'main-libs-script', $url_obj->scriptUrl('libs', true), array('jquery'), null, true );
		wp_enqueue_script( 'main-script', $url_obj->scriptUrl('main', true), array('jquery'), null, true );
	} else {
		wp_enqueue_style( 'main-style', $url_obj->styleUrl('all', true), array(), null );
		wp_enqueue_script( 'main-libs-script', $url_obj->scriptUrl('all', true), array('jquery'), null, true );
		wp_enqueue_script( 'main-script', $url_obj->scriptUrl('main', true), array('jquery'), null, true );
	};

}
add_action( 'wp_enqueue_scripts', 'master_scripts' );

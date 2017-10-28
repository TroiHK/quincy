<?php

/*------------------------------------*\
    //Enques
		//CSS
		//Javascript
\*------------------------------------*/

/*------------------------------------*\
    //CSS
\*------------------------------------*/
	function theme_styles(){
		wp_register_style( 'Example-css', get_template_directory_uri() . '/assets/vendor/owl.carousel/dist/assets/owl.carousel.min.css', array(), null,'all' );

		// enqueing: UNCOMMENT TO ACTUALLY USE
		//wp_enqueue_style( 'Example-css' );

	}
	add_action('wp_enqueue_scripts', 'theme_styles');
	// if($is_IE) {
	// 	function ie_styles(){
	// 		wp_register_style( 'ie', get_template_directory_uri() . '/css/ie.css', array(), '1.0','screen, projection' );

	// 		// enqueing:
	// 		wp_enqueue_style( 'ie' );
	// 	}
	// 	add_action('wp_enqueue_scripts', 'ie_styles');
	// }
/*------------------------------------*\
    //Javascript
\*------------------------------------*/
// Register some javascript files, because we love javascript files. Enqueue a couple as well
// Reference: wp_register_script( $handle, $src, $deps, $ver, $in_footer );
function load_js_files() {
	if(!is_admin()){
		wp_deregister_script('jquery');
		wp_register_script('jquery', get_template_directory_uri() . '/assets/vendor/jQuery/dist/jquery.min.js', false, '3.2.1', true);
		




		//Get in line! 
		wp_enqueue_script('jquery');


		//If necessary, page specific enqueues
		// if ( is_page('') ) {
		// OR if (is_page_template($templateName)) {

		// }
	}
}
add_action( 'wp_enqueue_scripts', 'load_js_files' );


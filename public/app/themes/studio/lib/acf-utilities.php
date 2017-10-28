<?php

	// Register the Site-wide Options Page
	if( function_exists( 'acf_add_options_page' ) ) {
		acf_add_options_sub_page( 'Global Content' );
	}

	// hides if user is not admin
	function my_acf_show_admin( $show ) {
		return current_user_can( 'manage_options' );
	}
	
?>
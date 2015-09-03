<?php
/*
Plugin Name: Scroll to z-plane
Plugin URI: http://www.rodrigoconstanzo.com/thesis/
Description: Scroll..glitch..scroll..glitch..scroll..glitch..
Version: 0.1
Author: MADWORT
Author URI: http://www.madwort.co.uk
*/

function scroll_z_plane_scripts()
{
		wp_register_script( 'scroll-z-plane', plugins_url( '/scroll-z-plane.js', __FILE__ ), array('jquery'), "01" );
		wp_enqueue_script( 'scroll-z-plane' );
}
add_action( 'wp_enqueue_scripts', 'scroll_z_plane_scripts' );

// Don't need any styles right now, but might do later...
// function scroll_z_plane_style()
// {
//     wp_register_style( 'scroll-z-plane-style', plugins_url( '/scroll-z-plane.css', __FILE__ ));
//
//     wp_enqueue_style( 'scroll-z-plane-style' );
// }
// add_action( 'wp_enqueue_scripts', 'scroll_z_plane_style' );

add_shortcode('scroll-z-plane', 'scroll_z_plane_handler');

function scroll_z_plane_handler($atts)
{
	return "";
}

?>

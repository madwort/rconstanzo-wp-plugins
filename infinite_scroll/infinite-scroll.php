<?php
/*
Plugin Name: Infinite Scroll
Plugin URI: http://www.rodrigoconstanzo.com/thesis/
Description: Scroll..scroll..scroll..FOREVER!!!!
Version: 0.1
Author: MADWORT
Author URI: http://www.madwort.co.uk
*/

function infinite_scroll_scripts()
{
		wp_register_script( 'infinite-scroll', plugins_url( '/infinite-scroll.js', __FILE__ ), array(), "01" );
		wp_enqueue_script( 'infinite-scroll' );
}
add_action( 'wp_enqueue_scripts', 'infinite_scroll_scripts' );

function infinite_scroll_style()
{
    wp_register_style( 'infinite-scroll-style', plugins_url( '/infinite-scroll.css', __FILE__ ));

    wp_enqueue_style( 'infinite-scroll-style' );
}
add_action( 'wp_enqueue_scripts', 'infinite_scroll_style' );

add_shortcode('infinite-scroll', 'infinite_scroll_handler');

function infinite_scroll_handler($atts)
{
	return "<div id='scroll-to-read'> Scroll down to continue reading. </div>";
}

?>

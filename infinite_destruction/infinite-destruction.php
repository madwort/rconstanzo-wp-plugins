<?php
/*
Plugin Name: Thesis Infinite DESTRUCTION
Plugin URI: http://www.rodrigoconstanzo.com/thesis/
Description: Destroy all the things
Version: 0.2
Author: MADWORT
Author URI: http://www.madwort.co.uk
*/

function infinite_destruction_scripts()
{
	wp_register_script( 'infinite_destruction', plugins_url( '/infinite-destruction.js', __FILE__ ), array('jquery'), "01" );
	wp_enqueue_script( 'infinite_destruction' );
}
add_action( 'wp_enqueue_scripts', 'infinite_destruction_scripts' );

add_shortcode('infinite_destruction', 'infinite_destruction_handler');

function infinite_destruction_handler($atts)
{
  return "<script type='text/javascript'>
    $(window.destruction());
  </script>";
}

?>

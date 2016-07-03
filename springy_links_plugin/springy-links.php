<?php
/*
Plugin Name: Springy Links Menu
Plugin URI: http://www.rodrigoconstanzo.com/thesis/
Description: Springy menu built with d3!
Version: 0.12
Author: MADWORT
Author URI: http://www.madwort.co.uk
*/

function springy_links_scripts()
{
		wp_register_script( 'd3', plugins_url( '/d3.js', __FILE__ ) );
		wp_enqueue_script( 'd3' );
		wp_register_script( 'springy-links', plugins_url( '/springy-links.js', __FILE__ ), array(), "05" );
		wp_enqueue_script( 'springy-links' );
}
add_action( 'wp_enqueue_scripts', 'springy_links_scripts' );

function springy_menu_style()
{
    wp_register_style( 'springy-menu-style', plugins_url( '/springy-links.css', __FILE__ ));

    wp_enqueue_style( 'springy-menu-style' );
}
add_action( 'wp_enqueue_scripts', 'springy_menu_style' );

add_shortcode('springy-menu', 'springy_menu_handler');

function springy_menu_handler($atts)
{
  $a = shortcode_atts( array(
      'nodes' => "4",
  ), $atts );

	return "<div class='springy' data-nodes='".$a['nodes']."'></div>
  <div class='springy-assets' style='display: none;'>
    <a href='". plugins_url( 'menu.json' , __FILE__ ). "'></a>
  </div>
	<script>
  d3.json($('.springy-assets a').first().attr('href'), function(error, graph) {
    drawSpringyMenu('div.springy', graph);
  });
	</script>";
}

?>

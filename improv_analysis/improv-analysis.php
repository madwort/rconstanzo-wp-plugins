<?php
/*
Plugin Name: Improv Analysis
Plugin URI: http://www.rodrigoconstanzo.com/thesis/
Description: Package Improv Analysis tool for WP
Version: 0.1
Author: MADWORT
Author URI: http://www.madwort.co.uk
*/

function improv_analysis_scripts()
{
		wp_register_script( 'd3', plugins_url( '/d3.js', __FILE__ ) );
		wp_enqueue_script( 'd3' );
		wp_register_script( 'improv-analysis', plugins_url( '/improv-analysis.js', __FILE__ ), array(), "01" );
		wp_enqueue_script( 'improv-analysis' );
}
add_action( 'wp_enqueue_scripts', 'improv_analysis_scripts' );

function improv_analysis_style()
{
    wp_register_style( 'improv-analysis-style', plugins_url( '/improv-analysis.css', __FILE__ ));

    wp_enqueue_style( 'improv-analysis-style' );
}
add_action( 'wp_enqueue_scripts', 'improv_analysis_style' );

add_shortcode('improv-analysis', 'improv_analysis_handler');

function improv_analysis_handler($atts)
{
	return "";
}

?>

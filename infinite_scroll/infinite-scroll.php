<?php
/*
Plugin Name: Thesis Infinite Scroll
Plugin URI: http://www.rodrigoconstanzo.com/thesis/
Description: Scroll..scroll..scroll..FOREVER!!!!
Version: 0.8
Author: MADWORT
Author URI: http://www.madwort.co.uk
*/

function infinite_scroll_scripts()
{
	wp_register_script( 'infinite-scroll', plugins_url( '/infinite-scroll.js', __FILE__ ), array('jquery'), "04" );
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
  $a = shortcode_atts( array(
      'text' => "This process",
      'text2' => ", which sees no beginning or end, is presented [frozen, sanitized, cauterized] as a snapshot here. The work is made up of a network of compositions, videos, recordings, software, scores, performances, and improvisations which all interrelate and feed into each other. Each individual component rarely stands alone, or has clear temporal boundaries."
  ), $atts );

  return "<a href='/thesisfiles/chapter1.html' style='display: none;' class='infinite_scroll_url'>".
         "Infinite scroll text</a>".
         "<div id='scroll-to-read' data-scroll-text='".$a['text'].
         "' data-scroll-text2='".$a['text2']."'>".
         "<span>".$a['text']."</span>".
         "</div>";
}

?>

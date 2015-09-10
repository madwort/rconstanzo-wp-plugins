<?php
/*
Plugin Name: Link dumper
Plugin URI: http://www.rodrigoconstanzo.com/thesis/
Description: Dump all the links on a page to a div at the bottom...
Version: 0.1
Author: MADWORT
Author URI: http://www.madwort.co.uk
*/

function link_dump_scripts()
{
    wp_register_script( 'link_dump',
   plugins_url( '/link_dump.js',
   __FILE__ ),
   array('jquery'),
   "01" );
    wp_enqueue_script( 'link_dump' );
}
add_action( 'wp_enqueue_scripts', 'link_dump_scripts' );

add_shortcode('link_dump', 'link_dump_handler');

function link_dump_handler($atts)
{
  return "
    <script type='text/javascript'>
      $(window.link_dump('#colLeft'));
    </script>
      ";
}

?>

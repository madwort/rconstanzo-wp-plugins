<?php
/*
Plugin Name: Tag cloud
Plugin URI: http://www.rodrigoconstanzo.com/thesis/
Description: The amazing dynamic tag cloud
Version: 0.1
Author: MADWORT
Author URI: http://www.madwort.co.uk
*/

function tag_cloud_scripts()
{
    wp_register_script( 'tag_cloud',
   plugins_url( '/tag_cloud.js',
   __FILE__ ),
   array('jquery'),
   "01" );
    wp_enqueue_script( 'tag_cloud' );
}
add_action( 'wp_enqueue_scripts', 'tag_cloud_scripts' );

// Don't need any styles right now, but might do later...
// function tag_cloud_style()
// {
//     wp_register_style( 'tag_cloud-style', plugins_url( '/tag_cloud.css', __FILE__ ));
//
//     wp_enqueue_style( 'tag_cloud-style' );
// }
// add_action( 'wp_enqueue_scripts', 'tag_cloud_style' );

add_shortcode('tag_cloud', 'tag_cloud_handler');

function tag_cloud_handler($atts)
{
  $a = shortcode_atts( 
          array(
            'path' => plugins_url( '/tag_cloud_data.csv', __FILE__ ),
          ), $atts 
        );

  return "
<div id='tag_cloud'>
  <div>
    [
    <span class='tag'>composition</span>,
    <span class='tag'>improvisation</span>,
    <span class='tag'>performance</span>,
    <span class='tag'>diy</span>,
    <span class='tag'>software</span>,
    <span class='tag'>controller</span>,
    <span class='tag'>mapping</span>,
    <span class='tag'>gesture</span>,
    <span class='tag'>video</span>,
    <span class='tag'>analysis</span>,
    <span class='tag'>framework</span>,
    <span class='tag'>feedback</span>,
    <span class='tag'>noise</span>,
    <span class='tag'>interaction</span>,
    <span class='tag'>behavior</span>,
    <span class='tag'>game</span>,
    <span class='tag'>battle</span>,
    <span class='tag'>dfscore</span>,
    <span class='tag'>drums</span>,
    <span class='tag'>memory</span>
    ]
  </div>
  <div id='results'></div>
</div>
<script type='text/javascript'>
  $(window.create_tag_handlers('".$a['path']."'));
</script>
";
}

add_shortcode('tag_cloud_search', 'tag_cloud_search_handler');

function tag_cloud_search_handler($atts)
{
  $a = shortcode_atts( 
          array(
            'path' => plugins_url( '/tag_cloud_assets/', __FILE__ ),
          ), $atts 
        );

  return "
  <script type='text/javascript'>
    $(window.search_tag);
  </script>
";
}

?>

<?php
/*
Plugin Name: Tag cloud
Plugin URI: http://www.rodrigoconstanzo.com/thesis/
Description: The amazing dynamic tag cloud
Version: 0.5
Author: MADWORT
Author URI: http://www.madwort.co.uk
*/

function tag_cloud_scripts()
{
  wp_register_script( 'papaparse',
    plugins_url( '/papaparse.js',
    __FILE__ ),
    array(),
    "01" );
  wp_enqueue_script( 'papaparse' );

  wp_register_script( 'tag_cloud',
    plugins_url( '/tag_cloud.js',
    __FILE__ ),
    array('papaparse'),
    "01" );
  wp_enqueue_script( 'tag_cloud' );

  wp_register_script( 'tag_cloud_search',
    plugins_url( '/tag_cloud_search.js',
    __FILE__ ),
    array(),
    "01" );
  wp_enqueue_script( 'tag_cloud_search' );

}
add_action( 'wp_enqueue_scripts', 'tag_cloud_scripts' );

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
    <a class='tag'>composition</a>,
    <a class='tag'>improvisation</a>,
    <a class='tag'>performance</a>,
    <a class='tag'>diy</a>,
    <a class='tag'>software</a>,
    <a class='tag'>controller</a>,
    <a class='tag'>mapping</a>,
    <a class='tag'>gesture</a>,
    <a class='tag'>video</a>,
    <a class='tag'>analysis</a>,
    <a class='tag'>framework</a>,
    <a class='tag'>feedback</a>,
    <a class='tag'>noise</a>,
    <a class='tag'>interaction</a>,
    <a class='tag'>behavior</a>,
    <a class='tag'>game</a>,
    <a class='tag'>battle</a>,
    <a class='tag'>dfscore</a>,
    <a class='tag'>drums</a>,
    <a class='tag'>memory</a>
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
    $(window.search_tag());
  </script>
";
}

?>

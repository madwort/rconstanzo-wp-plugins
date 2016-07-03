<?php
/*
Plugin Name: Tag cloud
Plugin URI: http://www.rodrigoconstanzo.com/thesis/
Description: The amazing dynamic tag cloud
Version: 0.18
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

function tag_cloud_style()
{
    wp_register_style( 'tag_cloud-style', plugins_url( '/tag_cloud.css', __FILE__ ));

    wp_enqueue_style( 'tag_cloud-style' );
}
add_action( 'wp_enqueue_scripts', 'tag_cloud_style' );

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
  <a href=".$a['path']." style='display:none;'>Tag cloud datafile</a>
  <div>
    [
    <span class='tag'>composition</span>,
    <span class='tag'>improvisation</span>,
    <span class='tag'>performance</span>,
    <span class='tag'>meta</span>,
    <span class='tag'>diy</span>,
    <span class='tag'>software</span>,
    <span class='tag'>dfscore</span>,
    <span class='tag'>controller</span>,
    <span class='tag'>mapping</span>,
    <span class='tag'>gesture</span>,
    <span class='tag'>form</span>,
    <span class='tag'>memory</span>,
    <span class='tag'>interaction</span>,
    <span class='tag'>behavior</span>,
    <span class='tag'>game</span>,
    <span class='tag'>analysis</span>,
    <span class='tag'>video</span>,
	<span class='tag'>feedback</span>
    ]
  </div>
  <div id='results'></div>
</div>
<script type='text/javascript'>
  var tag_cloud_url = $('#tag_cloud a').first().attr('href');
  $(window.create_tag_handlers(tag_cloud_url));
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
  window.onload = function () {
    window.document.body.onload = setTimeout(function(){ window.search_tag(); }, 1000);
  };
  </script>
  <a href=".plugins_url( '/tag_cloud_data.csv', __FILE__ )." style='display:none;' name='tag_cloud_datafile'>Tag cloud datafile</a>
";
}

?>

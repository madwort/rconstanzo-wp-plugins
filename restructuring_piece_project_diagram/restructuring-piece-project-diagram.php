<?php
/*
Plugin Name: Restructuring Piece/Project Diagram
Plugin URI: http://www.rodrigoconstanzo.com/thesis/
Description: whizzy diagram thing
Version: 0.14
Author: MADWORT
Author URI: http://www.madwort.co.uk
*/

function restructuring_piece_project_diagram_scripts()
{
		wp_register_script( 'd3', plugins_url( '/d3.js', __FILE__ ) );
		wp_enqueue_script( 'd3' );
		wp_register_script( 
			'restructuring-piece-project-diagram', 
			plugins_url( '/restructuring-piece-project-diagram.js', __FILE__ ), 
			array(), 
			"01" 
		);
		wp_enqueue_script( 'restructuring-piece-project-diagram' );
}
add_action( 'wp_enqueue_scripts', 'restructuring_piece_project_diagram_scripts' );

function restructuring_piece_project_diagram_style()
{
    wp_register_style( 
			'restructuring-piece-project-diagram-style', 
			plugins_url( '/restructuring-piece-project-diagram.css', __FILE__ )
		);

    wp_enqueue_style( 'restructuring-piece-project-diagram-style' );
}
add_action( 'wp_enqueue_scripts', 'restructuring_piece_project_diagram_style' );

add_shortcode('restructuring-piece-project-diagram', 'restructuring_piece_project_diagram_handler');

function restructuring_piece_project_diagram_handler($atts)
{
  $a = shortcode_atts( array(
      'just_thesis' => "false",
  ), $atts );

	return "
  <div class='restructuring-piece-project-diagram' data-justthesis='".$a['just_thesis']."'></div>
  <div class='rppd-assets' style='display: none;'>
  <!-- include these statically because wget doesn't execute our JS -->
    <a href='".plugins_url('assets/', __FILE__ )."' class='asset_dir'>Assets directory</a>
    <a href='".plugins_url('assets/1.jpg', __FILE__ )."' class='asset1'>1.jpg</a>
    <a href='".plugins_url('assets/10.jpg', __FILE__ )."' class='asset10'>10.jpg</a>
    <a href='".plugins_url('assets/11.jpg', __FILE__ )."' class='asset11'>11.jpg</a>
    <a href='".plugins_url('assets/12.jpg', __FILE__ )."' class='asset12'>12.jpg</a>
    <a href='".plugins_url('assets/13.jpg', __FILE__ )."' class='asset13'>13.jpg</a>
    <a href='".plugins_url('assets/14.jpg', __FILE__ )."' class='asset14'>14.jpg</a>
    <a href='".plugins_url('assets/15.jpg', __FILE__ )."' class='asset15'>15.jpg</a>
    <a href='".plugins_url('assets/16.jpg', __FILE__ )."' class='asset16'>16.jpg</a>
    <a href='".plugins_url('assets/17.jpg', __FILE__ )."' class='asset17'>17.jpg</a>
    <a href='".plugins_url('assets/18.jpg', __FILE__ )."' class='asset18'>18.jpg</a>
    <a href='".plugins_url('assets/19.jpg', __FILE__ )."' class='asset19'>19.jpg</a>
    <a href='".plugins_url('assets/2.jpg', __FILE__ )."' class='asset2'>2.jpg</a>
    <a href='".plugins_url('assets/20.jpg', __FILE__ )."' class='asset20'>20.jpg</a>
    <a href='".plugins_url('assets/21.jpg', __FILE__ )."' class='asset21'>21.jpg</a>
    <a href='".plugins_url('assets/22.jpg', __FILE__ )."' class='asset22'>22.jpg</a>
    <a href='".plugins_url('assets/23.jpg', __FILE__ )."' class='asset23'>23.jpg</a>
    <a href='".plugins_url('assets/24.jpg', __FILE__ )."' class='asset24'>24.jpg</a>
    <a href='".plugins_url('assets/25.jpg', __FILE__ )."' class='asset25'>25.jpg</a>
    <a href='".plugins_url('assets/26.jpg', __FILE__ )."' class='asset26'>26.jpg</a>
    <a href='".plugins_url('assets/27.jpg', __FILE__ )."' class='asset27'>27.jpg</a>
    <a href='".plugins_url('assets/28.jpg', __FILE__ )."' class='asset28'>28.jpg</a>
    <a href='".plugins_url('assets/29.jpg', __FILE__ )."' class='asset29'>29.jpg</a>
    <a href='".plugins_url('assets/3.jpg', __FILE__ )."' class='asset3'>3.jpg</a>
    <a href='".plugins_url('assets/30.jpg', __FILE__ )."' class='asset30'>30.jpg</a>
    <a href='".plugins_url('assets/31.jpg', __FILE__ )."' class='asset31'>31.jpg</a>
    <a href='".plugins_url('assets/4.jpg', __FILE__ )."' class='asset4'>4.jpg</a>
    <a href='".plugins_url('assets/5.jpg', __FILE__ )."' class='asset5'>5.jpg</a>
    <a href='".plugins_url('assets/6.jpg', __FILE__ )."' class='asset6'>6.jpg</a>
    <a href='".plugins_url('assets/7.jpg', __FILE__ )."' class='asset7'>7.jpg</a>
    <a href='".plugins_url('assets/8.jpg', __FILE__ )."' class='asset8'>8.jpg</a>
    <a href='".plugins_url('assets/9.jpg', __FILE__ )."' class='asset9'>9.jpg</a>
    <a href='".plugins_url('assets/blurbs.csv', __FILE__ )."' class='blurbs'>blurbs.csv</a>
    <a href='".plugins_url('assets/connections.csv', __FILE__ )."' class='connections'>connections.csv</a>
  </div>
  <script>

  var blurb_url = $('.rppd-assets a.blurbs').first().attr('href');
  var connections_url = $('.rppd-assets a.connections').first().attr('href');
  var assets_directory_url = $('.rppd-assets a.asset_dir').first().attr('href');

  // fixup: wget will rewrite a directory url to include /index.html 
  // We need to remove it or images won't work!
  assets_directory_url = assets_directory_url.replace('index.html','');

  d3.csv(
    blurb_url,
    function (error, pieces) {
      if (error) throw error;
  
      d3.csv(
        connections_url,
        function (error, connections) {
          if (error) throw error;
          console.log(connections[0]);

          var width = 650,
              height = 650;
          drawPieceProjectDiagram('div.restructuring-piece-project-diagram', pieces, connections,
                                  assets_directory_url, width, height);
      });
    });
  </script>
";
}

?>

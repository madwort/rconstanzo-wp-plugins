<?php
/*
Plugin Name: Restructuring Piece/Project Diagram
Plugin URI: http://www.rodrigoconstanzo.com/thesis/
Description: whizzy diagram thing
Version: 0.9
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

function rppd_remove_domain($value)
{
  return str_replace('http://www.rodrigoconstanzo.com' , '' , $value);
}

function restructuring_piece_project_diagram_handler($atts)
{
  $a = shortcode_atts( array(
      'just_thesis' => "false",
  ), $atts );

	return "<div class='restructuring-piece-project-diagram' data-justthesis='" . 
            $a['just_thesis']."'></div><script>
  d3.csv(
    '" . rppd_remove_domain(plugins_url( 'assets/blurbs.csv', __FILE__ )) . "',
    function (error, pieces) {
      if (error) throw error;
  
      d3.csv(
        '" . rppd_remove_domain(plugins_url( 'assets/connections.csv', __FILE__ )) . "',
        function (error, connections) {
          if (error) throw error;
          console.log(connections[0]);

          var width = 650,
              height = 650;
          drawPieceProjectDiagram('div.restructuring-piece-project-diagram', pieces, connections,'".
                                  rppd_remove_domain(plugins_url( 'assets/', __FILE__ )) . 
                                  "',width, height);
      });
    });
  </script>
  <div id='rppd-assets' style='display: none;'>
  <!-- include these statically because wget doesn't execute our JS -->
    <a href='".rppd_remove_domain(plugins_url('assets/1.jpg', __FILE__ ))."'>1.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/10.jpg', __FILE__ ))."'>10.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/11.jpg', __FILE__ ))."'>11.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/12.jpg', __FILE__ ))."'>12.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/13.jpg', __FILE__ ))."'>13.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/14.jpg', __FILE__ ))."'>14.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/15.jpg', __FILE__ ))."'>15.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/16.jpg', __FILE__ ))."'>16.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/17.jpg', __FILE__ ))."'>17.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/18.jpg', __FILE__ ))."'>18.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/19.jpg', __FILE__ ))."'>19.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/2.jpg', __FILE__ ))."'>2.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/20.jpg', __FILE__ ))."'>20.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/21.jpg', __FILE__ ))."'>21.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/22.jpg', __FILE__ ))."'>22.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/23.jpg', __FILE__ ))."'>23.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/24.jpg', __FILE__ ))."'>24.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/25.jpg', __FILE__ ))."'>25.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/26.jpg', __FILE__ ))."'>26.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/27.jpg', __FILE__ ))."'>27.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/28.jpg', __FILE__ ))."'>28.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/29.jpg', __FILE__ ))."'>29.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/3.jpg', __FILE__ ))."'>3.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/30.jpg', __FILE__ ))."'>30.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/31.jpg', __FILE__ ))."'>31.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/4.jpg', __FILE__ ))."'>4.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/5.jpg', __FILE__ ))."'>5.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/6.jpg', __FILE__ ))."'>6.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/7.jpg', __FILE__ ))."'>7.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/8.jpg', __FILE__ ))."'>8.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/9.jpg', __FILE__ ))."'>9.jpg</a>
    <a href='".rppd_remove_domain(plugins_url('assets/blurbs.csv', __FILE__ ))."'>blurbs.csv</a>
    <a href='".rppd_remove_domain(plugins_url('assets/connections.csv', __FILE__ ))."'>connections.csv</a>
  </div>
";
}

?>

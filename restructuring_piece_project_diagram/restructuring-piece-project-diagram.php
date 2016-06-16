<?php
/*
Plugin Name: Restructuring Piece/Project Diagram
Plugin URI: http://www.rodrigoconstanzo.com/thesis/
Description: whizzy diagram thing
Version: 0.4
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

	return "<div class='restructuring-piece-project-diagram' data-justthesis='" . 
            $a['just_thesis']."'></div><script>
  d3.csv(
    '" . plugins_url( 'assets/blurbs.csv', __FILE__ ) . "',
    function (error, pieces) {
      if (error) throw error;
  
      d3.csv(
        '" . plugins_url( 'assets/connections.csv', __FILE__ ) . "',
        function (error, connections) {
          if (error) throw error;
          console.log(connections[0]);

          var width = 650,
              height = 650;
          drawPieceProjectDiagram('div.restructuring-piece-project-diagram', pieces, connections,'".
                                  plugins_url( 'assets/', __FILE__ ) . 
                                  "',width, height);
      });
    });
  </script>
  <div id='rppd-assets' style='display: none;'>
  <!-- include these statically because wget doesn't execute our JS -->
    <a href='assets/1.jpg'>1.jpg</a>
    <a href='assets/10.jpg'>10.jpg</a>
    <a href='assets/11.jpg'>11.jpg</a>
    <a href='assets/12.jpg'>12.jpg</a>
    <a href='assets/13.jpg'>13.jpg</a>
    <a href='assets/14.jpg'>14.jpg</a>
    <a href='assets/15.jpg'>15.jpg</a>
    <a href='assets/16.jpg'>16.jpg</a>
    <a href='assets/17.jpg'>17.jpg</a>
    <a href='assets/18.jpg'>18.jpg</a>
    <a href='assets/19.jpg'>19.jpg</a>
    <a href='assets/2.jpg'>2.jpg</a>
    <a href='assets/20.jpg'>20.jpg</a>
    <a href='assets/21.jpg'>21.jpg</a>
    <a href='assets/22.jpg'>22.jpg</a>
    <a href='assets/23.jpg'>23.jpg</a>
    <a href='assets/24.jpg'>24.jpg</a>
    <a href='assets/25.jpg'>25.jpg</a>
    <a href='assets/26.jpg'>26.jpg</a>
    <a href='assets/27.jpg'>27.jpg</a>
    <a href='assets/28.jpg'>28.jpg</a>
    <a href='assets/29.jpg'>29.jpg</a>
    <a href='assets/3.jpg'>3.jpg</a>
    <a href='assets/30.jpg'>30.jpg</a>
    <a href='assets/31.jpg'>31.jpg</a>
    <a href='assets/4.jpg'>4.jpg</a>
    <a href='assets/5.jpg'>5.jpg</a>
    <a href='assets/6.jpg'>6.jpg</a>
    <a href='assets/7.jpg'>7.jpg</a>
    <a href='assets/8.jpg'>8.jpg</a>
    <a href='assets/9.jpg'>9.jpg</a>
    <a href='assets/blurbs.csv'>blurbs.csv</a>
    <a href='assets/connections.csv'>connections.csv</a>
  </div>
";
}

?>

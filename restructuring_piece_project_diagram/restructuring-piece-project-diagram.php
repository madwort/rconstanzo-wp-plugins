<?php
/*
Plugin Name: Restructuring Piece/Project Diagram
Plugin URI: http://www.rodrigoconstanzo.com/thesis/
Description: whizzy diagram thing
Version: 0.3
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
	return "<div id='restructuring-piece-project-diagram'></div><script>
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
          drawPieceProjectDiagram('div#restructuring-piece-project-diagram', pieces, connections,
                                  '" . plugins_url( 'assets', __FILE__ ) . "',
                                  width, height);
      });
    });
  </script>
";
}

?>

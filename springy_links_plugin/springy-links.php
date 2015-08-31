<?php
/*
Plugin Name: Springy Links Menu
Plugin URI: http://www.rodrigoconstanzo.com/thesis-introduction/
Description: Springy menu built with d3!
Version: 0.1
Author: MADWORT
Author URI: http://www.madwort.co.uk
*/

function d3_scripts()
{
		wp_register_script( 'd3', plugins_url( '/d3.js', __FILE__ ) );
		wp_enqueue_script( 'd3' );
}
add_action( 'wp_enqueue_scripts', 'd3_scripts' );

function springy_menu_style()
{
    wp_register_style( 'springy-menu-style', plugins_url( '/springy-links.css', __FILE__ ));

    wp_enqueue_style( 'springy-menu-style' );
}
add_action( 'wp_enqueue_scripts', 'springy_menu_style' );

add_shortcode('springy-menu', 'springy_menu_handler');

function springy_menu_handler($atts) {
{
	return "
	<script>

  var width = 500,
      height = 500;

  d3.json('" . plugins_url( 'menu.json', __FILE__ ) . "', function(error, graph) {
    drawMenu(graph);
  });
  
  var node;

  function drawMenu(graph) {
    var force = d3.layout.force()
        .size([width, height])
        .nodes(graph.nodes)
        .links(graph.links)
        .linkDistance(180)
        .charge(-60);

    var svg = d3.select('.entry-content').append('svg')
        .attr('id','springy-menu')
        .attr('width', width)
        .attr('height', height)
        .attr('xlink','http://www.w3.org/1999/xlink');

    var link = svg.selectAll('.link')
      .data(graph.links)
      .enter().append('line')
      .attr('class', 'link');

    node = svg.selectAll('g.node')
      .data(graph.nodes)
      .enter().append('g')
      .attr('class','node');

    function linkify() {
      return node.append('svg:a')
        .attr('xlink:href', function(d){ return '.' + d.url; });
    }

    linkify().append('circle')
      // radius of the circles
      .attr('r', 12);

    linkify().append('text')
      .text(function(d){
        return d.title;
      })
      .attr('class','title');

    linkify().append('text')
      .text(function(d){
        return d.subtitle;
      })
      .attr('class','subtitle');

    node.call(force.drag);

    force.on('tick',function(){
      link.attr('x1', function(d) { return d.source.x; })
          .attr('y1', function(d) { return d.source.y; })
          .attr('x2', function(d) { return d.target.x; })
          .attr('y2', function(d) { return d.target.y; });

      d3.selectAll('circle')
          .attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; });

      d3.selectAll('text')
          .attr('x', function(d) { return (d.x-(this.getBBox().width/2)); });

      d3.selectAll('text.title')
          .attr('y', function(d) { return (d.y-40); });

      d3.selectAll('text.subtitle')
          .attr('y', function(d) { return (d.y-20); });

    })

    force.start();

  }
  </script>";
}


?>

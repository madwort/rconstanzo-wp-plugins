(function (w, d3) {
  'use strict';
  w.drawPieceProjectDiagram = function (parentName, graph, 
                                        connections, width, height) 
  {
    var object_size = 40;

    var buttonDiv = d3.select(parentName).append('div');

    buttonDiv.append('button')
      .text('Conceptual')
      .attr('id','conceptual')
      .on('click',function(){
        transition_to_layout('conceptual');
      });

    buttonDiv.append('button')
      .text('Temporal')
      .attr('id','temporal')
      .on('click',function(){
        transition_to_layout('temporal');
      });

    buttonDiv.append('button')
      .text('Technological')
      .attr('id','technological')
      .on('click',function(){
        transition_to_layout('technological');
      });

    buttonDiv.append('button')
      .text('Aesthetic')
      .attr('id','aesthetic')
      .on('click',function(){
        transition_to_layout('aesthetic');
      });

    buttonDiv.append('button')
      .text('Draggable')
      .attr('id','draggable')
      .on('click',function(){
        start_draggable_layout();
      });

    buttonDiv.append('button')
      .text('Dump')
      .attr('id','dump')
      .on('click',function(){
        dump_current_layout();
      });

    var svg = d3.select(parentName).append('svg')
        .attr('id','restructuring-piece-project-diagram')
        .attr('width', width)
        .attr('height', height)
        .attr('xlink','http://www.w3.org/1999/xlink');

    function add_title(svgObjects) {
      svgObjects.append('text')
        .text(function(d){
          return d.title;
        })
        .attr('class','title')
        .on('mouseover',function(d){ console.log("BOO!"); })
        ;
    }

    var piece = svg.selectAll('g.piece')
      .data(graph)
      .enter().append('g')
      .attr('class','piece')
      .attr('id', function(d) { return d.id; });

    piece.append('circle')
      // radius of the circles
      .attr('r', object_size/2)
      .attr('id', function(d) { return d.id; });

    add_title(piece);

    var force1;

    function create_draggable_layout() {
      // create container for dumps
      d3.select('svg#restructuring-piece-project-diagram').attr('style','float:left');
      var dump_header = d3.select('body').append('table').attr('style','float:left;').attr('id','dump').append('tr');
      dump_header.append('th').text('id');
      dump_header.append('th').text('x');
      dump_header.append('th').text('y');

      force1 = d3.layout.force()
          .size([width, height])
          .nodes(graph)
          .links(connections);

      force1.on('tick',function(){
        var myParent = d3.select('svg#restructuring-piece-project-diagram');

        myParent.selectAll('g.piece circle')
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; });

        myParent.selectAll('text')
            .attr('x', function(d) { return (d.x-(this.getBBox().width/2)); })
            .attr('y', function(d) { return d.y; });
      })

    }

    create_draggable_layout();

    function start_draggable_layout() {
      piece.call(force1.drag);
      force1.start();
    }

    function stop_draggable_layout() {
      piece.on('mousedown.drag', null);
      force1.stop();
    }

    function transition_to_layout(target_layout) {

      stop_draggable_layout();

      function get_layout_for_state(d) {
        return d.layouts[target_layout];
      }

      function get_state_x(d) {
        return get_layout_for_state(d).x;
      }

      function get_state_y(d) {
        return get_layout_for_state(d).y;
      }

      var myparent = d3.select('svg#restructuring-piece-project-diagram');

      myparent.selectAll('g').transition()
        .attr('x', get_state_x)
        .attr('y', get_state_y);

      myparent.selectAll('g.piece circle').transition()
        .attr('cx', get_state_x)
        .attr('cy', get_state_y);

      myparent.selectAll('g text').transition()
        .attr('x', function(d) { return (get_state_x(d)-(this.getBBox().width/2)); })
        .attr('y', get_state_y);

    }

    transition_to_layout('conceptual');

  };
} )( window, d3 );

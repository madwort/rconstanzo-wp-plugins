(function (w, d3) {
  'use strict';
  w.drawPieceProjectDiagram = function (parentName, nodes, 
                                        links, width, height) 
  {
    var object_size = 40;

    var buttonDiv = d3.select(parentName).append('div');

    var nodeMap = d3.map(nodes, function(d) { return d.id; });

    links.forEach(function (d){
      d.source = nodeMap.get(d.source);
      d.target = nodeMap.get(d.target);
    })

    var CONCEPTUAL = 1;
    var TEMPORAL = 2;
    var TECHNICAL = 3;
    var AESTHETIC = 4;

    buttonDiv.append('button')
      .text('Conceptual')
      .attr('id','conceptual')
      .on('click',function(){
        transition_to_layout(CONCEPTUAL);
      });

    buttonDiv.append('button')
      .text('Temporal')
      .attr('id','temporal')
      .on('click',function(){
        transition_to_layout(TEMPORAL);
      });

    buttonDiv.append('button')
      .text('Technological')
      .attr('id','technological')
      .on('click',function(){
        transition_to_layout(TECHNICAL);
      });

    buttonDiv.append('button')
      .text('Aesthetic')
      .attr('id','aesthetic')
      .on('click',function(){
        transition_to_layout(AESTHETIC);
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

    var node;

    var force1;

    function move_to_centre(n) {
      n.x += (n.centre.x - n.x) * 0.1;
      n.y += (n.centre.y - n.y) * 0.1;
    }

    var centre_of_gravity = { 'x': (width/2), 'y': (height/2)};
    var centre_of_oblivios = { 'x': 1, 'y': 1}

    d3.select('svg#restructuring-piece-project-diagram').attr('style','float:left');
    var dump_header = d3.select('body').append('table').attr('style','float:left;').attr('id','dump').append('tr');
    dump_header.append('th').text('id');
    dump_header.append('th').text('x');
    dump_header.append('th').text('y');

    force1 = d3.layout.force()
        .size([width, height])
        .nodes(nodes)
        .links(links)
        .gravity(0)
        .charge(-200)
        .linkDistance(100);

    force1.on('tick',function(){
      nodes.forEach(function (n){
        move_to_centre(n);
      })

      var myParent = d3.select('svg#restructuring-piece-project-diagram');

      myParent.selectAll('g.node circle')
          .attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; });

      myParent.selectAll('text')
          .attr('x', function(d) { return (d.x-(this.getBBox().width/2)); })
          .attr('y', function(d) { return d.y; });

      myParent.selectAll('.link')
          .attr('x1', function(d) { return d.source.x; })
          .attr('y1', function(d) { return d.source.y; })
          .attr('x2', function(d) { return d.target.x; })
          .attr('y2', function(d) { return d.target.y; });

    });

    force1.start();

    function transition_to_layout(target_layout) {

      console.log("all links", links.length);
      var my_links = links.filter(function (d) {
        return parseInt(d.mode) == target_layout;
      })
      
      console.log("filtered links",my_links.length);
      var link_lines = svg.selectAll('.link')
                          .data(my_links)
                          .enter().append('line')
                          .attr('class','link');

      var node = svg.selectAll('g.node')
        .data(nodes)
        .enter().append('g')
        .attr('class','node')
        .attr('id', function(d) { return d.id; });

      node.append('circle')
        // radius of the circles
        .attr('r', object_size/2)
        .attr('id', function(d) { return d.id; });

      add_title(node);

      force1.links(my_links);
      node.call(force1.drag);

      // off-screen centre of gravity for irrelevant nodes
      nodes.forEach(function(d) {
        if (my_links.some(
          function (l) {
            return d.id == l.source.id || d.id == l.target.id;
          })) 
        {
          d.centre = centre_of_gravity;
        } else {
          d.centre = centre_of_oblivios;
          console.log('oblivios ',d.title);
        }
      });

      // stop_draggable_layout();
      //
      // function get_layout_for_state(d) {
      //   return d.layouts[target_layout];
      // }
      //
      // function get_state_x(d) {
      //   return get_layout_for_state(d).x;
      // }
      //
      // function get_state_y(d) {
      //   return get_layout_for_state(d).y;
      // }
      //
      // var myparent = d3.select('svg#restructuring-piece-project-diagram');
      //
      // myparent.selectAll('g').transition()
      //   .attr('x', get_state_x)
      //   .attr('y', get_state_y);
      //
      // myparent.selectAll('g.node circle').transition()
      //   .attr('cx', get_state_x)
      //   .attr('cy', get_state_y);
      //
      // myparent.selectAll('g text').transition()
      //   .attr('x', function(d) { return (get_state_x(d)-(this.getBBox().width/2)); })
      //   .attr('y', get_state_y);

    }

    transition_to_layout(CONCEPTUAL);

  };
} )( window, d3 );

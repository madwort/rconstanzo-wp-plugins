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

    function make_button(button_name, key) {
      buttonDiv.append('button')
        .text(button_name)
        .attr('id',button_name.toLowerCase())
        .on('click',function(){
          transition_to_layout(key);
        });
    }

    make_button('Conceptual', CONCEPTUAL);
    make_button('Temporal',TEMPORAL);
    make_button('Technological',TECHNICAL);
    make_button('Aesthetic',AESTHETIC);

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

    d3.select('svg#restructuring-piece-project-diagram')
      .attr('style','float:left');
    var dump_header = 
      d3.select('body').append('table')
        .attr('style','float:left;')
        .attr('id','dump')
        .append('tr');
    dump_header.append('th').text('id');
    dump_header.append('th').text('x');
    dump_header.append('th').text('y');

    force1 = d3.layout.force()
        .size([width, height])
        .nodes(nodes)
        .links(links)
        .gravity(0.1)
        .charge(-200)
        .linkDistance(100);

    force1.on('tick',function(){

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
        // console.log(parseInt(d.mode), target_layout,
        //             parseInt(d.mode) == target_layout);
        return parseInt(d.mode) == target_layout;
      })
      console.log("filtered links",my_links.length);
      
      // off-screen centre of gravity for irrelevant nodes
      var my_nodes = nodes.filter(function(d) {
        if (my_links.some(
          function (l) {
            return d.id == l.source.id || d.id == l.target.id;
          })) 
        {
          return true;
        } else {
          return false;
        }
      });
      console.log('node count', my_nodes.length);

      var link_lines = svg.selectAll('.link')
                          .data(my_links)
                          .enter().append('line')
                          .attr('class','link');

      var node = svg.selectAll('g.node')
        .data(my_nodes)
        .enter().append('g')
        .attr('class','node')
        .attr('id', function(d) { return d.id; });

      node.append('circle')
        // radius of the circles
        .attr('r', object_size/2)
        .attr('id', function(d) { return d.id; });

      add_title(node);

      force1.nodes(my_nodes).links(my_links);
      node.call(force1.drag);

      // give the layout a kick so that it doesn't break after a while
      force1.alpha(0.2);

    }

    transition_to_layout(CONCEPTUAL);

  };
} )( window, d3 );

function drawPieceProjectDiagram(parentName, graph, width, height) {
  var state = "conceptual";

  var svg = d3.select(parentName).append('svg')
      .attr('id','restructuring-piece-project-diagram')
      .attr('width', width)
      .attr('height', height)
      .attr('xlink','http://www.w3.org/1999/xlink');

  function get_state_x(d) {
    return d.layouts[state].large.x;
  }

  function get_state_y(d) {
    return d.layouts[state].large.y;
  }

  function add_title(svgObjects) {
    svgObjects.append('text')
      .text(function(d){
        return d.title;
      })
      .attr('class','title')
      .attr('x', function(d) { return (get_state_x(d)-(this.getBBox().width/2)); })
      .attr('y', get_state_y)
      .on('mouseover',function(d){ console.log("BOO!"); });
  }

  var piece = svg.selectAll('g.piece')
    .data(graph.pieces)
    .enter().append('g')
    .attr('class','piece')
    .attr('id', function(d) { return d.id; })
    .attr('x', get_state_x)
    .attr('y', get_state_y);

  piece.append('circle')
    // radius of the circles
    .attr('r', 50)
    .attr('cx', get_state_x)
    .attr('cy', get_state_y);

  add_title(piece);

  var project = svg.selectAll('g.project')
    .data(graph.projects)
    .enter().append('g')
    .attr('class','project')
    .attr('id', function(d) { return d.id; })
    .attr('x', get_state_x)
    .attr('y', get_state_y);

  project.append('rect')
    .attr('x', function(d) { return get_state_x(d)-50; })
    .attr('y', function(d) { return get_state_y(d)-50; })
    .attr('width',100)
    .attr('height',100)
    .attr('transform', function(d) { return 'rotate(-45 '+ get_state_x(d) + ' ' + get_state_y(d) + ')'; });

  add_title(project);

  var concept = svg.selectAll('g.concept')
    .data(graph.concepts)
    .enter().append('g')
    .attr('class','concept')
    .attr('id', function(d) { return d.id; })
    .attr('x', get_state_x)
    .attr('y', get_state_y);

  concept.append('rect')
    .attr('x', function(d) { return get_state_x(d)-50; })
    .attr('y', function(d) { return get_state_y(d)-50; })
    .attr('width',100)
    .attr('height',100)
    .attr('rx', 10)
    .attr('ry', 10);

  add_title(concept);

  // d3.selectAll("g.piece").transition().duration(5000).attr('x', function(d) { return ( d.x + 100); });
  // d3.selectAll("g.piece circle").transition().duration(5000).attr('cx', function(d) { return ( d.x + 100); });
  // d3.selectAll("g.piece text").transition().duration(5000).attr('x', function(d) { return (d.x-(this.getBBox().width/2) + 100); });

};

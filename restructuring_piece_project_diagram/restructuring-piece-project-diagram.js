function drawPieceProjectDiagram(parentName, graph, width, height) {
  var state = 'conceptual';

  var buttonDiv = d3.select(parentName).append('div');

  buttonDiv.append('button')
    .text('Conceptual')
    .on('click',function(){
      transition_to_layout('conceptual');
    });

  buttonDiv.append('button')
    .text('Temporal')
    .on('click',function(){
      transition_to_layout('temporal');
    });

  var svg = d3.select(parentName).append('svg')
      .attr('id','restructuring-piece-project-diagram')
      .attr('width', width)
      .attr('height', height)
      .attr('xlink','http://www.w3.org/1999/xlink');

  function get_layout_for_state(d) {
    return d.layouts[state].large;
  }

  function get_state_x(d) {
    return get_layout_for_state(d).x;
  }

  function get_state_y(d) {
    return get_layout_for_state(d).y;
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
    .attr('id', function(d) { return d.id; });

  piece.append('circle')
    // radius of the circles
    .attr('r', 50);

  add_title(piece);

  var project = svg.selectAll('g.project')
    .data(graph.projects)
    .enter().append('g')
    .attr('class','project')
    .attr('id', function(d) { return d.id; });

  project.append('rect')
    .attr('width',100)
    .attr('height',100);

  add_title(project);

  var concept = svg.selectAll('g.concept')
    .data(graph.concepts)
    .enter().append('g')
    .attr('class','concept')
    .attr('id', function(d) { return d.id; });

  concept.append('rect')
    .attr('width',100)
    .attr('height',100)
    .attr('rx', 10)
    .attr('ry', 10);

  add_title(concept);

  function transition_to_layout(target_layout) {
    state = target_layout;

    d3.selectAll('g').transition()
      .attr('x', get_state_x)
      .attr('y', get_state_y);

    d3.selectAll('g.piece circle').transition()
      .attr('cx', get_state_x)
      .attr('cy', get_state_y);

    d3.selectAll('g.project rect').transition()
      .attr('x', function(d) { return get_state_x(d)-50; })
      .attr('y', function(d) { return get_state_y(d)-50; })
      .attr('transform', function(d) { return 'rotate(-45 '+ get_state_x(d) + ' ' + get_state_y(d) + ')'; });

    d3.selectAll('g.concept rect').transition()
      .attr('x', function(d) { return get_state_x(d)-50; })
      .attr('y', function(d) { return get_state_y(d)-50; });

    d3.selectAll('g text').transition()
      .attr('x', function(d) { return (get_state_x(d)-(this.getBBox().width/2)); })
      .attr('y', get_state_y);

  }

  transition_to_layout('conceptual');

};

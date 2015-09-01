function drawPieceProjectDiagram(parentName, graph, width, height) {
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
      .on('mouseover',function(d){ console.log("BOO!"); });
  }

  var piece = svg.selectAll('g.piece')
    .data(graph.pieces)
    .enter().append('g')
    .attr('class','piece')
    .attr('id', function(d) { return d.id; });

  piece.append('circle')
    // radius of the circles
    .attr('r', object_size/2);

  add_title(piece);

  var project = svg.selectAll('g.project')
    .data(graph.projects)
    .enter().append('g')
    .attr('class','project')
    .attr('id', function(d) { return d.id; });

  project.append('rect')
    .attr('width',object_size)
    .attr('height',object_size);

  add_title(project);

  var concept = svg.selectAll('g.concept')
    .data(graph.concepts)
    .enter().append('g')
    .attr('class','concept')
    .attr('id', function(d) { return d.id; });

  concept.append('rect')
    .attr('width',object_size)
    .attr('height',object_size)
    .attr('rx', object_size/10)
    .attr('ry', object_size/10);

  add_title(concept);

  function transition_to_layout(target_layout) {
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

    myparent.selectAll('g.project rect').transition()
      .attr('x', function(d) { return get_state_x(d)-(object_size/2); })
      .attr('y', function(d) { return get_state_y(d)-(object_size/2); })
      .attr('transform', function(d) { return 'rotate(-45 '+ get_state_x(d) + ' ' + get_state_y(d) + ')'; });

    myparent.selectAll('g.concept rect').transition()
      .attr('x', function(d) { return get_state_x(d)-(object_size/2); })
      .attr('y', function(d) { return get_state_y(d)-(object_size/2); });

    myparent.selectAll('g text').transition()
      .attr('x', function(d) { return (get_state_x(d)-(this.getBBox().width/2)); })
      .attr('y', get_state_y);

  }

  transition_to_layout('conceptual');

};

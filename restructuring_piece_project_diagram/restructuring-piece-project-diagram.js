function drawPieceProjectDiagram(parentName, graph, width, height) {
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
      .attr('x', function(d) { return (d.x-(this.getBBox().width/2)); })
      .attr('y', function(d) { return d.y; })
      .on('mouseover',function(d){ console.log("BOO!"); });
  }

  var piece = svg.selectAll('g.piece')
    .data(graph.pieces)
    .enter().append('g')
    .attr('class','piece')
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; });

  piece.append('circle')
    // radius of the circles
    .attr('r', 50)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });

  add_title(piece);

  var project = svg.selectAll('g.project')
    .data(graph.projects)
    .enter().append('g')
    .attr('class','project')
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; });

  project.append('rect')
    .attr('x', function(d) { return d.x-50; })
    .attr('y', function(d) { return d.y-50; })
    .attr('width',100)
    .attr('height',100)
    .attr('rx', 10)
    .attr('ry', 10);

  add_title(project);

  var concept = svg.selectAll('g.concept')
    .data(graph.concepts)
    .enter().append('g')
    .attr('class','concept')
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; });

  concept.append('rect')
    .attr('x', function(d) { return d.x-50; })
    .attr('y', function(d) { return d.y-50; })
    .attr('width',100)
    .attr('height',100)
    .attr('transform', function(d) { return 'rotate(-45 '+ d.x + ' ' + d.y + ')'; });

  add_title(concept);

};

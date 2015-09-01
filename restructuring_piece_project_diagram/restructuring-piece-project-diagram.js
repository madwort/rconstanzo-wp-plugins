function drawPieceProjectDiagram(parentName, graph, width, height) {
  var svg = d3.select(parentName).append('svg')
      .attr('id','restructuring-piece-project-diagram')
      .attr('width', width)
      .attr('height', height)
      .attr('xlink','http://www.w3.org/1999/xlink');

  var node = svg.selectAll('g.node')
    .data(graph.nodes)
    .enter().append('g')
    .attr('class','node')
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; });

  node.append('circle')
    // radius of the circles
    .attr('r', 50)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });

  node.append('text')
    .text(function(d){
      return d.title;
    })
    .attr('class','title')
    .attr('x', function(d) { return (d.x-(this.getBBox().width/2)); })
    .attr('y', function(d) { return d.y; });

};

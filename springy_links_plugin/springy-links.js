function drawSpringyMenu(parentName, graph, width, height) {
  var force = d3.layout.force()
      .size([width, height])
      .nodes(graph.nodes)
      .links(graph.links)
      .linkDistance(180)
      .charge(-60);

  var svg = d3.select(parentName).append('svg')
      .attr('id','springy-menu')
      .attr('width', width)
      .attr('height', height)
      .attr('xlink','http://www.w3.org/1999/xlink');

  var link = svg.selectAll('.link')
    .data(graph.links)
    .enter().append('line')
    .attr('class', 'link');

  var node = svg.selectAll('g.node')
    .data(graph.nodes)
    .enter().append('g')
    .attr('class','node');

  function linkify() {
    return node.append('svg:a')
      .attr('xlink:href', function(d){ return d.url; })
      .attr('target','_blank');
  }

  linkify().append('circle')
    // radius of the circles
    .attr('r', 10);

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

    var myParent = d3.select(parentName).select('#springy-menu');

    myParent.selectAll('circle')
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });

    myParent.selectAll('text')
        .attr('x', function(d) { return (d.x-(this.getBBox().width/2)); });

    myParent.selectAll('text.title')
        .attr('y', function(d) { return (d.y-40); });

    myParent.selectAll('text.subtitle')
        .attr('y', function(d) { return (d.y-20); });

  });

  force.start();

}

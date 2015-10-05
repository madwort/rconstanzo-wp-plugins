(function (w, d3) {
  'use strict';
  w.drawPieceProjectDiagram = function (parentName,
                                        nodes, links,
                                        assets_path,
                                        width, height)
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
        // .attr('style','float:left')
        .attr('xlink','http://www.w3.org/1999/xlink');

    var defs = svg.append('defs')

    for (var i = 1; i < 16; i++) {
        defs.append('pattern')
            .attr('id','image'+i)
            .attr('width','40')
            .attr('height','40')
            .attr('patternUnits','userSpaceOnUse')
            .append('image')
            .attr('x','0')
            .attr('y','0')
            .attr('width','40')
            .attr('height','40')
            .attr('xlink:href',assets_path + i + ".jpg");
    }

    var metadata_container = 
        d3.select(parentName).append('div').attr('id','metadata_container');

    var metadata_display = 
        metadata_container.append('div').attr('id','metadata');
    metadata_display.append('h2').text('Metadata');

    var connection_metadata_display = 
        metadata_container.append('div').attr('id','metadata_connections');
    connection_metadata_display.append('h3').text('Connections');

    function add_title(svgObjects) {
      svgObjects.append('text')
        .text(function(d){
          return d.title;
        })
        .attr('class','title')
        .on('mouseover',function(d){ display_metadata(d); });
    }

    var node;

    var force1;

    force1 = d3.layout.force()
        .size([width, height])
        .nodes(nodes)
        .links(links)
        .gravity(0.1)
        .charge(-200)
        .linkDistance(80);

    force1.on('tick',function(){

      svg.selectAll('g.node circle')
          .attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; });

      svg.selectAll('text')
          .attr('x', function(d) { return (d.x-(this.getBBox().width/2)); })
          .attr('y', function(d) { return d.y; });

      svg.selectAll('.link')
          .attr('x1', function(d) { return d.source.x; })
          .attr('y1', function(d) { return d.source.y; })
          .attr('x2', function(d) { return d.target.x; })
          .attr('y2', function(d) { return d.target.y; });

    });

    force1.start();

    function display_metadata(d) {
      // clean-up old stuff
      metadata_display.selectAll('div').remove();
      metadata_display.selectAll('img').remove();

      metadata_display
          .append('img')
          .attr('src', assets_path +
                      d.id + ".jpg");
      // metadata_display.append('div').style('font-weight','bold').text(d.title);
      metadata_display.select('h2').text(d.title);
      metadata_display.append('div').text(d.type);
      if (d.instrumentation) {
          metadata_display.append('div').text("Date: "+d.date);
      }
      if (d.instrumentation) {
        metadata_display.append('div').text(d.instrumentation);
      }
      metadata_display.append('div').text(d.blurb);
      metadata_display.append('div')
                      .append('a').attr('href',d.page).text(d.page);
      metadata_display.append('div').text(d.comments);
      metadata_display.append('div')
                      .append('a') .attr('href',d.video_url).text(d.video_url);

      connection_metadata_display.selectAll('div').remove();
      force1.links()
        .filter(
          function(l) {
            return ((l.target.id == d.id) || (l.source.id == d.id));
          }
        )
        .forEach(
          function (l) {
            connection_metadata_display
              .append('div')
              .text(
                ((l.target.id == d.id)? l.source.title: l.target.title ) + 
                " - " + l.text);
          }
        );
    }

    function transition_to_layout(target_layout) {

      console.log("all links", links.length);
      var my_links = links.filter(function (d) {
        // console.log(parseInt(d.mode), target_layout,
        //             parseInt(d.mode) == target_layout);
        return parseInt(d.mode) == target_layout;
      })
      console.log("filtered links",my_links.length);
      
      // hide irrelevant nodes
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

      // remove contents of graph & replace with new set
      // just doing .enter() didn't seem to remove links correctly
      svg.selectAll('.link').remove();
      svg.selectAll('.node').remove();

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
        .attr('id', function(d) { return d.id; })
        .attr('class',function(d) { return d.type; })
        .style('fill',function (d) {
            return 'url(#image'+d.id+')';
        })
        .on('mouseover',function(d) { 
            if(metadata_container.style('display') == 'block') return;
            display_metadata(d);
            // console.log(d3.mouse(this)[0], d3.mouse(this)[1]);
            metadata_container
                .style('display','block')
                .style('left',(d3.mouse(this)[0]+10)+"px")
                .style('top',(d3.mouse(this)[1]+10)+"px");
        })
        .on('mouseout',function(d){
            if(metadata_container.style('display') == 'none') return;
            metadata_container.style('display','none');
        });

      // add_title(node);

      force1
        .nodes(my_nodes)
        .links(my_links);

      node.call(force1.drag);

      // give the layout a kick so that it doesn't break after a while
      force1.alpha(0.2);

    }

    transition_to_layout(CONCEPTUAL);

  };
} )( window, d3 );

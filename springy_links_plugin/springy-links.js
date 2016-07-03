(function (w, d3, $) {
  'use strict';
  w.drawSpringyMenu = function (parentName, graph) {
    var elements = d3.selectAll(parentName);

    elements.each(function (e, i) {
      var my_thing = d3.select(this);
      my_thing.attr('id',"id-" + i);
    })
    
    elements = elements.filter(function () {
      return d3.select(this).select('svg').empty();
    })

    drawSpringMenuElement(
      d3.select(elements[0][0]),
      graph,
      elements[0][0].dataset.nodes
    );

    function drawSpringMenuElement(element, graph, node_count) {
      var width = 650;
      var height = 400;

      if(node_count == '2') {
        // manual fix-ups for the 2-node graph
        height = 200;
        graph.nodes = graph.nodes.filter(function (n) {
          if (n.id == "decisions" || n.id == "glove") {
            return true;
          } else {
            return false;
          }
        });
        graph.links = [{source: 0, target: 1}];
      }

      var force = d3.layout.force()
          .size([width, height])
          .nodes(graph.nodes)
          .links(graph.links)
          .linkDistance(180)
          .charge(-10);

      var svg = element.append('svg')
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
          var home_url = 
            $('#menu-main-menu #menu-item-20 a').first()
            .attr('href');
          var file_type_urls = false;
          if (home_url.indexOf('index.html') >= 0) {
            file_type_urls = true;
            home_url = home_url.replace('index.html','')
            .replace('/rodrigoconstanzo.com/','/www.rodrigoconstanzo.com/');
          }

          return node.append('svg:a')
            .attr('xlink:href', 
                   function(d){ 
                     var full_url = home_url + d.url;
                     console.log("home_url", home_url);
                     if (file_type_urls && d.url.substring(-1,1) == '/') {
                       full_url += 'index.html';
                     }
                     console.log("full_url", full_url);
                     return full_url;
                   }
                 )
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

        var myParent = element.select('#springy-menu');

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

      function make_menu_move() {
        // if we scroll the viewplane, restart the force layout
        force.alpha(0.6);
      }

      $(w).scroll(function () {
        make_menu_move();
      })

      $(parentName).mouseover(function(event) {
        make_menu_move();
      });
    }

  }
} )( window, d3, jQuery );

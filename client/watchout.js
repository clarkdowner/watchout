var svg = d3.select('svg'),
  width = +svg.attr( 'width'),
  height = +svg.attr( 'height');


var update = function(values) {

  values = d3.range(20).map(function() { return Math.random() * 720; });

  var circle = svg.selectAll('circle')
    .data(values);

  // update
  circle.transition()
    .duration(1000)
    .attr('cx', function(d) { return randomCoOrdX(); })
    .attr('cy', function(d) { return randomCoOrdY(); });

  // enter
  circle.enter().append('circle')
    .attr('class', 'obstacle')
    .attr('cx', function(d) { return randomCoOrdX(); })
    .attr('cy', function(d) { return randomCoOrdY(); })
    .attr('r', 10)
    .attr('style', 'fill:steelblue;');

  // exit
  circle.exit().remove();
};

  // <rect x="10" y="10" width="100" height="100"/>

var playerUpdate = function() {
  
  values = [1];

  var rect = svg.selectAll('rect')
    .data(values);

  // update
  // circle.transition()
  //   .duration(1000)
  //   .attr('cx', function(d) { return randomCoOrdX(); })
  //   .attr('cy', function(d) { return randomCoOrdY(); });

  // enter
  rect.enter().append('rect')
    .attr('class', 'player')
    .attr('x', 350)
    .attr('y', 290)
    .attr('width', 20)
    .attr('height', 20);
    //.attr('style', 'fill:yellow;');

  // exit
  rect.exit().remove();
};


var randomCoOrdX = function() {
  return Math.random() * 720;
};

var randomCoOrdY = function() {
  return Math.random() * 600;
};


update();
playerUpdate();
setInterval(update, 1500);

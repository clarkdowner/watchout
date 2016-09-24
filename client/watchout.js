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
    .attr('cx', function(d) { return randomCoOrdX(); })
    .attr('cy', function(d) { return randomCoOrdY(); })
    .attr('r', 10)
    .attr('style', 'fill:steelblue;');

  // exit
  circle.exit().remove();
};


var randomCoOrdX = function() {
  return Math.random() * 720;
};

var randomCoOrdY = function() {
  return Math.random() * 600;
};


update();
setInterval(update, 1500);

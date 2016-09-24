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


var playerUpdate = function() {

  svg
  .selectAll('rect')
  .data([1])
  .enter()
  .append('rect')
  .style('fill', 'blue')     
  .attr('class', 'player')
  .attr('x', 350)
  .attr('y', 290)
  .attr('width', 20)
  .attr('height', 20);

  svg
  .selectAll('rect')
  .call(d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended));

};


// helpers

var randomCoOrdX = function() {
  return Math.random() * 720;
};

var randomCoOrdY = function() {
  return Math.random() * 600;
};

var dragstarted = function(d) {
  d3.select(this).raise().classed('active', true);
};

var dragged = function(d) {
  d3.select(this).attr('x', d.x = d3.event.x).attr('y', d.y = d3.event.y);
};

var dragended = function(d) {
  d3.select(this).classed('active', false);
};


// invocations
update();
playerUpdate();
setInterval(update, 1500);


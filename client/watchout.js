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
    .attr('cx', function(d, i) { 
      var xCoord = randomCoOrdX();
      enemyObj[i]['prev'][0] = enemyObj[i]['curr'][0];
      enemyObj[i]['curr'][0] = xCoord;
      return xCoord; 
    })
    .attr('cy', function(d, i) {
      var yCoord = randomCoOrdY();
      enemyObj[i]['prev'][1] = enemyObj[i]['curr'][1];
      enemyObj[i]['curr'][1] = yCoord;
      return yCoord; 
    }); 
    // .tween( function () { d3.select(this).attr('cx') });

  // enter
  circle.enter().append('circle')
    .attr('class', 'obstacle')
    .attr('cx', function(d, i) { 
      var xCoord = randomCoOrdX();
      enemyObj[i] = {};
      enemyObj[i]['prev'] = [ , ];
      enemyObj[i]['curr'] = [xCoord];
      return xCoord; 
    })
    .attr('cy', function(d, i) { 
      var yCoord = randomCoOrdY();
      enemyObj[i]['prev'] = [ , ];
      enemyObj[i]['curr'].push(yCoord);
      return yCoord; 
    })
    .attr('r', 10)
    .attr('style', 'fill:steelblue;');

  // exit
  circle.exit().remove();
};

var enemyObj = {};
var playerObj = {
  'x': 350,
  'y': 290
  
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

// collision detection


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
  //console.log(d3.event.x, d3.event.y);
  playerObj['x'] = d3.event.x;
  playerObj['y'] = d3.event.y;
};

var dragended = function(d) {
  d3.select(this).classed('active', false);
};

var checkCollision = function(player, enemy) {
  //player x, y
  // enemy prev x, y
  // enemy curr x, y
  var result = false;
  var duration = 1500;
  var time = 250;
  var start = [];
  start[0][0] = enemy.prev[0];
  start[0][1] = enemy.prev[1];
  var end = [];
  end[0][0] = enemy.curr[0];
  end[0][1] = enemy.curr[1];
  var xDistance = start[0][0] - end[0][0];
  var yDistance = start[0][1] - end[0][1];

  for (let i = 0; i < duration / time; i++) {
    setTimout(function() {
      var xDiff = Math.abs(start[0][0] - end[0][0]);
      var yDiff = Math.abs(start[0][1] - end[0][1]);
      if (yDiff + xDiff < 10) {
        console.log('collision');
        return true;
      } if (i < (1000 / time)) {
        start[0][0] += (time / duration) * xDistance;
        start[0][1] += (time / duration) * yDistance;
      }
    }, time);
  }

  return result;
};

var onCollision = function() {

};

var checkForAnyCollision = function(player, enemies) {
  var result = false;
  enemies.forEach(function(val, key, col) {
    if (checkCollision(player, val)) {
      result = true;
    }
  });
  return result;
};



var enemies = d3.selectAll('circle');

// setInterval(checkForAnyCollision(), 250);

// invocations
update();
playerUpdate();
setInterval(update, 1500);


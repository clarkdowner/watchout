var svg = d3.select('svg'),
  width = +svg.attr( 'width'),
  height = +svg.attr( 'height');



var update = function(values) {


  values = d3.range(3).map(function() { return Math.random() * 720; });
  var t = d3.transition()
    .duration(1000);

  var circle = svg.selectAll('circle')
    .data(values);


  // circle.style('fill', 'steelblue');
  // circle.attr('r', 30);


  circle.transition()
    .duration(1000)
    .attr('cx', function(d) { return randomCoOrdX(); })
    .attr('cy', function(d) { return randomCoOrdY(); });
  
  

  // update
  // circle.attr('cx', function(d) { return d; })

  //   .transition(t);
  //   myRand = randomCoOrd()

  // enter
  circle.enter().append('circle')
    .attr('cx', function(d) { return randomCoOrdX(); })
    .attr('cy', function(d) { return randomCoOrdY(); })
    .attr('r', 30)
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



update([1, 2, 3]);



setInterval(update, 1500);

// -------------------------




// (function() {

//   function dance() {
//   var circle = d3.selectAll('#circle-dance circle'),
//     span = d3.selectAll('.circle-dance-x'),
//     data = d3.range(3).map(function() { return Math.random() * 720; });

//     circle.data(data).attr('cx', function(d) { return d; });
//     span.data(data).text(function(d) { return d; });
//   }

//   dance();
//   setInterval(dance, 2500);

// })();

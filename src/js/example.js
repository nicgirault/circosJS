var width = 720,
height = 720,
outerRadius = Math.min(width, height) / 2 - 10,
innerRadius = outerRadius - 24;
 

var data = [1, 2, 3, 4, 2, 3, 4, 5, 3, 4, 5, 6, 4, 5, 6, 7];
var chart = circularHeatChart().innerRadius(100).numSegments(4).range(["white", "red"]);
d3.select('#chart')
    .selectAll('svg')
    .data([data])
    .enter()
    .append('svg')
    .call(chart);
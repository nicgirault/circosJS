var width = 720,
height = 720,
outerRadius = Math.min(width, height) / 2 - 10,
innerRadius = outerRadius - 24,
pi = Math.PI;

var data = [
    {start: 0, end: pi/3, color: '#cccccc'},
    {start: pi/2, end: pi, color: '#666666'},
];
var chart = layout()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .numSegments(4).range(["white", "red"]);
d3.select('#chart')
    .selectAll('svg')
    .data([data])
    .enter()
    .append('svg')
        .attr("width", width)
        .attr("height", height)
    .call(chart);
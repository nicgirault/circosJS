var width = 720,
height = 720,
outerRadius = Math.min(width, height) / 2 - 10,
innerRadius = outerRadius - 24,
pi = Math.PI;

var data = [
    {len: 2, color: '#cccccc'},
    {len: 3, color: '#bbbbbb'},
    {len: 4, color: '#aaaaaa'},
    {len: 1, color: '#999999'},
];
var chart = layout()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .gap(0.05).gapUnit('rad');
d3.select('#chart')
    .selectAll('svg')
    .data([data])
    .enter()
    .append('svg')
        .attr("width", width)
        .attr("height", height)
    .call(chart);
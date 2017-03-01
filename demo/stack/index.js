var circos = new Circos({
  container: '#chart'
});

var drawCircos = function(error, GRCh37, rawData) {

  data = rawData.map(function(d){
    return [
      d.sourceId,
      parseInt(d.start),
      parseInt(d.end),
      1
    ];
  });

  circos
    .layout(
      {
        ticks: {display: true},
      },
      GRCh37
    )
    .stack('stack', {
      innerRadius: 100,
      outerRadius: 150,
      thickness: 5,
      direction: 'out'
    }, data)
    .render();
};

d3.queue()
  .defer(d3.json, "GRCh37.json")
  .defer(d3.csv, "data2.csv")
  .await(drawCircos);

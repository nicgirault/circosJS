
var drawCircos = function(error, GRCh37, data) {
  var circos = new circosJS({
    container: '#chart'
  });

  data = data.map(function(d){
    return [
      d.source_id,
      parseInt(d.source_breakpoint) - 2000000,
      parseInt(d.source_breakpoint) + 2000000,
      d.target_id,
      parseInt(d.target_breakpoint) - 2000000,
      parseInt(d.target_breakpoint) + 2000000,
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
    .chord('gene-fusion', {usePalette: false, color: '#fd6a62'}, data)
    .render();
};

queue()
    .defer(d3.json, "/../data/GRCh37.json")
    .defer(d3.csv, "/../data/fusion-genes.csv")
    .await(drawCircos);

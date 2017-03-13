
function drawCircos(error, months, electricalConsumption, daysOff) {
  var width = document.getElementsByClassName('mdl-card__supporting-text')[0].offsetWidth
  var circosHeatmap = new Circos({
        container: '#heatmapChart',
        width: width,
        height: width
    });

    electricalConsumption = electricalConsumption.map(function(d) {
      return {
        block_id: d.month,
        start: parseInt(d.start),
        end: parseInt(d.end),
        value: parseFloat(d.value)
      };
    })
    daysOff = daysOff.map(function(d) {
      return {
        block_id: d.month,
        start: parseInt(d.start),
        end: parseInt(d.end),
        value: parseFloat(d.value)
      };
    })
    circosHeatmap
      .layout(
        months,
        {
          innerRadius: width / 2 - 80,
          outerRadius: width / 2 - 30,
          ticks: {display: false},
          labels: {
            position: 'center',
            display: true,
            size: 14,
            color: '#000',
            radialOffset: 15
          }
        }
      )
      .heatmap('electricalConsumption', electricalConsumption, {
        innerRadius: 0.8,
        outerRadius: 0.98,
        logScale: false,
        color: 'YlOrRd'
      })
      .heatmap('days-off', daysOff, {
        innerRadius: 0.7,
        outerRadius: 0.79,
        logScale: false,
        color: 'Blues'
      })
      .render()
}

d3.queue()
  .defer(d3.json, './data/months.json')
  .defer(d3.csv, './data/electrical-consumption.csv')
  .defer(d3.csv, './data/days-off.csv')
  .await(drawCircos)

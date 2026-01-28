(function() {
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
        color: 'YlOrRd',
        events: {
          'mouseover.demo': function (d, i, nodes, event) {
            console.log(d, i, nodes, event)
          }
        }
      })
      .heatmap('days-off', daysOff, {
        innerRadius: 0.7,
        outerRadius: 0.79,
        logScale: false,
        color: 'Blues'
      })
      .render()
}

// D3 v7: Use Promise.all instead of deprecated d3.queue
Promise.all([
  d3.json('./data/months.json'),
  d3.csv('./data/electrical-consumption.csv'),
  d3.csv('./data/days-off.csv')
]).then(function([months, electricalConsumption, daysOff]) {
  drawCircos(null, months, electricalConsumption, daysOff)
}).catch(function(error) {
  console.error('Error loading data:', error)
})
})();

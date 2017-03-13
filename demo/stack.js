var width = document.getElementsByClassName('mdl-card__supporting-text')[0].offsetWidth
var circos = new Circos({
  container: '#stackChart',
  width: width,
  height: width
})

var gieStainColor = {
  gpos100: 'rgb(0,0,0)',
  gpos: 'rgb(0,0,0)',
  gpos75: 'rgb(130,130,130)',
  gpos66: 'rgb(160,160,160)',
  gpos50: 'rgb(200,200,200)',
  gpos33: 'rgb(210,210,210)',
  gpos25: 'rgb(200,200,200)',
  gvar: 'rgb(220,220,220)',
  gneg: 'rgb(255,255,255)',
  acen: 'rgb(217,47,39)',
  stalk: 'rgb(100,127,164)',
  select: 'rgb(135,177,255)'
}

var drawCircos = function (error, GRCh37, cytobands, segdup) {
  cytobands = cytobands
  .filter(function (d) { return d.chrom === 'chr9' })
  .map(function (d) {
    return {
      block_id: d.chrom,
      start: parseInt(d.chromStart),
      end: parseInt(d.chromEnd),
      gieStain: d.gieStain
    }
  })

  var start = 39000000
  var length = 8000000
  data = segdup.filter(function (d) {
    return d.chr === 'chr9' && d.start >= start && d.end <= start + length
  }).filter(function (d) {
    return d.end - d.start > 30000
  }).map(function (d) {
    d.block_id = d.chr
    d.start -= start
    d.end -= start
    return d
  })

  circos
    .layout(
    [{
      id: 'chr9',
      len: length,
      label: 'chr9',
      color: '#FFCC00'
    }],
    {
      innerRadius: width / 2 - 50,
      outerRadius: width / 2 - 30,
      labels: {
        display: false
      },
      ticks: {display: true, labels: false, spacing: 10000}
    }
    )
    .highlight('cytobands', cytobands, {
      innerRadius: width / 2 - 50,
      outerRadius: width / 2 - 30,
      opacity: 0.8,
      color: function (d) {
        return gieStainColor[d.gieStain]
      }
    })
    .stack('stack', data, {
      innerRadius: 0.7,
      outerRadius: 1,
      thickness: 4,
      margin: 0.01 * length,
      direction: 'out',
      strokeWidth: 0,
      color: function (d) {
        if (d.end - d.start > 150000) {
          return 'red'
        } else if (d.end - d.start > 120000) {
          return '#333'
        } else if (d.end - d.start > 90000) {
          return '#666'
        } else if (d.end - d.start > 60000) {
          return '#999'
        } else if (d.end - d.start > 30000) {
          return '#BBB'
        }
      },
      tooltipContent: function (d) {
        return `${d.block_id}:${d.start}-${d.end}`
      }
    })
    .render()
}

d3.queue()
  .defer(d3.json, './data/GRCh37.json')
  .defer(d3.csv, './data/cytobands.csv')
  .defer(d3.csv, './data/segdup.csv')
  .await(drawCircos)

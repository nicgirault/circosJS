var main = function(error, snp250) {

  snp250 = snp250
    .filter(function (d) {
      return d.chromosome === 'chr2'
    })
    .map(function (d) {
      return {
        block_id: d.chromosome,
        position: (parseInt(d.start) + parseInt(d.end)) / 2,
        value: d.value
      }
    })

  buildCircos('#chart1', snp250, [
    {
      color: 'red',
      position: 0.002
    },
    {
      color: 'green',
      position: 0.013
    }
  ])

  buildCircos('#chart2', snp250, [
    {
      color: '#333333',
      spacing: 0.001,
      opacity: 0.3,
    }
  ])

  buildCircos('#chart3', snp250, [
    {
      color: 'red',
      opacity: 0.3,
      spacing: 0.001,
      end: 0.004
    },
    {
      color: 'green',
      opacity: 0.3,
      spacing: 0.001,
      start: 0.011
    },
    {
      color: '#333333',
      opacity: 0.3,
      spacing: 0.002,
      thickness: 2,
      start: 0.004,
      end: 0.011
    },
    {
      color: '#333333',
      opacity: 0.3,
      spacing: 0.001,
      thickness: 1,
      start: 0.004,
      end: 0.011
    }
  ])
}

var buildCircos = function (container, snp250, axes) {
  var circos = new Circos({
    container: container,
    width: 1000,
    height: 1000
  })

  circos
    .layout(
      [{id: "chr2", color: '#03a9f4', len:243199373}],
    {
      innerRadius: 400,
      outerRadius: 400,
      labels: {display: false},
      ticks: {display: false}
    }
    )
    .line('snp-250', snp250, {
      innerRadius: 0.5,
      outerRadius: 0.8,
      min: 0,
      max: 0.015,
      color: '#222222',
      axes: axes,
    })
    .render()
}

d3.queue()
  .defer(d3.csv, '../data/snp.density.250kb.txt')
  .await(main)

var width = document.getElementsByClassName('mdl-card__supporting-text')[0].offsetWidth
var circosScatter = new Circos({
  container: '#scatterChart',
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

var drawCircos = function (error, GRCh37, cytobands, snp250, snp, snp1m) {
  GRCh37 = GRCh37.filter(function (d) {
    return d.id === 'chr1' || d.id === 'chr2' || d.id === 'chr3'
  })

  cytobands = cytobands
  .filter(function (d) {
    return d.chrom === 'chr1' || d.chrom === 'chr2' || d.chrom === 'chr3'
  })
  .map(function (d) {
    return {
      block_id: d.chrom,
      start: parseInt(d.chromStart),
      end: parseInt(d.chromEnd),
      gieStain: d.gieStain,
      name: d.name
    }
  })

  snp250 = snp250.map(function (d) {
    return {
      block_id: d.chromosome,
      position: (parseInt(d.start) + parseInt(d.end)) / 2,
      value: d.value
    }
  })

  snp = snp.map(function (d) {
    return {
      block_id: d.chromosome,
      position: (parseInt(d.start) + parseInt(d.end)) / 2,
      value: d.value
    }
  })

  snp1m = snp1m.map(function (d) {
    return {
      block_id: d.chromosome,
      position: (parseInt(d.start) + parseInt(d.end)) / 2,
      value: d.value
    }
  })

  circosScatter
    .layout(
      GRCh37,
    {
      innerRadius: width/2 - 150,
      outerRadius: width/2 - 130,
      ticks: {
        display: false,
        spacing: 1000000,
        labelSuffix: ''
      },
      labels: {
        position: 'center',
        display: true,
        size: 14,
        color: '#000',
        radialOffset: 30
      }
    }
    )
    .highlight('cytobands', cytobands, {
      innerRadius: width/2 - 150,
      outerRadius: width/2 - 130,
      opacity: 0.8,
      color: function (d) {
        return gieStainColor[d.gieStain]
      },
      tooltipContent: function (d) {
        return d.name
      }
    })
    .scatter('snp-250', snp250, {
      innerRadius: 0.65,
      outerRadius: 0.95,
      color: function (d) {
        if (d.value > 0.006) { return '#4caf50' }
        if (d.value < 0.002) { return '#f44336' }
        return '#d3d3d3'
      },
      strokeColor: 'grey',
      strokeWidth: 1,
      shape: 'circle',
      size: 14,
      min: 0,
      max: 0.013,
      axes: [
        {
          spacing: 0.001,
          start: 0.006,
          thickness: 1,
          color: '#4caf50',
          opacity: 0.3
        },
        {
          spacing: 0.002,
          start: 0.006,
          thickness: 1,
          color: '#4caf50',
          opacity: 0.5
        },
        {
          spacing: 0.002,
          start: 0.002,
          end: 0.006,
          thickness: 1,
          color: '#666',
          opacity: 0.5
        },
        {
          spacing: 0.001,
          end: 0.002,
          thickness: 1,
          color: '#f44336',
          opacity: 0.5
        }
      ],
      backgrounds: [
        {
          start: 0.006,
          color: '#4caf50',
          opacity: 0.1
        },
        {
          start: 0.002,
          end: 0.006,
          color: '#d3d3d3',
          opacity: 0.1
        },
        {
          end: 0.002,
          color: '#f44336',
          opacity: 0.1
        }
      ],
      tooltipContent: function (d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.value}`
      }
    })
    .scatter('snp-250-2', snp250.filter(function (d) { return d.value > 0.007 }), {
      color: '#4caf50',
      strokeColor: 'green',
      strokeWidth: 1,
      shape: 'rectangle',
      size: 10,
      min: 0.007,
      max: 0.013,
      innerRadius: 1.075,
      outerRadius: 1.175,
      axes: [
        {
          spacing: 0.001,
          thickness: 1,
          color: '#4caf50',
          opacity: 0.3
        },
        {
          spacing: 0.002,
          thickness: 1,
          color: '#4caf50',
          opacity: 0.5
        }
      ],
      backgrounds: [
        {
          start: 0.007,
          color: '#4caf50',
          opacity: 0.1
        },
        {
          start: 0.009,
          color: '#4caf50',
          opacity: 0.1
        },
        {
          start: 0.011,
          color: '#4caf50',
          opacity: 0.1
        },
        {
          start: 0.013,
          color: '#4caf50',
          opacity: 0.1
        }
      ],
      tooltipContent: function (d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.value}`
      }
    })
    .scatter('snp-250-3', snp250.filter(function (d) { return d.value < 0.002 }), {
      color: '#f44336',
      strokeColor: 'red',
      strokeWidth: 1,
      shape: 'triangle',
      size: 10,
      min: 0,
      max: 0.002,
      innerRadius: 0.35,
      outerRadius: 0.60,
      axes: [
        {
          spacing: 0.0001,
          thickness: 1,
          color: '#f44336',
          opacity: 0.3
        },
        {
          spacing: 0.0005,
          thickness: 1,
          color: '#f44336',
          opacity: 0.5
        }
      ],
      backgrounds: [
        {
          end: 0.0004,
          color: '#f44336',
          opacity: 0.1
        },
        {
          end: 0.0008,
          color: '#f44336',
          opacity: 0.1
        },
        {
          end: 0.0012,
          color: '#f44336',
          opacity: 0.1
        },
        {
          end: 0.0016,
          color: '#f44336',
          opacity: 0.1
        },
        {
          end: 0.002,
          color: '#f44336',
          opacity: 0.1
        }
      ],
      tooltipContent: function (d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.value}`
      }
    })
    .render()
}

d3.queue()
  .defer(d3.json, './data/GRCh37.json')
  .defer(d3.csv, './data/cytobands.csv')
  .defer(d3.csv, './data/snp.density.250kb.txt')
  .defer(d3.csv, './data/snp.density.txt')
  .defer(d3.csv, './data/snp.density.1mb.txt')
  .await(drawCircos)

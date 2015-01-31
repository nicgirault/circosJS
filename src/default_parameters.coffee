# Circos
circosJS.Core.prototype._conf =
    width: 700
    height: 700
    container: 'circos'

# Layout
circosJS.Layout.prototype._defaultConf =
  innerRadius: 250
  outerRadius: 300
  cornerRadius: 10
  gap: 0.04 # in radian
  labels:
    position: 'center'
    display: true
    size: '14px'
    color: '#000'
    radialOffset: 20
  ticks:
    display: true
    color: 'grey'
    spacing: 10000000
    labels: true
    labelSpacing: 10
    labelSuffix: 'Mb'
    labelDenominator: 1000000
    labelDisplay0: true
    labelSize: '10px'
    labelColor: '#000'
    labelFont: 'default'
    majorSpacing: 5
    size:
      minor: 2
      major: 5
  clickCallback: null

# Heatmap
circosJS.Heatmap.prototype._defaultConf =
  innerRadius: 200
  outerRadius: 250
  min: 'smart'
  max: 'smart'
  colorPalette: 'YlGnBu'
  colorPaletteSize: 9
  logScale: false

# Histogram
circosJS.Histogram.prototype._defaultConf =
  innerRadius: 150
  outerRadius: 200
  min: 'smart'
  max: 'smart'
  direction: 'out'
  colorPaletteSize: 9
  colorPalette: 'YlGnBu'
  usePalette: true
  color: '#fd6a62'
  logScale: false

# Chord
circosJS.Chord.prototype._defaultConf =
  colorPaletteSize: 9
  colorPalette: 'PuBuGn'
  usePalette: true
  color: '#fd6a62'
  opacity: 0.7
  min: 'smart'
  max: 'smart'
  logScale: false

# Scatter
circosJS.Scatter.prototype._defaultConf =
  innerRadius: 150
  outerRadius: 200
  min: 'smart'
  max: 'smart'
  direction: 'out'
  color: '#fd6a62'
  fill: true
  logScale: false
  glyph:
    size: 15
    shape: 'circle'
  strokeColor: '#d1d1d1'
  strokeWidth: 2

# Circos
circosJS.Core.prototype._conf =
    width: 550
    height: 550
    container: 'circos'

# Layout
circosJS.Layout.prototype._conf =
    innerRadius: 250
    outerRadius: 300
    gap: 0.04 # in radian
    labelPosition: 'center'
    labelRadialOffset: 0

# Heatmap
circosJS.Heatmap.prototype._conf =
    innerRadius: 200
    outerRadius: 249
    min: 'smart'
    max: 'smart'
    colorPalette: 'RgYn'
    colorPaletteSize: 9
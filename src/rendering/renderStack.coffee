circosJS.renderStack = (track, stack, conf, data, instance, d3) ->
  track = track.classed conf.colorPalette, true

  block = track.selectAll '.block'
    .data data
    .enter().append 'g'
    .classed 'block', true
    .attr 'transform', (d) ->
      'rotate(' + instance._layout.getBlock(d.key).start * 360 / (2 * Math.PI) + ')'

    layer = block.selectAll '.layer'
      .data (d) -> d.layers
      .enter().append 'g'
      .attr 'class', 'layer'

    tile = layer.selectAll('path')
      .data (d, i) -> d
      .enter().append 'path'
      .attr 'd',
        d3.svg.arc()
        .innerRadius stack.datumInnerRadius
        .outerRadius stack.datumOuterRadius
        .startAngle stack.datumStartAngle
        .endAngle stack.datumEndAngle

    tile.attr 'stroke-width', (d) -> d.strokeWidth || conf.strokeWidth
    tile.attr 'stroke', (d) -> d.strokeColor || conf.strokeColor
    tile.attr 'fill', (d) -> d.color || conf.color
    tile.attr 'class', (d) ->
      usePalette = d.usePalette || conf.usePalette
      if usePalette
        'q' + stack.colorScale(d.value, conf.logScale) + '-' + conf.colorPaletteSize



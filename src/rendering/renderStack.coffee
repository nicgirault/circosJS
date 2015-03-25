circosJS.renderStack = (instance, parentElement, name) ->
  track = parentElement.append('g').attr 'class', name
  group = @renderBlock track, @data, instance._layout

  renderDatum = (parentElement, conf, layout, ratio, datumInnerRadius, datumOuterRadius, theta) ->
    layer = parentElement.selectAll '.layer'
      .data (d) -> d.layers
      .enter().append 'g'
      .attr 'class', 'layer'

    tile = layer.selectAll '.tile'
      .data (d, i) -> d
      .enter().append 'path'
      .attr 'class', 'tile'
      .attr 'd',
        d3.svg.arc()
        .innerRadius datumInnerRadius
        .outerRadius datumOuterRadius
        .startAngle (d) -> theta d.start, layout.blocks[d.block_id]
        .endAngle (d) -> theta d.end, layout.blocks[d.block_id]

    tile.attr 'stroke-width', (d) -> d.strokeWidth || conf.strokeWidth
    tile.attr 'stroke', (d) -> d.strokeColor || conf.strokeColor
    tile.attr 'fill', (d) -> d.color || conf.color
    tile.attr 'class', (d) ->
      usePalette = d.usePalette || conf.usePalette
      if usePalette
        'q' + ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize

  renderDatum group, @conf, instance._layout, @ratio, @datumInnerRadius, @datumOuterRadius, @theta

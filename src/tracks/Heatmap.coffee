circosJS.Heatmap = ->
  circosJS.Track.call @
  @parseData = circosJS.parseSpanValueData

  @renderDatumContainer = (instance, parentElement, name, data, conf) =>
    track = parentElement.append 'g'
      .attr 'class', conf.colorPalette

    group = @renderBlock track, data, instance._layout, conf

  @renderDatum = (parentElement, conf, layout, utils) ->
    parentElement.selectAll 'tile'
      .data (d) -> d.values
      .enter().append 'path'
      .attr 'class', 'tile'
      .attr 'opacity', (d) -> d.opacity || conf.opacity
      .attr 'd',
        d3.svg.arc()
          .innerRadius conf.innerRadius
          .outerRadius conf.outerRadius
          .startAngle (d, i) -> utils.theta d.start, layout.blocks[d.block_id]
          .endAngle (d, i) -> utils.theta d.end, layout.blocks[d.block_id]
      .attr 'class', (d) ->
        'q' + utils.ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize

  return @

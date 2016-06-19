circosJS.Histogram = ->
  circosJS.Track.call @
  @parseData = circosJS.parseSpanValueData

  @renderDatumContainer = (instance, parentElement, name, data, conf) =>
    track = parentElement.append 'g'
      .attr 'class', @conf.colorPalette
    group = @renderBlock track, data, instance._layout, conf

  @renderDatum = (parentElement, conf, layout, utils) ->
    bin = parentElement.selectAll '.bin'
      .data (d) -> d.values
      .enter().append 'path'
      .attr 'class', 'bin'
      .attr 'opacity', (d) -> d.opacity || conf.opacity
      .attr 'd',
        d3.svg.arc()
          .innerRadius (d) ->
            if conf.direction == 'in'
              height = utils.ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale)
              conf.outerRadius - height
            else
              conf.innerRadius
          .outerRadius (d) ->
            if conf.direction == 'out'
              height = utils.ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale)
              conf.innerRadius + height
            else
              conf.outerRadius
          .startAngle (d) -> utils.theta d.start, layout.blocks[d.block_id]
          .endAngle (d) -> utils.theta d.end, layout.blocks[d.block_id]
    if conf.usePalette
      bin.attr 'class', (d) ->
        'q' + utils.ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize
    else
      bin.attr 'fill', d.color || conf.color
    bin

  return @

circosJS.renderHistogram = (instance, parentElement, name) ->
  track = parentElement.append('g').attr 'class', name + ' ' + @conf.colorPalette

  group = @renderBlock track, @data, instance._layout

  renderDatum = (parentElement, conf, layout, ratio, theta) ->
    bin = group.selectAll '.bin'
      .data (d)->d.values
      .enter().append 'path'
      .attr 'class', 'bin'
      .attr 'd',
        d3.svg.arc()
          .innerRadius (d) ->
            if conf.direction == 'in'
              height = ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale)
              conf.outerRadius - height
            else
              conf.innerRadius
          .outerRadius (d) ->
            if conf.direction == 'out'
              height = ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale)
              conf.innerRadius + height
            else
              conf.outerRadius
          .startAngle (d) -> theta d.start, layout.blocks[d.block_id]
          .endAngle (d) -> theta d.end, layout.blocks[d.block_id]
    if conf.usePalette
      bin.attr 'class', (d) ->
        'q' + ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize
    else
      bin.attr 'fill', d.color || conf.color

  renderDatum group, @conf, instance._layout, @ratio, @theta

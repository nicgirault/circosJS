circosJS.renderHistogram = (instance, parentElement, name) ->
  track = parentElement.append('g').attr('class', name + ' ' + @conf.colorPalette)

  group = @renderBlock track, @data, instance._layout

  renderDatum = (parentElement, conf, layout, ratio) ->
    bin = group.selectAll 'path'
      .data (d)->d.values
      .enter().append 'path'
      .attr 'd',
        d3.svg.arc()
          .innerRadius (d,i) ->
            if conf.direction == 'in'
              height = ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale)
              conf.outerRadius - height
            else
              conf.innerRadius
          .outerRadius (d,i) ->
            if conf.direction == 'out'
              height = ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale)
              conf.innerRadius + height
            else
              conf.outerRadius
          .startAngle (d, i) ->
            block = layout.blocks[d.block_id]
            d.start / block.len * (block.end - block.start)
          .endAngle (d, i) ->
            block = layout.blocks[d.block_id]
            d.end / block.len * (block.end - block.start)
    if conf.usePalette
      bin.attr 'class', (d) ->
        'q' + ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize
    else
      bin.attr 'fill', conf.color

  renderDatum group, @conf, instance._layout, @ratio

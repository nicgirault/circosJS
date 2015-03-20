circosJS.renderHeatmap = (instance, parentElement, name) ->
  track = parentElement.append('g').attr('class', name + ' ' + @conf.colorPalette)

  group = @renderBlock track, @data, instance._layout

  renderDatum = (parentElement, conf, layout, colorScale) ->
    parentElement.selectAll 'path'
      .data (d) -> d.values
      .enter().append 'path'
      .attr 'd',
        d3.svg.arc()
          .innerRadius conf.innerRadius
          .outerRadius conf.outerRadius
          .startAngle (d, i) -> @theta d.start, layout.blocks[d.block_id]
          .endAngle (d, i) -> @theta d.end, layout.blocks[d.block_id]
      .attr 'class', (d) =>
        'q' + ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize

  renderDatum group, @conf, instance._layout, @colorScale

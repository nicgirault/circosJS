circosJS.renderChord = (instance, parentElement, name) ->
  colorClass = if @conf.usePalette then @conf.colorPalette else ''
  track = parentElement.append('g').attr('class', name + ' ' + colorClass)

  renderDatum = (parentElement, conf, data, layout, ratio, getSource, getTarget) ->
    link = parentElement.selectAll 'path'
      .data data
      .enter().append('path')

    link = link.attr('d',
      d3.svg.chord()
        .source (d) -> getSource d, layout
        .target (d) -> getTarget d, layout
    ).attr('opacity', conf.opacity)

    if conf.usePalette
      link.attr('class', (d) ->
        'q' + ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize
      true)
    else
      link.attr('fill', conf.color)

  renderDatum track, @conf, @data, instance._layout, @ratio, @getSource, @getTarget








circosJS.Chord = ->
  circosJS.Track.call @
  @parseData = circosJS.parseChordData

  @applyRules = (rules, data) ->
    rules = rules || []
    for datum in data
      for rule in rules
        if rule.condition(datum)
          datum[rule.parameter] = rule.value

  @getSource = (d, layout) =>
    d = d.source
    block = layout.blocks[d.id]
    startAngle = block.start + d.start / block.len * (block.end - block.start)
    endAngle = block.start + d.end / block.len * (block.end - block.start)
    result =
      radius: layout.getConf().innerRadius
      startAngle: startAngle
      endAngle: endAngle
  @getTarget = (d, layout) =>
    d = d.target
    block = layout.blocks[d.id]
    startAngle = block.start + d.start / block.len * (block.end - block.start)
    endAngle = block.start + d.end / block.len * (block.end - block.start)
    result =
      radius: layout.getConf().innerRadius
      startAngle: startAngle
      endAngle: endAngle

  @renderChords = (parentElement, name, conf, data, layout, ratio, getSource, getTarget) ->
    parentElement
      .append 'g'
      .attr 'class', name + ' ' + conf.colorPalette

    link = parentElement.selectAll '.chord'
      .data data
      .enter().append 'path'
      .attr 'class', 'chord'
      .attr 'd',
        d3.svg.chord()
          .source (d) -> getSource d, layout
          .target (d) -> getTarget d, layout
      .attr 'opacity', (d) -> d.opacity || conf.opacity

    if conf.usePalette
      link.attr 'class', (d) ->
        'q' + ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize
    else
      link.attr 'fill', (d) -> d.color || conf.color

  @render = (instance, parentElement, name) =>
    @renderChords parentElement, name, @conf, @data, instance._layout, @ratio, @getSource, @getTarget

  @

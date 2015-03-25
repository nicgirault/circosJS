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

  @renderDatumContainer = (instance, parentElement, name, conf) ->
    parentElement
      .append 'g'
      .attr 'class', name + ' ' + conf.colorPalette

  @renderDatum = (parentElement, conf, data, layout, ratio, getSource, getTarget) ->
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

  @

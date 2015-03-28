circosJS.Stack = ->
  circosJS.Track.call @
  @parseData = circosJS.parseSpanValueData

  # override the generic build method to build layers
  @build = (instance, conf, data, rules, backgrounds) ->
    @loadData data, instance
    @conf = @processConf conf, @defaultConf, @meta, instance, @
    @buildLayers @data, @conf.margin
    @loadBackgrounds backgrounds
    @applyRules rules, @data

  @buildLayers = (data, margin) ->
    layeredData = []
    for idx, block of data
      block.values = block.values.sort (a,b) ->
        return -1 if a.start < b.start
        return -1 if a.start == b.start and a.end > b.end
        return 0 if a.start == b.start and a.end == b.end
        return 1
      layers = []
      for datum in block.values
        placed = false
        for layer in layers
          # try to place datum
          lastDatumInLayer = layer[..].pop()
          if lastDatumInLayer.end + margin < datum.start
            layer.push datum
            placed = true
            break
        layers.push [datum] unless placed
      block.layers = layers

  @applyRules = (rules, data) ->
    rules = rules || []
    for k,v of data
      for i, layer of v.layers
        for datum in layer
          for rule in rules
            if rule.condition(v.parent, datum, i)
              datum[rule.parameter] = rule.value

  @datumRadialPosition = (d, i, j) =>
    radialStart = (@conf.thickness + @conf.radialMargin) * j
    radialEnd = radialStart + @conf.thickness

    if @conf.direction == 'out'
      return [
        @conf.innerRadius + radialStart
        Math.min @conf.innerRadius + radialEnd, @conf.outerRadius
      ]
    if @conf.direction == 'in'
      return [
        Math.max @conf.outerRadius - radialEnd, @conf.innerRadius
        @conf.outerRadius - radialStart
      ]
    if @conf.direction == 'center'
      origin = Math.floor (@conf.outerRadius + @conf.innerRadius) / 2
      radialStart = (@conf.thickness + @conf.radialMargin) * Math.floor j / 2
      radialEnd = radialStart + @conf.thickness

      if j % 2 == 0
        return [
          origin + radialStart
          origin + radialEnd
        ]
      else
        return [
          origin - radialStart - @conf.radialMargin
          origin - radialEnd - @conf.radialMargin
        ]
  @datumInnerRadius = (d,i,j) =>
    @datumRadialPosition(d, i, j)[0]
  @datumOuterRadius = (d,i,j) =>
    @datumRadialPosition(d, i, j)[1]

  @renderDatumContainer = (instance, parentElement, name, data, conf) =>
    track = parentElement.append 'g'
      .attr 'class', name + ' ' + conf.colorPalette
    group = @renderBlock track, data, instance._layout

  @renderDatum = (parentElement, conf, layout, utils) ->
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
        .innerRadius utils.datumInnerRadius
        .outerRadius utils.datumOuterRadius
        .startAngle (d) -> utils.theta d.start, layout.blocks[d.block_id]
        .endAngle (d) -> utils.theta d.end, layout.blocks[d.block_id]

    tile.attr 'stroke-width', (d) -> d.strokeWidth || conf.strokeWidth
    tile.attr 'stroke', (d) -> d.strokeColor || conf.strokeColor
    tile.attr 'fill', (d) -> d.color || conf.color
    tile.attr 'class', (d) ->
      usePalette = d.usePalette || conf.usePalette
      if usePalette
        'q' + utils.ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize

  return @

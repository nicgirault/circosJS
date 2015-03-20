circosJS.Stack = ->
  circosJS.Track.call(@)
  @parseData = circosJS.parseSpanValueData
  @render = circosJS.renderStack

  # override the generic build method to build layers
  @build = (instance, conf, data, rules, backgrounds) ->
    @loadData data, instance
    @loadConf conf
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
  return @



circosJS.Stack = (instance, conf, data, rules, backgrounds) ->
  # conf override the default configuration. Conf not in default conf
  # object are removed
  @_conf = circosJS.mixConf conf, JSON.parse(JSON.stringify(@_defaultConf))

  if @_conf.innerRadius == 0 and @_conf.outerRadius == 0
    smartBorders = instance.smartBorders()
    @_conf.innerRadius = smartBorders.in
    @_conf.outerRadius = smartBorders.out

  circosJS.CircularTrack.call(@, instance, conf, data, rules, backgrounds)

  @buildLayeredData = ->
    data = @_data
    layeredData = []
    for idx, block of data
      sortedData = block.data.sort (a,b) ->
        if a.start < b.start
          -1
        else if a.start == b.start
          if a.end > b.end
            -1
          else if a.end == b.end
            0
          else
            1
        else
          1
      layers = []
      for datum in sortedData
        placed = false
        for layer in layers
            # try to place datum
            lastDatumInLayer = layer[..].pop()
            if lastDatumInLayer.end + @_conf.margin < datum.start
                layer.push datum
                placed = true
                break
        unless placed
            layers.push [datum]
      layeredData.push {
        parent: block.parent
        layers: layers
      }
    @_layers = layeredData

  @getData = ->
    @_layers

  @applyRules = ->
    for k,v of @_layers
      for i, layer of v.layers
        for datum in layer
          for rule in rules
            if rule.condition(v.parent, datum, i)
              datum[rule.parameter] = rule.value

  @datumRadialPosition = (d, i, j) ->
    radialStart = (@_conf.thickness + @_conf.radialMargin) * j
    radialEnd = radialStart + @_conf.thickness

    if @_conf.direction == 'out'
      return [
        @_conf.innerRadius + radialStart
        Math.min @_conf.innerRadius + radialEnd, @_conf.outerRadius
      ]
    if @_conf.direction == 'in'
      return [
        Math.max @_conf.outerRadius - radialEnd, @_conf.innerRadius
        @_conf.outerRadius - radialStart
      ]
    if @_conf.direction == 'center'
      origin = Math.floor (@_conf.outerRadius + @_conf.innerRadius) / 2
      radialStart = (@_conf.thickness + @_conf.radialMargin) * Math.floor j / 2
      radialEnd = radialStart + @_conf.thickness

      if j % 2 == 0
        return [
          origin + radialStart
          origin + radialEnd
        ]
      else
        return [
          origin - radialStart - @_conf.radialMargin
          origin - radialEnd - @_conf.radialMargin
        ]
  @datumInnerRadius = (d,i,j) =>
    @datumRadialPosition(d, i, j)[0]
  @datumOuterRadius = (d,i,j) =>
    @datumRadialPosition(d, i, j)[1]
  @datumStartAngle = (d,i) =>
    block = instance._layout.getBlock(d.block_id)
    d.start / block.len * (block.end - block.start)
  @datumEndAngle = (d, i) =>
    block = instance._layout.getBlock(d.block_id)
    d.end / block.len * (block.end - block.start)
  return @



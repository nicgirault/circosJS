circosJS.Stack = (conf, data, rules) ->
    # conf override the default configuration. Conf not in default conf
    # object are removed
    @_conf = circosJS.mixConf conf, JSON.parse(JSON.stringify(@_defaultConf))

    circosJS.Track.call(@, conf, data, rules)

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

    @radialPosition = (d, i, j) ->
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
    @datumInnerRadius = (d,i,j) =>
      @radialPosition(d, i, j)[0]
    @datumOuterRadius = (d,i,j) =>
      @radialPosition(d, i, j)[1]

    return @



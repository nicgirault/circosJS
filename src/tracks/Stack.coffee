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
              if lastDatumInLayer.end < datum.start
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
    return @



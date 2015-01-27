circosJS.Histogram = (conf, data) ->
    # conf override the default configuration. Conf not in default conf
    # object are removed
    @_conf = circosJS.mixConf conf, JSON.parse(JSON.stringify(@_defaultConf))

    circosJS.Track.call(@, conf, data)
    @height = (value, logScale) ->
      if logScale
          scaleLogBase = 2.3
      else
          scaleLogBase = 1

      min = @_conf.cmin
      max = @_conf.cmax
      scope = @_conf.outerRadius - @_conf.innerRadius

      if min == max
          return 0
      if value == min
          return 0
      if value == max
          return scope - 1

      fraction = (value - min) / (max - min)

      x = Math.exp(1 / scaleLogBase * Math.log(fraction))

      return Math.floor(scope * x)
    return @


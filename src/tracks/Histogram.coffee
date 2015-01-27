circosJS.Histogram = (conf, data) ->
    # conf override the default configuration. Conf not in default conf
    # object are removed
    @_conf = circosJS.mixConf conf, JSON.parse(JSON.stringify(@_defaultConf))

    circosJS.Track.call(@, conf, data)
    @height = (value, scale) ->
        if value >= @_conf.cmax
            @_conf.outerRadius - @_conf.innerRadius
        else if scale == 'linear'
            Math.floor((value - @_conf.cmin) / @_conf.cmax * (@_conf.outerRadius - @_conf.innerRadius))
    return @


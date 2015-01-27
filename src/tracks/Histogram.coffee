circosJS.Histogram = (conf, data) ->
    circosJS.Track.call(@, conf, data)
    @height = (value, scale) ->
        if value >= @_conf.cmax
            @_conf.outerRadius - @_conf.innerRadius
        else if scale == 'linear'
            Math.floor((value - @_conf.cmin) / @_conf.cmax * (@_conf.outerRadius - @_conf.innerRadius))
    return @


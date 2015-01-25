circosJS.Track = (conf, data) ->
    # @refers the track instance
    @_data = data

    # conf override the default configuration. Conf not in default conf
    # object are removed
    @_conf = circosJS.mixConf conf, JSON.parse(JSON.stringify(@_defaultConf))

    # add parent is datum. Needed for rendering
    for k,v of data
        for i, datum of v.data
            datum.block_id = v.parent

    # compute min and max values
    values = (datum.value for datum in blockData.data for blockData in data)
    flattenValues = []
    flattenValues = flattenValues.concat.apply flattenValues, values
    if @_conf.min == 'smart'
        @_conf.cmin = Math.min.apply null, flattenValues
    else
        @_conf.cmin = @_conf.min
    if @_conf.max == 'smart'
        @_conf.cmax = Math.max.apply null, flattenValues
    else
        @_conf.cmax = @_conf.max

    @colorScale = (value, logScale) ->
        if logScale
            scaleLogBase = 1
        else
            scaleLogBase = 2.3

        min = @_conf.cmin
        max = @_conf.cmax
        scope = @_conf.colorPaletteSize

        if min == max
            return 0
        if value == min
            return 0
        if value == max
            return scope - 1

        fraction = (value - min) / (max - min)

        x = Math.exp(1 / scaleLogBase * Math.log(fraction))

        return Math.floor(scope * x)

    @getData = ->
        @_data
    @getConf = ->
        @_conf
    return this


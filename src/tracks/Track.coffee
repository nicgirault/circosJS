circosJS.Track = (instance, conf, data, rules, backgrounds) ->
    # this refers the track instance

    layoutSummary = {}
    for d in instance._layout.getData()
        layoutSummary[d.id] = d.len

    result = circosJS.parseData(data, layoutSummary)
    @_data = result.data
    @_backgrounds = backgrounds || []
    # a rule look like this:
    # {parameter: color, value: 'blue', condition: function, flow: 'stop if true'}
    @_rules = rules

    if conf.innerRadius and conf.outerRadius
        if conf.innerRadius > conf.outerRadius
            circosJS.log(
                2,
                'radiusInconsitency',
                'Inner radius greater than outer radius',
                {'innerRadius': conf.innerRadius, 'outerRadius': conf.outerRadius}
            )


    @applyRules = ->
        for k,v of @_data
            for i, datum of v.data
                for rule in rules
                    if rule.condition(v.parent, datum, i)
                        datum[rule.parameter] = rule.value

    @computeMinMax = ->
        # compute min and max values
        @_conf.cmin = if @_conf.min == 'smart' then result.meta.min else @_conf.min
        @_conf.cmax = if @_conf.max == 'smart' then result.meta.max else @_conf.max

    @colorScale = (value, logScale) ->
        if logScale
            scaleLogBase = 2.3
        else
            scaleLogBase = 1

        min = @_conf.cmin
        max = @_conf.cmax
        scope = @_conf.colorPaletteSize
        reverse = @_conf.colorPaletteReverse

        if min == max
            return 0
        if value == min
            return 0
        if value == max
            return scope - 1

        fraction = (value - min) / (max - min)

        x = Math.exp(1 / scaleLogBase * Math.log(fraction))
        if reverse
            x = 1 - x
        return Math.floor(scope * x)

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

    @getData = ->
        @_data
    @getConf = ->
        @_conf
    @getRules = ->
        @_rules

    @theta = (d) =>
        block = instance._layout.getBlock(d.block_id)
        block.start + d.position / block.len * (block.end - block.start)
    @x = (d) =>
        if @_conf.direction == 'in'
            r = @_conf.outerRadius - @height d.value, @_conf.logScale
        else
            r = @_conf.innerRadius + @height d.value, @_conf.logScale
        angle = @theta(d) - Math.PI/2
        r * Math.cos angle
    @y = (d) =>
        if @_conf.direction == 'in'
            r = @_conf.outerRadius - @height d.value, @_conf.logScale
        else
            r = @_conf.innerRadius + @height d.value, @_conf.logScale
        angle = @theta(d) - Math.PI/2
        r * Math.sin angle


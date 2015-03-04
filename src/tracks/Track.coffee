circosJS.Track = (instance, conf, data, rules, backgrounds) ->
    # this refers the track instance
    @_data = circosJS.parseData(data)
    @_backgrounds = backgrounds || []

    # a rule look like this:
    # {parameter: color, value: 'blue', condition: function, flow: 'stop if true'}
    @_rules = rules

    @applyRules = ->
        for k,v of @_data
            for i, datum of v.data
                for rule in rules
                    if rule.condition(v.parent, datum, i)
                        datum[rule.parameter] = rule.value

    # Only for heatmap and histograms...
    @completeData = ->
        # add parent is datum. Needed for rendering
        for k,v of @_data
            for i, datum of v.data
                datum.block_id = v.parent

    @computeMinMax = ->
        # compute min and max values
        values = (datum.value for datum in blockData.data for blockData in @_data)
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
            scaleLogBase = 2.3
        else
            scaleLogBase = 1

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

    @isLayoutCompliant = (instance, id) ->
        # Check layout is defined
        unless instance._layout?
            circosJS.log(
                1,
                'No layout defined',
                'Circos cannot add or update a heatmap track without layout',
                {'heatmap_id': id}
            )
            return false

        #check data consistency with layout
        layout_ids = (d.id for d in instance._layout.getData())
        layout_lengths = {}
        for d in instance._layout.getData()
            layout_lengths[d.id] = d.len
        # for datum in data
        for block in @_data
            # check match between track and layout block id
            unless block.parent in layout_ids
                circosJS.log(
                    2,
                    'No layout block id match',
                    'Heatmap data has a parent property that does not correspond to any layout block id',
                    {'heatmap_id': id, 'block_id': block.parent}
                )
            # check datum lengths and layout block length
            for datum in block.data
                if datum.start < 0 or datum.end > layout_lengths[block.parent]
                    circosJS.log(
                        2,
                        'Track data inconsistency',
                        'Track data has a start < 0 or a end above the block length',
                        {'track_id': id, 'datum': datum, 'layout block': instance._layout.getBlock(block.parent)}
                    )
        return true

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


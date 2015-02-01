circosJS.Chord = (conf, data, rules, layout) ->
    # conf override the default configuration. Conf not in default conf
    # object are removed
    @_conf = circosJS.mixConf conf, JSON.parse(JSON.stringify(@_defaultConf))

    circosJS.Track.call(@, conf, data, rules)
    @getSource = (d) =>
        d = d.source
        block = layout.getBlock d.id
        startAngle = block.start + d.start / block.len * (block.end - block.start)
        endAngle = block.start + d.end / block.len * (block.end - block.start)
        result =
            radius: layout.getConf().innerRadius
            startAngle: startAngle
            endAngle: endAngle
    @getTarget = (d) =>
        d = d.target
        block = layout.getBlock d.id
        startAngle = block.start + d.start / block.len * (block.end - block.start)
        endAngle = block.start + d.end / block.len * (block.end - block.start)
        result =
            radius: layout.getConf().innerRadius
            startAngle: startAngle
            endAngle: endAngle

    @computeMinMax = () ->
        # compute min and max values
        values = (datum.value for datum in data)
        if @_conf.min == 'smart'
            @_conf.cmin = Math.min.apply null, values
        else
            @_conf.cmin = @_conf.min
        if @_conf.max == 'smart'
            @_conf.cmax = Math.max.apply null, values
        else
            @_conf.cmax = @_conf.max

    @isLayoutCompliant = (instance, id) ->
        # Check layout is defined
        unless instance._layout?
            circosJS.log(
                1,
                'No layout defined',
                'Circos cannot add or update a chord track without layout',
                {'chord_id': id}
            )
            return false

        #check data consistency with layout
        layout_ids = (d.id for d in instance._layout.getData())
        layout_lengths = {}
        for d in instance._layout.getData()
            layout_lengths[d.id] = d.len
        # for datum in data
        for datum in data
            # check match between track and layout block id
            unless (datum.source.id in layout_ids and datum.target.id in layout_ids)
                circosJS.log(
                    2,
                    'No layout block id match',
                    'Link data has a source or tagret id that does not correspond to any layout block id',
                    {'chord_id': id, 'datum': datum}
                )
            # check datum lengths and layout block length
            if datum.source.start < 0 or datum.source.end > layout_lengths[datum.source.id]
                circosJS.log(
                    2,
                    'Track data inconsistency',
                    'Track data has a start < 0 or a end above the block length',
                    {'track_id': id, 'datum': datum, 'layout block': instance._layout.getBlock(datum.source.id)}
                )
            if datum.target.start < 0 or datum.target.end > layout_lengths[datum.target.id]
                circosJS.log(
                    2,
                    'Track data inconsistency',
                    'Track data has a start < 0 or a end above the block length',
                    {'track_id': id, 'datum': datum, 'layout block': instance._layout.getBlock(datum.target.id)}
                )
        return true
    return @

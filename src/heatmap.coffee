circosJS.Core.prototype.heatmap = (id, conf, data) ->
    # Check layout is defined
    unless this._layout?
        circosJS.log(
            1,
            'No layout defined',
            'Circos cannot add or update a heatmap track without layout',
            {'heatmap_id': id}
        )
        return this

    # data can be csv or yaml.
    data = circosJS.parseData(data)

    #check data consistency with layout
    layout_ids = (d.id for d in this._layout.getData())
    layout_lengths = {}
    for d in this._layout.getData()
        layout_lengths[d.id] = d.len
    # for datum in data
    for block in data
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
                    {'track_id': id, 'datum': datum, 'layout block': this._layout.getBlock(block.parent)}
                )

    this._heatmaps[id] = new circosJS.Heatmap(conf, data)
    return this


# Heatmap instance constructor
circosJS.Heatmap = (conf, data) ->
    # this refers the heatmap instance
    # data can be csv or yaml.
    this._data = data

    # deep copy of default conf
    this._conf = JSON.parse JSON.stringify this._defaultConf

    # conf override the default configuration. Conf not in default conf
    # object are removed
    for k,v of this._conf
        this._conf[k] = if conf[k]? then conf[k] else v

    # add parent is datum. Needed for rendering
    for k,v of data
        for i, datum of v.data
            datum.block_id = v.parent

    # compute min and max values
    values = (datum.value for datum in blockData.data for blockData in data)
    flattenValues = []
    flattenValues = flattenValues.concat.apply flattenValues, values
    if this._conf.min == 'smart'
        this._conf.cmin = Math.min.apply null, flattenValues
    else
        this._conf.cmin = this._conf.min
    if this._conf.max == 'smart'
        this._conf.cmax = Math.max.apply null, flattenValues
    else
        this._conf.cmax = this._conf.max

    this.colorScale = (value, logScale) ->
        if logScale
            scaleLogBase = 1
        else
            scaleLogBase = 2.3

        min = this._conf.cmin
        max = this._conf.cmax
        scope = this._conf.colorPaletteSize

        if min == max
            return 0
        if value == min
            return 0
        if value == max
            return scope - 1

        fraction = (value - min) / (max - min)

        x = Math.exp(1 / scaleLogBase * Math.log(fraction))

        return Math.floor(scope * x)

    # getters/setters
    this.getData = ->
        this._data
    this.getConf = ->
        this._conf
    return this



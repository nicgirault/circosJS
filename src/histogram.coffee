circosJS.Core.prototype.histogram = (id, conf, data) ->
    # Check layout is defined
    unless this._layout?
        circosJS.log(
            1,
            'No layout defined',
            'Circos cannot add or update a histogram track without layout',
            {'histogram_id': id}
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
                'Histogram data has a parent property that does not correspond to any layout block id',
                {'histogram_id': id, 'block_id': block.parent}
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

    this._histograms[id] = new circosJS.Histogram(conf, data)
    return this


# Histogram instance constructor
circosJS.Histogram = (conf, data) ->
    # this refers the histogram instance
    this._data = data

    # conf override the default configuration. Conf not in default conf
    # object are removed
    this._conf = circosJS.mixConf conf, JSON.parse(JSON.stringify(this._defaultConf))

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

    this.height = (value, scale) ->
        if value >= this._conf.cmax
            this._conf.outerRadius - this._conf.innerRadius
        else if scale == 'linear'
            Math.floor((value - this._conf.cmin) / this._conf.cmax * (this._conf.outerRadius - this._conf.innerRadius))
            # else
                # null

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



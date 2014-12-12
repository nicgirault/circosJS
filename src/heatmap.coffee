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
    this._data = data

    this._conf =
        innerRadius: 200
        outerRadius: 250
        min: 'smart'
        max: 'smart'
        colorPalette: 'YlGnBu'
        colorPaletteSize: 9

    # conf override the default configuration. Conf not in default conf
    # object are removed
    for k,v of this._conf
        this._conf[k] = if conf[k]? then conf[k] else v

    # add parent is datum. Needed for rendering
    for k,v of data
        for i, datum of v.data
            datum.block_id = v.parent

    # compute min and max values
    if this._conf.min == 'smart' and this._conf.max == 'smart'
        heatmapMin = 99999999
        heatmapMax = -99999999
        for k,v of data
            for kc,vc of v.data
                if vc.value > heatmapMax then heatmapMax = vc.value
                if vc.value < heatmapMin then heatmapMin = vc.value
        this._conf.cmin = heatmapMin
        this._conf.cmax = heatmapMax
    else if this._conf.min == 'smart'
        heatmapMin = 99999999
        for k,v of data
            for kc,vc of v.data
                if vc.value < heatmapMin then heatmapMin = vc.value
        this._conf.cmin = heatmapMin
        this._conf.cmax = this._conf.max
    else if this._conf.max == 'smart'
        heatmapMax = -99999999
        for k,v of data
            for kc,vc of v.data
                if vc.value < heatmapMax then heatmapMax = vc.value
        this._conf.cmax = heatmapMax
        this._conf.cmin = this._conf.min
    else
        this._conf.cmin = this._conf.min
        this._conf.cmax = this._conf.max

    this.colorScale = (value, scale) ->
        if value == this._conf.cmax
            this._conf.colorPaletteSize-1
        else if scale == 'linear'
            Math.floor((value - this._conf.cmin) / (this._conf.cmax - this._conf.cmin) * this._conf.colorPaletteSize)
            # else
                # null

    # getters/setters
    this.getData = ->
        this._data
    this.getConf = ->
        this._conf
    return this



circosJS.Core.prototype.chord = (id, conf, data) ->
    # Check layout is defined
    unless this._layout?
        circosJS.log(
            1,
            'No layout defined',
            'Circos cannot add or update a chord track without layout',
            {'chord_id': id}
        )
        return this

    #check data consistency with layout
    layout_ids = (d.id for d in this._layout.getData())
    layout_lengths = {}
    for d in this._layout.getData()
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
                {'track_id': id, 'datum': datum, 'layout block': this._layout.getBlock(datum.source.id)}
            )
        if datum.target.start < 0 or datum.target.end > layout_lengths[datum.target.id]
            circosJS.log(
                2,
                'Track data inconsistency',
                'Track data has a start < 0 or a end above the block length',
                {'track_id': id, 'datum': datum, 'layout block': this._layout.getBlock(datum.target.id)}
            )

    this._chords[id] = new circosJS.Chord(conf, data)
    return this


# Histogram instance constructor
circosJS.Chord = (conf, data) ->
    # this refers the histogram instance
    this._data = data

    this._conf =
        colorPaletteSize: 9
        colorPalette: 'PuBuGn'
        opacity: 0.7


    # conf override the default configuration. Conf not in default conf
    # object are removed
    for k,v of this._conf
        this._conf[k] = if conf[k]? then conf[k] else v

    this.colorScale = (value, scale) ->
        if value == this._conf.cmax
            this._conf.colorPaletteSize - 1
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



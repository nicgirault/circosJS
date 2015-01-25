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

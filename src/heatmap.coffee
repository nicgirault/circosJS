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
    # for datum in data
    for datum in data
        unless datum.parent in layout_ids
            circosJS.log(
                2,
                'No layout block id match',
                'Heatmap data has a parent property that does not correspond to any layout block id',
                {'heatmap_id': id, 'block_id': datum.parent}
            )


    if this._heatmaps[id]?
        # update
        null
    else
        # append
        this._heatmaps[id] = new circosJS.Heatmap(conf, data)
    return this


# Heatmap instance constructor
circosJS.Heatmap = (conf, data) ->
    # this refers the heatmap instance
    this._data = data

    # conf override the default configuration. Conf not in default conf
    # object are removed
    for k,v of this._conf
        this._conf[k] = if conf[k]? then conf[k] else v

    # getters/setters
    this.getData = ->
        this._data
    this.getConf = ->
        this._conf
    return this


# # what if input data is largeur than chromosome length?
    # instance.heatmap = (trackName, conf, data) ->
    #     # get min and max values
    #     heatmapMin = 99999999
    #     heatmapMax = -99999999
    #     for k,v of data
    #         for kc,vc of v.data
    #             if vc.value > heatmapMax then heatmapMax = vc.value
    #             if vc.value < heatmapMin then heatmapMin = vc.value

    #     colorScale = (value, range, scale) ->
    #         if value == heatmapMax
    #             range-1
    #         else if scale == 'linear'
    #             Math.floor((value - heatmapMin) / (heatmapMax - heatmapMin) * range)
    #         # else
    #             # null

    #     track = instance.svg.append('g')
    #         .classed(trackName, true)
    #         .classed(conf.colorPalette, true)
    #         .attr('transform', 'translate(' + parseInt(instance.width/2) + ',' + parseInt(instance.height/2) + ')')

    #     chrBundles = track.selectAll('g').data(data)
    #             .enter().append('g')
    #             .attr('class', (d,i)-> 
    #                 trackName+'-'+d.parent
    #             true)
    #             .attr('transform', (d) -> 'rotate(' + _layout.getAngle(d.parent, 'deg') + ')')

    #     atoms = chrBundles.selectAll('path')
    #         .data((d)->d.data).enter()
    #         .append('path')
    #         .attr('d',
    #             d3.svg.arc()
    #                 .innerRadius(conf.innerRadius)
    #                 .outerRadius(conf.outerRadius)
    #                 .startAngle((d) -> d.start/_layout.dataTotalLength*2*Math.PI)
    #                 .endAngle((d) -> d.end/_layout.dataTotalLength*2*Math.PI)
    #         )
    #         .attr('class', (d) -> 
    #             'q'+colorScale(d.value, 9, 'linear')+'-'+conf.colorRange
    #         true)

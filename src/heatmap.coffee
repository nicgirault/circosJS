circosJS.Core.prototype.histogram = (id, conf, data) ->
    # this refer to the circos instance
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

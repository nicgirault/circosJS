circosJS.Core.prototype.render = (ids) ->
    # this refers the circos instance
    
    # TODO: if ids is undefined, render all
    #     else render only the given tracks


    # return the angle of a position according to the block index and the
    # position in the block
    angle = (i, pos) ->
        conf = this._layout.getConf().gap # in radian
        size = this._layout.getSize()
        block = this._layout.getBlock()

        angle_no_gap = pos/size *2*Math.PI
        angle = angle_no_gap + i*gap
        return angle

    ################################
    ## render layout
    ################################
    that = this
    svg = d3.select(this.getContainer())

    svg.attr('width', this.getWidth()).attr('height', this.getHeight())
        .append('g')
        .classed('cs-layout', true)
        .attr('transform', 'translate(' + parseInt(this.getWidth()/2) + ',' + parseInt(this.getHeight()/2) + ')')
        .selectAll('path')
        .data(this._layout.getData())
        .enter()
        .append('path')
        .attr('d',
            d3.svg.arc()
                .innerRadius(this._layout.getConf().innerRadius)
                .outerRadius(this._layout.getConf().outerRadius)
                .startAngle((d,i) -> d.start)
                .endAngle((d,i) -> d.end)
        )
        .attr('fill', (d) -> d.color)
        .attr('id', (d) -> d.id)

    ################################
    ## Labels
    layoutConf = this._layout.getConf()
    r = layoutConf.innerRadius + layoutConf.labelRadialOffset
    labels = svg.append('g')
        .classed('labels', true)
        .classed('segment', true)
        .attr('transform', 'translate(' + parseInt(this.getWidth()/2) + ',' + parseInt(this.getHeight()/2) + ')')

    # labels.append("def")
    #     .selectAll('path')
    #     .data(this._layout.getData()).enter()
    #     .append("path")
    #     .attr("id", (d) -> "segment-label-path-"+d.id)
    #     .attr("d", "m0 -" + r + " a" + r + " " + r + " 0 1 1 -1 0");

    labels.selectAll("text")
        .data(this._layout.getData()).enter()
        .append("text")
        .append("textPath")
        .attr("xlink:href", (d) -> "#"+d.id)
        .attr("text-anchor", "middle")
        # .attr("startOffset", (d, i) -> i * 100 / 24 + "%")

        .text((d) -> d.label)

    ################################
    ## render heatmaps
    ################################
    for heatmap_name in Object.keys(this._heatmaps)
        heatmap = this._heatmaps[heatmap_name]

        track = svg.append('g')
            .classed(heatmap_name, true)
            .classed(heatmap.getConf().colorPalette, true)
            .attr('transform', 'translate(' + parseInt(this.getWidth()/2) + ',' + parseInt(this.getHeight()/2) + ')')

        block = track.selectAll('g')
            .data(heatmap.getData())
            .enter().append('g')
            .attr('class', (d,i)-> 
                heatmap_name+'-'+d.parent
            true)
            .attr('transform', (d) -> 'rotate(' + that._layout.getBlock(d.parent).start*360/(2*Math.PI) + ')')

        datum = block.selectAll('path')
            .data((d)->d.data)
            .enter().append('path')
            .attr('d',
                d3.svg.arc()
                    .innerRadius(heatmap.getConf().innerRadius)
                    .outerRadius(heatmap.getConf().outerRadius)
                    .startAngle((d, i) ->
                        block = that._layout.getBlock(d.block_id)
                        d.start/block.len * (block.end - block.start)
                    )
                    .endAngle((d, i) -> 
                        block = that._layout.getBlock(d.block_id)
                        d.end/block.len * (block.end - block.start)
                    )

            )
            .attr('class', (d) -> 
                'q'+heatmap.colorScale(d.value, 'linear')+'-'+heatmap.getConf().colorPaletteSize
            true)

    ################################
    ## render histogram
    ################################
    for histogram_name in Object.keys(this._histograms)
        histogram = this._histograms[histogram_name]

        conf = histogram.getConf()

        track = svg.append('g')
            .classed(histogram_name, true)
            .classed(conf.colorPalette, true)
            .attr('transform', 'translate(' + parseInt(this.getWidth()/2) + ',' + parseInt(this.getHeight()/2) + ')')

        block = track.selectAll('g')
            .data(histogram.getData())
            .enter().append('g')
            .attr('class', (d,i)-> 
                heatmap_name+'-'+d.parent
            true)
            .attr('transform', (d) -> 'rotate(' + that._layout.getBlock(d.parent).start*360/(2*Math.PI) + ')')

        datum = block.selectAll('path')
            .data((d)->d.data)
            .enter().append('path')
            .attr('d',
                d3.svg.arc()
                    .innerRadius((d,i) ->
                        if conf.direction == 'in'
                            conf.outerRadius - histogram.height(d.value, 'linear')
                        else
                            conf.innerRadius
                    )
                    .outerRadius((d,i) ->
                        if conf.direction == 'out'
                            conf.innerRadius + histogram.height(d.value, 'linear')
                        else
                            conf.outerRadius
                    )
                    .startAngle((d, i) ->
                        block = that._layout.getBlock(d.block_id)
                        d.start/block.len * (block.end - block.start)
                    )
                    .endAngle((d, i) ->
                        block = that._layout.getBlock(d.block_id)
                        d.end/block.len * (block.end - block.start)
                    )

            )

        if conf.color?
            datum.attr('fill', conf.color)
        if conf.colorPalette?
            datum.attr('class', (d) ->
                'q'+histogram.colorScale(d.value, 'linear')+'-'+conf.colorPaletteSize
            true)

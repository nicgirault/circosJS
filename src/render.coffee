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
                'q'+heatmap.colorScale(d.value, 9, 'linear')+'-'+heatmap.getConf().colorPaletteSize
            true)

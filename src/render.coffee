circosJS.Core.prototype.render = (ids) ->
    # this refers the circos instance
    
    # TODO: if ids is undefined, render all
    #     else render only the given tracks


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
                .startAngle((d,i) -> d.start/that._layout.getSize() * 2*Math.PI)
                .endAngle((d,i) -> (d.start+d.len)/that._layout.getSize() * 2*Math.PI - that._layout.getGap('rad'))
        )
        .attr('fill', (d) -> d.color)
        .attr('id', (d) -> d.id)

    ################################
    ## render heatmaps
    ################################

    console.log(this._heatmaps)
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
            .attr('transform', (d) -> 'rotate(' + that._layout.getAngle(d.parent, 'deg') + ')')

        datum = block.selectAll('path')
            .data((d)->d.data)
            .enter().append('path')
            .attr('d',
                d3.svg.arc()
                    .innerRadius(heatmap.getConf().innerRadius)
                    .outerRadius(heatmap.getConf().outerRadius)
                    .startAngle((d) -> d.start/that._layout.getSize()*2*Math.PI)
                    .endAngle((d) -> d.end/that._layout.getSize()*2*Math.PI)
            )
            .attr('class', (d) -> 
                'q'+heatmap.colorScale(d.value, 9, 'linear')+'-'+heatmap.getConf().colorPaletteSize
            true)

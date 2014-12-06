circosJS.Core.prototype.render = (ids) ->
    # this refers the circos instance
    
    # TODO: if ids is undefined, render all
    #     else render only the given tracks


    ################################
    ## render layout
    ################################
    that = this
    d3.select(this.getContainer())
        .attr('width', this.getWidth()).attr('height', this.getHeight())
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

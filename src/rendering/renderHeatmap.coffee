circosJS.renderHeatmap = (name, heatmap, instance, d3, svg) ->
    conf = heatmap.getConf()
    svg.select('.' + name).remove()
    track = svg.append('g')
        .classed(name, true)
        .classed(conf.colorPalette, true)
        .attr('transform', 'translate(' + parseInt(instance.getWidth()/2) + ',' + parseInt(instance.getHeight()/2) + ')')

    block = track.selectAll('g')
        .data(heatmap.getData())
        .enter().append('g')
        .attr('class', (d,i)-> 
            name + '-' + d.parent
        true)
        .attr('transform', (d) -> 'rotate(' + instance._layout.getBlock(d.parent).start*360/(2*Math.PI) + ')')

    datum = block.selectAll('path')
        .data((d)->d.data)
        .enter().append('path')
        .attr('d',
            d3.svg.arc()
                .innerRadius(conf.innerRadius)
                .outerRadius(conf.outerRadius)
                .startAngle((d, i) ->
                    block = instance._layout.getBlock(d.block_id)
                    d.start / block.len * (block.end - block.start)
                )
                .endAngle((d, i) -> 
                    block = instance._layout.getBlock(d.block_id)
                    d.end / block.len * (block.end - block.start)
                )

        )
        .attr('class', (d) -> 
            'q' + heatmap.colorScale(d.value, conf.logScale) + '-' + conf.colorPaletteSize
        true)
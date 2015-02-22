circosJS.renderHeatmap = (track, heatmap, conf, data, instance, d3) ->
    track = track.classed(conf.colorPalette, true)

    block = track.selectAll('.block')
        .data(data)
        .enter().append('g')
        .attr('class', (d,i)->
            name + '-' + d.parent + ' block'
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

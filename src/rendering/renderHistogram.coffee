circosJS.renderHistogram = (name, histogram, instance, d3, svg) ->
    conf = histogram.getConf()

    svg.select('.' + name).remove()

    track = svg.append('g')
        .classed(name, true)
        .attr('transform', 'translate(' + parseInt(instance.getWidth()/2) + ',' + parseInt(instance.getHeight()/2) + ')')

    track.classed(conf.colorPalette, true) if conf.usePalette

    block = track.selectAll('g')
        .data(histogram.getData())
        .enter().append('g')
        .attr('class', (d,i)-> 
            name + '-' + d.parent
        true)
        .attr('transform', (d) -> 'rotate(' + instance._layout.getBlock(d.parent).start*360/(2*Math.PI) + ')')

    bin = block.selectAll('path')
        .data((d)->d.data)
        .enter().append('path')
        .attr('d',
            d3.svg.arc()
                .innerRadius((d,i) ->
                    if conf.direction == 'in'
                        conf.outerRadius - histogram.height(d.value, conf.logScale)
                    else
                        conf.innerRadius
                )
                .outerRadius((d,i) ->
                    if conf.direction == 'out'
                        conf.innerRadius + histogram.height(d.value, conf.logScale)
                    else
                        conf.outerRadius
                )
                .startAngle((d, i) ->
                    block = instance._layout.getBlock(d.block_id)
                    d.start / block.len * (block.end - block.start)
                )
                .endAngle((d, i) ->
                    block = instance._layout.getBlock(d.block_id)
                    d.end / block.len * (block.end - block.start)
                )

        )

    if conf.usePalette
        bin.attr('class', (d) ->
            'q' + histogram.colorScale(d.value, conf.logScale) + '-' + conf.colorPaletteSize
        true)
    else
        bin.attr('fill', conf.color)

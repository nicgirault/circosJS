circosJS.renderStack = (track, stack, conf, data, instance, d3) ->

    track = track.classed(conf.colorPalette, true) if conf.usePalette

    block = track.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('class', (d,i)->
            name + '-' + d.parent
        true)
        .attr('transform', (d) -> 'rotate(' + instance._layout.getBlock(d.parent).start*360/(2*Math.PI) + ')')

    layer = block.selectAll('.layer')
        .data((d) -> d.layers)
        .enter().append('g')
        .attr('class', 'layer')

    span = layer.selectAll('path')
        .data((d, i) -> d)
        .enter().append('path')
        .attr('d',
            d3.svg.arc()
                .innerRadius(stack.datumInnerRadius)
                .outerRadius(stack.datumOuterRadius)
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
        span.attr('class', (d) ->
            'q' + stack.colorScale(d.value, conf.logScale) + '-' + conf.colorPaletteSize
        true)
    else
        span.attr('fill', conf.color)

    span.attr('stroke-width', conf.strokeWidth)
    span.attr('stroke', conf.strokeColor)


circosJS.renderScatter = (track, scatter, conf, data, instance, d3) ->

    block = track.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('class', (d,i)->
            name + '-' + d.parent
        true)

    point = block.selectAll('.point')
        .data((d)->d.data)

    theta = (d) ->
        block = instance._layout.getBlock(d.block_id)
        block.start + d.position / block.len * (block.end - block.start)
    x = (d) ->
        if conf.direction == 'in'
            r = conf.outerRadius - scatter.height d.value, conf.logScale
        else
            r = conf.innerRadius + scatter.height d.value, conf.logScale
        angle = theta(d) - Math.PI/2
        r * Math.cos(angle)
    y = (d) ->
        if conf.direction == 'in'
            r = conf.outerRadius - scatter.height d.value, conf.logScale
        else
            r = conf.innerRadius + scatter.height d.value, conf.logScale
        angle = theta(d) - Math.PI/2
        r * Math.sin(angle)

    point = point.enter().append('path')
        .attr('d', d3.svg.symbol().type(conf.glyph.shape).size(conf.glyph.size))
        .attr('transform', (d) -> 'translate(' + x(d) + ',' + y(d) + ') rotate(' + theta(d)*360/(2*Math.PI) + ')')

    point = point.attr('class', 'point')
        .attr('stroke', (d) -> d.strokeColor || conf.glyph.strokeColor)
        .attr('stroke-width', conf.glyph.strikeWidth)
        .attr('fill', if conf.glyph.fill then conf.glyph.color else 'none')

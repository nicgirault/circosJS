circosJS.renderScatter = (name, scatter, instance, d3, svg) ->
    conf = scatter.getConf()

    svg.select('.' + name).remove()

    track = svg.append('g')
        .classed(name, true)
        .attr('transform', 'translate(' + parseInt(instance.getWidth()/2) + ',' + parseInt(instance.getHeight()/2) + ')')

    block = track.selectAll('g')
        .data(scatter.getData())
        .enter().append('g')
        .attr('class', (d,i)->
            name + '-' + d.parent
        true)
        # .attr('transform', (d) -> 'rotate(' + instance._layout.getBlock(d.parent).start*360/(2*Math.PI) + ')')

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

    if conf.glyph.shape == 'circle'
        point = point.enter().append('circle')
            .attr('r', conf.glyph.size)
            .attr('cx', (d,i) -> x(d))
            .attr('cy', (d,i) -> y(d))
    else
        point = point.enter().append('path')
            .attr('d', d3.svg.symbol().type(conf.glyph.shape).size(conf.glyph.size))
            .attr('transform', (d) -> 'translate(' + x(d) + ',' + y(d) + ') rotate(' + theta(d)*360/(2*Math.PI) + ')')
    point = point.attr('class', 'point')
        .style('fill', conf.color)


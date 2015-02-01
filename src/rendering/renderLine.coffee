circosJS.renderLine = (name, line_track, instance, d3, svg) ->
    conf = line_track.getConf()

    svg.select('.' + name).remove()

    track = svg.append('g')
        .classed(name, true)
        .attr('transform', 'translate(' + parseInt(instance.getWidth()/2) + ',' + parseInt(instance.getHeight()/2) + ')')

    theta = (d) ->
        block = instance._layout.getBlock(d.block_id)
        block.start + d.position / block.len * (block.end - block.start)
    x = (d) ->
        if conf.direction == 'in'
            r = conf.outerRadius - line_track.height d.value, conf.logScale
        else
            r = conf.innerRadius + line_track.height d.value, conf.logScale
        angle = theta(d) - Math.PI/2
        r * Math.cos(angle)
    y = (d) ->
        if conf.direction == 'in'
            r = conf.outerRadius - line_track.height d.value, conf.logScale
        else
            r = conf.innerRadius + line_track.height d.value, conf.logScale
        angle = theta(d) - Math.PI/2
        r * Math.sin(angle)

    block = track.selectAll('g')
        .data(line_track.getData())
        .enter().append('g')
        .attr('class', (d,i)->
            name + '-' + d.parent
        true)

    line = d3.svg.line()
        .x((d) -> x(d))
        .y((d) -> y(d))

    block.append("path")
      .datum((d) -> d.data)
      .attr("class", "line")
      .attr("d", line)
      .attr('stroke-width', conf.thickness)
      .attr('fill', if conf.fill then conf.fill_color else 'none')
      .attr('stroke', conf.color)

circosJS.renderChord = (name, chord, instance, d3, svg) ->
    conf = chord.getConf()

    svg.select('.' + name).remove()
    
    track = svg.append('g')
        .classed(name, true)
        .attr('transform', 'translate(' + parseInt(instance.getWidth()/2) + ',' + parseInt(instance.getHeight()/2) + ')')
        
    track = track.classed(conf.colorPalette, true) unless conf.color
    
    link = track.selectAll('path')
        .data(chord.getData())
        .enter().append('path')

    link = link.attr('d',
        d3.svg.chord()
        .source(chord.getSource)
        .target(chord.getTarget)
    ).attr('opacity', conf.opacity)

    if conf.color
        link.attr('fill', conf.color)
    else if conf.colorPalette?
        link.attr('class', (d) ->
            'q' + chord.colorScale(d.value, conf.logScale) + '-' + conf.colorPaletteSize
        true)
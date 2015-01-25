circosJS.renderChord = (name, chord, instance, d3, svg) ->
    conf = chord.getConf()

    svg.select('.' + name).remove()
    
    track = svg.append('g')
        .classed(conf.colorPalette, true)
        .classed(name, true)
        .attr('transform', 'translate(' + parseInt(instance.getWidth()/2) + ',' + parseInt(instance.getHeight()/2) + ')')
        .selectAll('path')
        .data(chord.getData())
        .enter().append('path')

    track = track.attr('d',
        d3.svg.chord()
        .source(chord.getSource)
        .target(chord.getTarget)
    ).attr('class', (d) ->
        'q' + d.value + '-' + conf.colorPaletteSize
    ).attr('opacity', conf.opacity)
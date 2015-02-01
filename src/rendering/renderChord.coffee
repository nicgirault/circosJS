circosJS.renderChord = (track, chord, conf, data, instance, d3) ->
    track = track.classed(conf.colorPalette, true) if conf.usePalette

    link = track.selectAll('path')
        .data(chord.getData())
        .enter().append('path')

    link = link.attr('d',
        d3.svg.chord()
        .source(chord.getSource)
        .target(chord.getTarget)
    ).attr('opacity', conf.opacity)

    if conf.usePalette
        link.attr('class', (d) ->
            'q' + chord.colorScale(d.value, conf.logScale) + '-' + conf.colorPaletteSize
        true)
    else
        link.attr('fill', conf.color)


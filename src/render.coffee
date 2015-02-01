circosJS.Core.prototype.render = (ids) ->
    # this refers the circos instance

    if typeof ids == 'undefined'
        renderAll = true

    svg = d3.select(this.getContainer())

    if renderAll or 'layout' in ids
        circosJS.renderLayout d3, svg, this

    types = [
        {store: @_heatmaps, renderFunction: circosJS.renderHeatmap}
        {store: @_histograms, renderFunction: circosJS.renderHistogram}
        {store: @_chords, renderFunction: circosJS.renderChord}
        {store: @_scatters, renderFunction: circosJS.renderScatter}
        {store: @_lines, renderFunction: circosJS.renderLine}
    ]

    preRender = (trackName, track, instance, d3, svg, callback) ->
        callback(trackName, track, instance, d3, svg)

    for trackType in types
        for trackName in Object.keys(trackType.store)
            if renderAll or trackName in ids
                track = trackType.store[ trackName ]
                preRender trackName, track, @, d3, svg, trackType.renderFunction

    return

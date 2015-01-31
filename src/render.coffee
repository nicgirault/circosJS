circosJS.Core.prototype.render = (ids) ->
    # this refers the circos instance

    if typeof ids == 'undefined'
        renderAll = true

    svg = d3.select(this.getContainer())

    if renderAll or 'layout' in ids
        circosJS.renderLayout d3, svg, this

    for heatmap_name in Object.keys(this._heatmaps)
        if renderAll or heatmap_name in ids
            heatmap = this._heatmaps[heatmap_name]
            circosJS.renderHeatmap(heatmap_name, heatmap, this, d3, svg)

    for histogram_name in Object.keys(this._histograms)
        if renderAll or histogram_name in ids
            histogram = this._histograms[histogram_name]
            circosJS.renderHistogram(histogram_name, histogram, this, d3, svg)

    for chord_name in Object.keys(this._chords)
        if renderAll or chord_name in ids
            chord = this._chords[chord_name]
            circosJS.renderChord(chord_name, chord, this, d3, svg)

    for scatter_name in Object.keys(this._scatters)
        if renderAll or scatter_name in ids
            scatter = this._scatters[scatter_name]
            circosJS.renderScatter(scatter_name, scatter, this, d3, svg)

    return

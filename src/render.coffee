circosJS.Core.prototype.render = (ids) ->
    # this refers the circos instance
    
    if typeof ids == 'undefined'
        renderAll = true

    svg = d3.select(this.getContainer())
    ################################
    ## render layout
    ################################
    if renderAll or 'layout' in ids
        circosJS.renderLayout d3, svg, this

    ################################
    ## render heatmaps
    ################################
    for heatmap_name in Object.keys(this._heatmaps)
        if renderAll or heatmap_name in ids
            heatmap = this._heatmaps[heatmap_name]
            circosJS.renderHeatmap(heatmap_name, heatmap, this, d3, svg)
        
    ################################
    ## render histogram
    ################################
    for histogram_name in Object.keys(this._histograms)
        if renderAll or histogram_name in ids
            histogram = this._histograms[histogram_name]
            circosJS.renderHistogram(histogram_name, histogram, this, d3, svg)

    ################################
    ## render chords
    ################################
    for chord_name in Object.keys(this._chords)
        if renderAll or chord_name in ids
            chord = this._chords[chord_name]
            circosJS.renderChord(chord_name, chord, this, d3, svg)
        
    return

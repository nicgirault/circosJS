circosJS.Core.prototype.heatmap = (id, conf, data) ->
    track = new circosJS.Heatmap(conf, data)

    track.completeData()

    if track.isLayoutCompliant @, id
        track.computeMinMax()
        @_heatmaps[id] = track

    return @

circosJS.Core.prototype.histogram = (id, conf, data) ->
    track = new circosJS.Histogram(conf, data)

    track.completeData()

    if track.isLayoutCompliant @, id
        track.computeMinMax()
        @_histograms[id] = track

    return @

circosJS.Core.prototype.chord = (id, conf, data) ->
    track = new circosJS.Chord(conf, data, @_layout)

    if track.isLayoutCompliant @, id
        track.computeMinMax()
        @_chords[id] = track

    return @

circosJS.Core.prototype.scatter = (id, conf, data) ->
    track = new circosJS.Scatter(conf, data)
    track.completeData()

    track.computeMinMax()
    @_scatters[id] = track

    return @

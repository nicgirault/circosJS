circosJS.Core.prototype.heatmap = (id, conf, data, rules) ->
    track = new circosJS.Heatmap(@, conf, data, rules)

    track.completeData()

    if track.isLayoutCompliant @, id
        track.computeMinMax()
        @_heatmaps[id] = track

    return @

circosJS.Core.prototype.histogram = (id, conf, data, rules) ->
    track = new circosJS.Histogram(@, conf, data, rules)

    track.completeData()

    if track.isLayoutCompliant @, id
        track.computeMinMax()
        @_histograms[id] = track

    return @

circosJS.Core.prototype.chord = (id, conf, data, rules) ->
    track = new circosJS.Chord(@, conf, data, rules, @_layout)

    if track.isLayoutCompliant @, id
        track.computeMinMax()
        @_chords[id] = track

    return @

circosJS.Core.prototype.scatter = (id, conf, data, rules) ->
    track = new circosJS.Scatter(@, conf, data, rules)
    track.completeData()
    track.applyRules()

    track.computeMinMax()
    @_scatters[id] = track

    return @

circosJS.Core.prototype.line = (id, conf, data, rules) ->
    track = new circosJS.Line(@, conf, data, rules)
    track.completeData()

    track.computeMinMax()
    @_lines[id] = track

    return @

circosJS.Core.prototype.stack = (id, conf, data, rules) ->
    track = new circosJS.Stack(@, conf, data, rules)
    track.completeData()
    track.buildLayeredData()
    track.computeMinMax()
    track.applyRules()
    @_stacks[id] = track

    return @

circosJS.Core.prototype.heatmap = (id, conf, data) ->
    track = new circosJS.Heatmap(conf, data)

    if track.isLayoutCompliant @
        @_heatmaps[id] = track

    return @

circosJS.Core.prototype.histogram = (id, conf, data) ->
    track = new circosJS.Histogram(conf, data)

    if track.isLayoutCompliant @
        @_histograms[id] = track

    return @


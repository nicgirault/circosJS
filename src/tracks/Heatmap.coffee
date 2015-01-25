circosJS.Heatmap = (conf, data) ->
    circosJS.Track.call(@, conf, data)
    return @

circosJS.Heatmap.prototype = Object.create(circosJS.Track.prototype)
circosJS.Heatmap.prototype.constructor = circosJS.Heatmap
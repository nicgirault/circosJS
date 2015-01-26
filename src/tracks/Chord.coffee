circosJS.Chord = (conf, data, layout) ->
    circosJS.Track.call(@, conf, data)
    @getSource = (d) =>
        d = d.source
        block = layout.getBlock d.id
        startAngle = block.start + d.start / block.len * (block.end - block.start)
        endAngle = block.start + d.end / block.len * (block.end - block.start)
        result =
            radius: layout.getConf().innerRadius
            startAngle: startAngle
            endAngle: endAngle
    @getTarget = (d) =>
        d = d.target
        block = layout.getBlock d.id
        startAngle = block.start + d.start / block.len * (block.end - block.start)
        endAngle = block.start + d.end / block.len * (block.end - block.start)
        result =
            radius: layout.getConf().innerRadius
            startAngle: startAngle
            endAngle: endAngle

    return @

circosJS.Chord.prototype = Object.create(circosJS.Track.prototype)
circosJS.Chord.prototype.constructor = circosJS.Chord

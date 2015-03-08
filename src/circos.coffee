circosJS = (conf) ->
    instance = new circosJS.Core(conf)
    # instance.init()
    return instance

# Circos instance
circosJS.Core = (conf) ->
    this._heatmaps = {}
    this._histograms = {}
    this._chords = {}
    this._scatters = {}
    this._lines = {}
    this._stacks = {}
    # this.init = function(){
    #     console.log('initializing instance');
    # };
    this.tracks =
        histograms: this._histograms
        heatmaps: this._heatmaps
        chords: this._chords
        scatters: this._scatters
        lines: this._lines
        stacks: this._stacks

    # conf override the default configuration. Conf not in default conf
    # object are removed
    for k,v of this._conf
        this._conf[k] = if conf[k]? then conf[k] else v

    this.getContainer = ->
        this._conf.container
    this.getWidth = ->
        this._conf.width
    this.getHeight = ->
        this._conf.height
    return this

circosJS.Core.prototype.removeTracks = (trackIds) ->
    # this refers the circos instance
    svg = d3.select(this.getContainer())

    for type, store of this.tracks
        if typeof(trackIds) == 'object'
            for id in trackIds
                if id of store
                    svg.select('.' + id).remove()
                    delete store[id]
        else if typeof(trackIds) == 'string'
            if trackIds of store
                svg.select('.' + trackIds).remove()
                delete store[trackIds]
        else if typeof(trackIds) == 'undefined'
            for trackId of store
                svg.select('.' + trackId).remove()
                delete store[trackId]
    return this

circosJS.Core.prototype.layout = (conf, data) ->
    # this refers the circos instance
    this._layout = new circosJS.Layout(conf, data)
    return this

circosJS.log = (level, code, message, data) ->
    levels = ['Permanent log', 'Error', 'Warning', 'Info']
    # 0 - permanent
    # 1 - error
    # 2 - warning
    # 3 - info
    console.log('CircosJS: ', levels[level]+' ['+code+'] ', message, data)
    return

circosJS.mixConf = (conf, defaultConf) ->
    newConf = {}
    for key, value of defaultConf
        if key of conf
            if typeof value == 'object'
                newConf[key] = circosJS.mixConf(conf[key], value)
            else
                newConf[key] = conf[key]
        else
            newConf[key] = value
    return newConf

circosJS.Core.prototype.smartBorders = ->
    width = @_conf.defaultTrackWidth
    layout = {in: @_layout._conf.innerRadius, out: @_layout._conf.outerRadius}
    borders = []
    for trackType, store of @tracks
        for trackId, track of store
            borders.push {in: track._conf.innerRadius, out: track._conf.outerRadius} if track._conf.innerRadius

    borders = borders.sort (a,b) ->
        1 if a.out > b.out
        -1 if a.out < b.out
        0

    currentBorder = layout
    for border in borders
        if border.out < currentBorder.in - width
            return {in: currentBorder.in - width, out: currentBorder.in}
        currentBorder = border
    if currentBorder.in > width
        return {in: currentBorder.in - width, out: currentBorder.in}
    else
        return {in: borders[0].out, out: borders[0].out + width}


if module?
    module.exports = circosJS


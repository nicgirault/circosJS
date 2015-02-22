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

circosJS.log = (level, name, message, data) ->
    levels = ['Permanent log', 'Error', 'Warning', 'Info']
    # 0 - permanent
    # 1 - error
    # 2 - warning
    # 3 - info
    console.log('CircosJS: ', levels[level]+' ['+name+'] ', message, data)
    return

circosJS.parseData = (data) ->
    unless data.length > 0
        return data
    sample = data[0]

    unless Array.isArray(sample)
        return data

    # if it's an array:
    # [parentId, start, end, value]
    dict = {}
    data.forEach (datum) ->
        unless dict[datum[0]]?
            dict[datum[0]] = []
        dict[datum[0]].push {start: datum[1], end: datum[2], value: datum[3]}
    newData = []
    for parentId, block of dict
        newData.push {parent: parentId, data: block}
    return newData

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

if module?
    module.exports = circosJS


circosJS = (conf) ->
    instance = new circosJS.Core(conf)
    # instance.init()
    return instance

# Circos instance
circosJS.Core = (conf) ->
    this._heatmaps = {}
    this._histograms = {}
    this._chords = {}
    # this.init = function(){
    #     console.log('initializing instance');
    # };

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
    # console.log('CircosJS: ', levels[level]+' ['+name+'] ', message, data)
    return

if module?
    module.exports = circosJS


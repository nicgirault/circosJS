circosJS = (conf) ->
    instance = new circosJS.Core(conf)
    # instance.init()
    return instance



# Circos instance
circosJS.Core = (conf) ->
    this._heatmaps = {}
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
    return

# define default configuration values
circosJS.Core.prototype._conf =
    width: 550
    height: 550
    container: 'circos'

circosJS.Core.prototype.layout = (conf, data) ->
    # this refers the circos instance
    this._layout = new circosJS.layout(conf, data)
    return this

circosJS.Core.prototype.heatmap = (id, conf, data) ->
    if this._heatmaps[id]
        # update
        null
    else
        # append
        null

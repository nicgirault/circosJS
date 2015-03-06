circosJS.Heatmap = (instance, conf, data, rules, backgrounds) ->
    unless conf.innerRadius? or conf.outerRadius?
      smartBorders = instance.smartBorders()
      conf.innerRadius = smartBorders.in
      conf.outerRadius = smartBorders.out

    # conf override the default configuration. Conf not in default conf
    # object are removed
    @_conf = circosJS.mixConf conf, JSON.parse(JSON.stringify(@_defaultConf))

    circosJS.Track.call(@, instance, conf, data, rules, backgrounds)
    return @


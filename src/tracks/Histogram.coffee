circosJS.Histogram = (instance, conf, data, rules, backgrounds) ->
  # conf override the default configuration. Conf not in default conf
  # object are removed
  @_conf = circosJS.mixConf conf, JSON.parse(JSON.stringify(@_defaultConf))

  if @_conf.innerRadius == 0 and @_conf.outerRadius == 0
    smartBorders = instance.smartBorders()
    @_conf.innerRadius = smartBorders.in
    @_conf.outerRadius = smartBorders.out

  circosJS.Track.call(@, instance, conf, data, rules, backgrounds)
  return @


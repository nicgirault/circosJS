circosJS.Scatter = (instance, conf, data, rules, backgrounds) ->
  # conf override the default configuration. Conf not in default conf
  # object are removed
  @_conf = circosJS.mixConf conf, JSON.parse(JSON.stringify(@_defaultConf))
  circosJS.CircularTrack.call(@, instance, conf, data, rules, backgrounds)
  return @

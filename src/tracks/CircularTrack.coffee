circosJS.CircularTrack = (instance, conf, data, rules, backgrounds) ->
  # Only for heatmap and histograms...
  @completeData = ->
    # add parent is datum. Needed for rendering
    for k,v of @_data
      for i, datum of v.data
        datum.block_id = v.parent
  if @_conf.innerRadius == 0 and @_conf.outerRadius == 0
      smartBorders = instance.smartBorders()
      @_conf.innerRadius = smartBorders.in
      @_conf.outerRadius = smartBorders.out

  circosJS.Track.call(@, instance, conf, data, rules, backgrounds)
  return @

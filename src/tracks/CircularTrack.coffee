circosJS.CircularTrack = (instance, conf, data, rules, backgrounds) ->
  # Only for heatmap and histograms...
  @completeData = ->
    # add parent is datum. Needed for rendering
    for k,v of @_data
      for i, datum of v.data
        datum.block_id = v.parent

  circosJS.Track.call(@, instance, conf, data, rules, backgrounds)
  return @

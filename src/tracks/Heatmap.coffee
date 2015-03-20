circosJS.Heatmap = ->
  circosJS.Track.call(@)
  @parseData = circosJS.parseSpanValueData
  @render = circosJS.renderHeatmap
  return @

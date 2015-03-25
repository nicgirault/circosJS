circosJS.Histogram = ->
  circosJS.Track.call @
  @parseData = circosJS.parseSpanValueData
  @render = circosJS.renderHistogram
  return @

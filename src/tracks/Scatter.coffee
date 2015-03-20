circosJS.Scatter = ->
  circosJS.Track.call @
  @parseData = circosJS.parsePositionValueData
  @render = circosJS.renderScatter
  return @


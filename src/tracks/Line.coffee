circosJS.Line = ->
  circosJS.Track.call @
  @parseData = circosJS.parsePositionValueData
  @render = circosJS.renderLine
  return @

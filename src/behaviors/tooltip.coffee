circosJS._registerTooltip = (track, element, trackParams) ->
  track.tip = d3.tip()
  .direction('s')
  .offset([20, 0])
  .html trackParams.tooltipContent

  element.call track.tip

  track.dispatch.on 'mouseover', (d, i, j) ->
    track.tip.attr('class', 'd3-tip appear').show(d, i, j)

  track.dispatch.on 'mouseout', (d, i, j) ->
    track.tip.attr('class', 'd3-tip').show(d, i, j)
    track.tip.hide()

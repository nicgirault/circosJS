# showTooltips: true
# tooltipContent: (d) ->
#   html = '<table class="c3-tooltip">'
#   for key, value of d.summary
#     html += '<tr><td>' + key + '</td><td> ' + value + '</td></tr>'
#   html += '</table>'
#   html
circosJS.registerTooltip = (instance, track, element, trackParams) ->
  track.tip = d3.tip()
  .direction('s')
  .offset([20, 0])
  .html trackParams.tooltipContent

  element.call track.tip

  track.dispatch.on 'mouseover', (d, i, j) ->
    track.tip.attr('class', 'd3-tip appear').show(d)

  track.dispatch.on 'mouseout', (d, i, j) ->
    track.tip.attr('class', 'd3-tip').show(d)
    track.tip.hide()

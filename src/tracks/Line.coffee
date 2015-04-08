circosJS.Line = ->
  circosJS.Track.call @
  @parseData = circosJS.parsePositionValueData

  @renderDatumContainer = (instance, parentElement, name, data, conf) =>
    track = parentElement.append 'g'
      .attr 'class', name
    group = @renderBlock track, data, instance._layout, conf

  @renderDatum = (parentElement, conf, layout, utils) ->
    line = d3.svg.line()
      .x (d) -> utils.x d, layout, conf
      .y (d) -> utils.y d, layout, conf
      .interpolate conf.interpolation

    parentElement.append 'path'
      .datum (d) -> d.values
      .attr 'class', 'line'
      .attr 'd', line
      .attr 'opacity', (d) -> d.opacity || conf.opacity
      .attr 'stroke-width', (d) -> d.thickness || conf.thickness
      .attr 'stroke', (d) -> d.color || conf.color
      .attr 'fill', (d) ->
        fill = d.fill || conf.fill
        color = d.fill_color || conf.fill_color
        if fill then color else 'none'

  return @

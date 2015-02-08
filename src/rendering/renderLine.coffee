circosJS.renderLine = (track, line_track, conf, data, instance, d3) ->
  block = track.selectAll 'g'
    .data data
    .enter().append 'g'

  line = d3.svg.line()
    .x line_track.x
    .y line_track.y
    .interpolate conf.interpolation

  block = block.append 'path'
    .datum (d) -> d.data

  block.attr 'class', 'line'
    .attr 'd', line
    .attr 'stroke-width', (d) -> d.thickness || conf.thickness
    .attr 'stroke', (d) -> d.color || conf.color
    .attr 'fill', (d) ->
      fill = d.fill || conf.fill
      color = d.fill_color || conf.fill_color
      if fill then color else 'none'

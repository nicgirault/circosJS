circosJS.renderLine = (track, line_track, conf, data, instance, d3) ->
  block = track.selectAll '.block'
    .data data
    .enter().append 'g'
    .classed 'block', true

  buildAxes = (conf) ->
    if conf.axes.minor.spacingType == 'pixel'
      axes = (x for x in [conf.innerRadius..conf.outerRadius] by conf.axes.minor.spacing)
    return axes
  axes = buildAxes conf
  line = d3.svg.line()
    .x line_track.x
    .y line_track.y
    .interpolate conf.interpolation

  axis = d3.svg.arc()
    .innerRadius (d,i,j) -> d
    .outerRadius (d) -> d
    .startAngle (d, i, j) ->
      b = instance._layout.getBlock(data[j].parent)
      b.start
    .endAngle (d, i, j) ->
      b = instance._layout.getBlock(data[j].parent)
      b.end

  block.selectAll '.axis'
    .data (d) -> axes
    .enter().append 'path'
    .classed 'axis', true
    .attr 'd', axis
    .attr 'stroke-width', (d, i) -> if i % conf.axes.major.spacing == 0 then conf.axes.major.thickness else conf.axes.minor.thickness
    .attr 'stroke', (d, i) -> if i % conf.axes.major.spacing == 0 then conf.axes.major.color else conf.axes.minor.color

  block.append 'path'
    .datum (d) -> d.data
    .attr 'class', 'line'
    .attr 'd', line
    .attr 'stroke-width', (d) -> d.thickness || conf.thickness
    .attr 'stroke', (d) -> d.color || conf.color
    .attr 'fill', (d) ->
      fill = d.fill || conf.fill
      color = d.fill_color || conf.fill_color
      if fill then color else 'none'





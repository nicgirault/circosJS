circosJS.renderLine = (instance, parentElement, name) ->
  track = parentElement.append('g').attr('class', name)
  group = @renderBlock track, @data, instance._layout

  renderDatum = (parentElement, conf, layout) ->
    parentElement.append 'path'
      .datum (d) -> d.values
      .attr 'class', 'line'
      .attr 'd', line
      .attr 'stroke-width', (d) -> d.thickness || conf.thickness
      .attr 'stroke', (d) -> d.color || conf.color
      .attr 'fill', (d) ->
        fill = d.fill || conf.fill
        color = d.fill_color || conf.fill_color
        if fill then color else 'none'

  buildAxes = (parentElement, conf, data) ->
    if conf.axes.minor.spacingType == 'pixel'
      axes = (x for x in [conf.innerRadius..conf.outerRadius] by conf.axes.minor.spacing)

    axis = d3.svg.arc()
      .innerRadius (d) -> d
      .outerRadius (d) -> d
      .startAngle 0
      .endAngle (d, i, j) =>
        block = instance._layout.blocks[data[j].key]
        block.end - block.start

    parentElement.selectAll '.axis'
      .data axes
      .enter().append 'path'
      .attr 'class', 'axis'
      .attr 'd', axis
      .attr 'stroke-width', (d, i) -> if i % conf.axes.major.spacing == 0 then conf.axes.major.thickness else conf.axes.minor.thickness
      .attr 'stroke', (d, i) -> if i % conf.axes.major.spacing == 0 then conf.axes.major.color else conf.axes.minor.color

  line = d3.svg.line()
    .x (d) => @x d, instance._layout, @conf
    .y (d) => @y d, instance._layout, @conf
    .interpolate @conf.interpolation

  buildAxes group, @conf, @data
  renderDatum group, @conf, instance._layout


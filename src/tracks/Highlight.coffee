circosJS.Highlight = ->
  circosJS.Track.call @
  @parseData = circosJS.parseSpanStringData

  @renderDatumContainer = (instance, parentElement, name, data, conf) =>
    group = @renderBlock parentElement, data, instance._layout, conf

  @renderDatum = (parentElement, conf, layout, utils) ->
    parentElement.selectAll 'tile'
      .data (d) -> d.values
      .enter().append 'path'
      .attr 'class', 'tile'
      .attr 'd',
        d3.svg.arc()
          .innerRadius conf.innerRadius
          .outerRadius conf.outerRadius
          .startAngle (d, i) -> utils.theta d.start, layout.blocks[d.block_id]
          .endAngle (d, i) -> utils.theta d.end, layout.blocks[d.block_id]
      .attr 'fill', (d) -> d.value || conf.color
      .attr 'opacity', (d) -> d.opacity || conf.opacity
      .attr 'stroke-width', (d) -> d.strokeWidth || conf.strokeWidth
      .attr 'stroke', (d) -> d.strokeColor || conf.strokeColor

  return @

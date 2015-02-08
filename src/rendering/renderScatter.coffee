circosJS.renderScatter = (track, scatter, conf, data, instance, d3) ->
  block = track.selectAll 'g'
    .data data
    .enter().append 'g'

  point = block.selectAll '.point'
    .data (d) -> d.data

  point.enter().append 'path'
    .attr 'd',
      d3.svg.symbol()
      .type conf.glyph.shape
      .size conf.glyph.size
    .attr 'transform', (d) ->
      'translate(' + scatter.x(d) + ',' + scatter.y(d) + ') rotate(' + scatter.theta(d)*360/(2*Math.PI) + ')'

  point.classed 'point', true
  point.attr 'stroke', (d) -> d.glyph_strokeColor || conf.glyph.strokeColor
  point.attr 'stroke-width', (d) -> d.glyph_strokeWidth || conf.glyph.strokeWidth
  point.attr 'fill', (d) ->
    fill = d.glyph_fill || conf.glyph.fill
    color = d.glyph_color || conf.glyph.color
    if fill then color else 'none'

circosJS.renderScatter = (instance, parentElement, name) ->
  track = parentElement.append('g').attr 'class', name
  group = @renderBlock track, @data, instance._layout

  renderDatum = (parentElement, conf, layout, x, y, theta) =>
    point = parentElement.selectAll '.point'
      .data (d) -> d.values
      .enter().append 'path'
      .attr 'class', 'point'
      .attr 'd',
        d3.svg.symbol()
          .type conf.glyph.shape
          .size conf.glyph.size
      .attr 'transform', (d) =>
        'translate(' + x(d, layout, conf) + ',' + y(d, layout, conf) + ') rotate(' + theta(d.position, layout.blocks[d.block_id])*360/(2*Math.PI) + ')'
      .attr 'stroke', (d) -> d.glyph_strokeColor || conf.glyph.strokeColor
      .attr 'stroke-width', (d) -> d.glyph_strokeWidth || conf.glyph.strokeWidth
      .attr 'fill', (d) ->
        fill = d.glyph_fill || conf.glyph.fill
        color = d.glyph_color || conf.glyph.color
        if fill then color else 'none'

  renderDatum group, @conf, instance._layout, @x, @y, @theta

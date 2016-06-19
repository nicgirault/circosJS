circosJS.Scatter = ->
  circosJS.Track.call @
  @parseData = circosJS.parsePositionValueData

  @renderDatumContainer = (instance, parentElement, name, data, conf) =>
    track = parentElement.append 'g'
      .attr 'class', name
    group = @renderBlock track, data, instance._layout, conf

  @renderDatum = (parentElement, conf, layout, utils) ->
    point = parentElement.selectAll '.point'
      .data (d) -> d.values
      .enter().append 'path'
      .attr 'class', 'point'
      .attr 'opacity', (d) -> d.opacity || conf.opacity
      .attr 'd',
        d3.svg.symbol()
          .type conf.glyph.shape
          .size conf.glyph.size
      .attr 'transform', (d) =>
        'translate(' + utils.x(d, layout, conf) + ',' + utils.y(d, layout, conf) + ') rotate(' + utils.theta(d.position, layout.blocks[d.block_id])*360/(2*Math.PI) + ')'
      .attr 'stroke', (d) -> d.glyph_strokeColor || conf.glyph.strokeColor
      .attr 'stroke-width', (d) -> d.glyph_strokeWidth || conf.glyph.strokeWidth
      .attr 'fill', (d) ->
        fill = d.glyph_fill || conf.glyph.fill
        color = d.glyph_color || conf.glyph.color
        if fill then color else 'none'
    point

  return @

circosJS.Text = ->
  circosJS.Track.call @
  @parseData = circosJS.parsePositionTextData

  @renderDatumContainer = (instance, parentElement, name, data, conf) =>
    track = parentElement.append 'g'
      .attr 'class', name
    group = @renderBlock track, data, instance._layout, conf

  @renderDatum = (parentElement, conf, layout, utils) ->
    text = parentElement.selectAll 'g'
      .data (d) -> d.values
      .enter().append 'g'
      .append 'text'
      .text (d) -> d.value
      .attr 'transform', (d) ->
        angle = utils.theta(d.position, layout.blocks[d.block_id])*360/(2*Math.PI) - 90
        'rotate(' + angle + ')' + 'translate(' + conf.innerRadius + ',0)'
    for key, value of conf.style
      text.style key, value
    text
  return @

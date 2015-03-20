circosJS.Chord = ->
  circosJS.Track.call @
  @parseData = circosJS.parseChordData
  @render = circosJS.renderChord

  @getSource = (d, layout) =>
    d = d.source
    block = layout.blocks[d.id]
    startAngle = block.start + d.start / block.len * (block.end - block.start)
    endAngle = block.start + d.end / block.len * (block.end - block.start)
    result =
      radius: layout.getConf().innerRadius
      startAngle: startAngle
      endAngle: endAngle
  @getTarget = (d, layout) =>
    d = d.target
    block = layout.blocks[d.id]
    startAngle = block.start + d.start / block.len * (block.end - block.start)
    endAngle = block.start + d.end / block.len * (block.end - block.start)
    result =
      radius: layout.getConf().innerRadius
      startAngle: startAngle
      endAngle: endAngle
  @

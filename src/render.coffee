# removeTracks allows to clean track data if layout is changed
circosJS.Core.prototype.render = (ids, removeTracks) ->
  # this refers the circos instance
  if typeof ids == 'undefined'
    renderAll = true
    ids = []

  if removeTracks
    # remove all tracks to be sure to keep consistent data
    # TODO: a smarter strategy could be implemented:
    # remove tracks only if layout data changes
    for trackType, trackStore of @tracks
      for name, track of trackStore
        svg.select('.' + name).remove()

  svg = d3.select @conf.container
    .attr 'width', @conf.width
    .attr 'height', @conf.height

  translated = svg.select '.all'
  if translated.empty()
    translated = svg.append 'g'
      .attr 'class', 'all'
      .attr 'transform', 'translate(' + parseInt(@conf.width/2) + ',' + parseInt(@conf.height/2) + ')'

  for trackType, trackStore of @tracks
    for name, track of trackStore
      if renderAll or name in ids
        track.render @, translated, name
  if renderAll or 'layout' in ids
    circosJS.renderLayout d3, translated, @

  # re-order tracks and layout according to z-index
  # it looks like an anti-pattern. Is there an alternative?
  tracks = svg.selectAll('.all > g').remove()
  tracks[0].sort (a,b) ->
    if parseInt(a.getAttribute('z-index')) < parseInt(b.getAttribute('z-index'))
      return -1
    else if parseInt(a.getAttribute('z-index')) > parseInt(b.getAttribute('z-index'))
      return 1
    else
      return 0
  svg.select('.all').selectAll 'g'
    .data tracks[0]
    .enter()
    .append (d) -> d

  # renderBackgrounds = (d3Track, track, instance, d3, svg) ->
  #   backgrounds = track._backgrounds

  #   for k, b of instance._layout._blocks
  #     b.block_id = k

  #   blocks = (b for k, b of instance._layout._blocks)
  #   conf = track.getConf()

  #   scope = conf.outerRadius - conf.innerRadius

  #   # a block background
  #   blockBackground = d3.svg.arc()
  #   .innerRadius (d, i, j) ->
  #     if conf.direction == 'in'
  #       conf.outerRadius - scope * backgrounds[j].start
  #     else
  #       conf.innerRadius + scope * backgrounds[j].start
  #   .outerRadius (d, i, j) ->
  #     if conf.direction == 'in'
  #       conf.outerRadius - scope * backgrounds[j].end
  #     else
  #       conf.innerRadius + scope * backgrounds[j].end
  #   .startAngle (d) -> d.start
  #   .endAngle (d) -> d.end

  #   # add backgrounds
  #   d3Track = d3Track.selectAll '.background'
  #     .data backgrounds
  #     .enter().append 'g'
  #     .classed 'background', true

  #   # add path for each layout block
  #   d3Track = d3Track.selectAll 'path'
  #     .data blocks
  #     .enter()
  #     .append 'path'
  #     # if blackground has a parent attribute, we draw the background only for the background
  #     .filter (block, i, j) ->
  #       parent = backgrounds[j].parent
  #       if typeof  parent == 'undefined'
  #         return true
  #       else if typeof parent == 'string'
  #         return block.block_id == parent
  #       else if typeof parent == 'object'
  #         return block.block_id in parent

  #   d3Track.attr 'd', blockBackground
  #   .attr 'fill', (d, i, j) -> backgrounds[j].color
  #   .attr 'opacity', (d, i, j) -> backgrounds[j].opacity

  # track = (name, parent) ->
  #   parent.selectAll '.'+name
  #   .enter().append('g').classed(name, true)
  # preRender = (name, track, instance, d3, svg, callback) ->
  #   conf = track.getConf()

  #   svg.select('.' + name).remove()
  #   svg = svg.append('g')
  #     .classed(name, true)

  #   renderBackgrounds(track1, track, instance, d3, svg)
  #   data = track.getData()

  #   callback(track1, track, conf, data, instance, d3, svg)

  # for trackType in types
  #   for trackName in Object.keys(trackType.store)
  #     if renderAll or trackName in ids
  #       track = trackType.store[ trackName ]
  #       preRender trackName, track, @, d3, svg, trackType.renderFunction

  return

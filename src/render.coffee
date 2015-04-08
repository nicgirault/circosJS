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

  @

# A layout instance
circosJS.Layout = (conf, data) ->
  unless data?
    circosJS.log 2, 'no layout data', ''

  @conf = circosJS.mixConf conf, JSON.parse JSON.stringify @defaultConf

  # this refers the layout instance
  @data = data
  @blocks = {} #data dictonary key=blockId
  @size = 0

  # compute block offset
  offset = 0
  for k,v of @data
    @blocks[v.id] =
      label: v.label
      len: v.len
      color: v.color
      offset: offset
    v.offset = offset
    offset += v.len
  @size = offset

  # thanks to sum of blocks' length, compute start and end angles in radian
  gap = @conf.gap
  size = @size
  block_nb = @data.length
  for k,v of @data
    @blocks[v.id].start = v.offset/size *(2*Math.PI-block_nb*gap)  + k*gap
    @blocks[v.id].end = (v.offset + v.len)/size *(2*Math.PI-block_nb*gap)  + k*gap
    v.start = v.offset/size *(2*Math.PI-block_nb*gap)  + k*gap
    v.end = (v.offset + v.len)/size *(2*Math.PI-block_nb*gap)  + k*gap

  @getAngle = (blockId, unit) ->
    block = @blocks[blockId].start/@_size
    if unit == 'deg' then block*360
    else if unit == 'rad' then block*2*Math.PI
    else null

  @summary = ->
    layoutSummary = {}
    for d in @_data
      layoutSummary[d.id] = d.len
    layoutSummary

  return @

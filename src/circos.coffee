circosJS = (conf) ->
  instance = new circosJS.Core conf
  return instance

# Circos instance
circosJS.Core = (conf) ->
  @tracks =
    heatmaps: {}
    histograms: {}
    chords: {}
    scatters: {}
    lines: {}
    stacks: {}
    highlights: {}
    texts: {}

  @conf = circosJS.mixConf conf, @defaultConf
  @

circosJS.Core.prototype.removeTracks = (trackIds) ->
  # this refers the circos instance
  svg = d3.select @conf.container

  for type, store of this.tracks
    if typeof(trackIds) == 'object'
      for id in trackIds
        if id of store
          svg.select('.' + id).remove()
          delete store[id]
    else if typeof(trackIds) == 'string'
      if trackIds of store
        svg.select('.' + trackIds).remove()
        delete store[trackIds]
    else if typeof(trackIds) == 'undefined'
      for trackId of store
        svg.select('.' + trackId).remove()
        delete store[trackId]
  @

circosJS.Core.prototype.layout = (conf, data) ->
  # this refers the circos instance
  this._layout = new circosJS.Layout(conf, data)
  return this

circosJS.log = (level, code, message, data) ->
  levels = ['Permanent log', 'Error', 'Warning', 'Info']
  # 0 - permanent
  # 1 - error
  # 2 - warning
  # 3 - info
  console.log('CircosJS: ', levels[level]+' ['+code+'] ', message, data)
  return

circosJS.mixConf = (conf, defaultConf) ->
  newConf = {}
  for key, value of defaultConf
    if key of conf
      if Object.prototype.toString.call( value ) == '[object Array]'
        newConf[key] = conf[key]
      else if typeof value == 'object' and value?
        if value? and Object.keys(value).length is 0
          newConf[key] = conf[key]
        else
          newConf[key] = circosJS.mixConf(conf[key], value)
      else
        newConf[key] = conf[key]
    else
      newConf[key] = value
  return newConf

circosJS.Core.prototype.smartBorders = ->
  width = @conf.defaultTrackWidth
  layout = {in: @_layout.conf.innerRadius, out: @_layout.conf.outerRadius}
  borders = []
  for trackType, store of @tracks
    for trackId, track of store
      borders.push {in: track.conf.innerRadius, out: track.conf.outerRadius} if track.conf.innerRadius


  borders = borders.sort (a,b) ->
    1 if a.out > b.out
    -1 if a.out < b.out
    0

  currentBorder = layout
  for border in borders
    if border.out < currentBorder.in - width
      return {in: currentBorder.in - width, out: currentBorder.in}
    currentBorder = border
  if currentBorder.in > width
    return {in: currentBorder.in - width, out: currentBorder.in}
  else
    return {in: borders[0].out, out: borders[0].out + width}


if module?
  module.exports = circosJS

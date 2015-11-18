circosJS.Core.prototype.heatmap = (id, conf, data) ->
  track = new circosJS.Heatmap()
  track.build @, conf, data
  @tracks.heatmaps[id] = track
  return @

circosJS.Core.prototype.histogram = (id, conf, data) ->
  track = new circosJS.Histogram()
  track.build @, conf, data
  @tracks.histograms[id] = track
  return @

circosJS.Core.prototype.chord = (id, conf, data) ->
  track = new circosJS.Chord()
  track.build @, conf, data
  @tracks.chords[id] = track
  return @

circosJS.Core.prototype.scatter = (id, conf, data) ->
  track = new circosJS.Scatter()
  track.build @, conf, data
  @tracks.scatters[id] = track
  return @

circosJS.Core.prototype.line = (id, conf, data) ->
  track = new circosJS.Line()
  track.build @, conf, data
  @tracks.lines[id] = track
  return @

circosJS.Core.prototype.stack = (id, conf, data) ->
  track = new circosJS.Stack()
  track.build @, conf, data
  @tracks.stacks[id] = track
  return @

circosJS.Core.prototype.highlight = (id, conf, data) ->
  track = new circosJS.Highlight()
  track.build @, conf, data
  @tracks.highlights[id] = track
  return @

circosJS.Core.prototype.text = (id, conf, data) ->
  track = new circosJS.Text()
  track.build @, conf, data
  @tracks.texts[id] = track
  return @

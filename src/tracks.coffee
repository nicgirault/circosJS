circosJS.Core.prototype.heatmap = (id, conf, data, rules, backgrounds) ->
  track = new circosJS.Heatmap()
  track.build(@, conf, data, rules, backgrounds)
  @track.heatmaps[id] = track
  return @

circosJS.Core.prototype.histogram = (id, conf, data, rules, backgrounds) ->
  track = new circosJS.Histogram()
  track.build(@, conf, data, rules, backgrounds)
  @tracks.histograms[id] = track
  return @

circosJS.Core.prototype.chord = (id, conf, data, rules) ->
  track = new circosJS.Chord(@, conf, data, rules, @_layout)

  track.computeMinMax()
  @_chords[id] = track

  return @

circosJS.Core.prototype.scatter = (id, conf, data, rules, backgrounds) ->
  track = new circosJS.Scatter()
  track.build(@, conf, data, rules, backgrounds)
  @tracks.scatters[id] = track
  return @

circosJS.Core.prototype.line = (id, conf, data, rules, backgrounds) ->
  track = new circosJS.Line()
  track.build(@, conf, data, rules, backgrounds)
  @tracks.lines[id] = track
  return @

circosJS.Core.prototype.stack = (id, conf, data, rules, backgrounds) ->
  track = new circosJS.Stack(@, conf, data, rules, backgrounds)
  track.completeData()
  track.buildLayeredData()
  track.computeMinMax()
  track.applyRules()
  @_stacks[id] = track

  return @

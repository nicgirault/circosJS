circosJS.Heatmap = ->
  circosJS.Track.call @
  @parseData = circosJS.parseSpanValueData

  @render = (instance, parentElement, name) =>
    # @preRender()
    datumContainer = @renderDatumContainer instance, parentElement, name, @conf, @data
    @renderDatum datumContainer, @conf, instance._layout, @

  @renderDatumContainer = (instance, parentElement, name, conf, data) ->
    track = parentElement.append('g').attr('class', name + ' ' + conf.colorPalette)
    @renderBlock track, data, instance._layout

  @renderDatum = (parentElement, conf, layout, utils) ->
    parentElement.selectAll 'tile'
      .data (d) -> d.values
      .enter().append 'path'
      .attr 'class', 'tile'
      .attr 'd',
        d3.svg.arc()
          .innerRadius conf.innerRadius
          .outerRadius conf.outerRadius
          .startAngle (d, i) -> utils.theta d.start, layout.blocks[d.block_id]
          .endAngle (d, i) -> utils.theta d.end, layout.blocks[d.block_id]
      .attr 'class', (d) =>
        'q' + utils.ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize

  return @

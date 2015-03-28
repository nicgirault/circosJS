# a retravailler
circosJS.Track = ->
  # this refers the track instance

  @build = (instance, conf, data) ->
    @loadData data, instance
    @conf = @processConf conf, @defaultConf, @meta, instance, @
    @loadBackgrounds conf.backgrounds
    @applyRules conf.rules, @data

  @loadData = (data, instance) ->
    layoutSummary = {}
    for d in instance._layout.data
      layoutSummary[d.id] = d.len
    result = @parseData data, layoutSummary
    @data = result.data
    @meta = result.meta

  @processConf = (conf, defaultConf, meta, instance, utils) ->
    conf = circosJS.mixConf conf, JSON.parse(JSON.stringify(defaultConf))
    conf = utils.computeMinMax conf, meta
    if conf.innerRadius == 0 and conf.outerRadius == 0
      smartBorders = instance.smartBorders()
      conf.innerRadius = smartBorders.in
      conf.outerRadius = smartBorders.out
    return conf

  @loadBackgrounds = (backgrounds) ->
    @backgrounds = backgrounds || []
  # a rule look like this:
  # {parameter: color, value: 'blue', condition: function, flow: 'stop if true'}
  # @rules = rules


  # if conf.innerRadius and conf.outerRadius
  #   if conf.innerRadius > conf.outerRadius
  #     circosJS.log(
  #       2,
  #       'radiusInconsitency',
  #       'Inner radius greater than outer radius',
  #       {'innerRadius': conf.innerRadius, 'outerRadius': conf.outerRadius}
  #     )


  @applyRules = (rules, data) ->
    rules = rules || []
    for k,v of data
      for i, datum of v.values
        for rule in rules
          if rule.condition(v.key, datum, i)
            datum[rule.parameter] = rule.value

  @computeMinMax = (conf, meta) ->
    conf.cmin = if conf.min == 'smart' then meta.min else conf.min
    conf.cmax = if conf.max == 'smart' then meta.max else conf.max
    return conf

  @ratio = (value, min, max, scope, reverse, logScale) ->
    scaleLogBase = if logScale then 2.3 else 1

    return 0 if min == max or (value == min and not reverse) or (value == max and reverse)
    return scope - 1 if value == max or (value == min and reverse)

    fraction = (value - min) / (max - min)

    x = Math.exp(1 / scaleLogBase * Math.log(fraction))
    x = 1 - x if reverse
    return Math.floor(scope * x)

  @render = (instance, parentElement, name) =>
    datumContainer = @renderDatumContainer instance, parentElement, name, @data, @conf
    @renderAxes(datumContainer, @conf, instance._layout, @data) if @conf.axes?.display
    @renderDatum datumContainer, @conf, instance._layout, @

  @renderBlock = (parentElement, data, layout) ->
    parentElement.selectAll '.block'
      .data data
      .enter().append 'g'
      .attr 'class', 'block'
      .attr 'transform', (d) -> 'rotate(' + layout.blocks[d.key].start*360/(2*Math.PI) + ')'

  @renderAxes = (parentElement, conf, layout, data) ->
    if conf.axes.minor.spacingType == 'pixel'
      axes = (x for x in [conf.innerRadius..conf.outerRadius] by conf.axes.minor.spacing)

    axis = d3.svg.arc()
      .innerRadius (d) -> d
      .outerRadius (d) -> d
      .startAngle 0
      .endAngle (d, i, j) ->
        block = layout.blocks[data[j].key]
        block.end - block.start

    parentElement.selectAll '.axis'
      .data axes
      .enter().append 'path'
      .attr 'class', 'axis'
      .attr 'd', axis
      .attr 'stroke-width', (d, i) -> if i % conf.axes.major.spacing == 0 then conf.axes.major.thickness else conf.axes.minor.thickness
      .attr 'stroke', (d, i) -> if i % conf.axes.major.spacing == 0 then conf.axes.major.color else conf.axes.minor.color


  @theta = (position, block) -> position / block.len * (block.end - block.start)
  @x = (d, layout, conf) =>
    height = @ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale)
    if conf.direction == 'in'
      r = conf.outerRadius - height
    else
      r = conf.innerRadius + height
    angle = @theta(d.position, layout.blocks[d.block_id]) - Math.PI/2
    r * Math.cos angle
  @y = (d, layout, conf) =>
    height = @ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale)
    if conf.direction == 'in'
      r = conf.outerRadius - height
    else
      r = conf.innerRadius + height
    angle = @theta(d.position, layout.blocks[d.block_id]) - Math.PI/2
    r * Math.sin angle
  @ratio = (value, min, max, scope, reverse, logScale) ->
    scaleLogBase = if logScale then 2.3 else 1

    return 0 if min == max or (value == min and not reverse) or (value == max and reverse)
    return scope - 1 if value == max or (value == min and reverse)

    fraction = (value - min) / (max - min)

    x = Math.exp(1 / scaleLogBase * Math.log(fraction))
    x = 1 - x if reverse
    return Math.floor(scope * x)
  @

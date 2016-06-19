# a retravailler
circosJS.Track = ->
  # this refers the track instance

  @build = (instance, conf, data) ->
    @dispatch = d3.dispatch 'mouseover',  'mouseout'
    @loadData data, instance
    @conf = @processConf conf, @defaultConf, @meta, instance, @
    @applyRules conf.rules, @data

  @loadData = (data, instance) ->
    layoutSummary = {}
    for d in instance._layout.data
      layoutSummary[d.id] = d.len
    result = @parseData data, layoutSummary
    @data = result.data
    @meta = result.meta

  @processConf = (conf, defaultConf, meta, instance, utils) ->
    conf = circosJS.mixConf conf, Object.assign({}, defaultConf)
    conf = utils.computeMinMax conf, meta
    if conf.innerRadius == 0 and conf.outerRadius == 0
      smartBorders = instance.smartBorders()
      conf.innerRadius = smartBorders.in
      conf.outerRadius = smartBorders.out
    return conf

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
    parentElement.select('.' + name).remove()
    track = parentElement.append 'g'
      .attr 'class', name
      .attr 'z-index', @conf.zIndex
    datumContainer = @renderDatumContainer instance, track, name, @data, @conf
    @renderAxes(datumContainer, @conf, instance._layout, @data) if @conf.axes?.display
    selection = @renderDatum datumContainer, @conf, instance._layout, @
    if @conf.tooltipContent?
      circosJS._registerTooltip(@, selection, @conf)
    selection.on 'mouseover', (d, i, j) =>
      @dispatch.mouseover(d, i, j)
    selection.on 'mouseout', (d, i, j) =>
      @dispatch.mouseout(d, i, j)

  @renderBlock = (parentElement, data, layout, conf) ->
    scope = conf.outerRadius - conf.innerRadius
    block = parentElement.selectAll '.block'
      .data data
      .enter().append 'g'
      .attr 'class', 'block'
      .attr 'transform', (d) -> 'rotate(' + layout.blocks[d.key].start*360/(2*Math.PI) + ')'

    if conf.backgrounds
      block.selectAll '.background'
        .data conf.backgrounds
        .enter().append 'path'
        .attr 'class', 'background'
        .attr 'fill', (background) -> background.color
        .attr 'opacity', (background) -> background.opacity || 1
        .attr('d', d3.svg.arc()
          .innerRadius (background) ->
            if conf.direction == 'in'
              conf.outerRadius - scope * background.start
            else
              conf.innerRadius + scope * background.start
          .outerRadius (background) ->
            if conf.direction == 'in'
              conf.outerRadius - scope * background.end
            else
              conf.innerRadius + scope * background.end
          .startAngle (d,i,j) -> 0
          .endAngle (d,i,j) -> layout.blocks[data[j].key].end - layout.blocks[data[j].key].start
        )
    block

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
      .attr 'opacity', conf.opacity
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

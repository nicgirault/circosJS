circosJS.Core.prototype.render = (ids) ->
    # this refers the circos instance
    
    # TODO: if ids is undefined, render all
    #     else render only the given tracks


    # return the angle of a position according to the block index and the
    # position in the block
    angle = (i, pos) ->
        conf = this._layout.getConf().gap # in radian
        size = this._layout.getSize()
        block = this._layout.getBlock()

        angle_no_gap = pos/size *2*Math.PI
        angle = angle_no_gap + i*gap
        return angle

    ################################
    ## render layout
    ################################
    that = this
    svg = d3.select(this.getContainer())
    conf = this._layout.getConf()

    # tmp to allow update
    svg.select('.cs-layout').remove()

    layout = svg
        .attr('width', this.getWidth())
        .attr('height', this.getHeight())
        .append('g')
        .classed('cs-layout', true)
        .attr('transform', 'translate(' + parseInt(this.getWidth()/2) + ',' + parseInt(this.getHeight()/2) + ')')

    block = layout
        .selectAll 'path'
        .data this._layout.getData()
        .enter()
        .append 'g'

    entry = d3.svg.arc()
        .innerRadius conf.innerRadius
        .outerRadius conf.outerRadius
        # .cornerRadius conf.cornerRadius
        .startAngle (d,i) -> d.start
        .endAngle (d,i) -> d.end

    block.append 'path'
        .attr 'd', entry
        .attr 'fill', (d) -> d.color
        .attr 'id', (d) -> d.id

    ################################
    ## Labels
    ################################
    if conf.labels.display
        # http://stackoverflow.com/questions/20447106/how-to-center-horizontal-and-vertical-text-along-an-textpath-inside-an-arc-usi
        r = conf.innerRadius + conf.labels.radialOffset

        labelArc = d3.svg.arc()
            .innerRadius r
            .outerRadius r
            .startAngle (d,i) -> d.start
            .endAngle (d,i) -> d.end

        block.append 'path'
            .attr 'fill', 'none'
            .attr 'stroke', 'none'
            .attr 'd', labelArc
            .attr 'id', (d) -> 'arc-label' + d.id

        label = block.append 'text'
            .style 'font-size', conf.labels.size
            .attr 'text-anchor', 'middle'

        label.append 'textPath'
            .attr 'startOffset', '25%'
            .attr 'xlink:href', (d) -> '#arc-label' + d.id
            .style 'fill', conf.labels.color
            .text (d) -> d.label

    ################################
    ## ticks
    ################################
    if conf.ticks.display
        # Returns an array of tick angles and labels, given a block.
        blockTicks = (d) ->
            k = (d.end - d.start) / d.len
            d3.range(0, d.len, conf.ticks.spacing).map (v, i) ->
                angle: v * k + d.start,
                label: displayLabel v, i

        displayLabel = (v, i) ->
            if conf.ticks.labels == false
                null
            else if conf.ticks.labelDisplay0 == false and i == 0
                null
            else if i % conf.ticks.labelSpacing
                null
            else
                v / conf.ticks.labelDenominator + conf.ticks.labelSuffix

        ticks = layout.append("g").selectAll("g")
            .data(this._layout.getData())
            .enter().append("g").selectAll("g")
            .data(blockTicks)
            .enter().append("g")
            .attr("transform", (d) -> "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + conf.outerRadius + ",0)")

        ticks.append("line")
            .attr("x1", 0)
            .attr("y1", 1)
            .attr("x2", (d, i) -> if i % conf.ticks.majorSpacing then conf.ticks.size.minor else conf.ticks.size.major)
            .attr("y2", 1)
            .style("stroke", conf.ticks.color)

        ticks.append("text")
            .attr("x", 8)
            .attr("dy", ".35em")
            .attr("transform", (d) -> if d.angle > Math.PI then "rotate(180)translate(-16)" else null)
            .style("text-anchor", (d) -> if d.angle > Math.PI then "end" else null)
            .style 'font-size', conf.ticks.labelSize
            .style 'fill', conf.ticks.labelColor
            .text((d) -> d.label)

    

    ################################
    ## render heatmaps
    ################################
    for heatmap_name in Object.keys(this._heatmaps)
        heatmap = this._heatmaps[heatmap_name]

        track = svg.append('g')
            .classed(heatmap_name, true)
            .classed(heatmap.getConf().colorPalette, true)
            .attr('transform', 'translate(' + parseInt(this.getWidth()/2) + ',' + parseInt(this.getHeight()/2) + ')')

        block = track.selectAll('g')
            .data(heatmap.getData())
            .enter().append('g')
            .attr('class', (d,i)-> 
                heatmap_name+'-'+d.parent
            true)
            .attr('transform', (d) -> 'rotate(' + that._layout.getBlock(d.parent).start*360/(2*Math.PI) + ')')

        datum = block.selectAll('path')
            .data((d)->d.data)
            .enter().append('path')
            .attr('d',
                d3.svg.arc()
                    .innerRadius(heatmap.getConf().innerRadius)
                    .outerRadius(heatmap.getConf().outerRadius)
                    .startAngle((d, i) ->
                        block = that._layout.getBlock(d.block_id)
                        d.start/block.len * (block.end - block.start)
                    )
                    .endAngle((d, i) -> 
                        block = that._layout.getBlock(d.block_id)
                        d.end/block.len * (block.end - block.start)
                    )

            )
            .attr('class', (d) -> 
                'q'+heatmap.colorScale(d.value, 'linear')+'-'+heatmap.getConf().colorPaletteSize
            true)

    ################################
    ## render histogram
    ################################
    for histogram_name in Object.keys(this._histograms)
        histogram = this._histograms[histogram_name]

        conf = histogram.getConf()

        track = svg.append('g')
            .classed(histogram_name, true)
            .classed(conf.colorPalette, true)
            .attr('transform', 'translate(' + parseInt(this.getWidth()/2) + ',' + parseInt(this.getHeight()/2) + ')')

        block = track.selectAll('g')
            .data(histogram.getData())
            .enter().append('g')
            .attr('class', (d,i)-> 
                heatmap_name+'-'+d.parent
            true)
            .attr('transform', (d) -> 'rotate(' + that._layout.getBlock(d.parent).start*360/(2*Math.PI) + ')')

        bin = block.selectAll('path')
            .data((d)->d.data)
            .enter().append('path')
            .attr('d',
                d3.svg.arc()
                    .innerRadius((d,i) ->
                        if conf.direction == 'in'
                            conf.outerRadius - histogram.height(d.value, 'linear')
                        else
                            conf.innerRadius
                    )
                    .outerRadius((d,i) ->
                        if conf.direction == 'out'
                            conf.innerRadius + histogram.height(d.value, 'linear')
                        else
                            conf.outerRadius
                    )
                    .startAngle((d, i) ->
                        block = that._layout.getBlock(d.block_id)
                        d.start/block.len * (block.end - block.start)
                    )
                    .endAngle((d, i) ->
                        block = that._layout.getBlock(d.block_id)
                        d.end/block.len * (block.end - block.start)
                    )

            )

        if conf.color?
            bin.attr('fill', conf.color)
        else if conf.colorPalette?
            bin.attr('class', (d) ->
                'q'+histogram.colorScale(d.value, 'linear')+'-'+conf.colorPaletteSize
            true)


    conf = this._layout.getConf()
    that = this
    getSource = (d) ->
        d = d.source
        block = that._layout.getBlock d.id
        startAngle = block.start + d.start / block.len * (block.end - block.start)
        endAngle = block.start + d.end / block.len * (block.end - block.start)
        result =
            radius: conf.innerRadius
            startAngle: startAngle
            endAngle: endAngle
    getTarget = (d) ->
        d = d.target
        block = that._layout.getBlock d.id
        startAngle = block.start + d.start / block.len * (block.end - block.start)
        endAngle = block.start + d.end / block.len * (block.end - block.start)
        result =
            radius: conf.innerRadius
            startAngle: startAngle
            endAngle: endAngle

    ################################
    ## render chords
    ################################
    for chord_name in Object.keys(this._chords)
        chord = this._chords[chord_name]
        chordConf = chord.getConf()
        track = svg.append('g')
            .classed(chordConf.colorPalette, true)
            .attr('transform', 'translate(' + parseInt(this.getWidth()/2) + ',' + parseInt(this.getHeight()/2) + ')')
            .selectAll('path')
            .data(chord.getData())
            .enter().append('path')
        track = track.attr('d',
                d3.svg.chord()
                .source(getSource)
                .target(getTarget)
            ).attr('class', (d) ->
                'q'+d.value+'-'+ chordConf.colorPaletteSize
            ).attr('opacity', chordConf.opacity)
    return

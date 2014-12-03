layout = do(d3) ->
    layout = (conf, data) ->
        # most of the time, we call blocks by id so let's build a dictonary
        # with block ids as keys
        this.blocks = {}
        this.data = data
        offset = 0
        for k,v of data
            this.blocks[v.id] =
                label: v.label
                len: v.len
                color: v.color
                start: offset
            v.start = offset
            offset += v.len
        this.size = offset

        # conf override the default configuration
        for k,v of conf
            this.conf[k] = if conf[k]? then conf[k] else v

        # return this
        this

    # define default values for parameters
    layout.prototype.conf =
        innerRadius: 250
        outerRadius: 300
        gap: 0.04 # in radian
        labelPosition: 'center'
        labelRadialOffset: 0

    layout.prototype.getGap = (unit) ->
        if unit == 'rad'
            this.conf.gap
        else
            null #todo
    
    layout.prototype.setGap = (gap, unit) ->
        if unit == 'rad'
            this.conf.gap = gap
        else
            null
        this
        
    layout.prototype.getBlock = (blockId) ->
        layout.blocks[blockId]
    layout.prototype.getAngle = (blockId, unit) ->
        block = this.getBlock(blockId).start/this.size
        if unit == 'deg' then block*360
        else if unit == 'rad' then block*2*Math.PI
        else null

    layout.prototype.getSize = ->
        this.size
    layout.prototype.getInnerRadius = ->
        this.conf.innerRadius
    layout.prototype.getOuterRadius = ->
        this.conf.outerRadius

    layout

    #             // Unique id so that the text path defs are unique - is there a better way to do this?
    #             var id = d3.selectAll(".circos-layout")[0].length;

    #             //labels
    #             var r = innerRadius + labelRadialOffset;
    #             labels = svg.append("g")
    #                 .classed("labels", true)
    #                 .classed("segment", true)
    #                 .attr("transform", "translate(" + parseInt(offset) + "," + parseInt(offset) + ")");

    #             labels.append("def")
    #                 .append("path")
    #                 .attr("id", "segment-label-path-"+id)
    #                 .attr("d", "m0 -" + r + " a" + r + " " + r + " 0 1 1 -1 0");

    #             labels.selectAll("text")
    #                 .data(data).enter()
    #                 .append("text")
    #                 .append("textPath")
    #                 .attr("xlink:href", "#segment-label-path-"+id)
    #                 .attr("startOffset", getLabelStartOffset)
    #                 .text(function(d) {return d.label;});

    #         });

    #     }
circosJS = {}
circosJS.circos = do(d3) ->
    circos = (conf) ->
        this.width = conf.width
        this.height = conf.height
        this.container = conf.container
        
        this.getContainer()
            .attr('width', this.width)
            .attr('height', this.height)

        #return this
        this

    #default values
    circos.prototype.width = 720
    circos.prototype.height = 720

    
    circos.prototype.getContainer = ->
        d3.select(this.container)
    circos.prototype.getWidth = ->
        this.width
    circos.prototype.getHeight = ->
        this.height
    circos.prototype.layout = (layout) ->
        this.layout = layout
        this

    circos.prototype.render = ->
        that = this
        # render layout
        this.getContainer().append('g')
            .classed('cs-layout', true)
            .attr('transform', 'translate(' + parseInt(this.getWidth()/2) + ',' + parseInt(this.getHeight()/2) + ')')
            .selectAll('path')
            .data(this.layout.data)
            .enter()
            .append('path')
            .attr('d',
                d3.svg.arc()
                    .innerRadius(this.layout.getInnerRadius())
                    .outerRadius(this.layout.getOuterRadius())
                    .startAngle((d,i) -> d.start/that.layout.getSize() * 2*Math.PI)
                    .endAngle((d,i) -> (d.start+d.len)/that.layout.getSize() * 2*Math.PI - that.layout.getGap('rad'))
            )
            .attr('fill', (d) -> d.color)
            .attr('id', (d) -> d.id)
        circos

    circos
    
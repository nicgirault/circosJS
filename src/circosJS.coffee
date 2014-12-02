circos = do(d3) ->
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

    circos
    
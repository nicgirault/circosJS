# TODO: use IIFE
# d3 must be injected, it's a global variable

circosJS = (conf) ->
    # 'use stricte'
    instance =
        width: conf.width
        height: conf.height
        svg: d3.select(conf.container)

    instance.svg
        .attr('width', instance.width)
        .attr('height', instance.height)

    _layout =
        conf:
            innerRadius: 250
            outerRadius: 300
            gap: 0.04
            gapUnit: 'rad'
            labelPosition: 'center'
            labelRadialOffset: 0
        getGapInRad: (gap, unit) ->
            if unit == 'rad'
                return gap
            else
                return 0
        getDataStartAngle: (d, i) ->
            d.start/_layout.dataTotalLength * 2*Math.PI
        getDataEndAngle: (d, i) ->
            (d.start+d.len)/_layout.dataTotalLength * 2*Math.PI - _layout.getGapInRad(_layout.conf.gap, _layout.conf.gapUnit)
        getStartAngle: (blockId) ->
            d = (d.start for d in _layout.data when d.id = blockId)

    # object to easily return the block properties according to it's id
    _layout.init = (data) ->
        _layout._data = {}
        offset = 0
        for k,v of data
            _layout._data[v.id] =
                label: v.label
                len: v.len
                color: v.color
                start: offset
            offset += v.len
        data
    _layout.getBlock = (blockId) ->
        _layout._data[blockId]
    _layout.getAngle = (blockId, unit) ->
        block = _layout.getBlock(blockId).start/_layout.dataTotalLength
        if unit == 'deg' then block*360
        else if unit == 'rad' then block*2*Math.PI
        else null



    instance.layout = (conf, data) ->
        _layout.data = data

        # override default configuration
        for k,v of _layout.conf
            _layout.conf[k] = if conf[k] then conf[k] else v

        # data pre-computing
        _layout.init(data)
        offset = 0
        for datum in _layout.data
            datum.start = offset
            offset += datum.len
        _layout.dataTotalLength = offset
        

        instance.svg.append('g')
            .classed('cs-layout', true)
            .attr('transform', 'translate(' + parseInt(instance.width/2) + ',' + parseInt(instance.height/2) + ')')

            # add paths
            .selectAll('path')
            .data(_layout.data)
            .enter()
            .append('path')
            .attr('d',
                d3.svg.arc()
                    .innerRadius(_layout.conf.innerRadius)
                    .outerRadius(_layout.conf.outerRadius)
                    .startAngle(_layout.getDataStartAngle)
                    .endAngle(_layout.getDataEndAngle)
            )
            .attr('fill', (d) -> d.color)
            .attr('id', (d) -> d.id)
        instance

    _tracks = [];

    # what if input data is largeur than chromosome length?
    instance.heatmap = (trackName, conf, data) ->
        # get min and max values
        heatmapMin = 99999999
        heatmapMax = -99999999
        for k,v of data
            for kc,vc of v.data
                if vc.value > heatmapMax then heatmapMax = vc.value
                if vc.value < heatmapMin then heatmapMin = vc.value

        colorScale = (value, range, scale) ->
            if value == heatmapMax
                range-1
            else if scale == 'linear'
                Math.floor((value - heatmapMin) / (heatmapMax - heatmapMin) * range)
            # else
                # null

        track = instance.svg.append('g')
            .classed(trackName, true)
            .classed(conf.colorPalette, true)
            .attr('transform', 'translate(' + parseInt(instance.width/2) + ',' + parseInt(instance.height/2) + ')')

        chrBundles = track.selectAll('g').data(data)
                .enter().append('g')
                .attr('class', (d,i)-> 
                    trackName+'-'+d.parent
                true)
                .attr('transform', (d) -> 'rotate(' + _layout.getAngle(d.parent, 'deg') + ')')

        atoms = chrBundles.selectAll('path')
            .data((d)->d.data).enter()
            .append('path')
            .attr('d',
                d3.svg.arc()
                    .innerRadius(conf.innerRadius)
                    .outerRadius(conf.outerRadius)
                    .startAngle((d) -> d.start/_layout.dataTotalLength*2*Math.PI)
                    .endAngle((d) -> d.end/_layout.dataTotalLength*2*Math.PI)
            )
            .attr('class', (d) -> 
                'q'+colorScale(d.value, 9, 'linear')+'-'+conf.colorRange
            true)

        
            
        instance



        # selection.each(function(data) {
        #     var svg = d3.select(this);

        #     // Compute data start offset
        #     var startOffset = 0
        #     for(var i=0;i<data.length;i++){
        #         data[i].start = startOffset;
        #         startOffset += data[i].len;
        #     }
        #     dataTotalLength = startOffset;

        #     var offset = outerRadius;
        #     g = svg.append("g")
        #         .classed("circos-heatmap", true)
        #         .attr("transform", "translate(" + parseInt(offset) + "," + parseInt(offset) + ")");

        #     g.selectAll("path").data(data)
        #         .enter().append("path")
        #         .attr("d", d3.svg.arc()
        #             .innerRadius(innerRadius)
        #             .outerRadius(outerRadius)
        #             .startAngle(getDataStartAngle)
        #             .endAngle(getDataEndAngle))
        #             .attr("fill", getDataColor)
        #             .attr("id", function(d){return d.id;});
        # });
    # };

    instance


    # function layout(svg, conf) {
    #     var innerRadius = 50,
    #     outerRadius = 80,
    #     gap = 0.04,
    #     labelPosition = 'center',
    #     labelRadialOffset = 0,
    #     gapUnit = 'rad',
    #     dataTotalLength = 0,
    #     radialLabels = segmentLabels = [],
    #     data = [];



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


 

    #     getLabelStartOffset = function(d, i) {
    #         if(labelPosition === 'center'){
    #             return (d.start+d.len/3)/dataTotalLength*100 + "%";
    #         }
    #         else{
    #             return d.start/dataTotalLength*100 + "%";
    #         }
    #     };



# var CircosJS = (function (d3) {
#     var my = {},
#     privateVariable = 1;
#     function privateMethod (els) {
         
#     }
     
#     my.moduleProperty = 1;
#     my.moduleMethod = function () {
#         // ...
#     };
     
#     return my;
# }(d3));

# split in multiple files
# var MODULE = (function (my) {
#     my.anotherMethod = function () {
#         // added method...
#     };

#     return my;
# }(MODULE));

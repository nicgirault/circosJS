function layout() {
    var innerRadius = 50,
    outerRadius = 80,
    gap = 0.04,
    labelPosition = 'center',
    labelRadialOffset = 0,
    gapUnit = 'rad',
    dataTotalLength = 0,
    radialLabels = segmentLabels = [];

    function chart(selection) {
        selection.each(function(data) {
            var svg = d3.select(this);

            // Compute data start offset
            var startOffset = 0
            for(var i=0;i<data.length;i++){
                data[i].start = startOffset;
                startOffset += data[i].len;
            }
            dataTotalLength = startOffset;

            var offset = outerRadius;
            g = svg.append("g")
                .classed("circos-layout", true)
                .attr("transform", "translate(" + parseInt(offset) + "," + parseInt(offset) + ")");

            g.selectAll("path").data(data)
                .enter().append("path")
                .attr("d", d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius)
                    .startAngle(getDataStartAngle)
                    .endAngle(getDataEndAngle))
                    .attr("fill", getDataColor);


            // Unique id so that the text path defs are unique - is there a better way to do this?
            var id = d3.selectAll(".circos-layout")[0].length;

            //labels
            var r = innerRadius + labelRadialOffset;
            labels = svg.append("g")
                .classed("labels", true)
                .classed("segment", true)
                .attr("transform", "translate(" + parseInt(offset) + "," + parseInt(offset) + ")");

            labels.append("def")
                .append("path")
                .attr("id", "segment-label-path-"+id)
                .attr("d", "m0 -" + r + " a" + r + " " + r + " 0 1 1 -1 0");

            labels.selectAll("text")
                .data(data).enter()
                .append("text")
                .append("textPath")
                .attr("xlink:href", "#segment-label-path-"+id)
                .attr("startOffset", getLabelStartOffset)
                .text(function(d) {return d.label;});

        });

    }

    /* Arc functions */
    getDataStartAngle = function(d, i) {
        return d.start/dataTotalLength * 2*Math.PI;
    }
    getDataEndAngle = function(d, i) {
        return (d.start+d.len)/dataTotalLength * 2*Math.PI - getGapInRad(gap, gapUnit);
    }
    getDataColor = function(d, i){
        return d.color;
    }

    getGapInRad = function(gap, unit){
        if(unit === 'rad'){
            return gap;
        }
        else{
            return 0;
        }
    }

    getLabelStartOffset = function(d, i) {
        if(labelPosition === 'center'){
            return (d.start+d.len/3)/dataTotalLength*100 + "%";
        }
        else{
            return d.start/dataTotalLength*100 + "%";
        }
    }

    /* Configuration getters/setters */
    chart.innerRadius = function(_) {
        if (!arguments.length) return innerRadius;
        innerRadius = _;
        return chart;
    };

    chart.outerRadius = function(_) {
        if (!arguments.length) return outerRadius;
        outerRadius = _;
        return chart;
    };

    chart.labelPosition = function(_) {
        if (!arguments.length) return labelPosition;
        labelPosition = _;
        return chart;
    };

    chart.labelRadialOffset = function(_) {
        if (!arguments.length) return labelRadialOffset;
        labelRadialOffset = _;
        return chart;
    };

    chart.gap = function(_) {
        if (!arguments.length) return gap;
        gap = _;
        return chart;
    };

    chart.gapUnit = function(_) {
        if (!arguments.length) return gapUnit;
        gapUnit = _;
        return chart;
    };

    return chart;
}
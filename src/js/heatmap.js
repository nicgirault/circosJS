function heatmap(svg, conf) {
    var innerRadius = 50,
    outerRadius = 80,
    dataTotalLength = 0;

    function heatmapChart(selection) {
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

    /* Configuration getters/setters */
    heatmapChart.innerRadius = function(_) {
        if (!arguments.length) return innerRadius;
        innerRadius = _;
        return heatmapChart;
    };

    heatmapChart.outerRadius = function(_) {
        if (!arguments.length) return outerRadius;
        outerRadius = _;
        return heatmapChart;
    };

    return heatmapChart;
}
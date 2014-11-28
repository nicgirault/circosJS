function layout() {
    var innerRadius = 50,
    outerRadius = 80,
    domain = null,
    accessor = function(d) {return d;},
    radialLabels = segmentLabels = [];

    function chart(selection) {
        selection.each(function(data) {
            var svg = d3.select(this);

            var offset = outerRadius;
            g = svg.append("g")
                .classed("circos-layout", true)
                .attr("transform", "translate(" + parseInt(offset) + "," + parseInt(offset) + ")");

            var autoDomain = false;
            if (domain === null) {
                domain = d3.extent(data, accessor);
                autoDomain = true;
            }
            if(autoDomain)
                domain = null;

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

        });

    }

    /* Arc functions */
    getDataStartAngle = function(d, i) {
        return d.start;
    }
    getDataEndAngle = function(d, i) {
        return d.end;
    }
    getDataColor = function(d, i){
        return d.color;
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

    chart.domain = function(_) {
        if (!arguments.length) return domain;
        domain = _;
        return chart;
    };

    chart.radialLabels = function(_) {
        if (!arguments.length) return radialLabels;
        if (_ == null) _ = [];
        radialLabels = _;
        return chart;
    };

    chart.segmentLabels = function(_) {
        if (!arguments.length) return segmentLabels;
        if (_ == null) _ = [];
        segmentLabels = _;
        return chart;
    };

    chart.accessor = function(_) {
        if (!arguments.length) return accessor;
        accessor = _;
        return chart;
    };

    return chart;
}
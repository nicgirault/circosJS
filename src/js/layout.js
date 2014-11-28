function layout() {
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
    innerRadius = 50,
    outerRadius = 80,
    segmentHeight = 20,
    domain = null,
    range = ["white", "red"],
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
            var color = d3.scale.linear().domain(domain).range(range);
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

            //Radial labels
            var lsa = 0.01; //Label start angle
            var labels = svg.append("g")
                .classed("labels", true)
                .classed("radial", true)
                .attr("transform", "translate(" + parseInt(offset) + "," + parseInt(offset) + ")");

            labels.selectAll("def")
                .data(radialLabels).enter()
                .append("def")
                .append("path")
                .attr("id", function(d, i) {return "radial-label-path-"+id+"-"+i;})
                .attr("d", function(d, i) {
                    var r = innerRadius + ((i + 0.2) * segmentHeight);
                    return "m" + r * Math.sin(lsa) + " -" + r * Math.cos(lsa) + 
                            " a" + r + " " + r + " 0 1 1 -1 0";
                });

            labels.selectAll("text")
                .data(radialLabels).enter()
                .append("text")
                .append("textPath")
                .attr("xlink:href", function(d, i) {return "#radial-label-path-"+id+"-"+i;})
                .style("font-size", 0.6 * segmentHeight + 'px')
                .text(function(d) {return d;});
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

    chart.segmentHeight = function(_) {
        if (!arguments.length) return segmentHeight;
        segmentHeight = _;
        return chart;
    };

    chart.domain = function(_) {
        if (!arguments.length) return domain;
        domain = _;
        return chart;
    };

    chart.range = function(_) {
        if (!arguments.length) return range;
        range = _;
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
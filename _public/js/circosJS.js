var circos;

circos = (function(d3) {
  circos = function(conf) {
    this.width = conf.width;
    this.height = conf.height;
    this.container = conf.container;
    this.getContainer().attr('width', this.width).attr('height', this.height);
    return this;
  };
  circos.prototype.width = 720;
  circos.prototype.height = 720;
  circos.prototype.getContainer = function() {
    return d3.select(this.container);
  };
  circos.prototype.getWidth = function() {
    return this.width;
  };
  circos.prototype.getHeight = function() {
    return this.height;
  };
  return circos;
})(d3);



var layout;

layout = (function(d3) {
  layout = function(conf, data) {
    var k, offset, v;
    this.blocks = {};
    this.data = data;
    offset = 0;
    for (k in data) {
      v = data[k];
      this.blocks[v.id] = {
        label: v.label,
        len: v.len,
        color: v.color,
        start: offset
      };
      v.start = offset;
      offset += v.len;
    }
    this.size = offset;
    for (k in conf) {
      v = conf[k];
      this.conf[k] = conf[k] != null ? conf[k] : v;
    }
    return this;
  };
  layout.prototype.conf = {
    innerRadius: 250,
    outerRadius: 300,
    gap: 0.04,
    labelPosition: 'center',
    labelRadialOffset: 0
  };
  layout.prototype.getGap = function(unit) {
    if (unit === 'rad') {
      return this.conf.gap;
    } else {
      return null;
    }
  };
  layout.prototype.setGap = function(gap, unit) {
    if (unit === 'rad') {
      this.conf.gap = gap;
    } else {
      null;
    }
    return this;
  };
  layout.prototype.getBlock = function(blockId) {
    return layout.blocks[blockId];
  };
  layout.prototype.getAngle = function(blockId, unit) {
    var block;
    block = this.getBlock(blockId).start / this.size;
    if (unit === 'deg') {
      return block * 360;
    } else if (unit === 'rad') {
      return block * 2 * Math.PI;
    } else {
      return null;
    }
  };
  layout.prototype.render = function(circos) {
    var that;
    that = this;
    circos.getContainer().append('g').classed('cs-layout', true).attr('transform', 'translate(' + parseInt(circos.getWidth() / 2) + ',' + parseInt(circos.getHeight() / 2) + ')').selectAll('path').data(this.data).enter().append('path').attr('d', d3.svg.arc().innerRadius(this.conf.innerRadius).outerRadius(this.conf.outerRadius).startAngle(function(d, i) {
      return d.start / that.size * 2 * Math.PI;
    }).endAngle(function(d, i) {
      return (d.start + d.len) / that.size * 2 * Math.PI - that.conf.gap;
    })).attr('fill', function(d) {
      return d.color;
    }).attr('id', function(d) {
      return d.id;
    });
    return circos;
  };
  return layout;
})(d3);

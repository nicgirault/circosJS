var circosJS;

circosJS = function(conf) {
  var instance;
  instance = new circosJS.Core(conf);
  return instance;
};

circosJS.Core = function(conf) {
  var k, v, _ref;
  this._heatmaps = {};
  _ref = this._conf;
  for (k in _ref) {
    v = _ref[k];
    this._conf[k] = conf[k] != null ? conf[k] : v;
  }
  this.getContainer = function() {
    return this._conf.container;
  };
  this.getWidth = function() {
    return this._conf.width;
  };
  this.getHeight = function() {
    return this._conf.height;
  };
};

circosJS.Core.prototype._conf = {
  width: 550,
  height: 550,
  container: 'circos'
};

circosJS.Core.prototype.layout = function(conf, data) {
  this._layout = new circosJS.layout(conf, data);
  return this;
};

circosJS.Core.prototype.heatmap = function(id, conf, data) {
  if (this._heatmaps[id]) {
    return null;
  } else {
    return null;
  }
};

circosJS.layout = function(conf, data) {
  var k, offset, v, _ref, _ref1;
  this._data = data;
  this._blocks = {};
  this._size = 0;
  offset = 0;
  _ref = this._data;
  for (k in _ref) {
    v = _ref[k];
    this._blocks[v.id] = {
      label: v.label,
      len: v.len,
      color: v.color,
      start: offset
    };
    v.start = offset;
    offset += v.len;
  }
  this._size = offset;
  _ref1 = this._conf;
  for (k in _ref1) {
    v = _ref1[k];
    this._conf[k] = conf[k] != null ? conf[k] : v;
  }
  this.getData = function() {
    return this._data;
  };
  this.getGap = function(unit) {
    if (unit === 'rad') {
      return this._conf.gap;
    } else {
      return null;
    }
  };
  this.getBlock = function(blockId) {
    return this._blocks[blockId];
  };
  this.getAngle = function(blockId, unit) {
    var block;
    block = this.getBlock(blockId).start / this._size;
    if (unit === 'deg') {
      return block * 360;
    } else if (unit === 'rad') {
      return block * 2 * Math.PI;
    } else {
      return null;
    }
  };
  this.getSize = function() {
    return this._size;
  };
  this.getConf = function() {
    return this._conf;
  };
  return this;
};

circosJS.layout.prototype._conf = {
  innerRadius: 250,
  outerRadius: 300,
  gap: 0.04,
  labelPosition: 'center',
  labelRadialOffset: 0
};

circosJS.Core.prototype.histogram = function(id, conf, data) {
  return this;
};

circosJS.Core.prototype.render = function(ids) {
  var that;
  that = this;
  return d3.select(this.getContainer()).attr('width', this.getWidth()).attr('height', this.getHeight()).append('g').classed('cs-layout', true).attr('transform', 'translate(' + parseInt(this.getWidth() / 2) + ',' + parseInt(this.getHeight() / 2) + ')').selectAll('path').data(this._layout.getData()).enter().append('path').attr('d', d3.svg.arc().innerRadius(this._layout.getConf().innerRadius).outerRadius(this._layout.getConf().outerRadius).startAngle(function(d, i) {
    return d.start / that._layout.getSize() * 2 * Math.PI;
  }).endAngle(function(d, i) {
    return (d.start + d.len) / that._layout.getSize() * 2 * Math.PI - that._layout.getGap('rad');
  })).attr('fill', function(d) {
    return d.color;
  }).attr('id', function(d) {
    return d.id;
  });
};

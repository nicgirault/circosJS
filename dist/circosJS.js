var circosJS,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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
  return this;
};

circosJS.Core.prototype.layout = function(conf, data) {
  this._layout = new circosJS.Layout(conf, data);
  return this;
};

circosJS.log = function(level, name, message, data) {
  var levels;
  levels = ['Permanent log', 'Error', 'Warning', 'Info'];
};

if (typeof module !== "undefined" && module !== null) {
  module.exports = circosJS;
}

circosJS.Layout = function(conf, data) {
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

circosJS.Core.prototype.heatmap = function(id, conf, data) {
  var block, d, datum, layout_ids, layout_lengths, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
  if (this._layout == null) {
    circosJS.log(1, 'No layout defined', 'Circos cannot add or update a heatmap track without layout', {
      'heatmap_id': id
    });
    return this;
  }
  layout_ids = (function() {
    var _i, _len, _ref, _results;
    _ref = this._layout.getData();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      d = _ref[_i];
      _results.push(d.id);
    }
    return _results;
  }).call(this);
  layout_lengths = {};
  _ref = this._layout.getData();
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    d = _ref[_i];
    layout_lengths[d.id] = d.len;
  }
  for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
    block = data[_j];
    if (_ref1 = block.parent, __indexOf.call(layout_ids, _ref1) < 0) {
      circosJS.log(2, 'No layout block id match', 'Heatmap data has a parent property that does not correspond to any layout block id', {
        'heatmap_id': id,
        'block_id': block.parent
      });
    }
    _ref2 = block.data;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      datum = _ref2[_k];
      if (datum.start < 0 || datum.end > layout_lengths[block.parent]) {
        circosJS.log(2, 'Track data inconsistency', 'Track data has a start < 0 or a end above the block length', {
          'track_id': id,
          'datum': datum,
          'layout block': this._layout.getBlock(block.parent)
        });
      }
    }
  }
  this._heatmaps[id] = new circosJS.Heatmap(conf, data);
  return this;
};

circosJS.Heatmap = function(conf, data) {
  var heatmapMax, heatmapMin, k, kc, v, vc, _ref, _ref1, _ref2, _ref3;
  this._data = data;
  this._conf = {
    innerRadius: 200,
    outerRadius: 250,
    min: 'smart',
    max: 'smart',
    colorPalette: 'YlGnBu',
    colorPaletteSize: 9
  };
  _ref = this._conf;
  for (k in _ref) {
    v = _ref[k];
    this._conf[k] = conf[k] != null ? conf[k] : v;
  }
  if (this._conf.min === 'smart' && this._conf.max === 'smart') {
    heatmapMin = 99999999;
    heatmapMax = -99999999;
    for (k in data) {
      v = data[k];
      _ref1 = v.data;
      for (kc in _ref1) {
        vc = _ref1[kc];
        if (vc.value > heatmapMax) {
          heatmapMax = vc.value;
        }
        if (vc.value < heatmapMin) {
          heatmapMin = vc.value;
        }
      }
    }
    this._conf.cmin = heatmapMin;
    this._conf.cmax = heatmapMax;
  } else if (this._conf.min === 'smart') {
    heatmapMin = 99999999;
    for (k in data) {
      v = data[k];
      _ref2 = v.data;
      for (kc in _ref2) {
        vc = _ref2[kc];
        if (vc.value < heatmapMin) {
          heatmapMin = vc.value;
        }
      }
    }
    this._conf.cmin = heatmapMin;
    this._conf.cmax = this._conf.max;
  } else if (this._conf.max === 'smart') {
    heatmapMax = -99999999;
    for (k in data) {
      v = data[k];
      _ref3 = v.data;
      for (kc in _ref3) {
        vc = _ref3[kc];
        if (vc.value < heatmapMax) {
          heatmapMax = vc.value;
        }
      }
    }
    this._conf.cmax = heatmapMax;
    this._conf.cmin = this._conf.min;
  } else {
    this._conf.cmin = this._conf.min;
    this._conf.cmax = this._conf.max;
  }
  this.colorScale = function(value, range, scale) {
    if (value === this._conf.cmax) {
      return range - 1;
    } else if (scale === 'linear') {
      return Math.floor((value - this._conf.cmin) / (this._conf.cmax - this._conf.cmin) * this._conf.colorPaletteSize);
    }
  };
  this.getData = function() {
    return this._data;
  };
  this.getConf = function() {
    return this._conf;
  };
  return this;
};

circosJS.Core.prototype.render = function(ids) {
  var block, datum, heatmap, heatmap_name, svg, that, track, _i, _len, _ref, _results;
  that = this;
  svg = d3.select(this.getContainer());
  svg.attr('width', this.getWidth()).attr('height', this.getHeight()).append('g').classed('cs-layout', true).attr('transform', 'translate(' + parseInt(this.getWidth() / 2) + ',' + parseInt(this.getHeight() / 2) + ')').selectAll('path').data(this._layout.getData()).enter().append('path').attr('d', d3.svg.arc().innerRadius(this._layout.getConf().innerRadius).outerRadius(this._layout.getConf().outerRadius).startAngle(function(d, i) {
    return d.start / that._layout.getSize() * 2 * Math.PI;
  }).endAngle(function(d, i) {
    return (d.start + d.len) / that._layout.getSize() * 2 * Math.PI - that._layout.getGap('rad');
  })).attr('fill', function(d) {
    return d.color;
  }).attr('id', function(d) {
    return d.id;
  });
  console.log(this._heatmaps);
  _ref = Object.keys(this._heatmaps);
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    heatmap_name = _ref[_i];
    heatmap = this._heatmaps[heatmap_name];
    track = svg.append('g').classed(heatmap_name, true).classed(heatmap.getConf().colorPalette, true).attr('transform', 'translate(' + parseInt(this.getWidth() / 2) + ',' + parseInt(this.getHeight() / 2) + ')');
    block = track.selectAll('g').data(heatmap.getData()).enter().append('g').attr('class', function(d, i) {
      return heatmap_name + '-' + d.parent;
    }, true).attr('transform', function(d) {
      return 'rotate(' + that._layout.getAngle(d.parent, 'deg') + ')';
    });
    _results.push(datum = block.selectAll('path').data(function(d) {
      return d.data;
    }).enter().append('path').attr('d', d3.svg.arc().innerRadius(heatmap.getConf().innerRadius).outerRadius(heatmap.getConf().outerRadius).startAngle(function(d) {
      return d.start / that._layout.getSize() * 2 * Math.PI;
    }).endAngle(function(d) {
      return d.end / that._layout.getSize() * 2 * Math.PI;
    })).attr('class', function(d) {
      return 'q' + heatmap.colorScale(d.value, 9, 'linear') + '-' + heatmap.getConf().colorPaletteSize;
    }, true));
  }
  return _results;
};

circosJS.Core.prototype._conf = {
  width: 610,
  height: 610,
  container: 'circos'
};

circosJS.Layout.prototype._conf = {
  innerRadius: 250,
  outerRadius: 300,
  gap: 0.04,
  labelPosition: 'center',
  labelRadialOffset: 0
};

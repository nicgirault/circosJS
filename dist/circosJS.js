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
  this._histograms = {};
  this._chords = {};
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
  var block_nb, gap, k, offset, size, v, _ref, _ref1, _ref2;
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
      offset: offset
    };
    v.offset = offset;
    offset += v.len;
  }
  this._size = offset;
  _ref1 = this._conf;
  for (k in _ref1) {
    v = _ref1[k];
    this._conf[k] = conf[k] != null ? conf[k] : v;
  }
  gap = this._conf.gap;
  size = this._size;
  block_nb = this._data.length;
  _ref2 = this._data;
  for (k in _ref2) {
    v = _ref2[k];
    this._blocks[v.id].start = v.offset / size * (2 * Math.PI - block_nb * gap) + k * gap;
    this._blocks[v.id].end = (v.offset + v.len) / size * (2 * Math.PI - block_nb * gap) + k * gap;
    v.start = v.offset / size * (2 * Math.PI - block_nb * gap) + k * gap;
    v.end = (v.offset + v.len) / size * (2 * Math.PI - block_nb * gap) + k * gap;
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
  var datum, heatmapMax, heatmapMin, i, k, kc, v, vc, _ref, _ref1, _ref2, _ref3, _ref4;
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
  for (k in data) {
    v = data[k];
    _ref1 = v.data;
    for (i in _ref1) {
      datum = _ref1[i];
      datum.block_id = v.parent;
    }
  }
  if (this._conf.min === 'smart' && this._conf.max === 'smart') {
    heatmapMin = 99999999;
    heatmapMax = -99999999;
    for (k in data) {
      v = data[k];
      _ref2 = v.data;
      for (kc in _ref2) {
        vc = _ref2[kc];
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
      _ref3 = v.data;
      for (kc in _ref3) {
        vc = _ref3[kc];
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
      _ref4 = v.data;
      for (kc in _ref4) {
        vc = _ref4[kc];
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
  this.colorScale = function(value, scale) {
    if (value === this._conf.cmax) {
      return this._conf.colorPaletteSize - 1;
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

circosJS.Core.prototype.histogram = function(id, conf, data) {
  var block, d, datum, layout_ids, layout_lengths, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
  if (this._layout == null) {
    circosJS.log(1, 'No layout defined', 'Circos cannot add or update a histogram track without layout', {
      'histogram_id': id
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
      circosJS.log(2, 'No layout block id match', 'Histogram data has a parent property that does not correspond to any layout block id', {
        'histogram_id': id,
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
  this._histograms[id] = new circosJS.Histogram(conf, data);
  return this;
};

circosJS.Histogram = function(conf, data) {
  var datum, histogramMax, histogramMin, i, k, kc, v, vc, _ref, _ref1, _ref2, _ref3, _ref4;
  this._data = data;
  this._conf = {
    innerRadius: 150,
    outerRadius: 200,
    min: 'smart',
    max: 'smart',
    direction: 'out',
    color: 'green',
    colorPaletteSize: 9,
    colorPalette: 'YlGnBu'
  };
  _ref = this._conf;
  for (k in _ref) {
    v = _ref[k];
    this._conf[k] = conf[k] != null ? conf[k] : v;
  }
  for (k in data) {
    v = data[k];
    _ref1 = v.data;
    for (i in _ref1) {
      datum = _ref1[i];
      datum.block_id = v.parent;
    }
  }
  if (this._conf.min === 'smart' && this._conf.max === 'smart') {
    histogramMin = 99999999;
    histogramMax = -99999999;
    for (k in data) {
      v = data[k];
      _ref2 = v.data;
      for (kc in _ref2) {
        vc = _ref2[kc];
        if (vc.value > histogramMax) {
          histogramMax = vc.value;
        }
        if (vc.value < histogramMin) {
          histogramMin = vc.value;
        }
      }
    }
    this._conf.cmin = histogramMin;
    this._conf.cmax = histogramMax;
  } else if (this._conf.min === 'smart') {
    histogramMin = 99999999;
    for (k in data) {
      v = data[k];
      _ref3 = v.data;
      for (kc in _ref3) {
        vc = _ref3[kc];
        if (vc.value < histogramMin) {
          histogramMin = vc.value;
        }
      }
    }
    this._conf.cmin = histogramMin;
    this._conf.cmax = this._conf.max;
  } else if (this._conf.max === 'smart') {
    histogramMax = -99999999;
    for (k in data) {
      v = data[k];
      _ref4 = v.data;
      for (kc in _ref4) {
        vc = _ref4[kc];
        if (vc.value < histogramMax) {
          histogramMax = vc.value;
        }
      }
    }
    this._conf.cmax = histogramMax;
    this._conf.cmin = this._conf.min;
  } else {
    this._conf.cmin = this._conf.min;
    this._conf.cmax = this._conf.max;
  }
  this.height = function(value, scale) {
    if (value >= this._conf.cmax) {
      return this._conf.outerRadius - this._conf.innerRadius;
    } else if (scale === 'linear') {
      return Math.floor((value - this._conf.cmin) / this._conf.cmax * (this._conf.outerRadius - this._conf.innerRadius));
    }
  };
  this.colorScale = function(value, scale) {
    if (value === this._conf.cmax) {
      return this._conf.colorPaletteSize - 1;
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

circosJS.Core.prototype.chord = function(id, conf, data) {
  var d, datum, layout_ids, layout_lengths, _i, _j, _len, _len1, _ref, _ref1, _ref2;
  if (this._layout == null) {
    circosJS.log(1, 'No layout defined', 'Circos cannot add or update a chord track without layout', {
      'chord_id': id
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
    datum = data[_j];
    if (!((_ref1 = datum.source.id, __indexOf.call(layout_ids, _ref1) >= 0) && (_ref2 = datum.target.id, __indexOf.call(layout_ids, _ref2) >= 0))) {
      circosJS.log(2, 'No layout block id match', 'Link data has a source or tagret id that does not correspond to any layout block id', {
        'chord_id': id,
        'datum': datum
      });
    }
    if (datum.source.start < 0 || datum.source.end > layout_lengths[datum.source.id]) {
      circosJS.log(2, 'Track data inconsistency', 'Track data has a start < 0 or a end above the block length', {
        'track_id': id,
        'datum': datum,
        'layout block': this._layout.getBlock(datum.source.id)
      });
    }
    if (datum.target.start < 0 || datum.target.end > layout_lengths[datum.target.id]) {
      circosJS.log(2, 'Track data inconsistency', 'Track data has a start < 0 or a end above the block length', {
        'track_id': id,
        'datum': datum,
        'layout block': this._layout.getBlock(datum.target.id)
      });
    }
  }
  this._chords[id] = new circosJS.Chord(conf, data);
  return this;
};

circosJS.Chord = function(conf, data) {
  var k, v, _ref;
  this._data = data;
  this._conf = {
    colorPaletteSize: 9,
    colorPalette: 'PuBuGn',
    opacity: 0.7
  };
  _ref = this._conf;
  for (k in _ref) {
    v = _ref[k];
    this._conf[k] = conf[k] != null ? conf[k] : v;
  }
  this.colorScale = function(value, scale) {
    if (value === this._conf.cmax) {
      return this._conf.colorPaletteSize - 1;
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
  var angle, bin, block, blockTicks, chord, chordConf, chord_name, conf, datum, displayLabel, entry, getSource, getTarget, heatmap, heatmap_name, histogram, histogram_name, label, labelArc, layout, r, svg, that, ticks, track, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
  angle = function(i, pos) {
    var angle_no_gap, block, conf, size;
    conf = this._layout.getConf().gap;
    size = this._layout.getSize();
    block = this._layout.getBlock();
    angle_no_gap = pos / size * 2 * Math.PI;
    angle = angle_no_gap + i * gap;
    return angle;
  };
  that = this;
  svg = d3.select(this.getContainer());
  conf = this._layout.getConf();
  layout = svg.attr('width', this.getWidth()).attr('height', this.getHeight()).append('g').classed('cs-layout', true).attr('transform', 'translate(' + parseInt(this.getWidth() / 2) + ',' + parseInt(this.getHeight() / 2) + ')');
  block = layout.selectAll('path').data(this._layout.getData()).enter().append('g');
  entry = d3.svg.arc().innerRadius(conf.innerRadius).outerRadius(conf.outerRadius).startAngle(function(d, i) {
    return d.start;
  }).endAngle(function(d, i) {
    return d.end;
  });
  block.append('path').attr('d', entry).attr('fill', function(d) {
    return d.color;
  }).attr('id', function(d) {
    return d.id;
  });
  if (conf.labels.display) {
    r = conf.innerRadius + conf.labels.radialOffset;
    labelArc = d3.svg.arc().innerRadius(r).outerRadius(r).startAngle(function(d, i) {
      return d.start;
    }).endAngle(function(d, i) {
      return d.end;
    });
    block.append('path').attr('fill', 'none').attr('stroke', 'none').attr('d', labelArc).attr('id', function(d) {
      return 'arc-label' + d.id;
    });
    label = block.append('text').style('font-size', conf.labels.size).attr('text-anchor', 'middle');
    label.append('textPath').attr('startOffset', '25%').attr('xlink:href', function(d) {
      return '#arc-label' + d.id;
    }).style('fill', conf.labels.color).text(function(d) {
      return d.label;
    });
  }
  if (conf.ticks.display) {
    blockTicks = function(d) {
      var k;
      k = (d.end - d.start) / d.len;
      return d3.range(0, d.len, conf.ticks.spacing).map(function(v, i) {
        return {
          angle: v * k + d.start,
          label: displayLabel(v, i)
        };
      });
    };
    displayLabel = function(v, i) {
      if (conf.ticks.labels === false) {
        return null;
      } else if (conf.ticks.labelDisplay0 === false && i === 0) {
        return null;
      } else if (i % conf.ticks.labelSpacing) {
        return null;
      } else {
        return v / conf.ticks.labelDenominator + conf.ticks.labelSuffix;
      }
    };
    ticks = layout.append("g").selectAll("g").data(this._layout.getData()).enter().append("g").selectAll("g").data(blockTicks).enter().append("g").attr("transform", function(d) {
      return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + conf.outerRadius + ",0)";
    });
    ticks.append("line").attr("x1", 0).attr("y1", 1).attr("x2", function(d, i) {
      if (i % conf.ticks.majorSpacing) {
        return conf.ticks.size.minor;
      } else {
        return conf.ticks.size.major;
      }
    }).attr("y2", 1).style("stroke", conf.ticks.color);
    ticks.append("text").attr("x", 8).attr("dy", ".35em").attr("transform", function(d) {
      if (d.angle > Math.PI) {
        return "rotate(180)translate(-16)";
      } else {
        return null;
      }
    }).style("text-anchor", function(d) {
      if (d.angle > Math.PI) {
        return "end";
      } else {
        return null;
      }
    }).style('font-size', conf.ticks.labelSize).style('fill', conf.ticks.labelColor).text(function(d) {
      return d.label;
    });
  }
  _ref = Object.keys(this._heatmaps);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    heatmap_name = _ref[_i];
    heatmap = this._heatmaps[heatmap_name];
    track = svg.append('g').classed(heatmap_name, true).classed(heatmap.getConf().colorPalette, true).attr('transform', 'translate(' + parseInt(this.getWidth() / 2) + ',' + parseInt(this.getHeight() / 2) + ')');
    block = track.selectAll('g').data(heatmap.getData()).enter().append('g').attr('class', function(d, i) {
      return heatmap_name + '-' + d.parent;
    }, true).attr('transform', function(d) {
      return 'rotate(' + that._layout.getBlock(d.parent).start * 360 / (2 * Math.PI) + ')';
    });
    datum = block.selectAll('path').data(function(d) {
      return d.data;
    }).enter().append('path').attr('d', d3.svg.arc().innerRadius(heatmap.getConf().innerRadius).outerRadius(heatmap.getConf().outerRadius).startAngle(function(d, i) {
      block = that._layout.getBlock(d.block_id);
      return d.start / block.len * (block.end - block.start);
    }).endAngle(function(d, i) {
      block = that._layout.getBlock(d.block_id);
      return d.end / block.len * (block.end - block.start);
    })).attr('class', function(d) {
      return 'q' + heatmap.colorScale(d.value, 'linear') + '-' + heatmap.getConf().colorPaletteSize;
    }, true);
  }
  _ref1 = Object.keys(this._histograms);
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    histogram_name = _ref1[_j];
    histogram = this._histograms[histogram_name];
    conf = histogram.getConf();
    track = svg.append('g').classed(histogram_name, true).classed(conf.colorPalette, true).attr('transform', 'translate(' + parseInt(this.getWidth() / 2) + ',' + parseInt(this.getHeight() / 2) + ')');
    block = track.selectAll('g').data(histogram.getData()).enter().append('g').attr('class', function(d, i) {
      return heatmap_name + '-' + d.parent;
    }, true).attr('transform', function(d) {
      return 'rotate(' + that._layout.getBlock(d.parent).start * 360 / (2 * Math.PI) + ')';
    });
    bin = block.selectAll('path').data(function(d) {
      return d.data;
    }).enter().append('path').attr('d', d3.svg.arc().innerRadius(function(d, i) {
      if (conf.direction === 'in') {
        return conf.outerRadius - histogram.height(d.value, 'linear');
      } else {
        return conf.innerRadius;
      }
    }).outerRadius(function(d, i) {
      if (conf.direction === 'out') {
        return conf.innerRadius + histogram.height(d.value, 'linear');
      } else {
        return conf.outerRadius;
      }
    }).startAngle(function(d, i) {
      block = that._layout.getBlock(d.block_id);
      return d.start / block.len * (block.end - block.start);
    }).endAngle(function(d, i) {
      block = that._layout.getBlock(d.block_id);
      return d.end / block.len * (block.end - block.start);
    }));
    if (conf.color != null) {
      bin.attr('fill', conf.color);
    } else if (conf.colorPalette != null) {
      bin.attr('class', function(d) {
        return 'q' + histogram.colorScale(d.value, 'linear') + '-' + conf.colorPaletteSize;
      }, true);
    }
  }
  conf = this._layout.getConf();
  that = this;
  getSource = function(d) {
    var endAngle, result, startAngle;
    d = d.source;
    block = that._layout.getBlock(d.id);
    startAngle = block.start + d.start / block.len * (block.end - block.start);
    endAngle = block.start + d.end / block.len * (block.end - block.start);
    return result = {
      radius: conf.innerRadius,
      startAngle: startAngle,
      endAngle: endAngle
    };
  };
  getTarget = function(d) {
    var endAngle, result, startAngle;
    d = d.target;
    block = that._layout.getBlock(d.id);
    startAngle = block.start + d.start / block.len * (block.end - block.start);
    endAngle = block.start + d.end / block.len * (block.end - block.start);
    return result = {
      radius: conf.innerRadius,
      startAngle: startAngle,
      endAngle: endAngle
    };
  };
  _ref2 = Object.keys(this._chords);
  for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
    chord_name = _ref2[_k];
    chord = this._chords[chord_name];
    chordConf = chord.getConf();
    track = svg.append('g').classed(chordConf.colorPalette, true).attr('transform', 'translate(' + parseInt(this.getWidth() / 2) + ',' + parseInt(this.getHeight() / 2) + ')').selectAll('path').data(chord.getData()).enter().append('path');
    track = track.attr('d', d3.svg.chord().source(getSource).target(getTarget)).attr('class', function(d) {
      return 'q' + d.value + '-' + chordConf.colorPaletteSize;
    }).attr('opacity', chordConf.opacity);
  }
};

circosJS.Core.prototype._conf = {
  width: 700,
  height: 700,
  container: 'circos'
};

circosJS.Layout.prototype._conf = {
  innerRadius: 250,
  outerRadius: 300,
  cornerRadius: 10,
  gap: 0.04,
  labels: {
    position: 'center',
    display: true,
    size: '14px',
    color: '#000',
    radialOffset: 20
  },
  ticks: {
    display: true,
    color: 'grey',
    spacing: 10000000,
    labels: true,
    labelSpacing: 10,
    labelSuffix: 'Mb',
    labelDenominator: 1000000,
    labelDisplay0: true,
    labelSize: '10px',
    labelColor: '#000',
    labelFont: 'default',
    majorSpacing: 5,
    size: {
      minor: 2,
      major: 5
    }
  }
};

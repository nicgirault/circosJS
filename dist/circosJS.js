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
  console.log('CircosJS: ', levels[level] + ' [' + name + '] ', message, data);
};

circosJS.parseData = function(data) {
  var block, dict, newData, parentId, sample;
  if (!(data.length > 0)) {
    return data;
  }
  sample = data[0];
  if (!Array.isArray(sample)) {
    return data;
  }
  dict = {};
  data.forEach(function(datum) {
    if (dict[datum[0]] == null) {
      dict[datum[0]] = [];
    }
    return dict[datum[0]].push({
      start: datum[1],
      end: datum[2],
      value: datum[3]
    });
  });
  newData = [];
  for (parentId in dict) {
    block = dict[parentId];
    newData.push({
      parent: parentId,
      data: block
    });
  }
  return newData;
};

circosJS.mixConf = function(conf, defaultConf) {
  var key, newConf, value;
  newConf = {};
  for (key in defaultConf) {
    value = defaultConf[key];
    if (key in conf) {
      if (typeof value === 'object') {
        newConf[key] = defaults(conf[key], value);
      } else {
        newConf[key] = conf[key];
      }
    } else {
      newConf[key] = value;
    }
  }
  return newConf;
};

if (typeof module !== "undefined" && module !== null) {
  module.exports = circosJS;
}

circosJS.Layout = function(conf, data) {
  var block_nb, gap, k, offset, size, v, _ref, _ref1, _ref2;
  if (data == null) {
    circosJS.log(2, 'no layout data', '');
  }
  this._conf = JSON.parse(JSON.stringify(this._defaultConf));
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
  var track;
  track = new circosJS.Heatmap(conf, data);
  track.completeData();
  if (track.isLayoutCompliant(this, id)) {
    track.computeMinMax();
    this._heatmaps[id] = track;
  }
  return this;
};

circosJS.Core.prototype.histogram = function(id, conf, data) {
  var track;
  track = new circosJS.Histogram(conf, data);
  track.completeData();
  if (track.isLayoutCompliant(this, id)) {
    track.computeMinMax();
    this._histograms[id] = track;
  }
  return this;
};

circosJS.Core.prototype.chord = function(id, conf, data) {
  var track;
  track = new circosJS.Chord(conf, data, this._layout);
  if (track.isLayoutCompliant(this, id)) {
    track.computeMinMax();
    this._chords[id] = track;
  }
  return this;
};

circosJS.Chord = function(conf, data, layout) {
  this._conf = circosJS.mixConf(conf, JSON.parse(JSON.stringify(this._defaultConf)));
  circosJS.Track.call(this, conf, data);
  this.getSource = (function(_this) {
    return function(d) {
      var block, endAngle, result, startAngle;
      d = d.source;
      block = layout.getBlock(d.id);
      startAngle = block.start + d.start / block.len * (block.end - block.start);
      endAngle = block.start + d.end / block.len * (block.end - block.start);
      return result = {
        radius: layout.getConf().innerRadius,
        startAngle: startAngle,
        endAngle: endAngle
      };
    };
  })(this);
  this.getTarget = (function(_this) {
    return function(d) {
      var block, endAngle, result, startAngle;
      d = d.target;
      block = layout.getBlock(d.id);
      startAngle = block.start + d.start / block.len * (block.end - block.start);
      endAngle = block.start + d.end / block.len * (block.end - block.start);
      return result = {
        radius: layout.getConf().innerRadius,
        startAngle: startAngle,
        endAngle: endAngle
      };
    };
  })(this);
  this.computeMinMax = function() {
    var datum, values;
    values = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        datum = data[_i];
        _results.push(datum.value);
      }
      return _results;
    })();
    if (this._conf.min === 'smart') {
      this._conf.cmin = Math.min.apply(null, values);
    } else {
      this._conf.cmin = this._conf.min;
    }
    if (this._conf.max === 'smart') {
      return this._conf.cmax = Math.max.apply(null, values);
    } else {
      return this._conf.cmax = this._conf.max;
    }
  };
  this.isLayoutCompliant = function(instance, id) {
    var d, datum, layout_ids, layout_lengths, _i, _j, _len, _len1, _ref, _ref1, _ref2;
    if (instance._layout == null) {
      circosJS.log(1, 'No layout defined', 'Circos cannot add or update a chord track without layout', {
        'chord_id': id
      });
      return false;
    }
    layout_ids = (function() {
      var _i, _len, _ref, _results;
      _ref = instance._layout.getData();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        d = _ref[_i];
        _results.push(d.id);
      }
      return _results;
    })();
    layout_lengths = {};
    _ref = instance._layout.getData();
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
          'layout block': instance._layout.getBlock(datum.source.id)
        });
      }
      if (datum.target.start < 0 || datum.target.end > layout_lengths[datum.target.id]) {
        circosJS.log(2, 'Track data inconsistency', 'Track data has a start < 0 or a end above the block length', {
          'track_id': id,
          'datum': datum,
          'layout block': instance._layout.getBlock(datum.target.id)
        });
      }
    }
    return true;
  };
  return this;
};

circosJS.Heatmap = function(conf, data) {
  this._conf = circosJS.mixConf(conf, JSON.parse(JSON.stringify(this._defaultConf)));
  circosJS.Track.call(this, conf, data);
  return this;
};

circosJS.Histogram = function(conf, data) {
  this._conf = circosJS.mixConf(conf, JSON.parse(JSON.stringify(this._defaultConf)));
  circosJS.Track.call(this, conf, data);
  this.height = function(value, scale) {
    if (value >= this._conf.cmax) {
      return this._conf.outerRadius - this._conf.innerRadius;
    } else if (scale === 'linear') {
      return Math.floor((value - this._conf.cmin) / this._conf.cmax * (this._conf.outerRadius - this._conf.innerRadius));
    }
  };
  return this;
};

circosJS.Track = function(conf, data) {
  this._data = circosJS.parseData(data);
  this.completeData = function() {
    var datum, i, k, v, _ref, _results;
    _ref = this._data;
    _results = [];
    for (k in _ref) {
      v = _ref[k];
      _results.push((function() {
        var _ref1, _results1;
        _ref1 = v.data;
        _results1 = [];
        for (i in _ref1) {
          datum = _ref1[i];
          _results1.push(datum.block_id = v.parent);
        }
        return _results1;
      })());
    }
    return _results;
  };
  this.computeMinMax = function() {
    var blockData, datum, flattenValues, values;
    values = (function() {
      var _i, _len, _ref, _results;
      _ref = this._data;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        blockData = _ref[_i];
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = blockData.data;
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            datum = _ref1[_j];
            _results1.push(datum.value);
          }
          return _results1;
        })());
      }
      return _results;
    }).call(this);
    flattenValues = [];
    flattenValues = flattenValues.concat.apply(flattenValues, values);
    if (this._conf.min === 'smart') {
      this._conf.cmin = Math.min.apply(null, flattenValues);
    } else {
      this._conf.cmin = this._conf.min;
    }
    if (this._conf.max === 'smart') {
      return this._conf.cmax = Math.max.apply(null, flattenValues);
    } else {
      return this._conf.cmax = this._conf.max;
    }
  };
  this.colorScale = function(value, logScale) {
    var fraction, max, min, scaleLogBase, scope, x;
    if (logScale) {
      scaleLogBase = 1;
    } else {
      scaleLogBase = 2.3;
    }
    min = this._conf.cmin;
    max = this._conf.cmax;
    scope = this._conf.colorPaletteSize;
    if (min === max) {
      return 0;
    }
    if (value === min) {
      return 0;
    }
    if (value === max) {
      return scope - 1;
    }
    fraction = (value - min) / (max - min);
    x = Math.exp(1 / scaleLogBase * Math.log(fraction));
    return Math.floor(scope * x);
  };
  this.getData = function() {
    return this._data;
  };
  this.getConf = function() {
    return this._conf;
  };
  return this.isLayoutCompliant = function(instance, id) {
    var block, d, datum, layout_ids, layout_lengths, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    if (instance._layout == null) {
      circosJS.log(1, 'No layout defined', 'Circos cannot add or update a heatmap track without layout', {
        'heatmap_id': id
      });
      return false;
    }
    layout_ids = (function() {
      var _i, _len, _ref, _results;
      _ref = instance._layout.getData();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        d = _ref[_i];
        _results.push(d.id);
      }
      return _results;
    })();
    layout_lengths = {};
    _ref = instance._layout.getData();
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
            'layout block': instance._layout.getBlock(block.parent)
          });
        }
      }
    }
    return true;
  };
};

circosJS.renderChord = function(name, chord, instance, d3, svg) {
  var conf, link, track;
  conf = chord.getConf();
  svg.select('.' + name).remove();
  track = svg.append('g').classed(name, true).attr('transform', 'translate(' + parseInt(instance.getWidth() / 2) + ',' + parseInt(instance.getHeight() / 2) + ')');
  if (!conf.color) {
    track = track.classed(conf.colorPalette, true);
  }
  link = track.selectAll('path').data(chord.getData()).enter().append('path');
  link = link.attr('d', d3.svg.chord().source(chord.getSource).target(chord.getTarget)).attr('opacity', conf.opacity);
  if (conf.color) {
    return link.attr('fill', conf.color);
  } else if (conf.colorPalette != null) {
    return link.attr('class', function(d) {
      return 'q' + chord.colorScale(d.value, conf.logScale) + '-' + conf.colorPaletteSize;
    }, true);
  }
};

circosJS.renderHeatmap = function(name, heatmap, instance, d3, svg) {
  var block, conf, datum, track;
  conf = heatmap.getConf();
  svg.select('.' + name).remove();
  track = svg.append('g').classed(name, true).classed(conf.colorPalette, true).attr('transform', 'translate(' + parseInt(instance.getWidth() / 2) + ',' + parseInt(instance.getHeight() / 2) + ')');
  block = track.selectAll('g').data(heatmap.getData()).enter().append('g').attr('class', function(d, i) {
    return name + '-' + d.parent;
  }, true).attr('transform', function(d) {
    return 'rotate(' + instance._layout.getBlock(d.parent).start * 360 / (2 * Math.PI) + ')';
  });
  return datum = block.selectAll('path').data(function(d) {
    return d.data;
  }).enter().append('path').attr('d', d3.svg.arc().innerRadius(conf.innerRadius).outerRadius(conf.outerRadius).startAngle(function(d, i) {
    block = instance._layout.getBlock(d.block_id);
    return d.start / block.len * (block.end - block.start);
  }).endAngle(function(d, i) {
    block = instance._layout.getBlock(d.block_id);
    return d.end / block.len * (block.end - block.start);
  })).attr('class', function(d) {
    return 'q' + heatmap.colorScale(d.value, conf.logScale) + '-' + conf.colorPaletteSize;
  }, true);
};

circosJS.renderHistogram = function(name, histogram, instance, d3, svg) {
  var bin, block, conf, track;
  conf = histogram.getConf();
  svg.select('.' + name).remove();
  track = svg.append('g').classed(name, true).attr('transform', 'translate(' + parseInt(instance.getWidth() / 2) + ',' + parseInt(instance.getHeight() / 2) + ')');
  if (!conf.color) {
    track.classed(conf.colorPalette, true);
  }
  block = track.selectAll('g').data(histogram.getData()).enter().append('g').attr('class', function(d, i) {
    return name + '-' + d.parent;
  }, true).attr('transform', function(d) {
    return 'rotate(' + instance._layout.getBlock(d.parent).start * 360 / (2 * Math.PI) + ')';
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
    block = instance._layout.getBlock(d.block_id);
    return d.start / block.len * (block.end - block.start);
  }).endAngle(function(d, i) {
    block = instance._layout.getBlock(d.block_id);
    return d.end / block.len * (block.end - block.start);
  }));
  if (conf.color) {
    return bin.attr('fill', conf.color);
  } else if (conf.colorPalette != null) {
    return bin.attr('class', function(d) {
      return 'q' + histogram.colorScale(d.value, conf.logScale) + '-' + conf.colorPaletteSize;
    }, true);
  }
};

circosJS.renderLayout = function(d3, svg, instance) {
  var block, conf, entry, layout;
  conf = instance._layout.getConf();
  svg.select('.cs-layout').remove();
  layout = svg.attr('width', instance.getWidth()).attr('height', instance.getHeight()).append('g').classed('cs-layout', true).on('click', conf.clickCallback).attr('transform', 'translate(' + parseInt(instance.getWidth() / 2) + ',' + parseInt(instance.getHeight() / 2) + ')');
  block = layout.selectAll('path').data(instance._layout.getData()).enter().append('g');
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
    circosJS.renderLayoutLabels(conf, d3, block);
  }
  if (conf.ticks.display) {
    return circosJS.renderLayoutTicks(conf, layout, d3, instance);
  }
};

circosJS.renderLayoutLabels = function(conf, d3, block) {
  var label, labelArc, r;
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
  return label.append('textPath').attr('startOffset', '25%').attr('xlink:href', function(d) {
    return '#arc-label' + d.id;
  }).style('fill', conf.labels.color).text(function(d) {
    return d.label;
  });
};

circosJS.renderLayoutTicks = function(conf, layout, d3, instance) {
  var blockTicks, displayLabel, ticks;
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
  ticks = layout.append("g").selectAll("g").data(instance._layout.getData()).enter().append("g").selectAll("g").data(blockTicks).enter().append("g").attr("transform", function(d) {
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + conf.outerRadius + ",0)";
  });
  ticks.append("line").attr("x1", 0).attr("y1", 1).attr("x2", function(d, i) {
    if (i % conf.ticks.majorSpacing) {
      return conf.ticks.size.minor;
    } else {
      return conf.ticks.size.major;
    }
  }).attr("y2", 1).style("stroke", conf.ticks.color);
  return ticks.append("text").attr("x", 8).attr("dy", ".35em").attr("transform", function(d) {
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
};

circosJS.Core.prototype.render = function(ids) {
  var chord, chord_name, heatmap, heatmap_name, histogram, histogram_name, renderAll, svg, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
  if (typeof ids === 'undefined') {
    renderAll = true;
  }
  svg = d3.select(this.getContainer());
  if (renderAll || __indexOf.call(ids, 'layout') >= 0) {
    circosJS.renderLayout(d3, svg, this);
  }
  _ref = Object.keys(this._heatmaps);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    heatmap_name = _ref[_i];
    if (renderAll || __indexOf.call(ids, heatmap_name) >= 0) {
      heatmap = this._heatmaps[heatmap_name];
      circosJS.renderHeatmap(heatmap_name, heatmap, this, d3, svg);
    }
  }
  _ref1 = Object.keys(this._histograms);
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    histogram_name = _ref1[_j];
    if (renderAll || __indexOf.call(ids, histogram_name) >= 0) {
      histogram = this._histograms[histogram_name];
      circosJS.renderHistogram(histogram_name, histogram, this, d3, svg);
    }
  }
  _ref2 = Object.keys(this._chords);
  for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
    chord_name = _ref2[_k];
    if (renderAll || __indexOf.call(ids, chord_name) >= 0) {
      chord = this._chords[chord_name];
      circosJS.renderChord(chord_name, chord, this, d3, svg);
    }
  }
};

circosJS.Core.prototype._conf = {
  width: 700,
  height: 700,
  container: 'circos'
};

circosJS.Layout.prototype._defaultConf = {
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
  },
  clickCallback: null
};

circosJS.Heatmap.prototype._defaultConf = {
  innerRadius: 200,
  outerRadius: 250,
  min: 'smart',
  max: 'smart',
  colorPalette: 'YlGnBu',
  colorPaletteSize: 9,
  logScale: false
};

circosJS.Histogram.prototype._defaultConf = {
  innerRadius: 150,
  outerRadius: 200,
  min: 'smart',
  max: 'smart',
  direction: 'out',
  color: '#fd6a62',
  colorPaletteSize: 9,
  colorPalette: 'YlGnBu',
  logScale: false
};

circosJS.Chord.prototype._defaultConf = {
  colorPaletteSize: 9,
  colorPalette: 'PuBuGn',
  color: null,
  opacity: 0.7,
  min: 'smart',
  max: 'smart',
  logScale: false
};

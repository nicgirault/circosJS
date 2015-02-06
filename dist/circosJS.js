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
  this._scatters = {};
  this._lines = {};
  this._stacks = {};
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
        newConf[key] = circosJS.mixConf(conf[key], value);
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

circosJS.Core.prototype.heatmap = function(id, conf, data, rules) {
  var track;
  track = new circosJS.Heatmap(conf, data, rules);
  track.completeData();
  if (track.isLayoutCompliant(this, id)) {
    track.computeMinMax();
    this._heatmaps[id] = track;
  }
  return this;
};

circosJS.Core.prototype.histogram = function(id, conf, data, rules) {
  var track;
  track = new circosJS.Histogram(conf, data, rules);
  track.completeData();
  if (track.isLayoutCompliant(this, id)) {
    track.computeMinMax();
    this._histograms[id] = track;
  }
  return this;
};

circosJS.Core.prototype.chord = function(id, conf, data, rules) {
  var track;
  track = new circosJS.Chord(conf, data, rules, this._layout);
  if (track.isLayoutCompliant(this, id)) {
    track.computeMinMax();
    this._chords[id] = track;
  }
  return this;
};

circosJS.Core.prototype.scatter = function(id, conf, data, rules) {
  var track;
  track = new circosJS.Scatter(conf, data, rules);
  track.completeData();
  track.applyRules();
  track.computeMinMax();
  this._scatters[id] = track;
  return this;
};

circosJS.Core.prototype.line = function(id, conf, data, rules) {
  var track;
  track = new circosJS.Line(conf, data, rules);
  track.completeData();
  track.computeMinMax();
  this._lines[id] = track;
  return this;
};

circosJS.Core.prototype.stack = function(id, conf, data, rules) {
  var track;
  track = new circosJS.Stack(conf, data, rules);
  track.completeData();
  track.buildLayeredData();
  track.computeMinMax();
  this._stacks[id] = track;
  return this;
};

circosJS.Chord = function(conf, data, rules, layout) {
  this._conf = circosJS.mixConf(conf, JSON.parse(JSON.stringify(this._defaultConf)));
  circosJS.Track.call(this, conf, data, rules);
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

circosJS.Heatmap = function(conf, data, rules) {
  this._conf = circosJS.mixConf(conf, JSON.parse(JSON.stringify(this._defaultConf)));
  circosJS.Track.call(this, conf, data, rules);
  return this;
};

circosJS.Histogram = function(conf, data, rules) {
  this._conf = circosJS.mixConf(conf, JSON.parse(JSON.stringify(this._defaultConf)));
  circosJS.Track.call(this, conf, data, rules);
  return this;
};

circosJS.Line = function(conf, data, rules) {
  this._conf = circosJS.mixConf(conf, JSON.parse(JSON.stringify(this._defaultConf)));
  circosJS.Track.call(this, conf, data, rules);
  return this;
};

circosJS.Scatter = function(conf, data, rules) {
  this._conf = circosJS.mixConf(conf, JSON.parse(JSON.stringify(this._defaultConf)));
  circosJS.Track.call(this, conf, data, rules);
  return this;
};

circosJS.Stack = function(conf, data, rules) {
  this._conf = circosJS.mixConf(conf, JSON.parse(JSON.stringify(this._defaultConf)));
  circosJS.Track.call(this, conf, data, rules);
  this.buildLayeredData = function() {
    var block, datum, idx, lastDatumInLayer, layer, layeredData, layers, placed, sortedData, _i, _j, _len, _len1;
    data = this._data;
    layeredData = [];
    for (idx in data) {
      block = data[idx];
      sortedData = block.data.sort(function(a, b) {
        if (a.start < b.start) {
          return -1;
        } else if (a.start === b.start) {
          if (a.end > b.end) {
            return -1;
          } else if (a.end === b.end) {
            return 0;
          } else {
            return 1;
          }
        } else {
          return 1;
        }
      });
      layers = [];
      for (_i = 0, _len = sortedData.length; _i < _len; _i++) {
        datum = sortedData[_i];
        placed = false;
        for (_j = 0, _len1 = layers.length; _j < _len1; _j++) {
          layer = layers[_j];
          lastDatumInLayer = layer.slice(0).pop();
          if (lastDatumInLayer.end < datum.start) {
            layer.push(datum);
            placed = true;
            break;
          }
        }
        if (!placed) {
          layers.push([datum]);
        }
      }
      layeredData.push({
        parent: block.parent,
        layers: layers
      });
    }
    return this._layers = layeredData;
  };
  this.getData = function() {
    return this._layers;
  };
  return this;
};

circosJS.Track = function(conf, data, rules) {
  this._data = circosJS.parseData(data);
  this._rules = rules;
  this.applyRules = function() {
    var datum, i, k, rule, v, _ref, _results;
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
          _results1.push((function() {
            var _i, _len, _results2;
            _results2 = [];
            for (_i = 0, _len = rules.length; _i < _len; _i++) {
              rule = rules[_i];
              if (rule.condition(datum.value)) {
                _results2.push(datum[rule.parameter] = rule.value);
              } else {
                _results2.push(void 0);
              }
            }
            return _results2;
          })());
        }
        return _results1;
      })());
    }
    return _results;
  };
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
      scaleLogBase = 2.3;
    } else {
      scaleLogBase = 1;
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
  this.height = function(value, logScale) {
    var fraction, max, min, scaleLogBase, scope, x;
    if (logScale) {
      scaleLogBase = 2.3;
    } else {
      scaleLogBase = 1;
    }
    min = this._conf.cmin;
    max = this._conf.cmax;
    scope = this._conf.outerRadius - this._conf.innerRadius;
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
  this.getRules = function() {
    return this._rules;
  };
  return this.isLayoutCompliant = function(instance, id) {
    var block, d, datum, layout_ids, layout_lengths, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
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
    _ref1 = this._data;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      block = _ref1[_j];
      if (_ref2 = block.parent, __indexOf.call(layout_ids, _ref2) < 0) {
        circosJS.log(2, 'No layout block id match', 'Heatmap data has a parent property that does not correspond to any layout block id', {
          'heatmap_id': id,
          'block_id': block.parent
        });
      }
      _ref3 = block.data;
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        datum = _ref3[_k];
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

circosJS.renderChord = function(track, chord, conf, data, instance, d3) {
  var link;
  if (conf.usePalette) {
    track = track.classed(conf.colorPalette, true);
  }
  link = track.selectAll('path').data(chord.getData()).enter().append('path');
  link = link.attr('d', d3.svg.chord().source(chord.getSource).target(chord.getTarget)).attr('opacity', conf.opacity);
  if (conf.usePalette) {
    return link.attr('class', function(d) {
      return 'q' + chord.colorScale(d.value, conf.logScale) + '-' + conf.colorPaletteSize;
    }, true);
  } else {
    return link.attr('fill', conf.color);
  }
};

circosJS.renderHeatmap = function(track, heatmap, conf, data, instance, d3) {
  var block, datum;
  track = track.classed(conf.colorPalette, true);
  block = track.selectAll('g').data(data).enter().append('g').attr('class', function(d, i) {
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

circosJS.renderHistogram = function(track, histogram, conf, data, instance, d3) {
  var bin, block;
  if (conf.usePalette) {
    track = track.classed(conf.colorPalette, true);
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
      return conf.outerRadius - histogram.height(d.value, conf.logScale);
    } else {
      return conf.innerRadius;
    }
  }).outerRadius(function(d, i) {
    if (conf.direction === 'out') {
      return conf.innerRadius + histogram.height(d.value, conf.logScale);
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
  if (conf.usePalette) {
    return bin.attr('class', function(d) {
      return 'q' + histogram.colorScale(d.value, conf.logScale) + '-' + conf.colorPaletteSize;
    }, true);
  } else {
    return bin.attr('fill', conf.color);
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

circosJS.renderLine = function(track, line_track, conf, data, instance, d3) {
  var block, line, theta, x, y;
  theta = function(d) {
    var block;
    block = instance._layout.getBlock(d.block_id);
    return block.start + d.position / block.len * (block.end - block.start);
  };
  x = function(d) {
    var angle, r;
    if (conf.direction === 'in') {
      r = conf.outerRadius - line_track.height(d.value, conf.logScale);
    } else {
      r = conf.innerRadius + line_track.height(d.value, conf.logScale);
    }
    angle = theta(d) - Math.PI / 2;
    return r * Math.cos(angle);
  };
  y = function(d) {
    var angle, r;
    if (conf.direction === 'in') {
      r = conf.outerRadius - line_track.height(d.value, conf.logScale);
    } else {
      r = conf.innerRadius + line_track.height(d.value, conf.logScale);
    }
    angle = theta(d) - Math.PI / 2;
    return r * Math.sin(angle);
  };
  block = track.selectAll('g').data(data).enter().append('g').attr('class', function(d, i) {
    return name + '-' + d.parent;
  }, true);
  line = d3.svg.line().x(function(d) {
    return x(d);
  }).y(function(d) {
    return y(d);
  }).interpolate(conf.interpolation);
  return block.append("path").datum(function(d) {
    return d.data;
  }).attr("class", "line").attr("d", line).attr('stroke-width', conf.thickness).attr('fill', conf.fill ? conf.fill_color : 'none').attr('stroke', conf.color);
};

circosJS.renderScatter = function(track, scatter, conf, data, instance, d3) {
  var block, point, theta, x, y;
  block = track.selectAll('g').data(data).enter().append('g').attr('class', function(d, i) {
    return name + '-' + d.parent;
  }, true);
  point = block.selectAll('.point').data(function(d) {
    return d.data;
  });
  theta = function(d) {
    block = instance._layout.getBlock(d.block_id);
    return block.start + d.position / block.len * (block.end - block.start);
  };
  x = function(d) {
    var angle, r;
    if (conf.direction === 'in') {
      r = conf.outerRadius - scatter.height(d.value, conf.logScale);
    } else {
      r = conf.innerRadius + scatter.height(d.value, conf.logScale);
    }
    angle = theta(d) - Math.PI / 2;
    return r * Math.cos(angle);
  };
  y = function(d) {
    var angle, r;
    if (conf.direction === 'in') {
      r = conf.outerRadius - scatter.height(d.value, conf.logScale);
    } else {
      r = conf.innerRadius + scatter.height(d.value, conf.logScale);
    }
    angle = theta(d) - Math.PI / 2;
    return r * Math.sin(angle);
  };
  point = point.enter().append('path').attr('d', d3.svg.symbol().type(conf.glyph.shape).size(conf.glyph.size)).attr('transform', function(d) {
    return 'translate(' + x(d) + ',' + y(d) + ') rotate(' + theta(d) * 360 / (2 * Math.PI) + ')';
  });
  return point = point.attr('class', 'point').attr('stroke', function(d) {
    return d.strokeColor || conf.glyph.strokeColor;
  }).attr('stroke-width', conf.glyph.strikeWidth).attr('fill', conf.glyph.fill ? conf.glyph.color : 'none');
};

circosJS.renderStack = function(track, stack, conf, data, instance, d3) {
  var block, layer, span;
  if (conf.usePalette) {
    track = track.classed(conf.colorPalette, true);
  }
  block = track.selectAll('g').data(data).enter().append('g').attr('class', function(d, i) {
    return name + '-' + d.parent;
  }, true).attr('transform', function(d) {
    return 'rotate(' + instance._layout.getBlock(d.parent).start * 360 / (2 * Math.PI) + ')';
  });
  layer = block.selectAll('.layer').data(function(d) {
    return d.layers;
  }).enter().append('g').attr('class', 'layer');
  span = layer.selectAll('path').data(function(d, i) {
    return d;
  }).enter().append('path').attr('d', d3.svg.arc().innerRadius(function(d, i, j) {
    var inner;
    inner = conf.innerRadius + conf.thickness * j;
    if (inner > conf.outerRadius) {
      return 0;
    } else {
      return inner;
    }
  }).outerRadius(function(d, i, j) {
    var inner, outer;
    outer = conf.innerRadius + conf.thickness * (j + 1);
    inner = conf.innerRadius + conf.thickness * j;
    if (inner > conf.outerRadius) {
      return 0;
    } else {
      return Math.min(outer, conf.outerRadius);
    }
  }).startAngle(function(d, i) {
    block = instance._layout.getBlock(d.block_id);
    return d.start / block.len * (block.end - block.start);
  }).endAngle(function(d, i) {
    block = instance._layout.getBlock(d.block_id);
    return d.end / block.len * (block.end - block.start);
  }));
  if (conf.usePalette) {
    return span.attr('class', function(d) {
      return 'q' + stack.colorScale(d.value, conf.logScale) + '-' + conf.colorPaletteSize;
    }, true);
  } else {
    return span.attr('fill', conf.color);
  }
};

circosJS.Core.prototype.render = function(ids) {
  var preRender, renderAll, svg, track, trackName, trackType, types, _i, _j, _len, _len1, _ref;
  if (typeof ids === 'undefined') {
    renderAll = true;
  }
  svg = d3.select(this.getContainer());
  if (renderAll || __indexOf.call(ids, 'layout') >= 0) {
    circosJS.renderLayout(d3, svg, this);
  }
  types = [
    {
      store: this._heatmaps,
      renderFunction: circosJS.renderHeatmap
    }, {
      store: this._histograms,
      renderFunction: circosJS.renderHistogram
    }, {
      store: this._chords,
      renderFunction: circosJS.renderChord
    }, {
      store: this._scatters,
      renderFunction: circosJS.renderScatter
    }, {
      store: this._lines,
      renderFunction: circosJS.renderLine
    }, {
      store: this._stacks,
      renderFunction: circosJS.renderStack
    }
  ];
  preRender = function(name, track, instance, d3, svg, callback) {
    var conf, data, track1;
    conf = track.getConf();
    svg.select('.' + name).remove();
    track1 = svg.append('g').classed(name, true).attr('transform', 'translate(' + parseInt(instance.getWidth() / 2) + ',' + parseInt(instance.getHeight() / 2) + ')');
    data = track.getData();
    return callback(track1, track, conf, data, instance, d3, svg);
  };
  for (_i = 0, _len = types.length; _i < _len; _i++) {
    trackType = types[_i];
    _ref = Object.keys(trackType.store);
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      trackName = _ref[_j];
      if (renderAll || __indexOf.call(ids, trackName) >= 0) {
        track = trackType.store[trackName];
        preRender(trackName, track, this, d3, svg, trackType.renderFunction);
      }
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
  colorPaletteSize: 9,
  colorPalette: 'YlGnBu',
  usePalette: true,
  color: '#fd6a62',
  logScale: false
};

circosJS.Chord.prototype._defaultConf = {
  colorPaletteSize: 9,
  colorPalette: 'PuBuGn',
  usePalette: true,
  color: '#fd6a62',
  opacity: 0.7,
  min: 'smart',
  max: 'smart',
  logScale: false
};

circosJS.Scatter.prototype._defaultConf = {
  innerRadius: 150,
  outerRadius: 200,
  min: 'smart',
  max: 'smart',
  direction: 'out',
  logScale: false,
  glyph: {
    color: '#fd6a62',
    fill: true,
    size: 15,
    shape: 'circle',
    strokeColor: '#d3d3d3',
    strokeWidth: 2
  }
};

circosJS.Line.prototype._defaultConf = {
  innerRadius: 150,
  outerRadius: 200,
  min: 'smart',
  max: 'smart',
  direction: 'out',
  logScale: false,
  color: '#fd6a62',
  fill: true,
  fill_color: '#d3d3d3',
  thickness: 2,
  max_gap: 10000000,
  interpolation: 'linear'
};

circosJS.Stack.prototype._defaultConf = {
  innerRadius: 150,
  outerRadius: 200,
  colorPaletteSize: 9,
  colorPalette: 'PuBuGn',
  usePalette: true,
  color: '#fd6a62',
  min: 'smart',
  max: 'smart',
  direction: 'out',
  logScale: false,
  color: '#fd6a62',
  fill: true,
  fill_color: '#d3d3d3',
  thickness: 2
};

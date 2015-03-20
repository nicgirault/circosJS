var circosJS,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

circosJS = function(conf) {
  var instance;
  instance = new circosJS.Core(conf);
  return instance;
};

circosJS.Core = function(conf) {
  var k, v, _ref;
  this.tracks = {
    heatmap: {},
    histograms: {},
    chords: {},
    scatters: {},
    lines: {},
    stacks: {}
  };
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

circosJS.Core.prototype.removeTracks = function(trackIds) {
  var id, store, svg, trackId, type, _i, _len, _ref;
  svg = d3.select(this.getContainer());
  _ref = this.tracks;
  for (type in _ref) {
    store = _ref[type];
    if (typeof trackIds === 'object') {
      for (_i = 0, _len = trackIds.length; _i < _len; _i++) {
        id = trackIds[_i];
        if (id in store) {
          svg.select('.' + id).remove();
          delete store[id];
        }
      }
    } else if (typeof trackIds === 'string') {
      if (trackIds in store) {
        svg.select('.' + trackIds).remove();
        delete store[trackIds];
      }
    } else if (typeof trackIds === 'undefined') {
      for (trackId in store) {
        svg.select('.' + trackId).remove();
        delete store[trackId];
      }
    }
  }
  return this;
};

circosJS.Core.prototype.layout = function(conf, data) {
  this._layout = new circosJS.Layout(conf, data);
  return this;
};

circosJS.log = function(level, code, message, data) {
  var levels;
  levels = ['Permanent log', 'Error', 'Warning', 'Info'];
  console.log('CircosJS: ', levels[level] + ' [' + code + '] ', message, data);
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

circosJS.Core.prototype.smartBorders = function() {
  var border, borders, currentBorder, layout, store, track, trackId, trackType, width, _i, _len, _ref;
  width = this._conf.defaultTrackWidth;
  layout = {
    "in": this._layout._conf.innerRadius,
    out: this._layout._conf.outerRadius
  };
  borders = [];
  _ref = this.tracks;
  for (trackType in _ref) {
    store = _ref[trackType];
    for (trackId in store) {
      track = store[trackId];
      if (track._conf.innerRadius) {
        borders.push({
          "in": track._conf.innerRadius,
          out: track._conf.outerRadius
        });
      }
    }
  }
  borders = borders.sort(function(a, b) {
    if (a.out > b.out) {
      1;
    }
    if (a.out < b.out) {
      -1;
    }
    return 0;
  });
  currentBorder = layout;
  for (_i = 0, _len = borders.length; _i < _len; _i++) {
    border = borders[_i];
    if (border.out < currentBorder["in"] - width) {
      return {
        "in": currentBorder["in"] - width,
        out: currentBorder["in"]
      };
    }
    currentBorder = border;
  }
  if (currentBorder["in"] > width) {
    return {
      "in": currentBorder["in"] - width,
      out: currentBorder["in"]
    };
  } else {
    return {
      "in": borders[0].out,
      out: borders[0].out + width
    };
  }
};

if (typeof module !== "undefined" && module !== null) {
  module.exports = circosJS;
}

circosJS.parseData = function(data, layoutIds) {
  var sample;
  if (!(data.length > 0)) {
    return data;
  }
  sample = data[0];
  if (!Array.isArray(sample)) {
    return data;
  }
  return circosJS.parseSpanValueData(data, layoutIds);
};

circosJS.parseSpanValueData = function(data, layoutSummary) {
  var groups, header;
  header = ['parent', 'start', 'end', 'value'];
  data = data.filter(function(datum, index) {
    if (!(datum[0] in layoutSummary)) {
      circosJS.log(1, 'datum', 'unknown parent id', {
        line: index + 1,
        value: datum[0],
        header: header[0],
        layoutSummary: layoutSummary
      });
      return false;
    }
    return true;
  }).filter(function(datum, index) {
    var element, i, _i, _len, _ref;
    _ref = datum.slice(1);
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      element = _ref[i];
      if (isNaN(element)) {
        circosJS.log(1, 'datum', 'not a number', {
          line: index + 1,
          value: element,
          header: header[i + 1]
        });
        return false;
      }
    }
    return true;
  }).map(function(datum) {
    if (datum.start < 0 || datum.end > layoutSummary[datum[0]]) {
      circosJS.log(2, 'position', 'position inconsistency', {
        datum: datum,
        layoutSummary: layoutSummary
      });
    }
    return {
      block_id: datum[0],
      start: Math.max(0, parseFloat(datum[1])),
      end: Math.min(layoutSummary[datum[0]], parseFloat(datum[2])),
      value: parseFloat(datum[3])
    };
  });
  groups = d3.nest().key(function(datum) {
    return datum.block_id;
  }).entries(data);
  return {
    data: groups,
    meta: {
      min: d3.min(data, function(d) {
        return d.value;
      }),
      max: d3.max(data, function(d) {
        return d.value;
      })
    }
  };
};

circosJS.parsePositionValueData = function(data, layoutSummary) {
  var groups, header;
  header = ['parent', 'position', 'value'];
  data = data.filter(function(datum, index) {
    if (!(datum[0] in layoutSummary)) {
      circosJS.log(1, 'datum', 'unknown parent id', {
        line: index + 1,
        value: datum[0],
        header: header[0],
        layoutSummary: layoutSummary
      });
      return false;
    }
    return true;
  }).filter(function(datum, index) {
    var element, i, _i, _len, _ref;
    _ref = datum.slice(1);
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      element = _ref[i];
      if (isNaN(element)) {
        circosJS.log(1, 'datum', 'not a number', {
          line: index + 1,
          value: element,
          header: header[i + 1]
        });
        return false;
      }
    }
    return true;
  }).map(function(datum) {
    return {
      block_id: datum[0],
      position: parseFloat(datum[1]),
      value: parseFloat(datum[2])
    };
  });
  groups = d3.nest().key(function(datum) {
    return datum.block_id;
  }).entries(data);
  return {
    data: groups,
    meta: {
      min: d3.min(data, function(d) {
        return d.value;
      }),
      max: d3.max(data, function(d) {
        return d.value;
      })
    }
  };
};

circosJS.parseChordData = function(data, layoutSummary) {
  var header;
  header = ['source_id', 'source_start', 'source_end', 'target_id', 'target_start', 'target_end', 'value'];
  return _(data).filter(function(datum, index) {
    if (!(datum[0] in layoutSummary)) {
      circosJS.log(1, 'datum', 'unknown parent id', {
        line: index + 1,
        value: element,
        header: header[0],
        expected: layoutIds
      });
      return false;
    }
    if (!(datum[3] in layoutSummary)) {
      circosJS.log(1, 'datum', 'unknown parent id', {
        line: index + 1,
        value: element,
        header: header[3],
        expected: layoutIds
      });
      return false;
    }
    return true;
  }).filter(function(datum, index) {
    var element, i, _i, _len, _ref;
    _ref = ['0', datum[1], datum[2], '0', datum[4], datum[5], datum[6]];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      element = _ref[i];
      if (isNaN(element)) {
        circosJS.log(1, 'datum', 'not a number', {
          line: index + 1,
          value: element,
          header: header[i]
        });
        return false;
      }
    }
    return true;
  }).map(function(datum) {
    return {
      source: {
        id: datum[0],
        start: parseFloat(datum[1]),
        end: parseFloat(datum[2])
      },
      target: {
        id: datum[3],
        start: parseFloat(datum[4]),
        end: parseFloat(datum[5])
      },
      value: parseFloat(datum[6])
    };
  }).value();
};

circosJS.Layout = function(conf, data) {
  var block_nb, gap, k, offset, size, v, _ref, _ref1, _ref2;
  if (data == null) {
    circosJS.log(2, 'no layout data', '');
  }
  this._conf = JSON.parse(JSON.stringify(this._defaultConf));
  this._data = data;
  this.blocks = {};
  this._size = 0;
  offset = 0;
  _ref = this._data;
  for (k in _ref) {
    v = _ref[k];
    this.blocks[v.id] = {
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
    this.blocks[v.id].start = v.offset / size * (2 * Math.PI - block_nb * gap) + k * gap;
    this.blocks[v.id].end = (v.offset + v.len) / size * (2 * Math.PI - block_nb * gap) + k * gap;
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
  this.getAngle = function(blockId, unit) {
    var block;
    block = this.blocks[blockId].start / this._size;
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
  this.summary = function() {
    var d, layoutSummary, _i, _len, _ref3;
    layoutSummary = {};
    _ref3 = this._data;
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      d = _ref3[_i];
      layoutSummary[d.id] = d.len;
    }
    return layoutSummary;
  };
  return this;
};

circosJS.Core.prototype.heatmap = function(id, conf, data, rules, backgrounds) {
  var track;
  track = new circosJS.Heatmap();
  track.build(this, conf, data, rules, backgrounds);
  this.track.heatmaps[id] = track;
  return this;
};

circosJS.Core.prototype.histogram = function(id, conf, data, rules, backgrounds) {
  var track;
  track = new circosJS.Histogram();
  track.build(this, conf, data, rules, backgrounds);
  this.tracks.histograms[id] = track;
  return this;
};

circosJS.Core.prototype.chord = function(id, conf, data, rules) {
  var track;
  track = new circosJS.Chord(this, conf, data, rules, this._layout);
  track.computeMinMax();
  this._chords[id] = track;
  return this;
};

circosJS.Core.prototype.scatter = function(id, conf, data, rules, backgrounds) {
  var track;
  track = new circosJS.Scatter();
  track.build(this, conf, data, rules, backgrounds);
  this.tracks.scatters[id] = track;
  return this;
};

circosJS.Core.prototype.line = function(id, conf, data, rules, backgrounds) {
  var track;
  track = new circosJS.Line();
  track.build(this, conf, data, rules, backgrounds);
  this.tracks.lines[id] = track;
  return this;
};

circosJS.Core.prototype.stack = function(id, conf, data, rules, backgrounds) {
  var track;
  track = new circosJS.Stack(this, conf, data, rules, backgrounds);
  track.completeData();
  track.buildLayeredData();
  track.computeMinMax();
  track.applyRules();
  this._stacks[id] = track;
  return this;
};

circosJS.Chord = function(instance, conf, data, rules, layout) {
  this._conf = circosJS.mixConf(conf, JSON.parse(JSON.stringify(this._defaultConf)));
  circosJS.Track.call(this, instance, conf, data, rules);
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

circosJS.CircularTrack = function(instance, conf, data, rules, backgrounds) {
  var smartBorders;
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
  if (this._conf.innerRadius === 0 && this._conf.outerRadius === 0) {
    smartBorders = instance.smartBorders();
    this._conf.innerRadius = smartBorders["in"];
    this._conf.outerRadius = smartBorders.out;
  }
  circosJS.Track.call(this, instance, conf, data, rules, backgrounds);
  return this;
};

circosJS.Heatmap = function() {
  circosJS.Track.call(this);
  this.parseData = circosJS.parseSpanValueData;
  this.render = circosJS.renderHeatmap;
  return this;
};

circosJS.Histogram = function() {
  circosJS.Track.call(this);
  this.parseData = circosJS.parseSpanValueData;
  this.render = circosJS.renderHistogram;
  return this;
};

circosJS.Line = function() {
  circosJS.Track.call(this);
  this.parseData = circosJS.parsePositionValueData;
  this.render = circosJS.renderLine;
  return this;
};

circosJS.Scatter = function() {
  circosJS.Track.call(this);
  this.parseData = circosJS.parsePositionValueData;
  this.render = circosJS.renderScatter;
  return this;
};

circosJS.Stack = function(instance, conf, data, rules, backgrounds) {
  this._conf = circosJS.mixConf(conf, JSON.parse(JSON.stringify(this._defaultConf)));
  circosJS.CircularTrack.call(this, instance, conf, data, rules, backgrounds);
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
          if (lastDatumInLayer.end + this._conf.margin < datum.start) {
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
  this.applyRules = function() {
    var datum, i, k, layer, rule, v, _ref, _results;
    _ref = this._layers;
    _results = [];
    for (k in _ref) {
      v = _ref[k];
      _results.push((function() {
        var _ref1, _results1;
        _ref1 = v.layers;
        _results1 = [];
        for (i in _ref1) {
          layer = _ref1[i];
          _results1.push((function() {
            var _i, _len, _results2;
            _results2 = [];
            for (_i = 0, _len = layer.length; _i < _len; _i++) {
              datum = layer[_i];
              _results2.push((function() {
                var _j, _len1, _results3;
                _results3 = [];
                for (_j = 0, _len1 = rules.length; _j < _len1; _j++) {
                  rule = rules[_j];
                  if (rule.condition(v.parent, datum, i)) {
                    _results3.push(datum[rule.parameter] = rule.value);
                  } else {
                    _results3.push(void 0);
                  }
                }
                return _results3;
              })());
            }
            return _results2;
          })());
        }
        return _results1;
      })());
    }
    return _results;
  };
  this.datumRadialPosition = function(d, i, j) {
    var origin, radialEnd, radialStart;
    radialStart = (this._conf.thickness + this._conf.radialMargin) * j;
    radialEnd = radialStart + this._conf.thickness;
    if (this._conf.direction === 'out') {
      return [this._conf.innerRadius + radialStart, Math.min(this._conf.innerRadius + radialEnd, this._conf.outerRadius)];
    }
    if (this._conf.direction === 'in') {
      return [Math.max(this._conf.outerRadius - radialEnd, this._conf.innerRadius), this._conf.outerRadius - radialStart];
    }
    if (this._conf.direction === 'center') {
      origin = Math.floor((this._conf.outerRadius + this._conf.innerRadius) / 2);
      radialStart = (this._conf.thickness + this._conf.radialMargin) * Math.floor(j / 2);
      radialEnd = radialStart + this._conf.thickness;
      if (j % 2 === 0) {
        return [origin + radialStart, origin + radialEnd];
      } else {
        return [origin - radialStart - this._conf.radialMargin, origin - radialEnd - this._conf.radialMargin];
      }
    }
  };
  this.datumInnerRadius = (function(_this) {
    return function(d, i, j) {
      return _this.datumRadialPosition(d, i, j)[0];
    };
  })(this);
  this.datumOuterRadius = (function(_this) {
    return function(d, i, j) {
      return _this.datumRadialPosition(d, i, j)[1];
    };
  })(this);
  this.datumStartAngle = (function(_this) {
    return function(d, i) {
      var block;
      block = instance._layout.getBlock(d.block_id);
      return d.start / block.len * (block.end - block.start);
    };
  })(this);
  this.datumEndAngle = (function(_this) {
    return function(d, i) {
      var block;
      block = instance._layout.getBlock(d.block_id);
      return d.end / block.len * (block.end - block.start);
    };
  })(this);
  return this;
};

circosJS.Track = function() {
  this.build = function(instance, conf, data, rules, backgrounds) {
    this.loadData(data, instance);
    this.loadConf(conf);
    this.loadBackgrounds(backgrounds);
    return this.applyRules(rules);
  };
  this.loadData = function(data, instance) {
    var d, layoutSummary, result, _i, _len, _ref;
    layoutSummary = {};
    _ref = instance._layout.getData();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      d = _ref[_i];
      layoutSummary[d.id] = d.len;
    }
    result = this.parseData(data, layoutSummary);
    this.data = result.data;
    return this.meta = result.meta;
  };
  this.loadConf = function(conf) {
    this.conf = circosJS.mixConf(conf, JSON.parse(JSON.stringify(this._defaultConf)));
    return this.computeMinMax();
  };
  this.loadBackgrounds = function(backgrounds) {
    return this.backgrounds = backgrounds || [];
  };
  this.applyRules = function() {
    var datum, i, k, rule, v, _ref, _results;
    _ref = this.data;
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
              if (rule.condition(v.parent, datum, i)) {
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
  this.computeMinMax = function() {
    this.conf.cmin = this.conf.min === 'smart' ? this.meta.min : this.conf.min;
    return this.conf.cmax = this.conf.max === 'smart' ? this.meta.max : this.conf.max;
  };
  this.ratio = function(value, min, max, scope, reverse, logScale) {
    var fraction, scaleLogBase, x;
    scaleLogBase = logScale ? 2.3 : 1;
    if (min === max || (value === min && !reverse) || (value === max && reverse)) {
      return 0;
    }
    if (value === max || (value === min && reverse)) {
      return scope - 1;
    }
    fraction = (value - min) / (max - min);
    x = Math.exp(1 / scaleLogBase * Math.log(fraction));
    if (reverse) {
      x = 1 - x;
    }
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
  this.renderBlock = function(parentElement, data, layout) {
    return parentElement.selectAll('.block').data(data).enter().append('g').attr('class', 'block').attr('transform', function(d) {
      return 'rotate(' + layout.blocks[d.key].start * 360 / (2 * Math.PI) + ')';
    });
  };
  this.theta = function(position, block) {
    return position / block.len * (block.end - block.start);
  };
  this.x = (function(_this) {
    return function(d, layout, conf) {
      var angle, height, r;
      height = _this.ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale);
      if (conf.direction === 'in') {
        r = conf.outerRadius - height;
      } else {
        r = conf.innerRadius + height;
      }
      angle = _this.theta(d.position, layout.blocks[d.block_id]) - Math.PI / 2;
      return r * Math.cos(angle);
    };
  })(this);
  this.y = (function(_this) {
    return function(d, layout, conf) {
      var angle, height, r;
      height = _this.ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale);
      if (conf.direction === 'in') {
        r = conf.outerRadius - height;
      } else {
        r = conf.innerRadius + height;
      }
      angle = _this.theta(d.position, layout.blocks[d.block_id]) - Math.PI / 2;
      return r * Math.sin(angle);
    };
  })(this);
  return this;
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

circosJS.renderHeatmap = function(instance, parentElement, name) {
  var group, renderDatum, track;
  track = parentElement.append('g').attr('class', name + ' ' + this.conf.colorPalette);
  group = this.renderBlock(track, this.data, instance._layout);
  renderDatum = function(parentElement, conf, layout, colorScale) {
    return parentElement.selectAll('path').data(function(d) {
      return d.values;
    }).enter().append('path').attr('d', d3.svg.arc().innerRadius(conf.innerRadius).outerRadius(conf.outerRadius).startAngle(function(d, i) {
      return this.theta(d.start, layout.blocks[d.block_id]);
    }).endAngle(function(d, i) {
      return this.theta(d.end, layout.blocks[d.block_id]);
    })).attr('class', (function(_this) {
      return function(d) {
        return 'q' + ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize;
      };
    })(this));
  };
  return renderDatum(group, this.conf, instance._layout, this.colorScale);
};

circosJS.renderHistogram = function(instance, parentElement, name) {
  var group, renderDatum, track;
  track = parentElement.append('g').attr('class', name + ' ' + this.conf.colorPalette);
  group = this.renderBlock(track, this.data, instance._layout);
  renderDatum = function(parentElement, conf, layout, ratio) {
    var bin;
    bin = group.selectAll('path').data(function(d) {
      return d.values;
    }).enter().append('path').attr('d', d3.svg.arc().innerRadius(function(d, i) {
      var height;
      if (conf.direction === 'in') {
        height = ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale);
        return conf.outerRadius - height;
      } else {
        return conf.innerRadius;
      }
    }).outerRadius(function(d, i) {
      var height;
      if (conf.direction === 'out') {
        height = ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale);
        return conf.innerRadius + height;
      } else {
        return conf.outerRadius;
      }
    }).startAngle(function(d) {
      return this.theta(d.start, layout.blocks[d.block_id]);
    }).endAngle(function(d, i) {
      return this.theta(d.end, layout.blocks[d.block_id]);
    }));
    if (conf.usePalette) {
      return bin.attr('class', function(d) {
        return 'q' + ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize;
      });
    } else {
      return bin.attr('fill', conf.color);
    }
  };
  return renderDatum(group, this.conf, instance._layout, this.ratio);
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
  label = block.append('text').style('font-size', '' + conf.labels.size + 'px').attr('text-anchor', 'middle');
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
  }).style('font-size', '' + conf.ticks.labelSize + 'px').style('fill', conf.ticks.labelColor).text(function(d) {
    return d.label;
  });
};

circosJS.renderLine = function(instance, parentElement, name) {
  var buildAxes, group, line, renderDatum, track;
  track = parentElement.append('g').attr('class', name);
  group = this.renderBlock(track, this.data, instance._layout);
  renderDatum = function(parentElement, conf, layout) {
    return parentElement.append('path').datum(function(d) {
      return d.values;
    }).attr('class', 'line').attr('d', line).attr('stroke-width', function(d) {
      return d.thickness || conf.thickness;
    }).attr('stroke', function(d) {
      return d.color || conf.color;
    }).attr('fill', function(d) {
      var color, fill;
      fill = d.fill || conf.fill;
      color = d.fill_color || conf.fill_color;
      if (fill) {
        return color;
      } else {
        return 'none';
      }
    });
  };
  buildAxes = function(parentElement, conf, data) {
    var axes, axis, x;
    if (conf.axes.minor.spacingType === 'pixel') {
      axes = (function() {
        var _i, _ref, _ref1, _ref2, _results;
        _results = [];
        for (x = _i = _ref = conf.innerRadius, _ref1 = conf.outerRadius, _ref2 = conf.axes.minor.spacing; _ref2 > 0 ? _i <= _ref1 : _i >= _ref1; x = _i += _ref2) {
          _results.push(x);
        }
        return _results;
      })();
    }
    axis = d3.svg.arc().innerRadius(function(d) {
      return d;
    }).outerRadius(function(d) {
      return d;
    }).startAngle(0).endAngle((function(_this) {
      return function(d, i, j) {
        var block;
        block = instance._layout.blocks[data[j].key];
        return block.end - block.start;
      };
    })(this));
    return parentElement.selectAll('.axis').data(axes).enter().append('path').attr('class', 'axis').attr('d', axis).attr('stroke-width', function(d, i) {
      if (i % conf.axes.major.spacing === 0) {
        return conf.axes.major.thickness;
      } else {
        return conf.axes.minor.thickness;
      }
    }).attr('stroke', function(d, i) {
      if (i % conf.axes.major.spacing === 0) {
        return conf.axes.major.color;
      } else {
        return conf.axes.minor.color;
      }
    });
  };
  line = d3.svg.line().x((function(_this) {
    return function(d) {
      return _this.x(d, instance._layout, _this.conf);
    };
  })(this)).y((function(_this) {
    return function(d) {
      return _this.y(d, instance._layout, _this.conf);
    };
  })(this)).interpolate(this.conf.interpolation);
  buildAxes(group, this.conf, this.data);
  return renderDatum(group, this.conf, instance._layout);
};

circosJS.renderScatter = function(instance, parentElement, name) {
  var group, renderDatum, track;
  track = parentElement.append('g').attr('class', name);
  group = this.renderBlock(track, this.data, instance._layout);
  renderDatum = (function(_this) {
    return function(parentElement, conf, layout) {
      var point;
      point = parentElement.selectAll('.point').data(function(d) {
        return d.values;
      });
      return point.enter().append('path').attr('class', 'point').attr('d', d3.svg.symbol().type(conf.glyph.shape).size(conf.glyph.size)).attr('transform', function(d) {
        return 'translate(' + _this.x(d, layout, _this.conf) + ',' + _this.y(d, layout, _this.conf) + ') rotate(' + _this.theta(d.position, layout.blocks[d.block_id]) * 360 / (2 * Math.PI) + ')';
      }).attr('stroke', function(d) {
        return d.glyph_strokeColor || conf.glyph.strokeColor;
      }).attr('stroke-width', function(d) {
        return d.glyph_strokeWidth || conf.glyph.strokeWidth;
      }).attr('fill', function(d) {
        var color, fill;
        fill = d.glyph_fill || conf.glyph.fill;
        color = d.glyph_color || conf.glyph.color;
        if (fill) {
          return color;
        } else {
          return 'none';
        }
      });
    };
  })(this);
  return renderDatum(group, this.conf, instance._layout);
};

circosJS.renderStack = function(track, stack, conf, data, instance, d3) {
  var block, layer, tile;
  track = track.classed(conf.colorPalette, true);
  block = track.selectAll('.block').data(data).enter().append('g').classed('block', true).attr('transform', function(d) {
    return 'rotate(' + instance._layout.getBlock(d.key).start * 360 / (2 * Math.PI) + ')';
  });
  layer = block.selectAll('.layer').data(function(d) {
    return d.layers;
  }).enter().append('g').attr('class', 'layer');
  tile = layer.selectAll('path').data(function(d, i) {
    return d;
  }).enter().append('path').attr('d', d3.svg.arc().innerRadius(stack.datumInnerRadius).outerRadius(stack.datumOuterRadius).startAngle(stack.datumStartAngle).endAngle(stack.datumEndAngle));
  tile.attr('stroke-width', function(d) {
    return d.strokeWidth || conf.strokeWidth;
  });
  tile.attr('stroke', function(d) {
    return d.strokeColor || conf.strokeColor;
  });
  tile.attr('fill', function(d) {
    return d.color || conf.color;
  });
  return tile.attr('class', function(d) {
    var usePalette;
    usePalette = d.usePalette || conf.usePalette;
    if (usePalette) {
      return 'q' + stack.colorScale(d.value, conf.logScale) + '-' + conf.colorPaletteSize;
    }
  });
};

circosJS.Core.prototype.render = function(ids, removeTracks) {
  var name, renderAll, svg, track, trackStore, trackType, tracks, _ref, _results;
  if (typeof ids === 'undefined') {
    renderAll = true;
  }
  svg = d3.select(this.getContainer());
  if (renderAll || __indexOf.call(ids, 'layout') >= 0) {
    circosJS.renderLayout(d3, svg, this);
  }
  tracks = svg.append('g').classed('tracks', true).attr('transform', 'translate(' + parseInt(this.getWidth() / 2) + ',' + parseInt(this.getHeight() / 2) + ')');
  _ref = this.tracks;
  _results = [];
  for (trackType in _ref) {
    trackStore = _ref[trackType];
    _results.push((function() {
      var _results1;
      _results1 = [];
      for (name in trackStore) {
        track = trackStore[name];
        _results1.push(track.render(this, tracks, name));
      }
      return _results1;
    }).call(this));
  }
  return _results;
};

circosJS.Core.prototype._conf = {
  width: 700,
  height: 700,
  container: 'circos',
  defaultTrackWidth: 10
};

circosJS.Layout.prototype._defaultConf = {
  innerRadius: 250,
  outerRadius: 300,
  cornerRadius: 10,
  gap: 0.04,
  labels: {
    position: 'center',
    display: true,
    size: 14,
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
    labelSize: 10,
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
  innerRadius: 0,
  outerRadius: 0,
  min: 'smart',
  max: 'smart',
  colorPalette: 'YlGnBu',
  colorPaletteSize: 9,
  colorPaletteReverse: false,
  logScale: false
};

circosJS.Histogram.prototype._defaultConf = {
  innerRadius: 0,
  outerRadius: 0,
  min: 'smart',
  max: 'smart',
  direction: 'out',
  colorPaletteSize: 9,
  colorPalette: 'YlGnBu',
  usePalette: true,
  colorPaletteReverse: false,
  color: '#fd6a62',
  logScale: false
};

circosJS.Chord.prototype._defaultConf = {
  colorPaletteSize: 9,
  colorPalette: 'PuBuGn',
  usePalette: true,
  colorPaletteReverse: false,
  color: '#fd6a62',
  opacity: 0.7,
  min: 'smart',
  max: 'smart',
  logScale: false
};

circosJS.Scatter.prototype._defaultConf = {
  innerRadius: 0,
  outerRadius: 0,
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
  innerRadius: 0,
  outerRadius: 0,
  min: 'smart',
  max: 'smart',
  direction: 'out',
  logScale: false,
  color: '#fd6a62',
  fill: true,
  fill_color: '#d3d3d3',
  thickness: 2,
  max_gap: 10000000,
  interpolation: 'linear',
  axes: {
    minor: {
      spacing: 5,
      spacingType: 'pixel',
      color: '#d3d3d3',
      thickness: 2
    },
    major: {
      spacing: 5,
      color: '#000000',
      thickness: 2
    }
  }
};

circosJS.Stack.prototype._defaultConf = {
  innerRadius: 0,
  outerRadius: 0,
  colorPaletteSize: 9,
  colorPalette: 'PuBuGn',
  usePalette: true,
  colorPaletteReverse: false,
  color: '#fd6a62',
  min: 'smart',
  max: 'smart',
  direction: 'out',
  logScale: false,
  color: '#fd6a62',
  thickness: 10,
  radialMargin: 2,
  margin: 2,
  strokeWidth: 1,
  strokeColor: '#000000'
};

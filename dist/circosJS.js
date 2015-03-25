var circosJS,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

circosJS = function(conf) {
  var instance;
  instance = new circosJS.Core(conf);
  return instance;
};

circosJS.Core = function(conf) {
  this.tracks = {
    heatmaps: {},
    histograms: {},
    chords: {},
    scatters: {},
    lines: {},
    stacks: {}
  };
  this.conf = circosJS.mixConf(conf, this.defaultConf);
  return this;
};

circosJS.Core.prototype.removeTracks = function(trackIds) {
  var id, l, len, ref, store, svg, trackId, type;
  svg = d3.select(this.conf.container);
  ref = this.tracks;
  for (type in ref) {
    store = ref[type];
    if (typeof trackIds === 'object') {
      for (l = 0, len = trackIds.length; l < len; l++) {
        id = trackIds[l];
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
  var border, borders, currentBorder, l, layout, len, ref, store, track, trackId, trackType, width;
  width = this._conf.defaultTrackWidth;
  layout = {
    "in": this._layout._conf.innerRadius,
    out: this._layout._conf.outerRadius
  };
  borders = [];
  ref = this.tracks;
  for (trackType in ref) {
    store = ref[trackType];
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
  for (l = 0, len = borders.length; l < len; l++) {
    border = borders[l];
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

circosJS.checkParent = function(key, index, layoutSummary, header) {
  if (!(key in layoutSummary)) {
    circosJS.log(1, 'datum', 'unknown parent id', {
      line: index + 1,
      value: key,
      header: header,
      layoutSummary: layoutSummary
    });
    return false;
  }
  return true;
};

circosJS.checkNumber = function(keys, index) {
  var header, value;
  for (header in keys) {
    value = keys[header];
    if (isNaN(value)) {
      circosJS.log(1, 'datum', 'not a number', {
        line: index + 1,
        value: value,
        header: header
      });
      return false;
    }
  }
  return true;
};

circosJS.parseSpanValueData = function(data, layoutSummary) {
  var groups;
  data = data.filter(function(datum, index) {
    return circosJS.checkParent(datum[0], index, layoutSummary, 'parent');
  }).filter(function(datum, index) {
    return circosJS.checkNumber({
      start: datum[1],
      end: datum[2],
      value: datum[3]
    }, index);
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
  var groups;
  data = data.filter(function(datum, index) {
    return circosJS.checkParent(datum[0], index, layoutSummary, 'parent');
  }).filter(function(datum, index) {
    return circosJS.checkNumber({
      position: datum[1],
      value: datum[2]
    }, index);
  }).map(function(datum) {
    return {
      block_id: datum[0],
      position: Math.min(layoutSummary[datum[0]], parseFloat(datum[1]))
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
  data = data.filter(function(datum, index) {
    return circosJS.checkParent(datum[0], index, layoutSummary, 'source_id');
  }).filter(function(datum, index) {
    return circosJS.checkParent(datum[3], index, layoutSummary, 'target_id');
  }).filter(function(datum, index) {
    return circosJS.checkNumber({
      source_start: datum[1],
      source_end: datum[2],
      target_start: datum[4],
      target_end: datum[5],
      value: datum[6]
    }, index);
  }).map(function(datum) {
    return {
      source: {
        id: datum[0],
        start: Math.max(0, parseFloat(datum[1])),
        end: Math.min(layoutSummary[datum[0]], parseFloat(datum[2]))
      },
      target: {
        id: datum[3],
        start: Math.max(0, parseFloat(datum[4])),
        end: Math.min(layoutSummary[datum[0]], parseFloat(datum[5]))
      },
      value: parseFloat(datum[6])
    };
  });
  return {
    data: data,
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

circosJS.Layout = function(conf, data) {
  var block_nb, gap, k, offset, ref, ref1, ref2, size, v;
  if (data == null) {
    circosJS.log(2, 'no layout data', '');
  }
  this._conf = JSON.parse(JSON.stringify(this._defaultConf));
  this._data = data;
  this.blocks = {};
  this._size = 0;
  offset = 0;
  ref = this._data;
  for (k in ref) {
    v = ref[k];
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
  ref1 = this._conf;
  for (k in ref1) {
    v = ref1[k];
    this._conf[k] = conf[k] != null ? conf[k] : v;
  }
  gap = this._conf.gap;
  size = this._size;
  block_nb = this._data.length;
  ref2 = this._data;
  for (k in ref2) {
    v = ref2[k];
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
    var d, l, layoutSummary, len, ref3;
    layoutSummary = {};
    ref3 = this._data;
    for (l = 0, len = ref3.length; l < len; l++) {
      d = ref3[l];
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
  this.tracks.heatmaps[id] = track;
  return this;
};

circosJS.Core.prototype.histogram = function(id, conf, data, rules, backgrounds) {
  var track;
  track = new circosJS.Histogram();
  track.build(this, conf, data, rules, backgrounds);
  this.tracks.histograms[id] = track;
  return this;
};

circosJS.Core.prototype.chord = function(id, conf, data, rules, backgrounds) {
  var track;
  track = new circosJS.Chord();
  track.build(this, conf, data, rules, backgrounds);
  this.tracks.chords[id] = track;
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
  track = new circosJS.Stack();
  track.build(this, conf, data, rules, backgrounds);
  this.tracks.stacks[id] = track;
  return this;
};

circosJS.Chord = function() {
  circosJS.Track.call(this);
  this.parseData = circosJS.parseChordData;
  this.applyRules = function(rules, data) {
    var datum, l, len, results, rule;
    rules = rules || [];
    results = [];
    for (l = 0, len = data.length; l < len; l++) {
      datum = data[l];
      results.push((function() {
        var len1, m, results1;
        results1 = [];
        for (m = 0, len1 = rules.length; m < len1; m++) {
          rule = rules[m];
          if (rule.condition(datum)) {
            results1.push(datum[rule.parameter] = rule.value);
          } else {
            results1.push(void 0);
          }
        }
        return results1;
      })());
    }
    return results;
  };
  this.getSource = (function(_this) {
    return function(d, layout) {
      var block, endAngle, result, startAngle;
      d = d.source;
      block = layout.blocks[d.id];
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
    return function(d, layout) {
      var block, endAngle, result, startAngle;
      d = d.target;
      block = layout.blocks[d.id];
      startAngle = block.start + d.start / block.len * (block.end - block.start);
      endAngle = block.start + d.end / block.len * (block.end - block.start);
      return result = {
        radius: layout.getConf().innerRadius,
        startAngle: startAngle,
        endAngle: endAngle
      };
    };
  })(this);
  this.render = (function(_this) {
    return function(instance, parentElement, name) {
      var conf, link;
      conf = _this.conf;
      link = parentElement.append('g').attr('class', name + ' ' + conf.colorPalette).selectAll('.chord').data(_this.data).enter().append('path').attr('class', 'chord').attr('d', d3.svg.chord().source(function(d) {
        return this.getSource(d, layout);
      }).target(function(d) {
        return this.getTarget(d, layout);
      })).attr('opacity', function(d) {
        return d.opacity || conf.opacity;
      });
      if (conf.usePalette) {
        return link.attr('class', function(d) {
          return 'q' + this.ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize;
        });
      } else {
        return link.attr('fill', function(d) {
          return d.color || conf.color;
        });
      }
    };
  })(this);
  return this;
};

circosJS.Heatmap = function() {
  circosJS.Track.call(this);
  this.parseData = circosJS.parseSpanValueData;
  this.render = (function(_this) {
    return function(instance, parentElement, name) {
      var datumContainer;
      datumContainer = _this.renderDatumContainer(instance, parentElement, name, _this.conf, _this.data);
      return _this.renderDatum(datumContainer, _this.conf, instance._layout, _this);
    };
  })(this);
  this.renderDatumContainer = function(instance, parentElement, name, conf, data) {
    var track;
    track = parentElement.append('g').attr('class', name + ' ' + conf.colorPalette);
    return this.renderBlock(track, data, instance._layout);
  };
  this.renderDatum = function(parentElement, conf, layout, utils) {
    return parentElement.selectAll('tile').data(function(d) {
      return d.values;
    }).enter().append('path').attr('class', 'tile').attr('d', d3.svg.arc().innerRadius(conf.innerRadius).outerRadius(conf.outerRadius).startAngle(function(d, i) {
      return utils.theta(d.start, layout.blocks[d.block_id]);
    }).endAngle(function(d, i) {
      return utils.theta(d.end, layout.blocks[d.block_id]);
    })).attr('class', (function(_this) {
      return function(d) {
        return 'q' + utils.ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize;
      };
    })(this));
  };
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

circosJS.Stack = function() {
  circosJS.Track.call(this);
  this.parseData = circosJS.parseSpanValueData;
  this.render = circosJS.renderStack;
  this.build = function(instance, conf, data, rules, backgrounds) {
    this.loadData(data, instance);
    this.loadConf(conf);
    this.buildLayers(this.data, this.conf.margin);
    this.loadBackgrounds(backgrounds);
    return this.applyRules(rules, this.data);
  };
  this.buildLayers = function(data, margin) {
    var block, datum, idx, l, lastDatumInLayer, layer, layeredData, layers, len, len1, m, placed, ref, results;
    layeredData = [];
    results = [];
    for (idx in data) {
      block = data[idx];
      block.values = block.values.sort(function(a, b) {
        if (a.start < b.start) {
          return -1;
        }
        if (a.start === b.start && a.end > b.end) {
          return -1;
        }
        if (a.start === b.start && a.end === b.end) {
          return 0;
        }
        return 1;
      });
      layers = [];
      ref = block.values;
      for (l = 0, len = ref.length; l < len; l++) {
        datum = ref[l];
        placed = false;
        for (m = 0, len1 = layers.length; m < len1; m++) {
          layer = layers[m];
          lastDatumInLayer = layer.slice(0).pop();
          if (lastDatumInLayer.end + margin < datum.start) {
            layer.push(datum);
            placed = true;
            break;
          }
        }
        if (!placed) {
          layers.push([datum]);
        }
      }
      results.push(block.layers = layers);
    }
    return results;
  };
  this.applyRules = function(rules, data) {
    var datum, i, k, layer, results, rule, v;
    rules = rules || [];
    results = [];
    for (k in data) {
      v = data[k];
      results.push((function() {
        var ref, results1;
        ref = v.layers;
        results1 = [];
        for (i in ref) {
          layer = ref[i];
          results1.push((function() {
            var l, len, results2;
            results2 = [];
            for (l = 0, len = layer.length; l < len; l++) {
              datum = layer[l];
              results2.push((function() {
                var len1, m, results3;
                results3 = [];
                for (m = 0, len1 = rules.length; m < len1; m++) {
                  rule = rules[m];
                  if (rule.condition(v.parent, datum, i)) {
                    results3.push(datum[rule.parameter] = rule.value);
                  } else {
                    results3.push(void 0);
                  }
                }
                return results3;
              })());
            }
            return results2;
          })());
        }
        return results1;
      })());
    }
    return results;
  };
  this.datumRadialPosition = (function(_this) {
    return function(d, i, j) {
      var origin, radialEnd, radialStart;
      radialStart = (_this.conf.thickness + _this.conf.radialMargin) * j;
      radialEnd = radialStart + _this.conf.thickness;
      if (_this.conf.direction === 'out') {
        return [_this.conf.innerRadius + radialStart, Math.min(_this.conf.innerRadius + radialEnd, _this.conf.outerRadius)];
      }
      if (_this.conf.direction === 'in') {
        return [Math.max(_this.conf.outerRadius - radialEnd, _this.conf.innerRadius), _this.conf.outerRadius - radialStart];
      }
      if (_this.conf.direction === 'center') {
        origin = Math.floor((_this.conf.outerRadius + _this.conf.innerRadius) / 2);
        radialStart = (_this.conf.thickness + _this.conf.radialMargin) * Math.floor(j / 2);
        radialEnd = radialStart + _this.conf.thickness;
        if (j % 2 === 0) {
          return [origin + radialStart, origin + radialEnd];
        } else {
          return [origin - radialStart - _this.conf.radialMargin, origin - radialEnd - _this.conf.radialMargin];
        }
      }
    };
  })(this);
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
  return this;
};

circosJS.Track = function() {
  this.build = function(instance, conf, data, rules, backgrounds) {
    this.loadData(data, instance);
    this.loadConf(conf);
    this.loadBackgrounds(backgrounds);
    return this.applyRules(rules, this.data);
  };
  this.loadData = function(data, instance) {
    var d, l, layoutSummary, len, ref, result;
    layoutSummary = {};
    ref = instance._layout.getData();
    for (l = 0, len = ref.length; l < len; l++) {
      d = ref[l];
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
  this.applyRules = function(rules, data) {
    var datum, i, k, results, rule, v;
    rules = rules || [];
    results = [];
    for (k in data) {
      v = data[k];
      results.push((function() {
        var ref, results1;
        ref = v.values;
        results1 = [];
        for (i in ref) {
          datum = ref[i];
          results1.push((function() {
            var l, len, results2;
            results2 = [];
            for (l = 0, len = rules.length; l < len; l++) {
              rule = rules[l];
              if (rule.condition(v.key, datum, i)) {
                results2.push(datum[rule.parameter] = rule.value);
              } else {
                results2.push(void 0);
              }
            }
            return results2;
          })());
        }
        return results1;
      })());
    }
    return results;
  };
  this.computeMinMax = function() {
    this.conf.cmin = this.conf.min === 'smart' ? this.meta.min : this.conf.min;
    return this.conf.cmax = this.conf.max === 'smart' ? this.meta.max : this.conf.max;
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
  this.render = (function(_this) {
    return function(instance, parentElement, name) {
      var datumContainer;
      datumContainer = _this.renderDatumContainer(instance, parentElement, name, _this.conf);
      return _this.renderDatum(datumContainer, _this.conf, instance._layout, _this);
    };
  })(this);
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
  return this;
};

circosJS.renderHistogram = function(instance, parentElement, name) {
  var group, renderDatum, track;
  track = parentElement.append('g').attr('class', name + ' ' + this.conf.colorPalette);
  group = this.renderBlock(track, this.data, instance._layout);
  renderDatum = function(parentElement, conf, layout, ratio, theta) {
    var bin;
    bin = group.selectAll('.bin').data(function(d) {
      return d.values;
    }).enter().append('path').attr('class', 'bin').attr('d', d3.svg.arc().innerRadius(function(d) {
      var height;
      if (conf.direction === 'in') {
        height = ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale);
        return conf.outerRadius - height;
      } else {
        return conf.innerRadius;
      }
    }).outerRadius(function(d) {
      var height;
      if (conf.direction === 'out') {
        height = ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale);
        return conf.innerRadius + height;
      } else {
        return conf.outerRadius;
      }
    }).startAngle(function(d) {
      return theta(d.start, layout.blocks[d.block_id]);
    }).endAngle(function(d) {
      return theta(d.end, layout.blocks[d.block_id]);
    }));
    if (conf.usePalette) {
      return bin.attr('class', function(d) {
        return 'q' + ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize;
      });
    } else {
      return bin.attr('fill', d.color || conf.color);
    }
  };
  return renderDatum(group, this.conf, instance._layout, this.ratio, this.theta);
};

circosJS.renderLayout = function(d3, svg, instance) {
  var block, conf, entry, layout;
  conf = instance._layout.getConf();
  svg.select('.cs-layout').remove();
  layout = svg.attr('width', instance.conf.width).attr('height', instance.conf.height).append('g').attr('class', 'cs-layout').on('click', conf.clickCallback).attr('transform', 'translate(' + parseInt(instance.conf.width / 2) + ',' + parseInt(instance.conf.height / 2) + ')');
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
        var l, ref, ref1, ref2, results;
        results = [];
        for (x = l = ref = conf.innerRadius, ref1 = conf.outerRadius, ref2 = conf.axes.minor.spacing; ref2 > 0 ? l <= ref1 : l >= ref1; x = l += ref2) {
          results.push(x);
        }
        return results;
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
    return function(parentElement, conf, layout, x, y, theta) {
      var point;
      return point = parentElement.selectAll('.point').data(function(d) {
        return d.values;
      }).enter().append('path').attr('class', 'point').attr('d', d3.svg.symbol().type(conf.glyph.shape).size(conf.glyph.size)).attr('transform', function(d) {
        return 'translate(' + x(d, layout, conf) + ',' + y(d, layout, conf) + ') rotate(' + theta(d.position, layout.blocks[d.block_id]) * 360 / (2 * Math.PI) + ')';
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
  return renderDatum(group, this.conf, instance._layout, this.x, this.y, this.theta);
};

circosJS.renderStack = function(instance, parentElement, name) {
  var group, renderDatum, track;
  track = parentElement.append('g').attr('class', name);
  group = this.renderBlock(track, this.data, instance._layout);
  renderDatum = function(parentElement, conf, layout, ratio, datumInnerRadius, datumOuterRadius, theta) {
    var layer, tile;
    layer = parentElement.selectAll('.layer').data(function(d) {
      return d.layers;
    }).enter().append('g').attr('class', 'layer');
    tile = layer.selectAll('.tile').data(function(d, i) {
      return d;
    }).enter().append('path').attr('class', 'tile').attr('d', d3.svg.arc().innerRadius(datumInnerRadius).outerRadius(datumOuterRadius).startAngle(function(d) {
      return theta(d.start, layout.blocks[d.block_id]);
    }).endAngle(function(d) {
      return theta(d.end, layout.blocks[d.block_id]);
    }));
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
        return 'q' + ratio(d.value, conf.cmin, conf.cmax, conf.colorPaletteSize, conf.colorPaletteReverse, conf.logScale) + '-' + conf.colorPaletteSize;
      }
    });
  };
  return renderDatum(group, this.conf, instance._layout, this.ratio, this.datumInnerRadius, this.datumOuterRadius, this.theta);
};

circosJS.Core.prototype.render = function(ids, removeTracks) {
  var name, ref, renderAll, svg, track, trackStore, trackType, tracks;
  if (typeof ids === 'undefined') {
    renderAll = true;
  }
  svg = d3.select(this.conf.container);
  if (renderAll || indexOf.call(ids, 'layout') >= 0) {
    circosJS.renderLayout(d3, svg, this);
  }
  tracks = svg.append('g').attr('class', 'tracks').attr('transform', 'translate(' + parseInt(this.conf.width / 2) + ',' + parseInt(this.conf.height / 2) + ')');
  ref = this.tracks;
  for (trackType in ref) {
    trackStore = ref[trackType];
    for (name in trackStore) {
      track = trackStore[name];
      track.render(this, tracks, name);
    }
  }
};

circosJS.Core.prototype.defaultConf = {
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

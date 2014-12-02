var circosJS;

circosJS = function(conf) {
  var instance, _layout, _tracks;
  instance = {
    width: conf.width,
    height: conf.height,
    svg: d3.select(conf.container)
  };
  instance.svg.attr('width', instance.width).attr('height', instance.height);
  _layout = {
    conf: {
      innerRadius: 250,
      outerRadius: 300,
      gap: 0.04,
      gapUnit: 'rad',
      labelPosition: 'center',
      labelRadialOffset: 0
    },
    getGapInRad: function(gap, unit) {
      if (unit === 'rad') {
        return gap;
      } else {
        return 0;
      }
    },
    getDataStartAngle: function(d, i) {
      return d.start / _layout.dataTotalLength * 2 * Math.PI;
    },
    getDataEndAngle: function(d, i) {
      return (d.start + d.len) / _layout.dataTotalLength * 2 * Math.PI - _layout.getGapInRad(_layout.conf.gap, _layout.conf.gapUnit);
    },
    getStartAngle: function(blockId) {
      var d;
      return d = (function() {
        var _i, _len, _ref, _results;
        _ref = _layout.data;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          d = _ref[_i];
          if (d.id = blockId) {
            _results.push(d.start);
          }
        }
        return _results;
      })();
    }
  };
  _layout.init = function(data) {
    var k, offset, v;
    _layout._data = {};
    offset = 0;
    for (k in data) {
      v = data[k];
      _layout._data[v.id] = {
        label: v.label,
        len: v.len,
        color: v.color,
        start: offset
      };
      offset += v.len;
    }
    return data;
  };
  _layout.getBlock = function(blockId) {
    return _layout._data[blockId];
  };
  _layout.getAngle = function(blockId, unit) {
    var block;
    block = _layout.getBlock(blockId).start / _layout.dataTotalLength;
    if (unit === 'deg') {
      return block * 360;
    } else if (unit === 'rad') {
      return block * 2 * Math.PI;
    } else {
      return null;
    }
  };
  instance.layout = function(conf, data) {
    var datum, k, offset, v, _i, _len, _ref, _ref1;
    _layout.data = data;
    _ref = _layout.conf;
    for (k in _ref) {
      v = _ref[k];
      _layout.conf[k] = conf[k] ? conf[k] : v;
    }
    _layout.init(data);
    offset = 0;
    _ref1 = _layout.data;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      datum = _ref1[_i];
      datum.start = offset;
      offset += datum.len;
    }
    _layout.dataTotalLength = offset;
    instance.svg.append('g').classed('cs-layout', true).attr('transform', 'translate(' + parseInt(instance.width / 2) + ',' + parseInt(instance.height / 2) + ')').selectAll('path').data(_layout.data).enter().append('path').attr('d', d3.svg.arc().innerRadius(_layout.conf.innerRadius).outerRadius(_layout.conf.outerRadius).startAngle(_layout.getDataStartAngle).endAngle(_layout.getDataEndAngle)).attr('fill', function(d) {
      return d.color;
    }).attr('id', function(d) {
      return d.id;
    });
    return instance;
  };
  _tracks = [];
  instance.heatmap = function(trackName, conf, data) {
    var atoms, chrBundles, colorScale, heatmapMax, heatmapMin, k, kc, track, v, vc, _ref;
    heatmapMin = 99999999;
    heatmapMax = -99999999;
    for (k in data) {
      v = data[k];
      _ref = v.data;
      for (kc in _ref) {
        vc = _ref[kc];
        if (vc.value > heatmapMax) {
          heatmapMax = vc.value;
        }
        if (vc.value < heatmapMin) {
          heatmapMin = vc.value;
        }
      }
    }
    colorScale = function(value, range, scale) {
      if (value === heatmapMax) {
        return range - 1;
      } else if (scale === 'linear') {
        return Math.floor((value - heatmapMin) / (heatmapMax - heatmapMin) * range);
      }
    };
    track = instance.svg.append('g').classed(trackName, true).classed(conf.colorPalette, true).attr('transform', 'translate(' + parseInt(instance.width / 2) + ',' + parseInt(instance.height / 2) + ')');
    chrBundles = track.selectAll('g').data(data).enter().append('g').attr('class', function(d, i) {
      return trackName + '-' + d.parent;
    }, true).attr('transform', function(d) {
      return 'rotate(' + _layout.getAngle(d.parent, 'deg') + ')';
    });
    atoms = chrBundles.selectAll('path').data(function(d) {
      return d.data;
    }).enter().append('path').attr('d', d3.svg.arc().innerRadius(conf.innerRadius).outerRadius(conf.outerRadius).startAngle(function(d) {
      return d.start / _layout.dataTotalLength * 2 * Math.PI;
    }).endAngle(function(d) {
      return d.end / _layout.dataTotalLength * 2 * Math.PI;
    })).attr('class', function(d) {
      return 'q' + colorScale(d.value, 9, 'linear') + '-' + conf.colorRange;
    }, true);
    return instance;
  };
  return instance;
};

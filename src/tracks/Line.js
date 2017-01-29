import Track from './Track';
import {parsePositionValueData} from '../dataParser';
import assign from 'lodash/assign';
import {axes, radial, common, values} from '../configs';
import {curveLinear, radialLine, radialArea} from 'd3-shape';

const defaultConf = assign({
  direction: {
    value: 'out',
    iteratee: false,
  },
  color: {
    value: '#fd6a62',
    iteratee: true,
  },
  fill: {
    value: true,
    iteratee: false,
  },
  fill_color: {
    value: '#d3d3d3',
    iteratee: true,
  },
  thickness: {
    value: 2,
    iteratee: true,
  },
  max_gap: {
    value: 10000000,
    iteratee: true,
  },
  backgrounds: {
    value: [],
    iteratee: false,
  },
}, axes, radial, common, values);

export default class Line extends Track {
  constructor(instance, conf, data) {
    super(instance, conf, defaultConf, data, parsePositionValueData);
  }

  renderDatumContainer(instance, parentElement, name, data, conf) {
    const track = parentElement.append('g')
      .attr('class', name);
    return this.renderBlock(track, data, instance._layout, conf);
  }

  renderDatum(parentElement, conf, layout, utils) {
    const line = radialLine()
      .angle((d) => d.angle)
      .radius((d) => d.radius)
      .curve(curveLinear);

    const area = radialArea()
      .angle((d) => d.angle)
      .innerRadius((d) => d.innerRadius)
      .outerRadius((d) => d.outerRadius)
      .curve(curveLinear);

    const generator = conf.fill ? area : line;

    const buildRadius = (height) => {
      if (conf.fill) {
        return {
          innerRadius: conf.direction === 'out' ?
            conf.innerRadius : conf.outerRadius - height,
          outerRadius: conf.direction === 'out' ?
            conf.innerRadius + height : conf.outerRadius,
        };
      } else {
        return {
          radius: conf.direction === 'out' ?
            conf.innerRadius + height : conf.outerRadius - height,
        };
      }
    };

    return parentElement.append('path')
      .datum((d) => {
        return d.values.map((datum) => {
          const height = utils.ratio(
            datum.value,
            conf.cmin,
            conf.cmax,
            conf.outerRadius - conf.innerRadius,
            false,
            conf.logscale
          );
          return assign(datum, {
            angle: utils.theta(datum.position, layout.blocks[d.key]),
          }, buildRadius(height));
        });
      })
      .attr('class', 'line')
      .attr('d', generator)
      .attr('opacity', conf.opacity)
      .attr('stroke-width', conf.thickness)
      .attr('stroke', conf.color)
      .attr('fill', (d, i) =>
        conf.fill ? conf.fill_color(d, i) : 'none'
      );
  }
}

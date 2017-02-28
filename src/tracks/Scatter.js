import Track from './Track';
import {parsePositionValueData} from '../dataParser';
import assign from 'lodash/assign';
import {radial, axes, common, values} from '../configs';
import {
  symbol,
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolTriangle,
  symbolStar,
  symbolWye,
} from 'd3-shape';

const defaultConf = assign({
  direction: {
    value: 'out',
    iteratee: false,
  },
  glyph: {
    color: {
      value: '#fd6a62',
      iteratee: true,
    },
    fill: {
      value: true,
      iteratee: true,
    },
    size: {
      value: 15,
      iteratee: true,
    },
    shape: {
      value: 'circle',
      iteratee: true,
    },
    strokeColor: {
      value: '#d3d3d3',
      iteratee: true,
    },
    strokeWidth: {
      value: 2,
      iteratee: true,
    },
  },
  backgrounds: {
    value: [],
    iteratee: false,
  },
}, axes, radial, common, values);

const getSymbol = (key) => {
  switch (key) {
    case 'circle':
      return symbolCircle;
    case 'cross':
      return symbolCross;
    case 'diamond':
      return symbolDiamond;
    case 'square':
      return symbolSquare;
    case 'triangle':
      return symbolTriangle;
    case 'star':
      return symbolStar;
    case 'wye':
      return symbolWye;
    default:
      return symbolCross;
  }
};

export default class Scatter extends Track {
  constructor(instance, conf, data) {
    super(instance, conf, defaultConf, data, parsePositionValueData)
  }

  renderDatum(parentElement, conf, layout, utils) {
    const point = parentElement.selectAll('.point')
      .data((d) => {
        d.values.forEach((item, i) => {
          item.symbol = symbol()
            .type(getSymbol(conf.glyph.shape(item, i)))
            .size(conf.glyph.size(item, i));
        });
        return d.values;
      })
      .enter().append('path')
      .attr('class', 'point')
      .attr('opacity', conf.opacity)
      .attr('d', (d, i, j) => d.symbol(d, i, j))
      .attr('transform', (d) => {
        return `
          translate(
            ${utils.x(d, layout, conf)},
            ${utils.y(d, layout, conf)}
          ) rotate(
            ${utils.theta(
              d.position,
              layout.blocks[d.block_id]
            ) * 360 / (2 * Math.PI)}
          )`;
      })
      .attr('stroke', conf.glyph.strokeColor)
      .attr('stroke-width', conf.glyph.strokeWidth)
      .attr('fill', (d, i) => {
        const fill = conf.glyph.fill(d, i);
        const color = conf.glyph.color(d, i);
        return fill ? color : 'none';
      });
    return point;
  }
}

import Track from './Track'
import {parsePositionValueData} from '../dataParser'
import {symbol} from 'd3-shape'
import assign from 'lodash/assign'
import {radial, axes} from '../configs'
import {
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolTriangle,
  symbolStar,
  symbolWye,
} from 'd3-shape'

const defaultConf = assign({
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
    strokeWidth: 2,
  },
  backgrounds: [],
  zIndex: 1,
  opacity: 1,
  tooltipContent: null,
}, axes, radial)

const getSymbol = key => {
  switch (key) {
    case 'circle':
      return symbolCircle
    case 'cross':
      return symbolCross
    case 'diamond':
      return symbolDiamond
    case 'square':
      return symbolSquare
    case 'triangle':
      return symbolTriangle
    case 'star':
      return symbolStar
    case 'wye':
      return symbolWye
    default:
      return symbolCross
  }
}

export default class Scatter extends Track {
  constructor(instance, conf, data) {
    super(instance, conf, defaultConf, data, parsePositionValueData)
  }

  renderDatumContainer(instance, parentElement, name, data, conf) {
    const track = parentElement.append('g')
      .attr('class', name)
    return this.renderBlock(track, data, instance._layout, conf)
  }

  renderDatum(parentElement, conf, layout, utils) {
    const point = parentElement.selectAll('.point')
      .data(d => d.values)
      .enter().append('path')
      .attr('class', 'point')
      .attr('opacity', d => d.opacity || conf.opacity)
      .attr('d', symbol()
        .type(getSymbol(conf.glyph.shape))
        .size(conf.glyph.size)
      )
      .attr('transform', d => {
        return 'translate(' + utils.x(d, layout, conf) + ',' + utils.y(d, layout, conf) + ') rotate(' + utils.theta(d.position, layout.blocks[d.block_id])*360/(2*Math.PI) + ')'
      })
      .attr('stroke', d => d.glyph_strokeColor || conf.glyph.strokeColor)
      .attr('stroke-width', d => d.glyph_strokeWidth || conf.glyph.strokeWidth)
      .attr('fill', d => {
        const fill = d.glyph_fill || conf.glyph.fill
        const color = d.glyph_color || conf.glyph.color
        return fill ? color : 'none'
      })
    return point
  }
}

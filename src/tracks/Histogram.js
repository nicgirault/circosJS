import Track from './Track'
import {parseSpanValueData} from '../dataParser'
import {arc} from 'd3-shape'
import assign from 'lodash/assign'
import {axes, palette, radial} from '../configs'


const defaultConf = assign({
  min: 'smart',
  max: 'smart',
  direction: 'out',
  color: '#fd6a62',
  logScale: false,
  backgrounds: [],
  zIndex: 1,
  opacity: 1,
  tooltipContent: null,
}, axes, palette, radial)

export default class Histogram extends Track {
  constructor(instance, conf, data) {
    super(instance, conf, defaultConf, data, parseSpanValueData)
  }

  renderDatumContainer(instance, parentElement, name, data, conf) {
    const track = parentElement.append('g')
      .attr('class', this.conf.colorPalette)
    return this.renderBlock(track, data, instance._layout, conf)
  }

  renderDatum(parentElement, conf, layout, utils) {
    const bin = parentElement.selectAll('.bin')
      .data(d => d.values)
      .enter().append('path')
      .attr('class', 'bin')
      .attr('opacity', d => d.opacity || conf.opacity)
      .attr('d', arc()
        .innerRadius(d => {
          if (conf.direction == 'in') {
            const height = utils.ratio(
              d.value,
              conf.cmin,
              conf.cmax,
              conf.outerRadius - conf.innerRadius,
              false,
              conf.logscale
            )
            return conf.outerRadius - height
          }
          return conf.innerRadius
        })
        .outerRadius(d => {
          if (conf.direction == 'out') {
            const height = utils.ratio(
              d.value,
              conf.cmin,
              conf.cmax,
              conf.outerRadius - conf.innerRadius,
              false,
              conf.logscale
            )
            return conf.innerRadius + height
          }
          return conf.outerRadius
        })
        .startAngle(d => utils.theta (d.start, layout.blocks[d.block_id]))
        .endAngle(d => utils.theta(d.end, layout.blocks[d.block_id]))
      )
    if (conf.usePalette) {
      bin.attr('class', d => {
        return 'q' + utils.ratio(
          d.value,
          conf.cmin,
          conf.cmax,
          conf.colorPaletteSize,
          conf.colorPaletteReverse,
          conf.logScale
        ) + '-' + conf.colorPaletteSize
      })
    }
    else {
      bin.attr('fill', d.color || conf.color)
    }
    return bin
  }
}

import Track from './Track'
import {parseSpanStringData} from '../dataParser'
import assign from 'lodash/assign'
import {radial} from '../configs'
import {arc} from 'd3-shape'

const defaultConf = assign({
  defaultColor: '#fd6a62',
  opacity: 0.5,
  zIndex: 101,
  strokeColor: '#d3d3d3',
  strokeWidth: 0,
  tooltipContent: null,
}, radial)

export default class Highlight extends Track {
  constructor(instance, conf, data) {
    super(instance, conf, defaultConf, data, parseSpanStringData)
  }

  renderDatumContainer(instance, parentElement, name, data, conf) {
    return this.renderBlock(parentElement, data, instance._layout, conf)
  }

  renderDatum(parentElement, conf, layout, utils) {
    return parentElement.selectAll('tile')
      .data (d => d.values)
      .enter().append('path')
      .attr('class', 'tile')
      .attr('d', arc()
        .innerRadius(conf.innerRadius)
        .outerRadius(conf.outerRadius)
        .startAngle((d, i) => utils.theta(d.start, layout.blocks[d.block_id]))
        .endAngle((d, i) => utils.theta(d.end, layout.blocks[d.block_id]))
      )
      .attr('fill', d => d.value || conf.color)
      .attr('opacity', d => d.opacity || conf.opacity)
      .attr('stroke-width', d => d.strokeWidth || conf.strokeWidth)
      .attr('stroke', d => d.strokeColor || conf.strokeColor)
  }
}

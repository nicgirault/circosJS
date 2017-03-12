import Track from './Track'
import {parseSpanStringData} from '../data-parser'
import assign from 'lodash/assign'
import {radial, common} from '../configs'
import {arc} from 'd3-shape'

const defaultConf = assign({
  color: {
    value: '#fd6a62',
    iteratee: true
  },
  strokeColor: {
    value: '#d3d3d3',
    iteratee: true
  },
  strokeWidth: {
    value: 0,
    iteratee: true
  }
}, radial, common)

export default class Highlight extends Track {
  constructor (instance, conf, data) {
    super(instance, conf, defaultConf, data, parseSpanStringData)
  }

  renderDatum (parentElement, conf, layout) {
    return parentElement.selectAll('tile')
      .data((d) => d.values)
      .enter().append('path')
      .attr('class', 'tile')
      .attr('d', arc()
        .innerRadius(conf.innerRadius)
        .outerRadius(conf.outerRadius)
        .startAngle((d, i) => this.theta(d.start, layout.blocks[d.block_id]))
        .endAngle((d, i) => this.theta(d.end, layout.blocks[d.block_id]))
      )
      .attr('fill', conf.colorValue)
      .attr('opacity', conf.opacity)
      .attr('stroke-width', conf.strokeWidth)
      .attr('stroke', conf.strokeColor)
  }
}

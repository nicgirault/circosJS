import Track from './Track'
import {parsePositionTextData} from '../data-parser'
import forEach from 'lodash/forEach'
import assign from 'lodash/assign'
import {common, radial} from '../configs'

const defaultConf = assign({
  style: {
    value: {},
    iteratee: true
  },
  color: {
    value: 'black',
    iteratee: true
  },
  backgrounds: {
    value: [],
    iteratee: false
  }
}, common, radial)

export default class Text extends Track {
  constructor (instance, conf, data) {
    super(instance, conf, defaultConf, data, parsePositionTextData)
  }

  renderDatum (parentElement, conf, layout) {
    const text = parentElement.selectAll('g')
      .data((d) => d.values.map((item) => {
        item._angle = this.theta(
          item.position,
          layout.blocks[item.block_id]
        ) * 360 / (2 * Math.PI) - 90
        item._anchor = item._angle > 90 ? 'end' : 'start'
        item._rotate = item._angle > 90 ? 180 : 0
        return item
      }))
      .enter().append('g')
      .append('text')
      .text((d) => d.value)
      .attr('transform', (d) => {
        return `
          rotate(${d._angle})
          translate(${conf.innerRadius}, 0)
          rotate(${d._rotate})
        `
      })
      .attr('text-anchor', (d) => d._anchor)
    forEach(conf.style, (value, key) => {
      text.style(key, value)
    })
    return text
  }
}

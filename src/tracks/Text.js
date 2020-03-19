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

  angle (position, block) {
    return 0.5 * (block.end + block.start)
  }

  renderDatum (parentElement, conf, layout) {
    const text = parentElement.selectAll('g')
      .data((d) => d.values.map((item) => {
        item._angleOffset = this.theta(
          item.position,
          layout.blocks[item.block_id]
        ) * 360 / (2 * Math.PI) - 90
        item._angle = this.angle(
          item.position,
          layout.blocks[item.block_id])* 360 / (2 * Math.PI) - 90
        item._anchor = item._angle > 90 ? 'end' : 'start'
        console.log('position', item.position);
        console.log('layout', layout.blocks[item.block_id]);
        console.log('angle', item._angle);
        item._rotate = item._angle > 90 ? 180 : 0
        return item
      }))
      .enter().append('g')
      .append('text')
      .text((d) => d.value)
      .attr('transform', (d) => {
            /*
             The first rotation is almost exactly -90. This is because the layouts are rotated -90 as well (in layout/render.js) and we need to match up.
             Then we push out away from the center
             Then flip the label if needed.
             Note that without any of this the labels are still arranged radially.
           */
        return `
          rotate(${d._angleOffset})
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

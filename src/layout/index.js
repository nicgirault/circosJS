import cloneDeep from 'lodash/cloneDeep'
import defaultsDeep from 'lodash/defaultsDeep'
import reduce from 'lodash/reduce'
import forEach from 'lodash/forEach'
import defaultConf from './conf'

const logger = console

export default class Layout {
  constructor (conf, data) {
    if (!data) {
      logger.log(2, 'no layout data', '')
    }

    this.conf = defaultsDeep(conf, cloneDeep(defaultConf))
    this.data = data
    const agg = reduce(data, (aggregator, block) => {
      block.offset = aggregator.offset
      aggregator.blocks[block.id] = {
        label: block.label,
        len: block.len,
        color: block.color,
        offset: aggregator.offset
      }
      aggregator.offset += block.len
      return aggregator
    }, {blocks: {}, offset: 0})
    this.blocks = agg.blocks
    this.size = agg.offset

    // thanks to sum of blocks' length, compute start and end angles in radian
    forEach(this.data, (block, index) => {
      this.blocks[block.id].start =
        block.offset / this.size *
        (2 * Math.PI - this.data.length * this.conf.gap) +
        index * this.conf.gap

      this.blocks[block.id].end =
        (block.offset + block.len) / this.size *
        (2 * Math.PI - this.data.length * this.conf.gap) +
        index * this.conf.gap

      block.start =
        block.offset / this.size *
        (2 * Math.PI - this.data.length * this.conf.gap) +
        index * this.conf.gap

      block.end =
        (block.offset + block.len) / this.size *
        (2 * Math.PI - this.data.length * this.conf.gap) +
        index * this.conf.gap
    })
  }

  getAngle (blockId, unit) {
    const position = this.blocks[blockId].start / this.size
    if (unit === 'deg') { return angle * 360 }

    if (unit === 'rad') { return position * 2 * Math.PI }

    return null
  }

  summary () {
    return reduce(this.data, (summary, block) => {
      summary[block.id] = block.len
      return summary
    }, {})
  }
}

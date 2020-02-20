import Track from './Track'
import {parseSpanValueData} from '../data-parser'
import {arc} from 'd3-shape'
import assign from 'lodash/assign'
import forEach from 'lodash/forEach'
import {axes, radial, values, common} from '../configs'

const defaultConf = assign({
  color: {
    value: '#fd6a62',
    iteratee: true
  },
  direction: {
    value: 'out',
    iteratee: false
  },
  thickness: {
    value: 10,
    iteratee: false
  },
  radialMargin: {
    value: 2,
    iteratee: false
  },
  margin: {
    value: 2,
    iteratee: false
  },
  strokeWidth: {
    value: 1,
    iteratee: true
  },
  strokeColor: {
    value: '#000000',
    iteratee: true
  },
  backgrounds: {
    value: [],
    iteratee: false
  }
}, axes, radial, values, common)

export default class Stack extends Track {
  constructor (instance, conf, data) {
    super(instance, conf, defaultConf, data, parseSpanValueData)
    this.buildLayers(this.data, this.conf.margin)
  }

  buildLayers (data, margin) {
    forEach(data, (block, idx) => {
      block.values = block.values.sort((a, b) => {
        if (a.start < b.start) {
          return -1
        }
        if (a.start == b.start && a.end > b.end) {
          return -1
        }
        if (a.start == b.start && a.end == b.end) {
          return 0
        }
        return 1
      })
      let layers = []
      forEach(block.values, (datum) => {
        let placed = false
        forEach(layers, (layer, i) => {
          // try to place datum
          const lastDatumInLayer = layer.slice(0).pop()
          if (lastDatumInLayer.end + margin < datum.start) {
            layer.push(datum)
            datum.layer = i
            placed = true
            return false
          }
        })
        if (!placed) {
          datum.layer = layers.length
          layers.push([datum])
        }
      })
    })
  }

  datumRadialPosition (d) {
    const radialStart = (this.conf.thickness + this.conf.radialMargin) *
      d.layer
    const radialEnd = radialStart + this.conf.thickness
    if (this.conf.direction === 'out') {
      return [
        Math.min(this.conf.innerRadius + radialStart, this.conf.outerRadius),
        Math.min(this.conf.innerRadius + radialEnd, this.conf.outerRadius)
      ]
    }

    if (this.conf.direction === 'in') {
      return [
        Math.max(this.conf.outerRadius - radialEnd, this.conf.innerRadius),
        this.conf.outerRadius - radialStart
      ]
    }

    if (this.conf.direction === 'center') {
      const origin = Math.floor(
        (this.conf.outerRadius + this.conf.innerRadius) / 2
      )
      const radialStart = (this.conf.thickness + this.conf.radialMargin) *
        Math.floor(d.layer / 2)
      const radialEnd = radialStart + this.conf.thickness

      if (d.layer % 2 === 0) {
        return [
          origin + radialStart,
          origin + radialEnd
        ]
      } else {
        return [
          origin - radialStart - this.conf.radialMargin,
          origin - radialEnd - this.conf.radialMargin
        ]
      }
    }
  }

  renderDatum (parentElement, conf, layout) {
    const that = this

    return parentElement.selectAll('.tile')
      .data((d) => {
        return d.values.map((datum) => {
          const radius = that.datumRadialPosition(datum)
          return assign(datum, {
            innerRadius: radius[0],
            outerRadius: radius[1],
            startAngle: this.theta(datum.start, layout.blocks[datum.block_id]),
            endAngle: this.theta(datum.end, layout.blocks[datum.block_id])
          })
        })
      })
      .enter().append('path')
      .attr('class', 'tile')
      .attr('d', arc())
      .attr('opacity', conf.opacity)
      .attr('stroke-width', conf.strokeWidth)
      .attr('stroke', conf.strokeColor)
      .attr('fill', conf.colorValue)
  }
}

import Track from './Track'
import {parsePositionValueData} from '../data-parser'
import assign from 'lodash/assign'
import reduce from 'lodash/reduce'
import sortBy from 'lodash/sortBy'
import {axes, radial, common, values} from '../configs'
import {curveLinear, radialLine, radialArea} from 'd3-shape'

const defaultConf = assign({
  direction: {
    value: 'out',
    iteratee: false
  },
  color: {
    value: '#fd6a62',
    iteratee: true
  },
  fill: {
    value: false,
    iteratee: false
  },
  fillColor: {
    value: '#d3d3d3',
    iteratee: true
  },
  thickness: {
    value: 1,
    iteratee: true
  },
  maxGap: {
    value: null,
    iteratee: false
  },
  backgrounds: {
    value: [],
    iteratee: false
  }
}, axes, radial, common, values)

const splitByGap = (points, maxGap) => {
  return reduce(sortBy(points, 'position'), (aggregator, datum) => {
    if (aggregator.position === null) { return {position: datum.position, groups: [[datum]]} }
    if (datum.position > aggregator.position + maxGap) {
      aggregator.groups.push([datum])
    } else {
      aggregator.groups[aggregator.groups.length - 1].push(datum)
    }
    aggregator.position = datum.position
    return aggregator
  }, {position: null, groups: []}).groups
}

export default class Line extends Track {
  constructor (instance, conf, data) {
    super(instance, conf, defaultConf, data, parsePositionValueData)
  }

  renderDatum (parentElement, conf, layout) {
    const line = radialLine()
      .angle((d) => d.angle)
      .radius((d) => d.radius)
      .curve(curveLinear)

    const area = radialArea()
      .angle((d) => d.angle)
      .innerRadius((d) => d.innerRadius)
      .outerRadius((d) => d.outerRadius)
      .curve(curveLinear)

    const generator = conf.fill ? area : line

    const buildRadius = (height) => {
      if (conf.fill) {
        return {
          innerRadius: conf.direction === 'out'
            ? conf.innerRadius : conf.outerRadius - height,
          outerRadius: conf.direction === 'out'
            ? conf.innerRadius + height : conf.outerRadius
        }
      } else {
        return {
          radius: conf.direction === 'out'
            ? conf.innerRadius + height : conf.outerRadius - height
        }
      }
    }

    const selection = parentElement
      .selectAll('.line')
        .data((d) => conf.maxGap ? splitByGap(d.values, conf.maxGap) : [d.values])
      .enter()
      .append('g')
        .attr('class', 'line')
      .append('path')
        .datum((d) => {
          return d.map((datum) => {
            const height = this.scale(datum.value)
            return assign(datum, {
              angle: this.theta(datum.position, layout.blocks[datum.block_id])
            }, buildRadius(height))
          })
        })
        .attr('d', generator)
        .attr('opacity', conf.opacity)
        .attr('stroke-width', conf.thickness)
        .attr('stroke', conf.colorValue)
        .attr('fill', 'none')

    if (conf.fill) { selection.attr('fill', conf.fillColor) }

    return selection
  }
}

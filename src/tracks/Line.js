import Track from './Track'
import {parsePositionValueData} from '../dataParser'
import assign from 'lodash/assign'
import {axes, radial} from '../configs'
import {curveLinear, radialLine, radialArea} from 'd3-shape'

const defaultConf = assign({
  min: 'smart',
  max: 'smart',
  direction: 'out',
  logScale: false,
  color: '#fd6a62',
  fill: true,
  fill_color: '#d3d3d3',
  thickness: 2,
  max_gap: 10000000,
  interpolation: 'linear',
  backgrounds: [],
  zIndex: 1,
  opacity: 1,
  tooltipContent: null,
}, axes, radial)

export default class Line extends Track {
  constructor(instance, conf, data) {
    super(instance, conf, defaultConf, data, parsePositionValueData)
  }

  renderDatumContainer(instance, parentElement, name, data, conf) {
    const track = parentElement.append('g')
      .attr('class', name)
    return this.renderBlock(track, data, instance._layout, conf)
  }

  renderDatum(parentElement, conf, layout, utils) {
    const line = radialLine()
      .angle(d => d.angle)
      .radius(d => d.radius)
      .curve(curveLinear)

    const area = radialArea()
      .angle(d => d.angle)
      .innerRadius(d => d.innerRadius)
      .outerRadius(d => d.outerRadius)
      .curve(curveLinear)

    const generator = conf.fill ? area : line

    const buildRadius = (height) => {
      if (conf.fill) {
        return {
          innerRadius: conf.direction === 'out' ? conf.innerRadius : conf.outerRadius - height,
          outerRadius: conf.direction === 'out' ? conf.innerRadius + height : conf.outerRadius,
        }
      }
      else {
        return {
          radius: conf.direction === 'out' ? conf.innerRadius + height : conf.outerRadius - height,
        }
      }
    }

    return parentElement.append('path')
      .datum(d => {
        return d.values.map(datum => {
          const height = utils.ratio(
            datum.value,
            conf.cmin,
            conf.cmax,
            conf.outerRadius - conf.innerRadius,
            false,
            conf.logscale
          )
          return assign({
            angle: utils.theta(datum.position, layout.blocks[d.key]),
          }, buildRadius(height))
        })
      })
      .attr('class', 'line')
      .attr('d', generator)
      .attr('opacity', d => conf.opacity)
      .attr('stroke-width', d => conf.thickness)
      .attr('stroke', d => conf.color)
      .attr('fill', d => {
        const fill = conf.fill
        const color = conf.fill_color
        return fill ? color : 'none'
      })
  }
}

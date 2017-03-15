import {registerTooltip} from '../behaviors/tooltip'
import {dispatch} from 'd3-dispatch'
import {arc} from 'd3-shape'
import {select} from 'd3-selection'
import {getConf} from '../config-utils'
import {buildScale} from '../utils'
import {buildColorValue} from '../colors'
import {renderAxes} from '../axes'

/**
 * Abstract class used by all tracks
**/
export default class Track {
  constructor (instance, conf, defaultConf, data, dataParser) {
    this.dispatch = dispatch('mouseover', 'mouseout')
    this.parseData = dataParser
    this.loadData(data, instance)
    this.conf = getConf(conf, defaultConf, this.meta, instance)
    this.conf.colorValue = buildColorValue(
      this.conf.color,
      this.conf.cmin,
      this.conf.cmax,
      this.conf.logScale,
      this.conf.logScaleBase
    )
    this.scale = buildScale(
      this.conf.cmin,
      this.conf.cmax,
      this.conf.outerRadius - this.conf.innerRadius,
      this.conf.logScale,
      this.conf.logScaleBase
    )
  }

  loadData (data, instance) {
    const result = this.parseData(data, instance._layout.summary())
    this.data = result.data
    this.meta = result.meta
  }

  render (instance, parentElement, name) {
    parentElement.select('.' + name).remove()
    const track = parentElement.append('g')
      .attr('class', name)
      .attr('z-index', this.conf.zIndex)
    const datumContainer = this.renderBlock(track, this.data, instance._layout, this.conf)
    if (this.conf.axes && this.conf.axes.length > 0) {
      renderAxes(datumContainer, this.conf, instance, this.scale)
    }
    const selection = this.renderDatum(datumContainer, this.conf, instance._layout)
    if (this.conf.tooltipContent) {
      registerTooltip(this, instance, selection, this.conf)
    }
    selection.on('mouseover', (d, i) => {
      this.dispatch.call('mouseover', this, d)
      if (this.conf.tooltipContent) {
        instance.clipboard.attr('value', this.conf.tooltipContent(d))
      }
    })
    selection.on('mouseout', (d, i) => {
      this.dispatch.call('mouseout', this, d)
    })

    return this
  }

  renderBlock (parentElement, data, layout, conf) {
    const block = parentElement.selectAll('.block')
      .data(data)
      .enter().append('g')
      .attr('class', 'block')
      .attr(
        'transform',
        (d) => `rotate(${layout.blocks[d.key].start * 360 / (2 * Math.PI)})`
      )

    if (conf.backgrounds) {
      block.selectAll('.background')
        .data((d) => {
          return conf.backgrounds.map((background) => {
            return {
              start: background.start || conf.cmin,
              end: background.end || conf.cmax,
              angle: layout.blocks[d.key].end - layout.blocks[d.key].start,
              color: background.color,
              opacity: background.opacity
            }
          })
        })
        .enter().append('path')
        .attr('class', 'background')
        .attr('fill', (background) => background.color)
        .attr('opacity', (background) => background.opacity || 1)
        .attr('d', arc()
          .innerRadius((background) => {
            return conf.direction === 'in'
              ? conf.outerRadius - this.scale(background.start)
              : conf.innerRadius + this.scale(background.start)
          })
          .outerRadius((background) => {
            return conf.direction === 'in'
              ? conf.outerRadius - this.scale(background.end)
              : conf.innerRadius + this.scale(background.end)
          })
          .startAngle(0)
          .endAngle((d) => d.angle)
        )
    }

    return block
  }

  theta (position, block) {
    return position / block.len * (block.end - block.start)
  }

  x (d, layout, conf) {
    const height = this.scale(d.value)
    const r = conf.direction === 'in'
      ? conf.outerRadius - height : conf.innerRadius + height

    const angle = this.theta(d.position, layout.blocks[d.block_id]) - Math.PI / 2
    return r * Math.cos(angle)
  }

  y (d, layout, conf) {
    const height = this.scale(d.value)
    const r = conf.direction === 'in'
      ? conf.outerRadius - height : conf.innerRadius + height

    const angle = this.theta(d.position, layout.blocks[d.block_id]) - Math.PI / 2
    return r * Math.sin(angle)
  }
}

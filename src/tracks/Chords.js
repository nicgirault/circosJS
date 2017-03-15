import Track from './Track'
import {parseChordData} from '../data-parser'
import {registerTooltip} from '../behaviors/tooltip'
import {ribbon} from 'd3-chord'
import assign from 'lodash/assign'
import {common, values} from '../configs'

const defaultConf = assign({
  color: {
    value: '#fd6a62',
    iteratee: true
  }
}, common, values)

export default class Chords extends Track {
  constructor (instance, conf, data) {
    super(instance, conf, defaultConf, data, parseChordData)
  }

  getCoordinates (d, layout) {
    const block = layout.blocks[d.id]
    const startAngle = block.start + d.start /
      block.len * (block.end - block.start)
    const endAngle = block.start + d.end /
      block.len * (block.end - block.start)

    return {
      radius: layout.conf.innerRadius,
      startAngle: startAngle,
      endAngle: endAngle
    }
  }

  renderChords (parentElement, name, conf, data, instance, getCoordinates) {
    const track = parentElement.append('g')

    const link = track
      .selectAll('.chord')
      .data(data)
      .enter().append('path')
      .attr('class', 'chord')
      .attr('d', ribbon()
        .source((d) => getCoordinates(d.source, instance._layout))
        .target((d) => getCoordinates(d.target, instance._layout))
      )
      .attr('opacity', conf.opacity)
      .on('mouseover', (d) => {
        this.dispatch.call('mouseover', this, d)
        instance.clipboard.attr('value', conf.tooltipContent(d))
      })
      .on('mouseout', (d) =>
        this.dispatch.call('mouseout', this, d)
      )

    link.attr('fill', conf.colorValue)

    return link
  }

  render (instance, parentElement, name) {
    parentElement.select('.' + name).remove()

    const track = parentElement.append('g')
      .attr('class', name)
      .attr('z-index', this.conf.zIndex)

    const selection = this.renderChords(
      track,
      name,
      this.conf,
      this.data,
      instance,
      this.getCoordinates
    )
    if (this.conf.tooltipContent) {
      registerTooltip(this, instance, selection, this.conf)
    }
    return this
  }
}

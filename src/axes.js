import range from 'lodash/range'
import reduce from 'lodash/reduce'
import {arc} from 'd3-shape'
import logger from './logger'

const _buildAxisDta = (value, axesGroup, conf) => {
  return {
    value: value,
    thickness: axesGroup.thickness || 1,
    color: axesGroup.color || '#d3d3d3',
    opacity: axesGroup.opacity || conf.opacity
  }
}

const _buildAxesData = (conf) => {
  return reduce(conf.axes, (aggregator, axesGroup) => {
    if (!axesGroup.position && !axesGroup.spacing) {
      logger.warn('Skipping axe group with no position and spacing defined')
      return aggregator
    }
    if (axesGroup.position) {
      aggregator.push(_buildAxisDta(axesGroup.position, axesGroup, conf))
    }
    if (axesGroup.spacing) {
      const builtAxes = range(
        axesGroup.start || conf.cmin,
        axesGroup.end || conf.cmax,
        axesGroup.spacing
      )
        .map((value) => {
          return _buildAxisDta(value, axesGroup, conf)
        })
      return aggregator.concat(builtAxes)
    }
    return aggregator
  }, [])
}
exports._buildAxesData = _buildAxesData

export const renderAxes = (parentElement, conf, instance, scale) => {
  const axes = _buildAxesData(conf)

  const axis = arc()
    .innerRadius((d) => {
      return conf.direction === 'in'
        ? conf.outerRadius - scale(d.value)
        : conf.innerRadius + scale(d.value)
    })
    .outerRadius((d) => {
      return conf.direction === 'in'
        ? conf.outerRadius - scale(d.value)
        : conf.innerRadius + scale(d.value)
    })
    .startAngle(0)
    .endAngle((d) => d.length)

  const selection = parentElement
    .selectAll('.axis')
      .data((blockData) => {
        const block = instance._layout.blocks[blockData.key]
        return axes.map((d) => {
          return {
            value: d.value,
            thickness: d.thickness,
            color: d.color,
            opacity: d.opacity,
            block_id: blockData.key,
            length: block.end - block.start
          }
        })
      })
    .enter()
    .append('path')
      .attr('opacity', (d) => d.opacity)
      .attr('class', 'axis')
      .attr('d', axis)
      .attr('stroke-width', (d) => d.thickness)
      .attr('stroke', (d) => d.color)

  if (conf.showAxesTooltip) {
    selection.on('mouseover', (d, i) => {
      instance.tip
        .html(d.value)
        .transition()
        .style('opacity', 0.9)
        .style('left', (event.pageX) + 'px')
        .style('top', (event.pageY - 28) + 'px')
    })
    selection.on('mouseout', (d, i) => {
      instance.tip
        .transition()
        .duration(500)
        .style('opacity', 0)
    })
  }

  return selection
}

import range from 'lodash/range'
import reduce from 'lodash/reduce'
import {arc} from 'd3-shape'

const buildAxesData = (conf) => {
  return reduce(conf.axes, (aggregator, axesGroup) => {
    if (axesGroup.position) {
      aggregator.push({
        value: axesGroup.position,
        thickness: axesGroup.thickness || 1,
        color: axesGroup.color || '#d3d3d3',
        opacity: axesGroup.opacity || conf.opacity
      })
    }
    if (axesGroup.spacing) {
      const builtAxes = range(
        axesGroup.start || conf.cmin,
        axesGroup.end || conf.cmax,
        axesGroup.spacing
      )
        .map((value) => {
          return {
            value: value,
            thickness: axesGroup.thickness || 1,
            color: axesGroup.color || '#d3d3d3',
            opacity: axesGroup.opacity || conf.opacity
          }
        })
      return aggregator.concat(builtAxes)
    }
    return aggregator
  }, [])
}

export const renderAxes = (parentElement, conf, layout, scale) => {
  const axes = buildAxesData(conf)

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

  return parentElement
    .selectAll('.axis')
      .data((blockData) => {
        const block = layout.blocks[blockData.key]
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
}

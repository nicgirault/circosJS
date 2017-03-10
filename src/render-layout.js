import {arc} from 'd3-shape'
import {range} from 'd3-array'

function renderLayoutLabels (conf, block) {
  const radius = conf.innerRadius + conf.labels.radialOffset

  const labelArc = arc()
    .innerRadius(radius)
    .outerRadius(radius)
    .startAngle((d, i) => d.start)
    .endAngle((d, i) => d.end)

  block.append('path')
    .attr('fill', 'none')
    .attr('stroke', 'none')
    .attr('d', labelArc)
    .attr('id', d => 'arc-label' + d.id)

  const label = block.append('text')
    .style('font-size', '' + conf.labels.size + 'px')
    .attr('text-anchor', 'middle')

  // http://stackoverflow.com/questions/20447106/how-to-center-horizontal-and-vertical-text-along-an-textpath-inside-an-arc-usi
  label.append('textPath')
    .attr('startOffset', '25%')
    .attr('xlink:href', (d) => '#arc-label' + d.id)
    .style('fill', conf.labels.color)
    .text((d) => d.label)
}

function renderLayoutTicks (conf, layout, instance) {
  // Returns an array of tick angles and labels, given a block.
  function blockTicks (d) {
    const k = (d.end - d.start) / d.len
    return range(0, d.len, conf.ticks.spacing).map((v, i) => {
      return {
        angle: v * k + d.start,
        label: displayLabel(v, i)
      }
    })
  }

  function displayLabel (v, i) {
    if (conf.ticks.labels === false) {
      return null
    } else if (conf.ticks.labelDisplay0 === false && i === 0) {
      return null
    } else if (i % conf.ticks.labelSpacing) {
      return null
    } else {
      return v / conf.ticks.labelDenominator + conf.ticks.labelSuffix
    }
  }

  const ticks = layout.append('g').selectAll('g')
    .data(instance._layout.data)
    .enter().append('g').selectAll('g')
    .data(blockTicks)
    .enter().append('g')
    .attr(
      'transform',
      (d) => 'rotate(' + (d.angle * 180 / Math.PI - 90) + ')' + 'translate(' + conf.outerRadius + ',0)'
    )

  ticks.append('line')
    .attr('x1', 0)
    .attr('y1', 1)
    .attr('x2', (d, i) => {
      if (i % conf.ticks.majorSpacing) {
        return conf.ticks.size.minor
      } else {
        return conf.ticks.size.major
      }
    })
    .attr('y2', 1)
    .style('stroke', conf.ticks.color)

  ticks.append('text')
    .attr('x', 8)
    .attr('dy', '.35em')
    .attr(
      'transform',
      (d) => d.angle > Math.PI ? 'rotate(180)translate(-16)' : null
    )
    .style('text-anchor', (d) => d.angle > Math.PI ? 'end' : null)
    .style('font-size', '' + conf.ticks.labelSize + 'px')
    .style('fill', conf.ticks.labelColor)
    .text((d) => d.label)
}

export default function renderLayout (parentElement, instance) {
  const conf = instance._layout.conf
  parentElement.select('.cs-layout').remove()

  const layout = parentElement
    .append('g')
    .attr('class', 'cs-layout')
    .attr('z-index', conf.zIndex)
    .on('click', conf.onClick)

  const block = layout
    .selectAll('g')
    .data(instance._layout.data)
    .enter()
    .append('g')
    .attr('class', (d) => d.id)
    .attr('opacity', conf.opacity)

  const entry = arc()
    .innerRadius(conf.innerRadius)
    .outerRadius(conf.outerRadius)
    .cornerRadius(conf.cornerRadius)
    .startAngle((d) => d.start)
    .endAngle((d) => d.end)

  block.append('path')
    .attr('d', entry)
    .attr('fill', (d) => d.color)
    .attr('id', (d) => d.id)

  if (conf.labels.display) {
    renderLayoutLabels(conf, block)
  }

  if (conf.ticks.display) {
    renderLayoutTicks(conf, layout, instance)
  }
}

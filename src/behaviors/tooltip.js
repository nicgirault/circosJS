import {select, event} from 'd3-selection'
import 'd3-transition'

import './tooltip.css'

export function registerTooltip (track, instance, element, trackParams) {
  track.dispatch.on('mouseover', (d) => {
    instance.tip
      .html(trackParams.tooltipContent(d))
      .transition()
      .style('opacity', 0.9)
      .style('left', (event.pageX) + 'px')
      .style('top', (event.pageY - 28) + 'px')
  })

  track.dispatch.on('mouseout', (d) => {
    instance.tip
      .transition()
      .duration(500)
      .style('opacity', 0)
  })
}

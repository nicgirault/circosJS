import clipboard from 'clipboard-js'
import {select} from 'd3-selection'

export const initClipboard = (container) => {
  const input = select(container)
    .append('input')
      .attr('class', 'circos-clipboard')
      .attr('type', 'hidden')

  select('body').on('keydown', () => {
    if (event.ctrlKey && event.code === 'KeyC') {
      clipboard.copy(input.attr('value'))
    }
  })
  return input
}

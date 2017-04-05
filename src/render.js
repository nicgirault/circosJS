import forEach from 'lodash/forEach'
import sortBy from 'lodash/sortBy'
import renderLayout from './layout/render'

export default function render (ids = [], removeTracks, circos) {
  const renderAll = ids.length === 0

  const svg = circos.svg
    .attr('width', circos.conf.width)
    .attr('height', circos.conf.height)

  if (removeTracks) {
    forEach(circos.tracks, (track, trackId) => {
      svg.select('.' + trackId).remove()
    })
  }

  let translated = svg.select('.all')
  if (translated.empty()) {
    translated = svg.append('g')
      .attr('class', 'all')
      .attr(
        'transform',
        `translate(
          ${parseInt(circos.conf.width / 2)},
          ${parseInt(circos.conf.height / 2)}
        )`
      )
  }

  forEach(circos.tracks, (track, trackId) => {
    if (renderAll || trackId in ids) {
      track.render(circos, translated, trackId)
    }
  })
  if (renderAll || 'layout' in ids) {
    renderLayout(translated, circos)
  }

  // re-order tracks and layout according to z-index
  const trackContainers = svg.selectAll('.all > g').remove()
  const sortedTrackContainers = sortBy(
    trackContainers._groups[0],
    (elt) => elt.getAttribute('z-index')
  )

  svg.select('.all').selectAll('g')
    .data(sortedTrackContainers)
    .enter()
    .append((d) => d)

  return circos
}

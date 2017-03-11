import { describe, it } from 'mocha'
import { expect } from 'chai'
import jsdom from 'mocha-jsdom'
import { selectAll, select } from 'd3-selection'
import forEach from 'lodash/forEach'
import Circos from '../circos'

describe('Heatmap', () => {
  jsdom()

  it('should render elements according to configuration', () => {
    document.body.innerHTML = '<div id="chart"></div>'
    new Circos({
      container: '#chart',
      width: 350,
      height: 350
    })
    .layout([{id: 'chr1', len: 249250621}, {id: 'chr2', len: 243199373}])
    .heatmap(
      'heatmap1',
      [
        {block_id: 'chr1', start: 0, end: 1000000, value: 1},
        {block_id: 'chr1', start: 1000001, end: 2000000, value: 2},
        {block_id: 'chr2', start: 0, end: 1000000, value: 3},
        {block_id: 'chr2', start: 1000001, end: 2000000, value: 4}
      ],
      {
        color: 'Spectral',
        opacity: 0.8
      }
    )
    .render()

    const expectedColors = [
      'rgb(158, 1, 66)',
      'rgb(253, 190, 112)',
      'rgb(190, 229, 160)',
      'rgb(94, 79, 162)'
    ]

    const tiles = select('.heatmap1').selectAll('.tile')
    expect(tiles.size()).to.equal(4)
    forEach(tiles.nodes(), (tileNode, i) => {
      const tile = select(tileNode)
      expect(tile.attr('fill')).to.equal(expectedColors[i])
      expect(tile.attr('opacity')).to.equal('0.8')
    })
  })
})

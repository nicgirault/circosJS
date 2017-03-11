import { describe, it } from 'mocha'
import { expect } from 'chai'
import jsdom from 'mocha-jsdom'
import { select } from 'd3-selection'
import forEach from 'lodash/forEach'
import Circos from '../circos'

describe('Line', () => {
  jsdom()

  const buildCircos = (configuration) => {
    document.body.innerHTML = '<div id="chart"></div>'
    new Circos({container: '#chart', width: 350, height: 350})
    .layout([{id: 'january', len: 31}, {id: 'february', len: 28}])
    .line(
      'line1',
      [
        {block_id: 'january', position: 1, value: 1},
        {block_id: 'january', position: 2, value: 2},
        {block_id: 'january', position: 3, value: 2},
        {block_id: 'january', position: 7, value: 2},
        {block_id: 'january', position: 8, value: 2},
        {block_id: 'february', position: 1, value: 3},
        {block_id: 'february', position: 2, value: 4}
      ],
      configuration
    )
    .render()
  }

  it('should render elements with given color and opacity', () => {
    buildCircos({
      color: '#d3d3d3',
      opacity: 0.8
    })
    const lines = select('.line1').selectAll('.line path')
    expect(lines.size()).to.equal(2)
    forEach(lines.nodes(), (lineNode, i) => {
      const line = select(lineNode)
      expect(line.attr('stroke')).to.equal('#d3d3d3')
      expect(line.attr('opacity')).to.equal('0.8')
    })
  })

  it('should split lines if data position gaps are bigger than maxGap', () => {
    buildCircos({
      maxGap: 3
    })
    const lines = select('.line1').selectAll('.line path')
    expect(lines.size()).to.equal(3) // january data should generate 2 lines with max gap
  })
})

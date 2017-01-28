import { smartBorders } from './utils'
import { forEach } from 'lodash'
import { expect } from 'chai'

describe('utils', () => {

  describe('smartBorders', () => {
    const conf = {
      defaultTrackWidth: 10,
    }
    const cases = [
      {
        trackEdges: [[10, 20], [31, 40]],
        layout: [41, 50],
        trackWidth: 10,
        expected: {in: 50, out: 60}
      },
      {
        trackEdges: [[undefined, undefined], [31, 40]],
        layout: [20, 25],
        trackWidth: 15,
        expected: {in: 40, out: 55}
      }
    ]

    forEach(cases, (dataset) => {
      it('should return the expected borders', () => {
        const conf = {defaultTrackWidth: dataset.trackWidth}
        const layout = {
          conf: {
            innerRadius: dataset.layout[0],
            outerRadius: dataset.layout[1],
          }
        }
        const tracks = dataset.trackEdges.map((track) => {
          return ({
            conf: {
              innerRadius: track[0],
              outerRadius: track[1],
            }
          })
        })
        expect(smartBorders(conf, layout, tracks)).to.deep.equal(dataset.expected)

      })
    })
  })
})

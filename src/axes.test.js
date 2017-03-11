import { describe, it } from 'mocha'
import { expect, use } from 'chai'
import { spy } from 'sinon'
import sinonChai from 'sinon-chai'
import forEach from 'lodash/forEach'
import { _buildAxesData } from './axes'

use(sinonChai)

describe('Axes', () => {
  it('should log an warning if no position and spacing are defined', () => {
    spy(console, 'warn')
    const axes = _buildAxesData({
      axes: [{color: 'red'}]
    })
    expect(console.warn).to.have.been.called.calledOnce
    expect(axes.length).to.equal(0)
    console.warn.restore()
  })

  it('should return the axe group if position attribute is defined', () => {
    const axes = _buildAxesData({
      axes: [
        {
          position: 12
        }
      ],
      opacity: 1
    })
    expect(axes.length).to.equal(1)
    expect(axes[0].value).to.equal(12)
    expect(axes[0].opacity).to.equal(1)
    expect(axes[0].color).to.equal('#d3d3d3')
    expect(axes[0].thickness).to.equal(1)
  })

  forEach([
    {
      spacing: 2,
      min: 10,
      max: 20,
      expected: [10, 12, 14, 16, 18]
    },
    {
      spacing: 2,
      start: 14,
      min: 10,
      max: 20,
      expected: [14, 16, 18]
    },
    {
      spacing: 2,
      end: 14,
      min: 10,
      max: 20,
      expected: [10, 12]
    }
  ], (dataset) => {
    it('should return a range of axes according to spacing, start and end attributes', () => {
      const axes = _buildAxesData({
        axes: [
          {
            spacing: dataset.spacing,
            start: dataset.start,
            end: dataset.end
          }
        ],
        cmin: dataset.min,
        cmax: dataset.max
      })
      expect(axes.length).to.equal(dataset.expected.length)
      forEach(axes, (axis, i) => {
        expect(axis.value).to.equal(dataset.expected[i])
      })
    })
  })

  it('should use axe group color, opacity and thickness if defined', () => {
    const axes = _buildAxesData({
      axes: [
        {
          position: 12,
          opacity: 0.5,
          color: 'red',
          thickness: 3
        }
      ],
      opacity: 1
    })
    expect(axes.length).to.equal(1)
    expect(axes[0].value).to.equal(12)
    expect(axes[0].opacity).to.equal(0.5)
    expect(axes[0].color).to.equal('red')
    expect(axes[0].thickness).to.equal(3)
  })

  it('should create range axes and simple axis', () => {
    const axes = _buildAxesData({
      axes: [
        {
          position: 12
        },
        {
          spacing: 2
        }
      ],
      opacity: 1,
      cmin: 10,
      cmax: 20
    })
    expect(axes.length).to.equal(6)
  })
})

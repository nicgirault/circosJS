import { describe, it } from 'mocha'
import { expect } from 'chai'
import { buildColorValue } from './colors'
import forEach from 'lodash/forEach'

describe('colors', () => {
  describe('buildColorValue', () => {
    const greens0to10 = {
      0: 'rgb(247, 252, 245)',
      5: 'rgb(115, 195, 120)',
      10: 'rgb(0, 68, 27)',
      11: 'rgb(0, 68, 27)'
    }

    it('should return the color code if it\'s not a palette', () => {
      expect(buildColorValue('red')).to.equal('red')
      expect(buildColorValue('#d3d3d3')).to.equal('#d3d3d3')
    })

    it('should return the input if input is a function', () => {
      const colorValue = (d) => '#d3d3d3'
      expect(buildColorValue(colorValue)).to.equal(colorValue)
    })

    it('should return the expected scale if input is a palette', () => {
      const colorValue = buildColorValue('Greens', 0, 10)
      expect(colorValue).to.be.an.instanceOf(Function)
      forEach(greens0to10, (value, key) => {
        expect(colorValue({value: key})).to.equal(value)
      })
    })
    it('should reverse the palette if palette is prefixed by "-"', () => {
      const colorValue = buildColorValue('-Greens', 0, 10)
      expect(colorValue).to.be.an.instanceOf(Function)
      forEach(greens0to10, (value, key) => {
        expect(colorValue({value: 10 - key})).to.equal(value)
      })
    })
  })
})

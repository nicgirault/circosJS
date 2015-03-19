assert = require 'assert'
chai = require 'chai'
expect = require('chai').expect
sinon = require 'sinon'
sinon_chai = require 'sinon-chai'

chai.use(sinon_chai)

require '../../bower_components/d3/d3.js'
circosJS = require('../../build/circosJS.coffee')

describe 'colorScale', ->
  track = new circosJS.Track()

  logScale = false
  min = -50
  max = 100
  colorPaletteSize = 10
  colorPaletteReverse = false

  it 'should return 0 if value is equal to the minimum value', ->
    result = track.ratio -50, min, max, colorPaletteSize, colorPaletteReverse, logScale
    expect(result).to.equal 0
  it 'should return paletteSize - 1 if value is equal to the maximum value', ->
    result = track.ratio 100, min, max, colorPaletteSize, colorPaletteReverse, logScale
    expect(result).to.equal 9
  it 'should have a linear result if logscale is false', ->
    for x in [0..99]
      min = 0
      max = 99
      step = 100 / colorPaletteSize
      result = track.ratio x, min, max, colorPaletteSize, colorPaletteReverse, logScale
      expect(result).to.equal(Math.floor(x/step))
  it 'should reverse result if colorPaletteReverse is true', ->
    colorPaletteReverse = true
    for x in [0..99]
      result = track.ratio x, min, max, colorPaletteSize, colorPaletteReverse, logScale
      expect(result).to.equal(9 - Math.floor(x/10))
  it 'should return 0 if min = max', ->
    min = max = 0
    result = track.ratio 9, min, max, colorPaletteSize, colorPaletteReverse, logScale
    expect(result).to.equal(0)

assert = require 'assert'
expect = require('chai').expect
circosJS = require('../src/circosJS.coffee')

describe 'CircosJS', ->
    c = new circosJS
        width: 499
        height: 500
        container: '#chart'

    it 'should be an object', ->
        expect(c).to.be.an('object')

    it 'should instantiate a circos object', ->
        expect(c).to.be.an.instanceOf(circosJS.Core)

    it 'should return expected width and height', ->
        expect(c.getWidth()).to.equal(499)
        expect(c.getHeight()).to.equal(500)

    it 'should return expected container', ->
        expect(c.getContainer()).to.equal('#chart')

describe 'Layout', ->
    c = new circosJS
        width: 499
        height: 500
        container: '#chart'
    l = c.layout(
        innerRadius: 250
        outerRadius: 300
        gap: 0.04 # in radian
        labelPosition: 'center'
        labelRadialOffset: 0
    , [1,2,3])

    it 'should return the circos object', ->
        expect(l).to.equal(c)

    it 'should return expected width and height', ->
        expect(c._layout).to.be.an.instanceOf(circosJS.Layout)

    it 'should return a data', ->
        expect(c._layout.getData()).to.deep.equal([1,2,3])
    
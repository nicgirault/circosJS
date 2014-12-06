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
    
describe 'Heatmap', ->
    c = new circosJS
    h = c
        .layout({}, [{len: 10, color: '#333333', label: '1', id: '1'}])
        .heatmap('h1', {}, [{start: 1, end: 5, value: 1}])

    it 'should return the circos object', ->
        expect(h).to.equal(c)

    it 'should return the expected values', ->
        return true

    it 'should throw an exception when adding a heatmap when no layout is defined', ->
        return true

    it 'should log a message when heatmap data does not fit a layout id', ->
        return true

    it 'should log a message when heatmap data does not fit the block size', ->
        return true

    it 'should create a new heatmap instance when id is unknown', ->
        return true

    it 'should not create a new heatmap instance when id is known', ->
        return true

    it 'should update the good heatmap instance', ->
        return true




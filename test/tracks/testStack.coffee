assert = require 'assert'
chai = require 'chai'
expect = require('chai').expect
sinon = require 'sinon'
sinon_chai = require 'sinon-chai'

chai.use(sinon_chai)

require '../../bower_components/d3/d3.js'
circosJS = require('../../build/circosJS.coffee')

describe 'buildLayers', ->
  track = new circosJS.Stack()

  data = [
    {
      key: 'january'
      values: [
        {start: 10, end:15, value:1, block_id: 'january'}
        {start: 5, end: 8, value:1, block_id: 'january'}
        {start: 5, end: 15, value:1, block_id: 'january'}
        {start: 8, end: 15, value:1, block_id: 'january'}
      ]
    }
  ]

  it 'should sort data', ->
    track.buildLayers data
    values = data[0].values
    expect(values).to.deep.equal [
      {start: 5, end: 15, value:1, block_id: 'january'}
      {start: 5, end: 8, value:1, block_id: 'january'}
      {start: 8, end: 15, value:1, block_id: 'january'}
      {start: 10, end:15, value:1, block_id: 'january'}
    ]

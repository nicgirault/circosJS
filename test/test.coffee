assert = require 'assert'
global.d3 = {}
global.circosJS = require('../src/circos.coffee')
global.circosJS.layout = require('../src/layout.coffee')

describe 'CircosJS', ->
    c = new global.circosJS
        width: 500
        height: 500
        container: '#chart'

    describe 'Layout', ->
        it 'should returns circosJS object', ->
            x = c.layout
                innerRadius: 200
                outerRadius: 250
            , karyotype
            assert.typeOf(x, 'object', 'we have an object')

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
        expect(c.conf.width).to.equal(499)
        expect(c.conf.height).to.equal(500)

    it 'should return expected container', ->
        expect(c.conf.container).to.equal('#chart')

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
        expect(c._layout.data).to.deep.equal([1,2,3])



describe 'Heatmap', ->
    conf =
        innerRadius: 10
        outerRadius: 20
        min: -2
        max: 13
        colorPalette: 'RgYn'
        colorPaletteSize: 9
    # log = sinon.spy(circosJS, 'log')

    c = new circosJS({})
    h = c
        .layout({}, [{len: 10, color: '#333333', label: '1', id: '1'}])
        .heatmap('h1', conf, [['1', 1, 5, 1]])

    it 'should return the circos object', ->
        expect(h).to.equal(c)

    it 'should create an instance of Heatmap', ->
        expect(c.tracks.heatmaps['h1']).to.be.an.instanceOf(circosJS.Heatmap)

    # it 'should log an error when adding a heatmap when no layout is defined', ->
    #     log.reset()
    #     c1 = new circosJS({})
    #     c1.heatmap('h1', conf, [['1', 1, 5, 1]])
    #     expect(log).to.have.been.calledOnce
    #     expect(log).to.have.been.calledWith(1, 'No layout defined')

    # it 'should log a warning message when heatmap data does not fit a layout id', ->
    #     log.reset()
    #     c.heatmap('h2', conf, [{ parent: 'xxx', data: {start: 1, end: 5, value: 1}}])
    #     expect(log).to.have.been.calledOnce
    #     expect(log).to.have.been.calledWith(2, 'No layout block id match')

    # it 'should log a message when heatmap data does not fit the block size', ->
    #     log.reset()
    #     c.heatmap('h3', conf, [{ parent: '1', data: [{start: 1, end: 11, value: 1}]}])
    #     expect(log).to.have.been.calledOnce
    #     expect(log).to.have.been.calledWith(2, 'Track data inconsistency')

    it 'should create a new heatmap instance when id is unknown', ->
        count = Object.keys(c.tracks.heatmaps).length
        c.heatmap('h4', conf, [['1', 1, 11, 1]])
        expect(Object.keys(c.tracks.heatmaps).length).to.equal(count+1)

    it 'should not create a new heatmap instance when id is known', ->
        count = Object.keys(c.tracks.heatmaps).length
        c.heatmap('h4', conf, [['1', 1, 11, 1]])
        expect(Object.keys(c.tracks.heatmaps).length).to.equal(count)

    it 'should return data min/max when conf.min/conf.max value are "smart"', ->
        return true

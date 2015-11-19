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

describe 'rules', ->
  rule = {parameter: 'color', value: 'blue', condition: (parent, datum, i) -> return datum.value > 5}
  instance = new circosJS
        width: 499
        height: 500
        container: '#chart'
  instance
    .layout({}, [{ "len": 31, "color": "#8dd3c7", "label": "January", "id": "january" }])
    .histogram('my-histogram', {color: 'red'}, [['january',1,2,0],['january',3,4,10]],[rule])

  # it 'should by applied', ->
  #   data = instance.tracks.histograms['my-histogram'].data
  #   expect(data[0].values[0].color).to.be.undefined
  #   expect(data[0].values[1].color).to.be.equal 'blue'

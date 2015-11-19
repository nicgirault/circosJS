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
      {start: 5, end: 15, value:1, block_id: 'january', layer: 0}
      {start: 5, end: 8, value:1, block_id: 'january', layer: 1}
      {start: 8, end: 15, value:1, block_id: 'january', layer: 2}
      {start: 10, end:15, value:1, block_id: 'january', layer: 3}
    ]

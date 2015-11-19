describe 'parseSpanValueData', ->
  layoutSummary = {january: 31, february: 28, march: 31}
  data = [
    ['january', 1, 2,3],
    ['january', 1, 31,10],
    ['february', 1, 28,4],
    ['march', 1, 2,5],
    ['march', 1, 2,7]
  ]
  emptyData = []

  # circosJS.log = () ->
  #     return
  # log = sinon.spy(circosJS, 'log')

  it 'should return empty array', ->
    result = circosJS.parseSpanValueData emptyData, layoutSummary
    expect(result).to.be.an 'object'
    expect(result).to.have.property 'data'
    expect(result).to.have.property 'meta'
    expect(result.data).to.be.empty

  it 'should return the expected array', ->
    result = circosJS.parseSpanValueData data, layoutSummary

    expect(result).to.deep.equal {
      data: [
        {
          key: 'january'
          values: [
            {block_id: 'january', start: 1, end: 2, value: 3}
            {block_id: 'january', start: 1, end: 31, value: 10}
          ]
        }
        {
          key: 'february'
          values: [
            {block_id: 'february', start: 1, end: 28, value: 4}
          ]
        }
        {
          key: 'march'
          values: [
            {block_id: 'march', start: 1, end: 2, value: 5}
            {block_id: 'march', start: 1, end: 2, value: 7}
          ]
        }
      ]
      meta:
        min: 3
        max: 10
    }

  # it 'should not log an error when everything is ok', ->
  #   log.reset()
  #   result = circosJS.parseSpanValueData data, layoutSummary
  #   expect(log).to.not.have.been.called
  #
  # it 'should log an error and remove datum when a position is not a number', ->
  #   log.reset()
  #   errorData = [
  #     ['january', 'a', 2,3],
  #   ]
  #   result = circosJS.parseSpanValueData errorData, layoutSummary
  #   expect(log).to.have.been.calledOnce
  #   expect(result.data).to.be.empty
  #
  # it 'should log an error and remove datum when a layout id is unknown', ->
  #   log.reset()
  #   errorData = [
  #     ['42', 'a', 2,3],
  #   ]
  #   result = circosJS.parseSpanValueData errorData, layoutSummary
  #   expect(log).to.have.been.calledOnce
  #   expect(result.data).to.be.empty
  #
  # it 'should log an error and remove datum when a value is not a number', ->
  #   log.reset()
  #   errorData = [
  #     ['january', 1, 2,'a'],
  #   ]
  #   result = circosJS.parseSpanValueData errorData, layoutSummary
  #   expect(log).to.have.been.calledOnce
  #   expect(result.data).to.be.empty

import { parseSpanValueData } from './data-parser'
import { forEach } from 'lodash'
import { expect } from 'chai'

describe('dataParser', () => {
  describe('parseSpanValueData', () => {
    const cases = [
      {
        layout: {january: 31, february: 28, march: 31},
        data: [
          {
            block_id: 'january',
            start: 1,
            end: 2,
            value: 3
          },
          {
            block_id: 'january',
            start: 1,
            end: 31,
            value: 10
          },
          {
            block_id: 'february',
            start: 1,
            end: 28,
            value: 4
          },
          {
            block_id: 'march',
            start: 1,
            end: 2,
            value: 5
          },
          {
            block_id: 'march',
            start: 1,
            end: 2,
            value: 7
          }
        ],
        expected: {
          data: [
            {
              key: 'january',
              values: [
                {block_id: 'january', start: 1, end: 2, value: 3},
                {block_id: 'january', start: 1, end: 31, value: 10}
              ]
            },
            {
              key: 'february',
              values: [
                {block_id: 'february', start: 1, end: 28, value: 4}
              ]
            },
            {
              key: 'march',
              values: [
                {block_id: 'march', start: 1, end: 2, value: 5},
                {block_id: 'march', start: 1, end: 2, value: 7}
              ]
            }
          ],
          meta: {
            min: 3,
            max: 10
          }
        }
      },
      {
        layout: {january: 31, february: 28, march: 31},
        data: [],
        expected: {
          data: [],
          meta: {
            min: null,
            max: null
          }
        }
      }
    ]

    forEach(cases, (dataset) => {
      it('should return expected results', () => {
        const result = parseSpanValueData(dataset.data, dataset.layout)
        expect(result).to.deep.equal(dataset.expected)
      })
    })
  })
})
  //
  // # it 'should not log an error when everything is ok', ->
  // #   log.reset()
  // #   result = circosJS.parseSpanValueData data, layoutSummary
  // #   expect(log).to.not.have.been.called
  // #
  // # it 'should log an error and remove datum when a position is not a number', ->
  // #   log.reset()
  // #   errorData = [
  // #     ['january', 'a', 2,3],
  // #   ]
  // #   result = circosJS.parseSpanValueData errorData, layoutSummary
  // #   expect(log).to.have.been.calledOnce
  // #   expect(result.data).to.be.empty
  // #
  // # it 'should log an error and remove datum when a layout id is unknown', ->
  // #   log.reset()
  // #   errorData = [
  // #     ['42', 'a', 2,3],
  // #   ]
  // #   result = circosJS.parseSpanValueData errorData, layoutSummary
  // #   expect(log).to.have.been.calledOnce
  // #   expect(result.data).to.be.empty
  // #
  // # it 'should log an error and remove datum when a value is not a number', ->
  // #   log.reset()
  // #   errorData = [
  // #     ['january', 1, 2,'a'],
  // #   ]
  // #   result = circosJS.parseSpanValueData errorData, layoutSummary
  // #   expect(log).to.have.been.calledOnce
  // #   expect(result.data).to.be.empty

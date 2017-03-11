import keys from 'lodash/keys'
import includes from 'lodash/includes'
import every from 'lodash/every'
import map from 'lodash/map'
import {nest} from 'd3-collection'
import {min, max} from 'd3-array'

const logger = console

function checkParent (key, index, layoutSummary, header) {
  if (!includes(keys(layoutSummary), key)) {
    logger.log(
      1,
      'datum',
      'unknown parent id',
      {line: index + 1, value: key, header: header, layoutSummary: layoutSummary}
    )
    return false
  }
  return true
}

function checkNumber (keys, index) {
  return every(keys, (value, header) => {
    if (isNaN(value)) {
      logger.log(
        1,
        'datum',
        'not a number',
        {line: index + 1, value: value, header: header}
      )
      return false
    }
    return true
  })
}

function normalize (data, idKeys) {
  const sampleKeys = keys(data[0])
  const isObject = every(map(idKeys, (key) => includes(sampleKeys, key)))
  if (isObject) {
    return map(data, (datum) => {
      return map(idKeys, (key) => datum[key])
    })
  }

  return data
}

function buildOutput (data) {
  return {
    data: nest().key((datum) => datum.block_id).entries(data),
    meta: {
      min: min(data, (d) => d.value),
      max: max(data, (d) => d.value)
    }
  }
}

export function parseSpanValueData (data, layoutSummary) {
  // ['parent_id', 'start', 'end', 'value']
  if (data.length === 0) {
    return {data: [], meta: {min: null, max: null}}
  }

  const filteredData = data
    .filter((datum, index) =>
      checkParent(datum.block_id, index, layoutSummary, 'parent')
    )

  return buildOutput(filteredData)
}

export function parseSpanStringData (data, layoutSummary) {
  // ['parent_id', 'start', 'end', 'value']

  if (data.length === 0) {
    return {data: [], meta: {min: null, max: null}}
  }

  const filteredData = data
    .filter((datum, index) =>
      checkParent(datum.block_id, index, layoutSummary, 'parent')
    )
    .filter((datum, index) =>
      checkNumber({start: datum.start, end: datum.end}, index)
    )
    .filter((datum) => {
      if (datum.start < 0 || datum.end > layoutSummary[datum.block_id]) {
        logger.log(
          2,
          'position',
          'position inconsistency',
          {datum: datum, layoutSummary: layoutSummary}
        )
        return false
      }
      return true
    })

  return buildOutput(filteredData)
}

export function parsePositionValueData (data, layoutSummary) {
  // ['parent_id', 'position', 'value']
  if (data.length === 0) {
    return {data: [], meta: {min: null, max: null}}
  }

  const filteredData = data
    .filter((datum, index) =>
      checkParent(datum.block_id, index, layoutSummary, 'parent')
    )
    .filter((datum, index) =>
      checkNumber({position: datum.position, value: datum.value}, index)
    )

  return buildOutput(filteredData)
}

export function parsePositionTextData (data, layoutSummary) {
  // ['parent_id', 'position', 'value']
  if (data.length === 0) {
    return {data: [], meta: {min: null, max: null}}
  }

  const filteredData = data
    .filter((datum, index) =>
      checkParent(datum.block_id, index, layoutSummary, 'parent')
    )
    .filter((datum, index) =>
      checkNumber({position: datum.position}, index)
    )

  return buildOutput(filteredData)
}

export function parseChordData (data, layoutSummary) {
  if (data.length === 0) {
    return {data: [], meta: {min: null, max: null}}
  }

  const formatedData = data
  .filter((datum, index) => {
    if (datum.source) {
      return checkParent(datum.source.id, index, layoutSummary, 'sourceId')
    }
    logger.warn(`No source for data at index ${index}`)
    return false
  })
  .filter((datum, index) => {
    if (datum.target) {
      return checkParent(datum.target.id, index, layoutSummary, 'targetId')
    }
    logger.warn(`No target for data at index ${index}`)
    return false
  })
  .filter((datum, index) => checkNumber({
    sourceStart: datum.source.start,
    sourceEnd: datum.source.end,
    targetStart: datum.target.start,
    targetEnd: datum.target.end,
    value: datum.value || 1
  }, index)
  )

  return {
    data: formatedData,
    meta: {
      min: min(formatedData, (d) => d.value),
      max: max(formatedData, (d) => d.value)
    }
  }
}

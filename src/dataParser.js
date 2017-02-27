import keys from 'lodash/keys';
import includes from 'lodash/includes';
import every from 'lodash/every';
import map from 'lodash/map';
import {nest} from 'd3-collection';
import {min, max} from 'd3-array';

const logger = console;

function checkParent(key, index, layoutSummary, header) {
  if (!includes(keys(layoutSummary), key)) {
    logger.log(
      1,
      'datum',
      'unknown parent id',
      {line: index+1, value: key, header: header, layoutSummary: layoutSummary}
    );
    return false;
  }
  return true;
}

function checkNumber(keys, index) {
  return every(keys, (value, header) => {
    if (isNaN(value)) {
      logger.log(
        1,
        'datum',
        'not a number',
        {line: index+1, value: value, header: header}
      );
      return false;
    }
    return true;
  });
}

function normalize(data, idKeys) {
  const sampleKeys = keys(data[0]);
  const isObject = every(map(idKeys, (key) => includes(sampleKeys, key)));
  if (isObject) {
    return map(data, (datum) => {
      return map(idKeys, (key) => datum[key]);
    });
  }

  return data;
}

function buildOutput(data) {
  return {
    data: nest().key((datum) => datum.block_id).entries(data),
    meta: {
      min: min(data, (d) => d.value),
      max: max(data, (d) => d.value),
    },
  };
}

export function parseSpanValueData(data, layoutSummary) {
  // ['parent_id', 'start', 'end', 'value']
  if (data.length === 0) {
    return {data: [], meta: {min: null, max: null}};
  }

  const preParsedData = normalize(data, ['parent_id', 'start', 'end', 'value']);

  const filteredData = preParsedData
    .filter((datum, index) =>
      checkParent(datum[0], index, layoutSummary, 'parent')
    )
    .filter((datum, index) =>
      checkNumber({start: datum[1], end: datum[2], value: datum[3]}, index)
    )
    .map((datum) => {
      if (datum[1] < 0 || datum[2] > layoutSummary[datum[0]]) {
        logger.log(
          2,
          'position',
          'position inconsistency',
          {datum: datum, layoutSummary: layoutSummary}
        );
      }
      return {
        block_id: datum[0],
        start: Math.max(0, parseFloat(datum[1])),
        end: Math.min(layoutSummary[datum[0]], parseFloat(datum[2])),
        value: parseFloat(datum[3]) || 1,
      };
    });

  return buildOutput(filteredData);
}

export function parseSpanStringData(data, layoutSummary) {
  // ['parent_id', 'start', 'end', 'value']

  if (data.length === 0) {
    return {data: [], meta: {min: null, max: null}};
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
        );
        return false;
      }
      return true;
    });

  return buildOutput(filteredData);
}

export function parsePositionValueData(data, layoutSummary) {
  // ['parent_id', 'position', 'value']
  if (data.length === 0) {
    return {data: [], meta: {min: null, max: null}};
  }

  const preParsedData = normalize(data, ['parent_id', 'position', 'value']);

  const filteredData = preParsedData
    .filter((datum, index) =>
      checkParent(datum[0], index, layoutSummary, 'parent')
    )
    .filter((datum, index) =>
      checkNumber({position: datum[1], value: datum[2]}, index)
    )
    .map((datum) => {
      return {
        block_id: datum[0],
        position: Math.min(layoutSummary[datum[0]], parseFloat(datum[1])),
        value: parseFloat(datum[2]) || 1,
      };
    });

  return buildOutput(filteredData);
}

export function parsePositionTextData(data, layoutSummary) {
  // ['parent_id', 'position', 'value']
  if (data.length === 0) {
    return {data: [], meta: {min: null, max: null}};
  }

  const preParsedData = normalize(data, ['parent_id', 'position', 'value']);
  const filteredData = preParsedData
    .filter((datum, index) =>
      checkParent(datum[0], index, layoutSummary, 'parent')
    )
    .filter((datum, index) =>
      checkNumber({position: datum[1]}, index)
    )
    .map((datum) => {
      return {
        block_id: datum[0],
        position: Math.min(layoutSummary[datum[0]], parseFloat(datum[1])),
        value: datum[2],
      };
    });

  return buildOutput(filteredData);
}

export function parseChordData(data, layoutSummary) {
  // ['source_id', 'source_start', 'source_end', 'target_id', 'target_start', 'target_end', 'value']
  if (data.length === 0) {
    return {data: [], meta: {min: null, max: null}};
  }

  const preParsedData = normalize(
    data,
    [
      'sourceId',
      'sourceStart',
      'sourceEnd',
      'targetId',
      'targetStart',
      'targetEnd',
    ]
  );

  const formatedData = preParsedData
  .filter((datum, index) =>
    checkParent(datum[0], index, layoutSummary, 'sourceId')
  )
  .filter((datum, index) =>
    checkParent(datum[3], index, layoutSummary, 'targetId')
  )
  .filter((datum, index) => checkNumber({
      sourceStart: datum[1],
      sourceEnd: datum[2],
      targetStart: datum[4],
      targetEnd: datum[5],
      value: datum[6] || 1,
    }, index)
  ).map((datum) => {
    return {
      source: {
        id: datum[0],
        start: Math.max(0, parseFloat(datum[1])),
        end: Math.min(layoutSummary[datum[0]], parseFloat(datum[2])),
      },
      target: {
        id: datum[3],
        start: Math.max(0, parseFloat(datum[4])),
        end: Math.min(layoutSummary[datum[3]], parseFloat(datum[5])),
      },
      value: parseFloat(datum[6]) || 1,
    };
  });

  return {
    data: formatedData,
    meta: {
      min: min(formatedData, (d) => d.value),
      max: max(formatedData, (d) => d.value),
    },
  };
}

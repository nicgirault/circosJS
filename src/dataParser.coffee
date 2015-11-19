circosJS.checkParent = (key, index, layoutSummary, header) ->
  unless key of layoutSummary
    circosJS.log(1, 'datum', 'unknown parent id', {line: index+1, value: key, header: header, layoutSummary: layoutSummary})
    return false
  true

circosJS.checkNumber = (keys, index) ->
  for header, value of keys
    if isNaN value
      circosJS.log(1, 'datum', 'not a number', {line: index+1, value: value, header: header})
      return false
  true

circosJS.parseSpanValueData = (data, layoutSummary) ->
  # ['parent_id', 'start', 'end', 'value']

  return {data: [], meta: {min: null, max: null}} unless data.length > 0

  sample = data[0]
  if 'parent_id' of sample and 'start' of sample and 'end' of sample and 'value' of sample
    data = data.map (datum) ->
      [datum.parent_id, datum.start, datum.end, datum.value]

  data = data
  .filter (datum, index) -> circosJS.checkParent datum[0], index, layoutSummary, 'parent'
  .filter (datum, index) -> circosJS.checkNumber {start: datum[1], end: datum[2], value: datum[3]}, index
  .map (datum) ->
    if datum[1] < 0 or datum[2] > layoutSummary[datum[0]]
      circosJS.log(2, 'position', 'position inconsistency', { datum: datum, layoutSummary: layoutSummary})
    block_id: datum[0]
    start: Math.max 0, parseFloat datum[1]
    end: Math.min layoutSummary[datum[0]], parseFloat datum[2]
    value: parseFloat(datum[3]) || 1

  # group data by block id
  groups = d3.nest()
    .key (datum) -> datum.block_id
    .entries data
  return {
    data: groups
    meta:
      min: d3.min data, (d) -> d.value
      max: d3.max data, (d) -> d.value
  }

circosJS.parseSpanStringData = (data, layoutSummary) ->
  # ['parent_id', 'start', 'end', 'value']
  sample = data[0]
  if 'parent_id' of sample and 'start' of sample and 'end' of sample and 'value' of sample
    data = data.map (datum) ->
      [datum.parent_id, datum.start, datum.end, datum.value]

  data = data
  .filter (datum, index) -> circosJS.checkParent datum[0], index, layoutSummary, 'parent'
  .filter (datum, index) -> circosJS.checkNumber {start: datum[1], end: datum[2]}, index
  .map (datum) ->
    if datum[1] < 0 or datum[2] > layoutSummary[datum[0]]
      circosJS.log(2, 'position', 'position inconsistency', { datum: datum, layoutSummary: layoutSummary})
    value = if datum[3]? then datum[3] else null
    block_id: datum[0]
    start: Math.max 0, parseFloat datum[1]
    end: Math.min layoutSummary[datum[0]], parseFloat datum[2]
    value: value

  # group data by block id
  groups = d3.nest()
    .key (datum) -> datum.block_id
    .entries data
  return {
    data: groups
    meta:
      min: d3.min data, (d) -> d.value
      max: d3.max data, (d) -> d.value
  }

circosJS.parsePositionValueData = (data, layoutSummary) ->
    # ['parent_id', 'position', 'value']
    sample = data[0]
    if 'parent_id' of sample and 'position' of sample
      data = data.map (datum) ->
        [datum.parent_id, datum.position, datum.value]

    data = data
    .filter (datum, index) -> circosJS.checkParent datum[0], index, layoutSummary, 'parent'
    .filter (datum, index) -> circosJS.checkNumber {position: datum[1], value: datum[2]}, index
    .map (datum) ->
      block_id: datum[0]
      position: Math.min layoutSummary[datum[0]], parseFloat datum[1]
      value: parseFloat(datum[2]) or 1

    # group data by block id
    groups = d3.nest()
      .key (datum) -> datum.block_id
      .entries data
    return {
      data: groups
      meta:
        min: d3.min data, (d) -> d.value
        max: d3.max data, (d) -> d.value
    }

circosJS.parsePositionTextData = (data, layoutSummary) ->
    # ['parent_id', 'position', 'value']
    sample = data[0]
    if 'parent_id' of sample and 'position' of sample
      data = data.map (datum) ->
        [datum.parent_id, datum.position, datum.value]

    data = data
    .filter (datum, index) -> circosJS.checkParent datum[0], index, layoutSummary, 'parent'
    .filter (datum, index) -> circosJS.checkNumber {position: datum[1]}, index
    .map (datum) ->
      block_id: datum[0]
      position: Math.min layoutSummary[datum[0]], parseFloat datum[1]
      value: datum[2]

    # group data by block id
    groups = d3.nest()
      .key (datum) -> datum.block_id
      .entries data
    return {
      data: groups
      meta:
        min: d3.min data, (d) -> d.value
        max: d3.max data, (d) -> d.value
    }

circosJS.parseChordData = (data, layoutSummary) ->
  # ['source_id', 'source_start', 'source_end', 'target_id', 'target_start', 'target_end', 'value']
  sample = data[0]
  if 'source_id' of sample and 'source_start' of sample and 'source_end' and 'target_id' of sample and 'target_start' of sample and 'target_end' of sample
    data = data.map (datum) ->
      elts = [datum.source_id, datum.source_start, datum.source_end, datum.target_id, datum.target_start, datum.target_end]
      elts.push(datum.value) if datum.value?
      return elts

  data = data
  .filter (datum, index) -> circosJS.checkParent datum[0], index, layoutSummary, 'source_id'
  .filter (datum, index) -> circosJS.checkParent datum[3], index, layoutSummary, 'target_id'
  .filter (datum, index) -> circosJS.checkNumber {
      source_start: datum[1]
      source_end: datum[2]
      target_start: datum[4]
      target_end: datum[5]
      value: datum[6] || 1
    }, index
  .map (datum) ->
    source:
      id: datum[0]
      start: Math.max 0, parseFloat datum[1]
      end: Math.min layoutSummary[datum[0]], parseFloat datum[2]
    target:
      id: datum[3]
      start: Math.max 0, parseFloat datum[4]
      end: Math.min layoutSummary[datum[3]], parseFloat datum[5]
    value: parseFloat datum[6]
  return {
    data: data
    meta:
      min: d3.min data, (d) -> d.value
      max: d3.max data, (d) -> d.value
  }

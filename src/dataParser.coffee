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
  # ['parent', 'start', 'end', 'value']
  data = data
  .filter (datum, index) -> circosJS.checkParent datum[0], index, layoutSummary, 'parent'
  .filter (datum, index) -> circosJS.checkNumber {start: datum[1], end: datum[2], value: datum[3]}, index
  .map (datum) ->
    if datum.start < 0 or datum.end > layoutSummary[datum[0]]
      circosJS.log(2, 'position', 'position inconsistency', { datum: datum, layoutSummary: layoutSummary})
    block_id: datum[0]
    start: Math.max 0, parseFloat datum[1]
    end: Math.min layoutSummary[datum[0]], parseFloat datum[2]
    value: parseFloat datum[3]

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
  # ['parent', 'position', 'value']
  data = data
  .filter (datum, index) -> circosJS.checkParent datum[0], index, layoutSummary, 'parent'
  .filter (datum, index) -> circosJS.checkNumber {position: datum[1], value: datum[2]}, index
  .map (datum) ->
    block_id: datum[0]
    position: Math.min layoutSummary[datum[0]], parseFloat datum[1]
    value: parseFloat datum[2]

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
  data = data
  .filter (datum, index) -> circosJS.checkParent datum[0], index, layoutSummary, 'source_id'
  .filter (datum, index) -> circosJS.checkParent datum[3], index, layoutSummary, 'target_id'
  .filter (datum, index) -> circosJS.checkNumber {
      source_start: datum[1]
      source_end: datum[2]
      target_start: datum[4]
      target_end: datum[5]
      value: datum[6]
    }, index
  .map (datum) ->
    source:
      id: datum[0]
      start: Math.max 0, parseFloat datum[1]
      end: Math.min layoutSummary[datum[0]], parseFloat datum[2]
    target:
      id: datum[3]
      start: Math.max 0, parseFloat datum[4]
      end: Math.min layoutSummary[datum[0]], parseFloat datum[5]
    value: parseFloat datum[6]

  return {
    data: data
    meta:
      min: d3.min data, (d) -> d.value
      max: d3.max data, (d) -> d.value
  }

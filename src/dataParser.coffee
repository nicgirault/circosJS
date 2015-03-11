circosJS.parseData = (data, layoutIds) ->
    unless data.length > 0
        return data
    sample = data[0]

    unless Array.isArray(sample)
        return data

    circosJS.parseSpanValueData(data, layoutIds)

circosJS.parseSpanValueData = (data, layoutSummary) ->
    header = ['parent', 'start', 'end', 'value']

    data = data
    .filter (datum, index) ->
        unless datum[0] of layoutSummary
            circosJS.log(1, 'datum', 'unknown parent id', {line: index+1, value: datum[0], header: header[0], layoutSummary: layoutSummary})
            return false
        true
    .filter (datum, index) ->
        for element, i in datum.slice 1
            if isNaN element
                circosJS.log(1, 'datum', 'not a number', {line: index+1, value: element, header: header[i+1]})
                return false
        true
    .map (datum) ->
        if datum.start < 0 or datum.end > layoutSummary[datum[0]]
            circosJS.log(2, 'position', 'position inconsistency', { datum: datum, layoutSummary: layoutSummary})
        block_id: datum[0]
        start: Math.max 0, parseFloat datum[1]
        end: Math.min layoutSummary[datum[0]], parseFloat datum[2]
        value: parseFloat datum[3]

    # group data by block id
    groups = d3.nest()
        .key (datum) ->
            datum.block_id
        .entries data
    return {
        data: groups
        meta:
            min: d3.min data, (d) -> d.value
            max: d3.max data, (d) -> d.value
    }

circosJS.parsePositionValueData = (data, layoutSummary) ->
    header = ['parent', 'position', 'value']

    _(data)
    .filter (datum, index) ->
        unless datum[0] of layoutSummary
            circosJS.log(1, 'datum', 'unknown parent id', {line: index+1, value: element, header: header[0], expected: layoutIds})
            return false
        true
    .filter (datum, index) ->
        for element, i in datum.slice 1
            if isNaN element
                circosJS.log(1, 'datum', 'not a number', {line: index+1, value: element, header: header[i+1]})
                return false
        true
    .map (datum) ->
        block_id: datum[0]
        position: parseFloat datum[1]
        value: parseFloat datum[2]
    .groupBy (datum) ->
        datum.block_id
    .map (group, parentId) ->
        parent: parentId
        data: group
    .value()

circosJS.parseChordData = (data, layoutSummary) ->
    header = ['source_id', 'source_start', 'source_end', 'target_id', 'target_start', 'target_end', 'value']

    _(data)
    .filter (datum, index) ->
        unless datum[0] of layoutSummary
            circosJS.log(1, 'datum', 'unknown parent id', {line: index+1, value: element, header: header[0], expected: layoutIds})
            return false
        unless datum[3] of layoutSummary
            circosJS.log(1, 'datum', 'unknown parent id', {line: index+1, value: element, header: header[3], expected: layoutIds})
            return false
        true
    .filter (datum, index) ->
        for element, i in ['0', datum[1], datum[2], '0', datum[4], datum[5], datum[6]]
            if isNaN element
                circosJS.log(1, 'datum', 'not a number', {line: index+1, value: element, header: header[i]})
                return false
        true
    .map (datum) ->
        source:
            id: datum[0]
            start: parseFloat datum[1]
            end: parseFloat datum[2]
        target:
            id: datum[3]
            start: parseFloat datum[4]
            end: parseFloat datum[5]
        value: parseFloat datum[6]
    .value()

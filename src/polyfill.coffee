if typeof Object.assign != 'function'

  Object.assign = (target) ->
    'use strict'
    if target == null
      throw new TypeError('Cannot convert undefined or null to object')
    target = Object(target)
    index = 1
    while index < arguments.length
      source = arguments[index]
      if source != null
        for key of source
          if Object::hasOwnProperty.call(source, key)
            target[key] = source[key]
      index++
    target

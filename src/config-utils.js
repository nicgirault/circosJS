import cloneDeep from 'lodash/cloneDeep'
import forEach from 'lodash/forEach'
import isFunction from 'lodash/isFunction'
import assign from 'lodash/assign'
import {smartBorders} from './utils'

const buildConf = (userConf = {}, defaultConf) => {
  let conf = {}
  forEach(defaultConf, (item, key) => {
    // if it's a leaf
    if (item.iteratee !== undefined) {
      if (!item.iteratee) {
        conf[key] = Object.keys(userConf).indexOf(key) > -1
          ? userConf[key] : item.value
      } else if (Object.keys(userConf).indexOf(key) > -1) {
        if (isFunction(userConf[key])) {
          conf[key] = userConf[key]
        } else {
          conf[key] = userConf[key]
        }
      } else {
        conf[key] = () => item.value
      }
    // else we go deeper
    } else {
      conf[key] = buildConf(userConf[key], item)
    }
  })

  return conf
}

const computeMinMax = (conf, meta) => {
  return {
    cmin: conf.min === null ? meta.min : conf.min,
    cmax: conf.max === null ? meta.max : conf.max
  }
}

const computeRadius = (conf, instance) => {
  if (conf.innerRadius === 0 && conf.outerRadius === 0) {
    const borders = smartBorders(conf, instance._layout, instance.tracks)
    return {
      innerRadius: borders.in,
      outerRadius: borders.out
    }
  }
  if (conf.innerRadius <= 1 && conf.outerRadius <= 1) {
    return {
      innerRadius: conf.innerRadius * instance._layout.conf.innerRadius,
      outerRadius: conf.outerRadius * instance._layout.conf.innerRadius
    }
  }
  if (conf.innerRadius <= 10 && conf.outerRadius <= 10) {
    return {
      innerRadius: conf.innerRadius * instance._layout.conf.outerRadius,
      outerRadius: conf.outerRadius * instance._layout.conf.outerRadius
    }
  }
}

const getConf = (userConf, defaultConf, meta, instance) => {
  let conf = buildConf(userConf, cloneDeep(defaultConf))
  assign(conf, computeMinMax(conf, meta), computeRadius(conf, instance))
  return conf
}

export {
  getConf
}

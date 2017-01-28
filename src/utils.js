import sortBy from 'lodash/fp/sortBy'
import flow from 'lodash/fp/flow'
import concat from 'lodash/fp/concat'
import filter from 'lodash/fp/filter'
import first from 'lodash/fp/first'
import reverse from 'lodash/fp/reverse'

export function smartBorders(conf, layout, tracks) {
  const width = conf.defaultTrackWidth || 30

  const externalTrack = flow(
    filter('conf.outerRadius'),
    sortBy('conf.outerRadius'),
    reverse,
    first
  )(concat(tracks, layout))

  return ({
    in: externalTrack.conf.outerRadius,
    out: externalTrack.conf.outerRadius + width,
  })
}

export function computeMinMax(conf, meta) {
  conf.cmin = conf.min === 'smart' ? meta.min : conf.min
  conf.cmax = conf.max === 'smart' ? meta.max : conf.max
  return conf
}

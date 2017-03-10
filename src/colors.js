import isFunction from 'lodash/isFunction'
import {scaleLog, scaleSequential} from 'd3-scale'

import {
  interpolateBrBG,
  interpolatePRGn,
  interpolatePiYG,
  interpolatePuOr,
  interpolateRdBu,
  interpolateRdGy,
  interpolateRdYlBu,
  interpolateRdYlGn,
  interpolateSpectral,
  interpolateBlues,
  interpolateGreens,
  interpolateGreys,
  interpolateOranges,
  interpolatePurples,
  interpolateReds,
  interpolateBuGn,
  interpolateBuPu,
  interpolateGnBu,
  interpolateOrRd,
  interpolatePuBuGn,
  interpolatePuBu,
  interpolatePuRd,
  interpolateRdPu,
  interpolateYlGnBu,
  interpolateYlGn,
  interpolateYlOrBr,
  interpolateYlOrRd
} from 'd3-scale-chromatic'

const palettes = {
  BrBG: interpolateBrBG,
  PRGn: interpolatePRGn,
  PiYG: interpolatePiYG,
  PuOr: interpolatePuOr,
  RdBu: interpolateRdBu,
  RdGy: interpolateRdGy,
  RdYlBu: interpolateRdYlBu,
  RdYlGn: interpolateRdYlGn,
  Spectral: interpolateSpectral,
  Blues: interpolateBlues,
  Greens: interpolateGreens,
  Greys: interpolateGreys,
  Oranges: interpolateOranges,
  Purples: interpolatePurples,
  Reds: interpolateReds,
  BuGn: interpolateBuGn,
  BuPu: interpolateBuPu,
  GnBu: interpolateGnBu,
  OrRd: interpolateOrRd,
  PuBuGn: interpolatePuBuGn,
  PuBu: interpolatePuBu,
  PuRd: interpolatePuRd,
  RdPu: interpolateRdPu,
  YlGnBu: interpolateYlGnBu,
  YlGn: interpolateYlGn,
  YlOrBr: interpolateYlOrBr,
  YlOrRd: interpolateYlOrRd
}

export function buildColorValue (
  color,
  min = null,
  max = null,
  logScale = false,
  logScaleBase = Math.E
) {
  if (isFunction(color)) {
    return color
  }
  const reverse = color[0] === '-'
  const paletteName = color[0] === '-' ? color.slice(1) : color
  if (palettes[paletteName]) {
    const scale = buildColorScale(
      palettes[paletteName], min, max, reverse, logScale, logScaleBase
    )
    return (d) => {
      return scale(d.value)
    }
  }
  return color
}

const buildColorScale = (
  interpolator,
  min,
  max,
  reverse = false,
  logScale = false,
  logScaleBase = Math.E
) => {
  if (logScale && min * max <= 0) {
    console.warn(`As log(0) = -∞, a log scale domain must be
      strictly-positive or strictly-negative. logscale ignored`
    )
  }

  if (logScale && min * max > 0) {
    const scale = scaleLog()
      .base(logScaleBase)
      .domain(reverse ? [max, min] : [min, max])
      .range([0, 1])
    return scaleSequential((t) => {
      return interpolator(scale(t))
    }).domain([0, 1])
  }
  return scaleSequential(interpolator)
    .domain(reverse ? [max, min] : [min, max])
}

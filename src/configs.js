const axes = {
  axes: {
    value: [],
    iteratee: false
  },
  showAxesTooltip: {
    value: true,
    iteratee: false
  }
}

const palette = {
  colorPaletteSize: {
    value: 9,
    iteratee: false
  },
  colorPalette: {
    value: 'YlGnBu',
    iteratee: false
  },
  usePalette: {
    value: true,
    iteratee: false
  },
  colorPaletteReverse: {
    value: true,
    iteratee: false
  }
}

const radial = {
  innerRadius: {
    value: 0,
    iteratee: false
  },
  outerRadius: {
    value: 0,
    iteratee: false
  }
}

const values = {
  min: {
    value: null,
    iteratee: false
  },
  max: {
    value: null,
    iteratee: false
  },
  logScale: {
    value: false,
    iteratee: false
  },
  logScaleBase: {
    value: Math.E,
    iteratee: false
  }
}

const common = {
  zIndex: {
    value: false,
    iteratee: false
  },
  opacity: {
    value: 1,
    iteratee: true
  },
  tooltipContent: {
    value: null,
    iteratee: false
  }
}

export {
  axes,
  palette,
  radial,
  values,
  common
}

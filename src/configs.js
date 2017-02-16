const axes = {
  axes: {
    display: {
      value: false,
      iteratee: false,
    },
    minor: {
      spacing: {
        value: 5,
        iteratee: false,
      },
      color: {
        value: '#d3d3d3',
        iteratee: false,
      },
      thickness: {
        value: 2,
        iteratee: false,
      },
    },
    major: {
      spacing: {
        value: 5,
        iteratee: false,
      },
      color: {
        value: '#000000',
        iteratee: false,
      },
      thickness: {
        value: 2,
        iteratee: false,
      },
    },
  },
};

const palette = {
  colorPaletteSize: {
    value: 9,
    iteratee: false,
  },
  colorPalette: {
    value: 'YlGnBu',
    iteratee: false,
  },
  usePalette: {
    value: true,
    iteratee: false,
  },
  colorPaletteReverse: {
    value: true,
    iteratee: false,
  },
};

const radial = {
  innerRadius: {
    value: 0,
    iteratee: false,
  },
  outerRadius: {
    value: 0,
    iteratee: false,
  },
};

const values = {
  min: {
    value: null,
    iteratee: false,
  },
  max: {
    value: null,
    iteratee: false,
  },
  logScale: {
    value: false,
    iteratee: false,
  },
  logScaleBase: {
    value: Math.E,
    iteratee: false,
  },
};

const common = {
  zIndex: {
    value: false,
    iteratee: false,
  },
  opacity: {
    value: false,
    iteratee: true,
  },
  tooltipContent: {
    value: null,
    iteratee: true,
  },
};

export {
  axes,
  palette,
  radial,
  values,
  common,
};

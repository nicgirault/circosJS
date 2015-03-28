var circos1 = new circosJS({
  container: '#chart',
  width: 460,
  height: 460
});

var temperatureConfig = {
  colorPalette: 'Spectral',
  colorPaletteSize: 10,
  colorPaletteReverse: true,
  min: -5,
  max: 30
}

var firstTempConfig = {
  innerRadius: 187,
  outerRadius: 197,
  colorPalette: 'Spectral',
  colorPaletteSize: 10,
  colorPaletteReverse: true,
  min: -5,
  max: 30
}

circos1
  .layout(
    {
      innerRadius: 200,
      outerRadius: 230,
      labels: {
        radialOffset: 12,
        position: 'center',
        display: true,
        size: 10,
        color: '#000'
      },
      ticks: {display: false},
    },
    layout_data
  )
  .heatmap('t2014', firstTempConfig, temperatures2014)
  .heatmap('t2013', temperatureConfig, temperatures2013)
  .heatmap('t2012', temperatureConfig, temperatures2012)
  .heatmap('t2011', temperatureConfig, temperatures2011)
  .heatmap('t2010', temperatureConfig, temperatures2010)
  .heatmap('t2009', temperatureConfig, temperatures2009)
  .heatmap('t2008', temperatureConfig, temperatures2008)
  .heatmap('t2007', temperatureConfig, temperatures2007)
  .render();

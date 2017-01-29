import Track from './Track';
import {parseSpanValueData} from '../dataParser';
import {arc} from 'd3-shape';
import assign from 'lodash/assign';
import {radial, palette, values, common} from '../configs';


const defaultConf = assign({
  backgrounds: {
    value: [],
    iteratee: false,
  },
}, radial, palette, values, common);

export default class Heatmap extends Track {
  constructor(instance, conf, data) {
    super(instance, conf, defaultConf, data, parseSpanValueData);
  }

  renderDatumContainer(instance, parentElement, name, data, conf) {
    const track = parentElement.append('g')
      .attr('class', conf.colorPalette);

    return this.renderBlock(track, data, instance._layout, conf);
  }

  renderDatum(parentElement, conf, layout, utils) {
    return parentElement.selectAll('tile')
      .data((d) => d.values)
      .enter().append('path')
      .attr('class', 'tile')
      .attr('opacity', conf.opacity)
      .attr('d', arc()
        .innerRadius(conf.innerRadius)
        .outerRadius(conf.outerRadius)
        .startAngle((d, i) => utils.theta(d.start, layout.blocks[d.block_id]))
        .endAngle((d, i) => utils.theta(d.end, layout.blocks[d.block_id]))
      )
      .attr('class', (d) => {
        return 'q' + utils.ratio(
          d.value,
          conf.cmin,
          conf.cmax,
          conf.colorPaletteSize,
          conf.colorPaletteReverse,
          conf.logScale
        ) + '-' + conf.colorPaletteSize;
      });
  }
}

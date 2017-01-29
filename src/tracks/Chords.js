import Track from './Track';
import {parseChordData} from '../dataParser';
import {registerTooltip} from '../behaviors/tooltip';
import {ribbon} from 'd3-chord';
import assign from 'lodash/assign';
import {palette, common, values} from '../configs';

const defaultConf = assign({
  color: {
    value: '#fd6a62',
    iteratee: true,
  },
}, palette, common, values);

export default class Chords extends Track {
  constructor(instance, conf, data) {
    super(instance, conf, defaultConf, data, parseChordData);
  }

  getCoordinates(d, layout) {
    const block = layout.blocks[d.id];
    const startAngle = block.start + d.start /
      block.len * (block.end - block.start);
    const endAngle = block.start + d.end /
      block.len * (block.end - block.start);

    return {
      radius: layout.conf.innerRadius,
      startAngle: startAngle,
      endAngle: endAngle,
    };
  }

  renderChords(parentElement, name, conf, data, layout, ratio, getCoordinates) {
    const track = parentElement
      .append('g')
      .attr('class', conf.colorPalette);

    const that = this
    const link = track
      .selectAll('.chord')
      .data(data)
      .enter().append('path')
      .attr('class', 'chord')
      .attr('d', ribbon()
        .source((d) => getCoordinates(d.source, layout))
        .target((d) => getCoordinates(d.target, layout))
      )
      .attr('opacity', conf.opacity)
      .on('mouseover', (d) =>
        that.dispatch.call('mouseover', this, d)
      )
      .on('mouseout', (d) =>
        that.dispatch.call('mouseout', this, d)
      );

    if (conf.usePalette) {
      link.attr('class', (d) => {
        return 'q' + ratio(
          d.value,
          conf.cmin,
          conf.cmax,
          conf.colorPaletteSize,
          conf.colorPaletteReverse,
          conf.logScale
        ) + '-' + conf.colorPaletteSize;
      });
    } else {
      link.attr('fill', conf.color);
    }
    return link;
  }

  render(instance, parentElement, name) {
    parentElement.select('.' + name).remove();

    const track = parentElement.append('g')
      .attr('class', name)
      .attr('z-index', this.conf.zIndex);

    const selection = this.renderChords(
      track,
      name,
      this.conf,
      this.data,
      instance._layout,
      this.ratio,
      this.getCoordinates
    );
    if (this.conf.tooltipContent) {
      registerTooltip(this, instance, selection, this.conf);
    }
    return this;
  }
}

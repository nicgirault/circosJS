import Track from './Track';
import {parsePositionTextData} from '../dataParser';
import forEach from 'lodash/forEach';
import assign from 'lodash/assign';
import {common, radial} from '../configs';

const defaultConf = assign({
  style: {
    value: {},
    iteratee: true,
  },
}, common, radial);

export default class Text extends Track {
  constructor(instance, conf, data) {
    super(instance, conf, defaultConf, data, parsePositionTextData);
  }

  renderDatumContainer(instance, parentElement, name, data, conf) {
    const track = parentElement.append('g')
      .attr('class', name);
    return this.renderBlock(track, data, instance._layout, conf);
  }

  renderDatum(parentElement, conf, layout, utils) {
    const text = parentElement.selectAll('g')
      .data((d) => d.values)
      .enter().append('g')
      .append('text')
      .text((d) => d.value)
      .attr('transform', (d) => {
        const angle = utils.theta(
          d.position,
          layout.blocks[d.block_id]
        )*360/(2*Math.PI) - 90;
        return `rotate(${angle}) translate(${conf.innerRadius}, 0)`;
      });
    forEach(conf.style, (value, key) => {
      text.style(key, value);
    });
    return text;
  }
}

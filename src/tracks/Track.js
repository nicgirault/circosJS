import {registerTooltip} from '../behaviors/tooltip';
import range from 'lodash/range';
import {dispatch} from 'd3-dispatch';
import {arc} from 'd3-shape';
import {getConf} from '../config-utils';

export default class Track {
  constructor(instance, conf, defaultConf, data, dataParser) {
    this.dispatch = dispatch('mouseover', 'mouseout');
    this.parseData = dataParser;
    this.loadData(data, instance);
    this.conf = getConf(conf, defaultConf, this.meta, instance);
  }

  loadData(data, instance) {
    const result = this.parseData(data, instance._layout.summary());
    this.data = result.data;
    this.meta = result.meta;
  }

  ratio(value, min, max, scope, reverse, logScale) {
    const scaleLogBase = logScale ? 2.3 : 1

    if (min === max || (value === min && !reverse) || (value === max && reverse)) {
      return 0
    }
    if (value === max || (value === min && reverse)) {
      return scope - 1
    }

    const fraction = (value - min) / (max - min)

    var x = Math.exp(1 / scaleLogBase * Math.log(fraction))

    if (reverse) {
      x = 1 - x
    }
    return Math.floor(scope * x)
  }

  render(instance, parentElement, name) {
    parentElement.select('.' + name).remove()
    const track = parentElement.append('g')
      .attr('class', name)
      .attr('z-index', this.conf.zIndex)
    const datumContainer = this.renderDatumContainer(instance, track, name, this.data, this.conf)
    if (this.conf.axes && this.conf.axes.display) {
      this.renderAxes(datumContainer, this.conf, instance._layout, this.data)
    }
    const selection = this.renderDatum(datumContainer, this.conf, instance._layout, this)
    if (this.conf.tooltipContent) {
      registerTooltip(this, instance, selection, this.conf)
    }
    selection.on('mouseover', (d, i, j) => {
      this.dispatch.call('mouseover', this, d)
    })
    selection.on('mouseout', (d, i, j) => {
      this.dispatch.call('mouseout', this, d)
    })

    return this
  }

  renderBlock(parentElement, data, layout, conf) {
    const scope = conf.outerRadius - conf.innerRadius
    const block = parentElement.selectAll('.block')
      .data(data)
      .enter().append('g')
      .attr('class', 'block')
      .attr(
        'transform',
        d => 'rotate(' + layout.blocks[d.key].start * 360 / (2 * Math.PI) + ')'
      )

    if (conf.backgrounds) {
      block.selectAll('.background')
        .data(conf.backgrounds)
        .enter().append('path')
        .attr('class', 'background')
        .attr('fill', background => background.color)
        .attr('opacity', background => background.opacity || 1)
        .attr('d', arc()
          .innerRadius((background) => {
            if (conf.direction === 'in') {
              return conf.outerRadius - scope * background.start
            }
            else {
              return conf.innerRadius + scope * background.start
            }
          })
          .outerRadius(background => {
            if (conf.direction == 'in') {
              return conf.outerRadius - scope * background.end
            }
            else {
              return conf.innerRadius + scope * background.end
            }
          })
          .startAngle((d,i,j) => 0)
          .endAngle((d,i,j) => layout.blocks[data[j].key].end - layout.blocks[data[j].key].start)
        )
    }

    return block
  }

  renderAxes(parentElement, conf, layout, data) {
    const axes = range(conf.innerRadius, conf.outerRadius, conf.axes.minor.spacing)

    const axis = arc()
      .innerRadius(d => d.height)
      .outerRadius(d => d.height)
      .startAngle(0)
      .endAngle((d) => d.length)

    return parentElement.selectAll('.axis')
      .data(blockData => {
        const block = layout.blocks[blockData.key]
        return axes.map(height => {
          return {
            height: height,
            length: block.end - block.start,
          };
        })
      })
      .enter().append('path')
      .attr('opacity', conf.opacity)
      .attr('class', 'axis')
      .attr('d', axis)
      .attr(
        'stroke-width',
        (d, i) => i % conf.axes.major.spacing === 0 ?
          conf.axes.major.thickness : conf.axes.minor.thickness
      )
      .attr(
        'stroke',
        (d, i) => i % conf.axes.major.spacing === 0 ?
          conf.axes.major.color : conf.axes.minor.color
      )
  }

  theta(position, block) {
    return position / block.len * (block.end - block.start)
  }

  x(d, layout, conf) {
    const height = this.ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale)
    const r = conf.direction === 'in' ?
      conf.outerRadius - height : conf.innerRadius + height

    const angle = this.theta(d.position, layout.blocks[d.block_id]) - Math.PI/2
    return r * Math.cos(angle)
  }

  y(d, layout, conf) {
    const height = this.ratio(d.value, conf.cmin, conf.cmax, conf.outerRadius - conf.innerRadius, false, conf.logscale)
    const r = conf.direction === 'in' ?
      conf.outerRadius - height : conf.innerRadius + height

    const angle = this.theta(d.position, layout.blocks[d.block_id]) - Math.PI/2
    return r * Math.sin(angle)
  }
}

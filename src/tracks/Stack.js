import Track from './Track'
import {parseSpanValueData} from '../dataParser'
import {arc} from 'd3-shape'
import assign from 'lodash/assign'
import forEach from 'lodash/forEach'
import {palette, axes, radial} from '../configs'

const defaultConf = assign({
  color: '#fd6a62',
  min: 'smart',
  max: 'smart',
  direction: 'out',
  logScale: false,
  thickness: 10,
  radialMargin: 2,
  margin: 2,
  strokeWidth: 1,
  strokeColor: '#000000',
  backgrounds: [],
  zIndex: 1,
  opacity: 1,
  tooltipContent: null,
}, palette, axes, radial)

export default class Stack extends Track {
  constructor(instance, conf, data) {
    super(instance, conf, defaultConf, data, parseSpanValueData)
    this.buildLayers(this.data, this.conf.margin)
  }

  buildLayers(data, margin) {
    forEach(data, (block, idx) => {
      console.log(idx, block)
      block.values = block.values.sort((a,b) => {
        if (a.start < b.start) {
          return -1
        }
        if (a.start == b.start && a.end > b.end) {
          return -1
        }
        if (a.start == b.start && a.end == b.end) {
          return 0
        }
        return 1
      })
      var layers = []
      forEach(block.values, datum => {
        var placed = false
        forEach(layers, (layer, i) => {
          // try to place datum
          const lastDatumInLayer = layer.slice(0).pop()
          if (lastDatumInLayer.end + margin < datum.start) {
            layer.push(datum)
            datum.layer = i
            placed = true
            return false
          }
        })
        if (!placed) {
          datum.layer = layers.length
          layers.push([datum])
        }
      })
    })
  }

  datumRadialPosition(d) {
    const radialStart = (this.conf.thickness + this.conf.radialMargin) * d.layer
    const radialEnd = radialStart + this.conf.thickness

    if (this.conf.direction === 'out') {
      return [
        this.conf.innerRadius + radialStart,
        Math.min(this.conf.innerRadius + radialEnd, this.conf.outerRadius)
      ]
    }

    if (this.conf.direction === 'in') {
      return [
        Math.max(this.conf.outerRadius - radialEnd, this.conf.innerRadius),
        this.conf.outerRadius - radialStart
      ]
    }

    if (this.conf.direction === 'center') {
      const origin = Math.floor((this.conf.outerRadius + this.conf.innerRadius) / 2)
      const radialStart = (this.conf.thickness + this.conf.radialMargin) * Math.floor(d.layer / 2)
      const radialEnd = radialStart + this.conf.thickness

      if (d.layer % 2 === 0) {
        return [
          origin + radialStart,
          origin + radialEnd
        ]
      }
      else {
        return [
          origin - radialStart - this.conf.radialMargin,
          origin - radialEnd - this.conf.radialMargin
        ]
      }
    }
  }

  renderDatumContainer(instance, parentElement, name, data, conf) {
    const track = parentElement.append('g')
      .attr('class', conf.colorPalette)
    return this.renderBlock(track, data, instance._layout, conf)
  }

  renderDatum(parentElement, conf, layout, utils) {
    const that = this

    return parentElement.selectAll('.tile')
      .data(d => {
        return d.values.map(datum => {
          console.log(datum)
          const radius = that.datumRadialPosition(datum)
          return {
            innerRadius: radius[0],
            outerRadius: radius[1],
            startAngle: utils.theta(datum.start, layout.blocks[datum.block_id]),
            endAngle: utils.theta(datum.end, layout.blocks[datum.block_id]),
          }
        })
      })
      .enter().append('path')
      .attr('class', 'tile')
      .attr('d', arc())
      .attr('opacity', d => d.opacity || conf.opacity)
      .attr('stroke-width', d => d.strokeWidth || conf.strokeWidth)
      .attr('stroke', d => d.strokeColor || conf.strokeColor)
      .attr('fill', d => d.color || conf.color)
      .attr('class', d => {
        const usePalette = d.usePalette || conf.usePalette
        if (usePalette) {
          return 'q' + utils.ratio(
            d.value,
            conf.cmin,
            conf.cmax,
            conf.colorPaletteSize,
            conf.colorPaletteReverse,
            conf.logScale
          ) + '-' + conf.colorPaletteSize
        }
      })
  }
}

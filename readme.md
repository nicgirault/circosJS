# Circos [![Circle CI](https://circleci.com/gh/nicgirault/circosJS.svg?style=shield)](https://circleci.com/gh/nicgirault/circosJS) [![Coverage Status](https://coveralls.io/repos/github/nicgirault/circosJS/badge.svg?branch=master)](https://coveralls.io/github/nicgirault/circosJS?branch=master)

## table of contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Layout](#layout)
- [Tracks](#tracks)
  - [Chords](#chords)
  - [Heatmap](#heatmap)
  - [Highlight](#highlight)
  - [Histogram](#histogram)
  - [Line](#line)
  - [Scatter](#scatter)
  - [Text](#text)

## Introduction

Circos is a javascript library to easily build interactive graphs in a circular layout. It's based on [d3.js](https://d3js.org/). It aims to be a javascript version of the [Circos](http://circos.ca) software.

You should consider using Circos to show:

- relationships between entities
- periodical data

<p align="center">
  <img src="doc/temperatures.png" width="60%" alt="temperatures">
  <br/>
  <i>Average temperatures in Paris from 2007 (inner) to 2014 (outer). The circular layout highlights seasonal effect.</i>
</p>

## Installation

If you don't know what is yarn or npm you can skip this step and get started with [this canvas](doc/canvas.html). Otherwise:

```
yarn install circosjs
```

## Layout

To instantiate a new circos:

```javascript
var myCircos = new Circos({
    container: '#chart',
    width: 500,
    height: 500,
});
```

A circos graph is based on a circular axis **layout**. Data tracks appear inside and/or outside the circular layout.

In order to place data on the circos graph, you must first specify the layout.

```javascript
myCircos.layout(data, configuration);
```

The first argument of the `layout` function is a configuration object that control the format of the layout.

Here are the default parameters for a layout:

```javascript
var configuration = {
  innerRadius: 250,
  outerRadius: 300,
  cornerRadius: 10,
  gap: 0.04, // in radian
  labels: {
    display: true,
    position: 'center',
    size: '14px',
    color: '#000000',
    radialOffset: 20,
  },
  ticks: {
    display: true,
    color: 'grey',
    spacing: 10000000,
    labels: true,
    labelSpacing: 10,
    labelSuffix: 'Mb',
    labelDenominator: 1000000,
    labelDisplay0: true,
    labelSize: '10px',
    labelColor: '#000000',
    labelFont: 'default',
    majorSpacing: 5,
    size: {
      minor: 2,
      major: 5,
    }
  },
  clickCallback: null
}
```

The second argument of the `layout` function is an array of data that describe the layout regions. Each layout region must have an id and a length. You can also specify a color and a label.

```javascript
var data = [
  { len: 31, color: "#8dd3c7", label: "January", id: "january" },
  { len: 28, color: "#ffffb3", label: "February", id: "february" },
  { len: 31, color: "#bebada", label: "March", id: "march" },
  { len: 30, color: "#fb8072", label: "April", id: "april" },
  { len: 31, color: "#80b1d3", label: "May", id: "may" },
  { len: 30, color: "#fdb462", label: "June", id: "june" },
  { len: 31, color: "#b3de69", label: "July", id: "july" },
  { len: 31, color: "#fccde5", label: "August", id: "august" },
  { len: 30, color: "#d9d9d9", label: "September", id: "september" },
  { len: 31, color: "#bc80bd", label: "October", id: "october" },
  { len: 30, color: "#ccebc5", label: "November", id: "november" },
  { len: 31, color: "#ffed6f", label: "December", id: "december" }
]
```

The `id` parameter will be used to place data points on the layout.

To visualize the result:

```javascript
myCircos.render();
```


## Tracks

A track is a series of data points.

To add a track to your graph you should write something like this:

```javascript
myCircos.heatmap(
    'my-heatmap',
    data,
    {
        // your heatmap configuration (optional)
    },
);
```

This pattern is similar to all track types:

```javascript
myCircos.trackType('track-id', data, configuration);
```

**Note**: The track name is used as a HTML class name so here are the format limitations.

* Must be unique.
* Should be slug style for simplicity, consistency and compatibility. Example: `heatmap-1`
* Lowercase, a-z, can contain digits, 0-9, can contain dash or dot but not start/end with them.
* Consecutive dashes or dots not allowed.
* 50 characters or less.


### Chords

Chords tracks connect layout regions.

<p align="center">
  <img src="doc/chords.png" width="60%" alt="chords">
  <br/>
  <i>Some gene fusions in human karyotype (<a href="demo/chords">source</a>)</i>
</p>

Data should looks like this:

```javascript
var data = [
    // sourceId, sourceStart, sourceEnd, targetId, targetStart, targetEnd
    ['january', 1, 12, 'april', 18, 20],
    ['february', 20, 28, 'december', 1, 13],
];
```

Optionally each datum can define a seventh element which can be used to be interpreted as a `value` to draw colored ribbons with palettes or a color function.

The default configuration is:

```javascript
{
  color: '#fd6a62',
  opacity: 0.7,
  zIndex: 1,
  tooltipContent: null,
  min: null,
  max: null,
  logScale: false,
  logScaleBase: Math.E,
}
```

### Heatmap

<p align="center">
  <img src="doc/heatmap.png" width="60%" alt="heatmap">
  <br/>
  <i>Electrical comsumption in France in 2014</i>
</p>

To add a heatmap to your circos instance:

```javascript
myCircos.heatmap('electrical-consumption', data, configuration);
```

Configuration:

```javascript
{
  innerRadius: null,
  outerRadius: null,
  min: null,
  max: null,
  color: 'YlGnBu',
  logScale: false,
  tooltipContent: null,
}
```

Data format:

```javascript
var data = [
    // each datum should be
    // layout_block_id, start, end, value
    ['january', 0, 1, 1368001],
    ['january', 1, 2, 1458583],
    ['january', 2, 3, 1481633],
    ['january', 3, 4, 1408424]
    ...
    ['february', 0, 1, 1577419],
    ['february', 1, 2, 1509311],
    ['february', 2, 3, 1688266],
    ...
]
```

### Stack



### Highlight

<p align="center">
  <img src="doc/highlight.png" width="60%" alt="highlight">
  <br/>
  <i>Human karyotype with cytobands highlighted (<a href="demo/highlight">source</a>)</i>
</p>

To add a highlight to your circos instance:

```javascript
myCircos.highlight('cytobands', data, configuration);
```

The minimal datum should have `block_id`, `start` and `end` attributes.

Configuration:

```javascript
{
  innerRadius: null,
  outerRadius: null,
  min: null,
  max: null,
  color: 'd3d3d3',
  strokeColor: null,
  strokeWidth: 0,
  opacity: 1,
  logScale: false,
  tooltipContent: null,
}
```

### Histogram

<p align="center">
  <img src="doc/histogram.png" width="60%" alt="histogram">
  <br/>
  <i>Genetic abnormalities in human stem cells (<a href="demo/histogram">source</a>)</i>
</p>

Data should looks like this:

```javascript
var data = [
    {
      block_id: 'january',
      start: 1,
      end: 10,
      value: 5
    }
];
```

The default configuration is:

```javascript
{
  color: '#fd6a62',
  opacity: 0.7,
  zIndex: 1,
  tooltipContent: null,
  min: null,
  max: null,
  logScale: false,
  logScaleBase: Math.E,
}
```

### Line

<p align="center">
  <img src="doc/line.png" width="60%" alt="line">
  <br/>
  <i>Some single nucleotide polymorphism on chromosomes 1, 2 and 3 (<a href="demo/line">source</a>)</i>
</p>

```javascript
myCircos.line('line1', data, configuration);
```

The minimal datum should have `block_id`, `position` and `value` attributes.

Configuration:

```javascript
{
  innerRadius: null,
  outerRadius: null,
  min: null,
  max: null,
  color: 'd3d3d3',
  strokeColor: null,
  strokeWidth: 0,
  direction: 'out',
  fill: false,
  fillColor: '#d3d3d3',
  maxGap: null,
  opacity: 1,
  logScale: false,
}
```

**Note**: The tooltip option is not available for line track. To display a tooltip, you should superimpose an invisble `scatter` track (`fill: false` and `strokeWidth: 0`) and set a tooltip for this track.

### Scatter

<p align="center">
  <img src="doc/scatter.png" width="60%" alt="scatter">
  <br/>
  <i><a href="demo/line">source</a></i>
</p>

```javascript
myCircos.scatter('scatter1', data, configuration);
```

The minimal datum should have `block_id`, `position` and `value` attributes.

Configuration:

```javascript
{
  innerRadius: null,
  outerRadius: null,
  min: null,
  max: null,
  color: 'd3d3d3',
  strokeColor: '#d3d3d3',
  strokeWidth: 1,
  direction: 'out',
  fill: true,
  size: 15,
  shape: 'circle', // circle, cross, diamond, square, triangle, star, wye
  opacity: 1,
  logScale: false,
}
```

### Text

<p align="center">
  <img src="doc/text.png" width="60%" alt="text">
  <br/>
  <i><a href="demo/text">source</a></i>
</p>

```javascript
myCircos.text('text', data, configuration);
```

The minimal datum should have `block_id`, `position` and `value` attributes.

Configuration:

```javascript
{
  innerRadius: null,
  outerRadius: null,
  style: {
    'font-size': 12,
    color: 'black',
  },
  opacity: 1,
}
```

## Colors

You can specify the color of the track in the track configuration:

```javascript
{
  color: '#d3d3d3'
}
```

You can specify:

- any css color code e.g `#d3d3d3`, `blue`, `rgb(0, 0, 0)`
- a palette name from the list below (it comes from [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic)). In this case the color will be computed dynamically according to the datum value. If you prefix the palette name with a `-` (e.g `-BrBG`), the palette will be reversed.
- a function with this signature: `function(datum, index) { return colorCode}`

**BrBG**:
<img src="doc/palettes/BrBG.png" width="100%" height="10">
**PRGn**:
<img src="doc/palettes/PRGn.png" width="100%" height="10">
**PiYG**:
<img src="doc/palettes/PiYG.png" width="100%" height="10">
**PuOr**:
<img src="doc/palettes/PuOr.png" width="100%" height="10">
**RdBu**:
<img src="doc/palettes/RdBu.png" width="100%" height="10">
**RdGy**:
<img src="doc/palettes/RdGy.png" width="100%" height="10">
**RdYlBu**:
<img src="doc/palettes/RdYlBu.png" width="100%" height="10">
**RdYlGn**:
<img src="doc/palettes/RdYlGn.png" width="100%" height="10">
**Spectral**:
<img src="doc/palettes/Spectral.png" width="100%" height="10">
**Blues**:
<img src="doc/palettes/Blues.png" width="100%" height="10">
**Greens**:
<img src="doc/palettes/Greens.png" width="100%" height="10">
**Greys**:
<img src="doc/palettes/Greys.png" width="100%" height="10">
**Oranges**:
<img src="doc/palettes/Oranges.png" width="100%" height="10">
**Purples**:
<img src="doc/palettes/Purples.png" width="100%" height="10">
**Reds**:
<img src="doc/palettes/Reds.png" width="100%" height="10">
**BuGn**:
<img src="doc/palettes/BuGn.png" width="100%" height="10">
**BuPu**:
<img src="doc/palettes/BuPu.png" width="100%" height="10">
**GnBu**:
<img src="doc/palettes/GnBu.png" width="100%" height="10">
**OrRd**:
<img src="doc/palettes/OrRd.png" width="100%" height="10">
**PuBuGn**:
<img src="doc/palettes/PuBuGn.png" width="100%" height="10">
**PuBu**:
<img src="doc/palettes/PuBu.png" width="100%" height="10">
**PuRd**:
<img src="doc/palettes/PuRd.png" width="100%" height="10">
**RdPu**:
<img src="doc/palettes/RdPu.png" width="100%" height="10">
**YlGnBu**:
<img src="doc/palettes/YlGnBu.png" width="100%" height="10">
**YlGn**:
<img src="doc/palettes/YlGn.png" width="100%" height="10">
**YlOrBr**:
<img src="doc/palettes/YlOrBr.png" width="100%" height="10">
**YlOrRd**:
<img src="doc/palettes/YlOrRd.png" width="100%" height="10">

## Min/Max

The default min and max values are computed according to the dataset. You can override these values by specifying a `min` or `max` attribute in the configuration.

## Axes



## Radius

< 1, < 10,

## Backgrounds

Si pas de end ou start > max

## Custom datum formatting

## Contact

Nicolas Girault
nic.girault@gmail.com

Your feedbacks are welcome. If you're struggling using the librairy, the best way to ask questions is to use the Github issues so that they are shared with everybody.

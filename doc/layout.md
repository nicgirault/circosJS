# Layout

To instantiate a new circos:
```javascript
var instance = new circosJS({
    container: '#chart',
    width: 200,
    height: 200
});
```

A circos graph is based on a circular axis **layout**. Data tracks appear inside and/or outside the circular layout.

In order to place data on the circos graph, you must first specify a layout.

```javascript
instance.layout(configuration, layout_data);
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
var layout_data = [
  { "len": 31, "color": "#8dd3c7", "label": "January", "id": "january" },
  { "len": 28, "color": "#ffffb3", "label": "February", "id": "february" },
  { "len": 31, "color": "#bebada", "label": "March", "id": "march" },
  { "len": 30, "color": "#fb8072", "label": "April", "id": "april" },
  { "len": 31, "color": "#80b1d3", "label": "May", "id": "may" },
  { "len": 30, "color": "#fdb462", "label": "June", "id": "june" },
  { "len": 31, "color": "#b3de69", "label": "July", "id": "july" },
  { "len": 31, "color": "#fccde5", "label": "August", "id": "august" },
  { "len": 30, "color": "#d9d9d9", "label": "September", "id": "september" },
  { "len": 31, "color": "#bc80bd", "label": "October", "id": "october" },
  { "len": 30, "color": "#ccebc5", "label": "November", "id": "november" },
  { "len": 31, "color": "#ffed6f", "label": "December", "id": "december" }
]
```

The `id` parameter will be used to place data points on the layout.

To visualize the result:
```javascript
instance.render();
```

<svg id='chart' style='display: block; margin: auto;'></svg>
<script src='_data/months.js'></script>
<script src='_scripts/layout.js'></script>

[JsFiddle](http://jsfiddle.net/nicgirault/b025s1r9/1)

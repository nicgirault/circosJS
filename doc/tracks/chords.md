# Chords

Chords tracks connect layout regions. It is one of the main reason to choose to display data in a circular layout.

[Demo](http://jsfiddle.net/nicgirault/b025s1r9/2/)

Data should looks like this:

```javascript
chords_data = [
    {
        source: {id: 'january', start: 1, end: 12},
        target: {id: 'april', start: 18, end: 20},
        value: 2
    },
    {
        source: {id: 'february', start: 20, end: 28},
        target: {id: 'december', start: 1, end: 13},
        value: 1
    }
];
```

Note: the `value` parameter will be optional in a futur version of circosJS. It can be used to configure the track with `usePalette: true`.

The default configuration is:
```javascript
{
    usePalette: true,
    colorPaletteSize: 9,
    colorPalette: 'PuBuGn',
    color: '#fd6a62',
    opacity: 0.7,
    min: 'smart',
    max: 'smart',
    logScale: false
}
```

The color of the chords can be defined by
* a color palette from [colorBrewer](http://colorbrewer2.org) (`usePalette: true`).Then you should define the `colorPalette` and the `colorPaletteSize` parameters. The color index of the palette is related to the value of the datum.
* a simple color (`usePalette: false`).

If `usePalette: true`, you can specify the min and max values of the dataset. If `'smart'` is used, the minimum and maximum will fit the range of values of the dataset.

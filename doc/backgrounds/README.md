# Backgrounds

[Demo](http://jsfiddle.net/nicgirault/132qo4ra/)

When defining a track, you can specify track backgrounds:

```javascript
instance.line('my-track', conf, data, rules, backgrounds);
```

Backgrounds must be an array of background objects. A background object should have the following attributes:
- start [number] between 0 and 1: the radial start of the background. 0 corresponds to the innerRadius of the track. 1 corresponds to the outerRadius of the track.
- end [number] between 0 and 1: the radial end of the background.
- color [string] the color of the background
- opacity [number] between 0 and 1 (default is 1)
- parent [string, array]: if you don't want the background to be drawn all around the graph, you can specify the parent id(s) of the layout block(s) on which should be drawn the background (default is null)

```javascript
backgrounds = [
    {start: 0, end 0.5, color: '#d3d3d3'},
    {start: 0.5, end 0.8, color: '#fdbb84', opacity: 0.8},
    {start: 0.8, end 1, color: '#e34a33', parent: ['january', 'february']},
    {start: 0.8, end 1, color: '#2c7fb8', parent: 'march'}
];
```

Tracks supporting backgrounds option:
- [x] Scatter
- [x] Line
- [x] Stack
- [x] Histogram
- [x] Heatmap
- [ ] Chords

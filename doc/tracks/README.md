# Tracks

A track is a series of data points. There are currently 6 ways to represent series of data points:
* Chords
* Heatmap
* Histogram
* Line
* Scatter
* Stack

To add a track to your circos instance you should write something like this:
```javascript
instance.heatmap(
    'my-heatmap',
    {
        // your heatmap configuration
    },
    heatmap_data
);
```

This pattern is similar to all track types:
```javascript
instance.trackType('track-name', configuration, data);
```

About the track name:

* Must be unique.
* Should be slug style for simplicity, consistency and compatibility. Example: `heatmap-1`
* Lowercase, a-z, can contain digits, 0-9, can contain dash or dot but not start/end with them.
* Consecutive dashes or dots not allowed.
* 50 characters or less.

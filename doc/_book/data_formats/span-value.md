# Span-Value

Many circosjs tracks show values associated to a span. The following data format is common to stacks, histograms...

There are two valid data formats:
* The first one gather data by layout block:

```javascript
var data = [
    {
        parent: 'january',
        data: [
            {start: 1, end: 3, value: 2},
            {start: 17, end: 20, value: 13},
            {start: 2, end: 7, value: -3}
        ]
    },
    {
        parent: 'february',
        data: [
            {start: 4, end: 5, value: 1},
            {start: 1, end: 20, value: 4}
        ]
    },
    ...
]
```

* The second one is an array of data:

```javascript
var data = [
    {parent: 'january', start: 1, end: 3, value: 2},
    {parent: 'january', start: 17, end: 20, value: 13},
    {parent: 'january', start: 2, end: 7, value: -3},
    {parent: 'february', start: 4, end: 5, value: 1},
    {parent: 'february', start: 1, end: 20, value: 4},
]
```

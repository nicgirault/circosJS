# Get started

The code written in this document is based on this canvas.

```html
<!DOCTYPE html>
<html>

<head>
    <link rel='stylesheet' href='colorBrewer.css'></link>
    <script src="d3/d3.min.js"></script>
    <script src='circosJS.js'></script>
</head>

<body>
    <svg id='chart'></svg>

    <script>
        // here should be your code
    </script>
</body>

</html>

```

To instantiate a new graph:
```javascript
var instance = circosJS({
    container: '#chart',
    width: 500,
    height: 500
});
```


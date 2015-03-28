# Get started

### Installation

If you are not a noob but you are reading this section:

```
bower install circosjs
```

Otherwise you can pick one of these files in the
[dist](https://github.com/nicgirault/circosJS/tree/master/dist) directory:
* `circos.js` or `circos.min.js` (circos librairy **without d3.js**)
* `circos.full.js` or `circos.full.min.js` (circos **librairy with d3.js**)

You will also need the `colorBrewer.css` file if you use [color brewer palettes](http://colorbrewer2.org/).


### Canvas

The code written in the next sections will alway assume it is written in this context:

```html
<!DOCTYPE html>
<html>

<head>
    <link rel='stylesheet' href='colorBrewer.css'></link>
    <script src='circos.full.min.js'></script>
</head>

<body>
    <svg id='chart'></svg>

    <script>
        // here should be your code
    </script>
</body>

</html>

```

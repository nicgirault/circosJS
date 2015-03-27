# Stack

Stack tracks can be used to show spans over the layout. Spans will stack within their track to avoid overlap.

Demo (coming soon)

Configuration
-------------
specific configuration parameters:
* direction: [string] `in`, `out` or `center`
* thickness: [integer] the radial thickness of a span (in pixel)
* margin: [integer] the

Data formating
--------------

The data format is describe in this section.

For stack rules, a special argument can be passed in the rule condition:

```javascript
var rules = [
    {
        parameter: 'color',
        value: 'red',
        condition: function(parent, datum, layer_index){
            return (layer_index > 2);
        }
    }
]
```

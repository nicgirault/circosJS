# Rules

Rules is a way to apply specific formating according to a given datum caracteristics.

When defining a track, you can specify an array of rules:
```javascript
instance.stack(
    'my-stack',
    {
        color: 'blue'
    },
    data,
    rules
);
```

A rule is an object with the following parameters:
* `parameter`: the configuration parameter affected by the rule
* `value`: the value of the configuration parameter if the condition function return true
* `condition`: a function that test a datum. If returning `true`, the defined value will be applied to the defined parameter for this specific datum. The condition function receives several arguments:
    * the parent id
    * the datum
    * track specific details

Examples:
---------

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
Demo (coming soon)


```javascript
var rules = [
    {
        parameter: 'color',
        value: 'red',
        condition: function(parent, datum, layer_index){
            return (datum.end - datum.start > 5);
        }
    }
]
```
Demo (coming soon)


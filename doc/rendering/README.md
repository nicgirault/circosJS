# Rendering

At any time you can render you circos image:
```javascript
instance.render();
```

If you are interested in rendering specific tracks, you can do it like this:
```javascript
instance.render(['trackname1', 'trackname2']);
```
To render the layout, you can specify `'layout'` in the array of the tracks to render.

What if a track is named `'layout'`? I don't know!




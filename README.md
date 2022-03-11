# simpleblr

This is a lightweight set of Javascript utilities for Tumblr themes. It does not rely on any external libraries like jQuery.

Endless scrolling and layout resizing are not supported out of the box, but should be easy to hook up.

## Setup

Add after the `</style>` tag:
  
```
<link rel="stylesheet" href="/path/to/simpleblr.css" />
```

Add before the `</body>` tag:

```
<script src="/path/to/simpleblr.js"></script>
<script>
window.addEventListener('DOMContentLoaded', (event) => Simpleblr.run())
</script>
```

If you want to, you can only run individual functions instead of all of Simpleblr.

*Note: You will have to host your own copy. Github doesn't let you embed files directly from repositories.*

## NPF Posts

Photosets made with NPF are normalized to have the same margin (multi-photo rows) and apparent resolution (single photo rows).

## Reblogs

Reblogs are supported with `data-reblog-item-body`. Simpleblr cleans up reblogs by removing empty paragraphs and leading line breaks.

### Example

```html
{block:RebloggedFrom}
  <div>
    {block:Reblogs}
      <section>
        <div>{Username}</div>
        <div data-reblog-item-body>
          {Body}
        </div>
      </section>
    {/block:Reblogs}
  </div>
{/block:RebloggedFrom}
```

## Photosets

Custom photosets are supported with `data-photoset-layout`, `data-photoset-item`, `data-width`, and `data-height`.

### Example

```html
{block:Photoset}
  <div data-photoset-layout="{PhotosetLayout}">
    {block:Photos}
      <span data-photoset-item>
        {block:LinkURL}<a href="{LinkURL}">{/block:LinkURL}
        {block:HighRes}<a href="{PhotoURL-HighRes}">{/block:HighRes}
          <img src="{PhotoURL-1280}" alt="{PhotoAlt}" data-width="{PhotoWidth-1280}" data-height="{PhotoHeight-1280}">
        {block:HighRes}</a>{/block:HighRes}
        {block:LinkURL}</a>{/block:LinkURL}
      </span>
    {/block:Photos}
  </div>
{/block:Photoset}
```

### Customization

To change the spacing between photos:

- Modify `simpleblr.css` and change the paddings in the `/* Support photoset layouts */` section.
- Set `Simpleblr.PHOTOSET_SPACING` before Simpleblr runs.

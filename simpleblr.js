var Simpleblr = Simpleblr || {}

Simpleblr.MAX_ROW_HEIGHT = Simpleblr.MAX_ROW_HEIGHT || 1280
Simpleblr.PHOTOSET_SPACING = Simpleblr.PHOTOSET_SPACING || 4

/* Make NPF photos that are on their own row higher res */
Simpleblr.loadHighResNPFPhotos = function () {
    document.querySelectorAll('a[data-big-photo]').forEach(function(link) {
        if (link.closest('.npf_col') === null) {
            var photo = link.querySelector('img')
            photo.src = link.dataset.bigPhoto
        }
    })
}

/* Remove <br>s at the start of paragraphs in reblogged posts */
Simpleblr.removeReblogLeadingBreaks = function () {
    document.querySelectorAll('[data-reblog-item-body] p > br').forEach(function (br) {
        if (br.parentElement.firstChild === br) {
            br.remove()
        }
    })
}

/* Remove empty <p>s from reblogged posts. Must be run after removeReblogLeadingBreaks. */
Simpleblr.removeReblogEmptyParagraphs = function () {
    document.querySelectorAll('[data-reblog-item-body] p:empty').forEach(function (p) {
        p.remove()
    })
}

/* Layout photosets */
Simpleblr.layoutPhotosets = function() {
    var query = '[data-photoset-layout]:not([data-photoset-created])'
    document.querySelectorAll(query).forEach(function (photoset) {
        var items = photoset.querySelectorAll('[data-photoset-item]')
        var itemIndex = 0
        var photosetWidth = photoset.clientWidth // no padding on this pls :(

        photoset.dataset.photosetLayout.split('').forEach(function (rowLayout) {
            var row = document.createElement('div')
            row.dataset.photosetRow = rowLayout

            var columnCount = parseInt(rowLayout)
            if (columnCount === 1) {
                var item = items[itemIndex]
                item.dataset.photosetItem = true

                row.appendChild(item)
                photoset.appendChild(row)
                itemIndex += columnCount
                continue
            }

            var itemWidth = (photosetWidth - Simpleblr.PHOTOSET_SPACING * (columnCount - 1)) / columnCount

            // Calculate row height
            var rowHeight = Simpleblr.MAX_ROW_HEIGHT
            for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
                var item = items[itemIndex + columnIndex]
                var image = item.querySelector('img')
                var resizedHeight = image.height / image.width * itemWidth
                if (resizedHeight < rowHeight) {
                    rowHeight = resizedHeight
                }
            }

            // Set item position + dimensions
            for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
                var item = items[itemIndex + columnIndex]
                item.dataset.photosetItem = true
                row.appendChild(item)

                var image = item.querySelector('img')
                var resizedHeight = image.height / image.width * itemWidth
                var halfExtraHeight = (resizedHeight - rowHeight) / 2
                image.width = itemWidth
                if (halfExtraHeight > 0) {
                    image.style += "; margin-top: -" + halfExtraHeight + "px"
                }
            }

            row.style += "; height: " + rowHeight + "px"
            photoset.appendChild(row)
        
            itemIndex += columnCount
        })

        photoset.dataset.photosetCreated = true
    })
}

/* Run everything */
Simpleblr.run = function () {
    Simpleblr.loadHighResNPFPhotos()
    Simpleblr.removeReblogLeadingBreaks()
    Simpleblr.removeReblogEmptyParagraphs()
    Simpleblr.layoutPhotosets()
}

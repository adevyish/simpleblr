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

/* Remove extra whitespace from reblogged posts */
Simpleblr.removeReblogExtraWhitespace = function () {
    // Remove <p>s with no text
    document.querySelectorAll('[data-reblog-item-body] p').forEach(function (p) {
        if (p.childElementCount === 0 && p.textContent.trim().length === 0) {
            p.remove()
        }
    })
    // Remove <br>s at the start of paragraphs
    document.querySelectorAll('[data-reblog-item-body] p > br').forEach(function (br) {
        if (br.parentElement.firstChild === br) {
            br.remove()
        }
    })
}

/* Layout photosets */
Simpleblr.layoutPhotosets = function() {
    document.querySelectorAll('[data-photoset-layout]').forEach(function (photoset) {
        var items = photoset.querySelectorAll('[data-photoset-item]')
        var itemIndex = 0
        var photosetWidth = photoset.clientWidth // no padding on this pls :(
        if (photoset.dataset.photosetWidth !== photosetWidth) {
            photoset.querySelectorAll('[data-photoset-row]').forEach(function (row) {
                row.remove()
            })

            photoset.dataset.photosetLayout.split('').forEach(function (rowLayout) {
                var row = document.createElement('div')
                row.dataset.photosetRow = rowLayout

                var columnCount = parseInt(rowLayout)
                if (columnCount === 1) {
                    var item = items[itemIndex++]
                    item.dataset.photosetItem = true
                    row.appendChild(item)
                } else {
                    var spacingInRow = Simpleblr.PHOTOSET_SPACING * (columnCount - 1)
                    var itemWidth = window.Math.floor((photosetWidth - spacingInRow) / columnCount)

                    var rowHeight = Simpleblr.MAX_ROW_HEIGHT
                    for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
                        var item = items[itemIndex++]
                        item.dataset.photosetItem = true
                        row.appendChild(item)

                        var image = item.querySelector('img')
                        var resizedHeight = image.dataset.height / image.dataset.width * itemWidth
                        if (resizedHeight < rowHeight) {
                            rowHeight = resizedHeight
                        }
                    }
                }

                row.style = "height: " + rowHeight + "px"
                photoset.appendChild(row)
            })
        }

        photoset.dataset.photosetCreated = true
        photoset.dataset.photosetWidth = photosetWidth
    })
}

/* Run everything */
Simpleblr.run = function () {
    Simpleblr.loadHighResNPFPhotos()
    Simpleblr.removeReblogExtraWhitespace()
    Simpleblr.layoutPhotosets()
}

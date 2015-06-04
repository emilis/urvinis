### Requirements ---------------------------------------------------------------

require! {
    './readings'
}

### Variables ------------------------------------------------------------------

objects =               []

### Exports --------------------------------------------------------------------

module.exports <<< {

    get-area
    get-at
    generate
}

### Functions ------------------------------------------------------------------

function get-area rect

    objects.filter rect~contains

function get-at pos

    objects.filter ( object )->

        object.x == pos.x && object.y == pos.y

!function generate number, rect

    texts =             readings.get-list!
    texts-count =       texts.length

    w =                 rect.get-width!
    h =                 rect.get-height!

    for i from 0 til number

        objects.push do
            x:          rect.x0 + Math.floor w * Math.random!
            y:          rect.y0 + Math.floor h * Math.random!
            type:       'quote'
            text:       texts[ Math.floor( texts-count * Math.random! ) % texts-count ]


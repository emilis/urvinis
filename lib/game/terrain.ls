### Requirements ---------------------------------------------------------------

require! {
    './geometry/plane'
    './terrain/generator':  Terrain-generator
    './terrain/types':      { TYPES, TYPE_COUNT }
}

### Constants ------------------------------------------------------------------

SEED =                  20150416
SCALE =                 1/20

### Variables ------------------------------------------------------------------

generator =             new Terrain-generator SEED, SCALE
generate =              generator~generate

### Exports --------------------------------------------------------------------

module.exports <<< {

    get-area
    get-point
    get-at
}

### Functions ------------------------------------------------------------------

function get-area rect

    plane.map do
        plane.generate-rect rect, generate
        get-cell

function get-point x, y

    get-cell generate x, y

function get-at pos

    get-point pos.x, pos.y

function get-cell num

    TYPES[ Math.floor( num * TYPE_COUNT ) % TYPE_COUNT ]


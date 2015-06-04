### Requirements ---------------------------------------------------------------

debug =                 require '../../debugger'

### Exports --------------------------------------------------------------------

module.exports <<< {

    slice
    for-each
    map
    reduce
    filter

    generate
    generate-rect
    join

    get-point
    set-point
}

### Functions ------------------------------------------------------------------

function slice plane, rect

    plane
        .slice rect.y0, rect.y1
        .map ( row )->
            row.slice rect.x0, rect.x1

function for-each plane, fn

    for row, y in plane
        for cell, x in row
            fn cell, x, y, plane

    plane

function map plane, fn

    for row, y in plane
        for cell, x in row
            fn cell, x, y, plane

function reduce plane, fn, acc

    return plane.reduce reduce-row, acc

    function reduce-row acc, row, y

        return row.reduce reduce-point, acc

        function reduce-point acc, point, x

            fn acc, point, x, y

function filter plane, fn

    return reduce plane, add-matching, []

    function add-matching arr, item, x, y

        fn item, x, y and arr.push item
        arr

function generate width, height, fn

    for y from 0 til height
        for x from 0 til width
            fn x, y

function generate-rect rect, fn

    generate do
        rect.get-width!
        rect.get-height!
        ( x, y )->
            fn x + rect.x0, y + rect.y0

function join plane, row-str = "\n", cell-str = ","

    plane
        .map ( row )->
            row.join cell-str
        .join row-str

function get-point plane, x, y

    plane[y] && plane[y][x]

function set-point plane, x, y, value

    plane
        ..[y] =     ..[y] || []
        ..[y][x] =  value


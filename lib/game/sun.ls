### Exports --------------------------------------------------------------------

module.exports <<< {

    get-vector
}

### Functions ------------------------------------------------------------------

function get-vector

    t =             +new Date
    angle =         (t % 314159 ) / 1e5

    {
        x:          Math.cos angle
        y:          Math.sin angle
        angle:      angle
    }

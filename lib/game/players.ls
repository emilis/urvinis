### Variables ------------------------------------------------------------------

players =           []

### Exports --------------------------------------------------------------------

module.exports <<< {

    get-area
    add
}

### Functions ------------------------------------------------------------------

function get-area rect

    players.filter rect~contains

function add player

    player
        players.push ..

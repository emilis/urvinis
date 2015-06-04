### Requirements ---------------------------------------------------------------

require! {
    lodash
    'bluebird':     Promise
    '../debugger':  debug
    './events'
    './ground'
    './npcs'
    './geometry/plane'
    './players'
    './terrain'
}

### Exports --------------------------------------------------------------------

module.exports = {

    events
    ground
    npcs
    players
    terrain

    init

    get-area
    add-player
    is-valid-player-move
}

### Functions ------------------------------------------------------------------

function init

    ground.init!

function get-area rect

    return Promise.join do
        terrain.get-area rect
        ground.get-area rect
        npcs.get-area rect
        players.get-area rect

        combine-areas

    function combine-areas terrain-plane, ground-objects, npc-objects, player-objects

        player-objects.reduce do
            add-object 'player'
            npc-objects.reduce do
                add-object 'npc'
                ground-objects.reduce do
                    add-object 'ground'
                    plane.map terrain-plane, point-from-terrain

    function point-from-terrain t_name

        terrain: t_name

    function add-object type
        ( area, object )->

            x =     object.x - rect.x0
            y =     object.y - rect.y0

            point = plane.get-point area, x, y or {}
                ..[type] =  object

            plane.set-point area, x, y, point

function add-player player

    player
        players.add ..
        ..set-world module.exports

function is-valid-player-move player, x, y

    old_t =     terrain.get-at player
    new_t =     terrain.get-point x, y

    if new_t == old_t
        return true

    switch  new_t
    case    'mountains' then false
    case    'trees'     then old_t == 'mountains'
    default             true

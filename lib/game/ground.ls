### Requirements ---------------------------------------------------------------

require! {
    '../debugger':      debug
    './events'
    './memdb'
}

### Constants ------------------------------------------------------------------

TABLE =                 'ground'

### Exports --------------------------------------------------------------------

module.exports <<< {

    init

    get-area
    find-newest-human-tracks
    plant-flower
    leave-tracks
}

### Functions ------------------------------------------------------------------

function init

    memdb.schema
        .drop-table-if-exists TABLE
        .create-table TABLE, create-table

function get-area rect

    memdb TABLE
        .select '*'
        .where      'x', '>', rect.x0
        .and-where  'x', '<', rect.x1
        .and-where  'y', '>', rect.y0
        .and-where  'y', '<', rect.y1

function find-newest-human-tracks player, radius

    x =                 player.x
    y =                 player.y

    memdb TABLE
        .first '*'
        .where type: 'tracks', player_type: 'human'
        .and-where  'x', '>', x - radius
        .and-where  'x', '<', x + radius
        .and-where  'x', '!=', x
        .and-where  'y', '>', y - radius
        .and-where  'y', '<', y + radius
        .and-where  'y', '!=', y
        .order-by 'time', 'desc'

function plant-flower player

    add-object do
        type:           'flower'
        x:              player.x
        y:              player.y
        time:           +new Date
        player_id:      player.id
        player_type:    player.type
        player_color:   player.col1

function leave-tracks player

    add-object do
        type:           'tracks'
        x:              player.x
        y:              player.y
        time:           +new Date
        player_id:      player.id
        player_type:    player.type
        player_color:   player.col1

### Private functions ----------------------------------------------------------

!function create-table table

    table
        ..integer( 'x' ).not-nullable!index!
        ..integer( 'y' ).not-nullable!index!
        ..integer( 'time' ).not-nullable!
        ..string( 'type' ).not-nullable!index!
        ..string( 'player_id' ).not-nullable!index!
        ..string( 'player_type' ).not-nullable!index!
        ..string( 'player_color' )
        ..primary [ 'x', 'y' ]

function add-object ground-obj

    write-record ground-obj
        .then !->
            events.emit events.GROUND_ADD, ground-obj

function write-record ground-obj

    key =
        x:              ground-obj.x
        y:              ground-obj.y

    memdb TABLE
        .select 'x', 'y'
        .where key
        .then ( rows )->
            if rows.length
                memdb TABLE
                    .where key
                    .update ground-obj
            else
                memdb TABLE
                    .insert ground-obj
        .catch debug

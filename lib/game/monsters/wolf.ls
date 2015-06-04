require! {

    lodash
    '../../debugger':       debug
    '../geometry/plane'
    '../geometry/rectangle'
    '../sun'
}

module.exports =
    class Wolf

        ->
            @id =       Math.random!toString 36
            @type =     'monster'
            @subtype =  'wolf'
            @x =        0
            @y =        0
            @rx =       0
            @ry =       0
            @world =    null
            @_events =  null

        set-pos: ( rx, ry )!->

            @world && @world.ground.leave-tracks @

            @x =        Math.round rx
            @y =        Math.round ry
            @rx =       rx
            @ry =       ry

            @_events && @_events.emit @_events.MOVE, @

        set-world: ( world )!->

            @world =    world
            @_events =  world.events

        next-move: !->

            radius =    10
            rect =      rectangle.around @, radius

            humans =    @world.players
                .getArea rect
                .filter is-human
                .filter not-same-spot( @ )
                .sort is-nearest-to( @ )

            if humans.length
                @move-to-target humans[0]
            else
                @world.ground
                    .find-newest-human-tracks @, radius
                    .then @~follow-tracks-or-sun

        follow-tracks-or-sun: ( tracks )->

            if tracks
                @move-to-target tracks
            else
                sun-dir =   sun.get-vector!
                @move sun-dir.x, sun-dir.y

        is-valid-move: ( dx, dy )->

            @world.is-valid-player-move do
                @
                Math.round @rx + dx
                Math.round @ry + dy

        move: ( dx, dy )->

            k =     Math.max do
                Math.abs dx
                Math.abs dy

            @set-pos do
                @rx + dx / k
                @ry + dy / k

        move-to-target: ( t )->

            @move t.x - @x, t.y - @y

### Utilities ------------------------------------------------------------------

function not-same-spot spot
    ( p )->

        p.x != spot.x or p.y != spot.y

function is-human player

    player.type == 'human'

function is-nearest-to p
    ( a, b )->

        sub do
            get-distance p, b
            get-distance p, a

function get-distance p1, p2

    add do
        Math.pow p1.x - p2.x, 2
        Math.pow p1.y - p2.y, 2

function add x, y

    x + y

function sub x, y
    
    x - y

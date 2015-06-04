require! {
    './lib/debugger':                   debug
    './lib/game/events'
    './lib/game/monsters'
    './lib/game/player':                Player
    './lib/game/geometry/rectangle':    Rectangle
    './lib/ui/ui'
    './lib/game/world'
}

### Constants -----------------------------------------------------------------

const START-POINT =
    x:      291
    y:      43

### Main ----------------------------------------------------------------------

world.init!
    .then ->

        area =      Rectangle.around START-POINT, 500
        map-el =    ui.map.get-element!
        player1 =   new Player 'Player1', 'PL', 'blue', 'yellow'

        ui.screen.key [ 'q', 'C-c' ], quit

        map-el.key [ 'left' ],  player1~left
        map-el.key [ 'right' ], player1~right
        map-el.key [ 'up' ],    player1~up
        map-el.key [ 'down' ],  player1~down
        map-el.key [ 'space' ], player1~plant-flower

        world.npcs.generate 100, area

        monsters.add-to-world world, area, 100
        monsters.next-move!
        set-interval monsters.next-move, 5e2

        world.add-player player1
        player1.set-pos START-POINT.x, START-POINT.y

        ui.info.follow player1, world
        ui.map.follow player1, world
        map-el.focus!

        debug 'Welcome to the game. Press arrows to move around. Press Q to quit.'

### Functions -----------------------------------------------------------------

function quit

    process.exit 0

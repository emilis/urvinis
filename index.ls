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

const START_POINT =
    x:      291
    y:      43

### Main ----------------------------------------------------------------------

world.init!
    .then ->

        area =      Rectangle.around START_POINT, 500
        mapEl =     ui.map.getElement!
        player1 =   new Player 'Player1', 'PL', 'blue', 'yellow'

        ui.screen.key [ 'q', 'C-c' ], quit

        mapEl.key [ 'left' ],   player1~left
        mapEl.key [ 'right' ],  player1~right
        mapEl.key [ 'up' ],     player1~up
        mapEl.key [ 'down' ],   player1~down
        mapEl.key [ 'space' ],  player1~plantFlower

        world.npcs.generate 100, area

        monsters.addToWorld world, area, 100
        monsters.nextMove!
        setInterval monsters.nextMove, 5e2

        world.addPlayer player1
        player1.setPos START_POINT.x, START_POINT.y

        ui.info.follow player1, world
        ui.map.follow player1, world
        mapEl.focus!

### Functions -----------------------------------------------------------------

function quit

    process.exit 0

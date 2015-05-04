/// Requirements ---------------------------------------------------------------

var debug =             require( "./lib/debugger" );
var events =            require( "./lib/game/events" );
var monsters =          require( "./lib/game/monsters" );
var Player =            require( "./lib/game/player" );
var Rectangle =         require( "./lib/game/geometry/rectangle" );
var ui =                require( "./lib/ui/ui" );
var world =             require( "./lib/game/world" );

/// Constants ------------------------------------------------------------------

var START_POINT = {
    x:                  291,
    y:                  43,
};
/*
291,43
602,507
377,194
443,547
530,747
691,910
//*/

/// Main -----------------------------------------------------------------------

world.init().then( startGame );

/// Start game -----------------------------------------------------------------

function startGame(){

    var area =              Rectangle.around( START_POINT, 500 );
    var mapEl =             ui.map.getElement();
    var player1 =           new Player( "Player1", "PL", "blue", "yellow" );

    ui.screen.key([ "q", "C-c" ], quit );

    mapEl.key([ "left" ],  player1.left.bind( player1 ));
    mapEl.key([ "right" ], player1.right.bind( player1 ));
    mapEl.key([ "up" ],    player1.up.bind( player1 ));
    mapEl.key([ "down" ],  player1.down.bind( player1 ));
    mapEl.key([ "space" ], player1.plantFlower.bind( player1 ));

    world.npcs.generate( 100, area );

    monsters.addToWorld( world, area, 100 );
    monsters.nextMove();
    setInterval( monsters.nextMove, 5e2 );

    world.addPlayer( player1 );
    player1.setPos( START_POINT.x, START_POINT.y );

    ui.info.follow( player1, world );
    ui.map.follow( player1, world );
    mapEl.focus();
}///

/// Functions ------------------------------------------------------------------

function quit(){

    return process.exit( 0 );
}///

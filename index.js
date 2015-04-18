/// Requirements ---------------------------------------------------------------

var Player =            require( "./lib/game/player" );
var screen =            require( "./lib/ui/screen" );
var world =             require( "./lib/game/world" );

/// Constants ------------------------------------------------------------------

var START_POINT = {
    x:                  Math.pow( 2, 23 ),
    y:                  Math.pow( 2, 23 ),
};

/// Main -----------------------------------------------------------------------

var player1 =           new Player( "Player1", "PL", "blue", "yellow" );
player1.setPos( START_POINT.x, START_POINT.y );

world.addPlayer( player1 );

screen.map.follow( player1, world );

screen.screen.key([ "q", "C-c" ], quit );

screen.screen.key([ "left" ],  player1.left.bind( player1 ));
screen.screen.key([ "right" ], player1.right.bind( player1 ));
screen.screen.key([ "up" ],    player1.up.bind( player1 ));
screen.screen.key([ "down" ],  player1.down.bind( player1 ));


/// Functions ------------------------------------------------------------------

function quit(){

    return process.exit( 0 );
}///

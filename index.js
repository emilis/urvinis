/// Requirements ---------------------------------------------------------------

var screen =            require( "./lib/ui/screen" );
var world =             require( "./lib/game/world" );

var Player =            require( "./lib/game/player" );

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
/// screen.map.render( world );

screen.screen.key([ "q", "C-c" ], quit );

screen.screen.key([ "left" ],  movePlayer( player1, "left" ));
screen.screen.key([ "right" ], movePlayer( player1, "right" ));
screen.screen.key([ "up" ],    movePlayer( player1, "up" ));
screen.screen.key([ "down" ],  movePlayer( player1, "down" ));


/// Functions ------------------------------------------------------------------

function quit(){

    return process.exit( 0 );
}///


function movePlayer( player, direction ){
    return function(){

        player[direction]();
        /// screen.map.follow( player1 );
        /// screen.map.render( world );
    };//
}///

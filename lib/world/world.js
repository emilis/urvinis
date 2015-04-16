/// Requirements ---------------------------------------------------------------

var CONST =             require( "../constants" );

var Blocks =            require( "./blocks" );
var Plane =             require( "../geometry/plane" );
var Player =            require( "./player" );
var Terrain =           require( "./terrain" );
var Vector =            require( "../geometry/vector" );

/// Main -----------------------------------------------------------------------

var player =            new Player( "Player1", "#66f", "yellow" );

var terrain =           Terrain( new Vector( 0, 0, CONST.width, CONST.height ));

var objects =           Plane.generate( CONST.width, CONST.height, function(){ return 0; });

player.setPos( 10, 20 );

/// Exports --------------------------------------------------------------------

module.exports = {

    getState:           getState,

    playerLeft:         player.left.bind( player ),
    playerRight:        player.right.bind( player ),
    playerUp:           player.up.bind( player ),
    playerDown:         player.down.bind( player ),

    playerDraw:         playerDraw,
};

/// Functions ------------------------------------------------------------------

function getState( vector ){

    var state = Plane.map(
        Plane.slice( terrain, vector ),
        Blocks.numToString
    );

    Plane.forEach( objects, drawObject );

    state[ player.y ][ player.x ] = player.block;

    return Plane.join( state, "\n", "" );

    function drawObject( val, x, y ){
        if( val ){
            state[ y ][ x ] =   player.getDrawBlock( val );
        }
    }///
}///


function playerDraw(){

    objects[ player.y ][ player.x ]++;
}///

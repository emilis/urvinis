/// Requirements ---------------------------------------------------------------

var CONST =             require( "../constants" );

var Blocks =            require( "./blocks" );
var Plane =             require( "../geometry/plane" );
var Player =            require( "./player" );
var Terrain =           require( "./terrain" );
var Vector =            require( "../geometry/vector" );

/// Main -----------------------------------------------------------------------

/// var player =            new Player( "Player1", "#66f", "yellow" );
/// player.setPos( 10, 20 );

var terrain =           Terrain( new Vector( 0, 0, CONST.width, CONST.height ));

var objects =           Plane.generate( CONST.width, CONST.height, function(){ return ""; });

var players =           [];

/// Exports --------------------------------------------------------------------

module.exports = {

    getState:           getState,
    addPlayer:          addPlayer,
    drawObject:         drawObject,
};

/// Functions ------------------------------------------------------------------

function getState( vector ){

    var state = Plane.map(
        Plane.slice( terrain, vector ),
        Blocks.numToString
    );

    Plane.forEach( objects, addObjectState );

    state =     players.reduce( addPlayerState, state );

    return Plane.join( state, "\n", "" );

    function addPlayerState( state, player ){

        state[ player.y ][ player.x ] = player.block;
        return state;
    }///

    function addObjectState( val, x, y ){

        if( val && state[y] && state[x] ){
            state[y][x] =   val;
        }
    }///
}///

function addPlayer( player ){

    players.push( player );
    player.setWorld( module.exports );
}///

function drawObject( x, y, object ){

    objects[y][x] = object;
}///

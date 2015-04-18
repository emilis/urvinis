/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );

var CONST =             require( "../constants" );

var Blocks =            require( "./blocks" );
var Plane =             require( "../geometry/plane" );
var Player =            require( "./player" );
var Terrain =           require( "./terrain" );
var Vector =            require( "../geometry/vector" );

/// Main -----------------------------------------------------------------------

var terrain =           Terrain( new Vector( 0, 0, CONST.width, CONST.height ));

var objects =           Plane.generate( CONST.width, CONST.height, _.constant( false ));

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

    Plane.forEach(
        Plane.slice( objects, vector ),
        addObjectState
    );

    state =     players.reduce( addPlayerState, state );

    return Plane.join( state, "\n", "" );

    function addPlayerState( state, player ){

        if( vector.contains( player )){

            var x = player.x - vector.x0;
            var y = player.y - vector.y0;

            state[y][x] =   player.block;
        }
        return state;
    }///

    function addObjectState( val, x, y ){

        if( val && state[y] && state[y][x] ){
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

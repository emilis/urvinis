/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );

var debug =             require( "../debugger" );
var ground =            require( "./ground" );
var npcs =              require( "./npcs" );
var plane =             require( "./geometry/plane" );
var players =           require( "./players" );
var terrain =           require( "./terrain" );

/// Exports --------------------------------------------------------------------

module.exports = {

    ground:             ground,
    npcs:               npcs,
    players:            players,

    init:               init,

    getArea:            getArea,
    addPlayer:          addPlayer,
    isValidPlayerMove:  isValidPlayerMove,
};

/// Functions ------------------------------------------------------------------

function init(){

    return ground.init();
}///

function getArea( rect ){

    var area =  plane.map(
        terrain.getArea( rect ),
        pointFromTerrain
    );

    area =      ground
        .getArea( rect )
        .reduce( addObject( "ground" ), area );

    area =      npcs
        .getArea( rect )
        .reduce( addObject( "npc" ), area );

    area =      players
        .getArea( rect )
        .reduce( addObject( "player" ), area );

    return area;

    function pointFromTerrain( t_name ){

        return {
            terrain:    t_name,
        };
    }///

    function addObject( type ){
        return function( area, object ){

            var x =     object.x - rect.x0;
            var y =     object.y - rect.y0;
            var point = plane.getPoint( area, x, y ) || {};
            var patch = {};
            patch[type]=    object;

            return plane.setPoint(
                area, x, y,
                _.assign( point, patch )
            );
        };//
    }///
}///


function addPlayer( player ){

    players.add( player );
    player.setWorld( module.exports );
    return player;
}///


function isValidPlayerMove( player, x, y ){

    var old_t =     terrain.getPoint( player.x, player.y );
    var new_t =     terrain.getPoint( x, y );

    if( new_t === old_t ){
        return true;
    }

    switch( new_t ){

        case "mountains":
            return false;
            break;

        case "trees":
            return old_t === "mountains";
            break;

        default:
            return true;
    }
}///

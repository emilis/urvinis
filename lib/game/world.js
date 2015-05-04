/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );
var Promise =           require( "bluebird" );

var debug =             require( "../debugger" );
var events =            require( "./events" );
var ground =            require( "./ground" );
var npcs =              require( "./npcs" );
var plane =             require( "./geometry/plane" );
var players =           require( "./players" );
var terrain =           require( "./terrain" );

/// Exports --------------------------------------------------------------------

module.exports = {

    events:             events,
    ground:             ground,
    npcs:               npcs,
    players:            players,
    terrain:            terrain,

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

    return Promise.join(
        terrain.getArea( rect ),
        ground.getArea( rect ),
        npcs.getArea( rect ),
        players.getArea( rect ),

        combineAreas
    );

    function combineAreas( terrainPlane, groundObjects, npcObjects, playerObjects ){

        return playerObjects.reduce( addObject( "player" ),
            npcObjects.reduce( addObject( "npc" ),
                groundObjects.reduce( addObject( "ground" ),
                    plane.map( terrainPlane, pointFromTerrain )
                )
            )
        );
    }///

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

    var old_t =     terrain.getAt( player );
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

/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );

var debug =             require( "../debugger" );
var plane =             require( "./geometry/plane" );
var terrain =           require( "./terrain" );

/// Variables ------------------------------------------------------------------

var objects =           [];
var players =           [];

/// Exports --------------------------------------------------------------------

module.exports = {

    getArea:            getArea,
    addPlayer:          addPlayer,
    isValidPlayerMove:  isValidPlayerMove,
    leaveTracks:        leaveTracks,
    drawFlower:         drawFlower,
};

/// Functions ------------------------------------------------------------------

function getArea( rect ){

    var area =  plane.map(
        terrain.getArea( rect ),
        pointFromTerrain
    );

    area =      objects
        .filter( rect.contains.bind( rect ))
        .reduce( addObject, area );

    area =      players
        .filter( rect.contains.bind( rect ))
        .reduce( addPlayer, area );

    return area;

    function addPlayer( area, player ){

        var x =         player.x - rect.x0;
        var y =         player.y - rect.y0;
        var point =     plane.getPoint( area, x, y ) || {};

        return plane.setPoint(
            area, x, y,
            _.assign( point, {
                player: player,
            })
        );
    }///

    function addObject( area, object ){

        var x =         object.x - rect.x0;
        var y =         object.y - rect.y0;
        var point =     plane.getPoint( area, x, y ) || {};

        return plane.setPoint(
            area, x, y,
            _.assign( point, {
                object: object,
            })
        );
    }///

    function pointFromTerrain( t_name ){

        return {
            terrain:    t_name,
        };
    }///
}///


function addPlayer( player ){

    players.push( player );
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


function leaveTracks( player ){

    objects.push({
        type:       "tracks",
        x:          player.x,
        y:          player.y,
        player:     player,
    });
}///


function drawFlower( player ){

    objects.push({
        type:       "flower",
        x:          player.x,
        y:          player.y,
        player:     player,
    });
}///

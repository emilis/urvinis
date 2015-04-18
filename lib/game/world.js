/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );

var plane =             require( "./geometry/plane" );
var terrain =           require( "./terrain" );

/// Variables ------------------------------------------------------------------

var players =           [];

/// Exports --------------------------------------------------------------------

module.exports = {

    getArea:            getArea,
    addPlayer:          addPlayer,
    drawFlower:         drawFlower,
};

/// Functions ------------------------------------------------------------------

function getArea( rect ){

    var area =  plane.map(
        terrain.generate( rect ),
        pointFromTerrain
    );

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

    function pointFromTerrain( t_name ){

        return {
            terrain:    t_name,
        };
    }///
}///


function addPlayer( player ){

    players.push( player );
    return player;
}///


function drawFlower(){

}///

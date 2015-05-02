/// Requirements ---------------------------------------------------------------

var plane =             require( "./geometry/plane" );
var types =             require( "./terrain/types" );

var TerrainGenerator =  require( "./terrain/generator" );

/// Constants ------------------------------------------------------------------

var SEED =              20150416;
var SCALE =             1/20;

/// Variables ------------------------------------------------------------------

var generator =         new TerrainGenerator( SEED, SCALE );

/// Exports --------------------------------------------------------------------

module.exports = {

    getArea:            getArea,
    getPoint:           getPoint,
    getAt:              getAt,
};

/// Functions ------------------------------------------------------------------

function getArea( rect ){

    var noise =         plane.generateRect( rect, generator.generate );

    return plane.map( noise, getCell );
}///


function getPoint( x, y ){

    return getCell( generator.generate( x, y ));
}///


function getAt( pos ){
    return getPoint( pos.x, pos.y );
}///


function getCell( num ){

    return types.TYPES[ Math.floor( num * types.TYPE_COUNT ) % types.TYPE_COUNT ];
}///


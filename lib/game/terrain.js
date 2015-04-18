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

    generate:           generate,
};

/// Functions ------------------------------------------------------------------

function generate( rect ){

    var noise =         plane.generateRect( rect, generator.generate );

    return plane.map( noise, getCell );
}///


function getCell( num ){

    return types.TYPES[ Math.floor( num * types.TYPE_COUNT ) % types.TYPE_COUNT ];
}///


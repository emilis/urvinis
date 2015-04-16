/// Requirements ---------------------------------------------------------------

var Alea =              require( "alea" );
var SimplexNoise =      require( "simplex-noise" );

var CONST =             require( "../constants" );
var blocks =            require( "./blocks" );
var plane =             require( "../geometry/plane" );

/// Constants ------------------------------------------------------------------

var SEED =              20150416;

/// Variables ------------------------------------------------------------------

var simplex =           new SimplexNoise( new Alea( SEED ));
var noiseValue =        simplex.noise2D.bind( simplex );

/// Exports --------------------------------------------------------------------

module.exports = generate;

/// Functions ------------------------------------------------------------------

function generate( vector ){

    return plane.map(
        plane.generate(
            vector.getWidth(),
            vector.getHeight(),
            noiseValue
        ),
        getCell
    );
}///


function getCell( num, x, y ){

    return Math.floor( Math.abs( num + 1.0 ) * 0.5 * blocks.TYPE_COUNT );
}///

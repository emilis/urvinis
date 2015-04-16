/// Requirements ---------------------------------------------------------------

var Alea =              require( "alea" );
var SimplexNoise =      require( "simplex-noise" );

var CONST =             require( "../constants" );
var blocks =            require( "./blocks" );
var plane =             require( "../geometry/plane" );

/// Constants ------------------------------------------------------------------

var SEED =              20150416;
var SCALE =             20;

/// Variables ------------------------------------------------------------------

var simplex =           new SimplexNoise( new Alea( SEED ));

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

function noiseValue( x, y ){

    return simplex.noise2D( x / SCALE, y / SCALE );
}///

function getCell( num, x, y ){

    return Math.floor( Math.abs( num + 1.0 ) * 0.5 * blocks.TYPE_COUNT );
}///

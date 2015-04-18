/// Requirements ---------------------------------------------------------------

var Alea =              require( "alea" );
var SimplexNoise =      require( "simplex-noise" );

/// Exports --------------------------------------------------------------------

module.exports =        CachingGenerator;

/// CachingGenerator -----------------------------------------------------------

function CachingGenerator( seed, scale ){

    this.simplex =  new SimplexNoise( new Alea( seed ));
    this.scale =    scale;
    this.cache =    {};

    this.generate = generate.bind( this );

    function generate( x, y ){

        var key =   x + ":" + y;
        if( !this.cache[key] ){
            this.cache[key] =   0.5 * Math.abs(
                this.simplex.noise2D( x * this.scale, y * this.scale )
                + 1.0 );
        }
        return this.cache[key];
    }///
}///

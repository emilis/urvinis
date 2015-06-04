### Requirements ---------------------------------------------------------------

require! {
    alea
    'simplex-noise':    simplex-noise
}

### Exports --------------------------------------------------------------------

module.exports =    class Caching-generator

    ( seed, scale )->

        @simplex =  new simplex-noise new alea seed
        @scale =    scale
        @cache =    {}

    generate: ( x, y )~>

        key =       "#x:#y"
        if !@cache[key]
            @cache[key] =   0.5 * Math.abs(
                1.0 +
                @simplex.noise2D( x * @scale, y * @scale )
            )
        @cache[key]

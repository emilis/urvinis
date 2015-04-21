/// Requirements ---------------------------------------------------------------

var fs =                require( "fs" );
var path =              require( "path" );

/// Constants ------------------------------------------------------------------

var DATA_DIR =          path.resolve( __dirname, "../../data" );

var TAO =               path.resolve( DATA_DIR, "tao-te-chip.txt" );

/// Exports --------------------------------------------------------------------

module.exports = {

    getList:            getList,
};

/// Functions ------------------------------------------------------------------

function getList(){

    return fs
        .readFileSync( TAO, "utf8" )
        .split( "---" )
        .map( trim );
}///


function trim( str ){

    return str && str.trim && str.trim() || "";
}///

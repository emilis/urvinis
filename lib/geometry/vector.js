/// Requirements ---------------------------------------------------------------

var _ =             require( "lodash" );

/// Exports --------------------------------------------------------------------

_.assign( Vector.prototype, {

    getWidth:       getWidth,
    getHeight:      getHeight,
    getLength:      getLength,

    toString:       toString,
});

module.exports = Vector;

/// Functions ------------------------------------------------------------------

function Vector( x0, y0, x1, y1 ){

    this.x0 =       x0;
    this.x1 =       x1;
    this.y0 =       y0;
    this.y1 =       y1;
}///


function getWidth(){

    return this.x1 - this.x0;
}///


function getHeight(){

    return this.y1 - this.y0;
}///


function getLength(){

    return Math.sqrt(
        Math.pow( this.getWidth(), 2 )
        + Math.pow( this.getHeight(), 2 )
    );
}///


function toString(){

    return [
        "Vector( ",
        this.x0,
        this.y0,
        this.x1,
        this.y1,
        ")",
    ].join( ", " );
}///

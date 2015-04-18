/// Requirements ---------------------------------------------------------------

var _ =             require( "lodash" );

/// Exports --------------------------------------------------------------------

_.assign( Rectangle.prototype, {

    getWidth:       getWidth,
    getHeight:      getHeight,
    contains:       contains,

    toString:       toString,
});

module.exports = Rectangle;

/// Functions ------------------------------------------------------------------

function Rectangle( x0, y0, x1, y1 ){

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


function contains( obj ){

    return ( true
        && obj.x > this.x0
        && obj.x < this.x1
        && obj.y > this.y0
        && obj.y < this.y1
    );
}///


function toString(){

    return [
        "Rectangle(",
        this.getWidth(), "×", this.getHeight(),
        this.x0,
        this.y0,
        this.x1,
        this.y1,
        ")",
    ].join( " " );
}///

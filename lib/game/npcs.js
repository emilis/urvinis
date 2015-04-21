/// Requirements ---------------------------------------------------------------

var readings =          require( "./readings" );

/// Variables ------------------------------------------------------------------

var objects =           [];

/// Exports --------------------------------------------------------------------

module.exports = {

    getArea:            getArea,
    getAt:              getAt,
    generate:           generate,
};

/// Functions ------------------------------------------------------------------

function getArea( rect ){

    return objects.filter( rect.contains.bind( rect ));
}///


function getAt( pos ){

    return objects.filter( atPos );

    function atPos( object ){

        return object.x === pos.x && object.y === pos.y;
    }///
}///


function generate( number, rect ){

    var texts =         readings.getList();
    var texts_count =   texts.length;

    var w =             rect.getWidth();
    var h =             rect.getHeight();

    for( var i = 0; i < number; i++ ){

        objects.push({
            x:          rect.x0 + Math.floor( w * Math.random() ),
            y:          rect.y0 + Math.floor( h * Math.random() ),
            type:       "quote",
            text:       texts[ Math.floor( texts_count * Math.random() ) % texts_count ],
        });
    }

}///

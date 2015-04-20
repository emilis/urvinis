/// Variables ------------------------------------------------------------------

var objects =           [];

/// Exports --------------------------------------------------------------------

module.exports = {

    getArea:            getArea,
    generate:           generate,
};

/// Functions ------------------------------------------------------------------

function getArea( rect ){

    return objects.filter( rect.contains.bind( rect ));
}///


function generate( number, rect ){

    var w =             rect.getWidth();
    var h =             rect.getHeight();

    for( var i = 0; i < number; i++ ){

        objects.push({
            x:          rect.x0 + Math.floor( w * Math.random() ),
            y:          rect.y0 + Math.floor( h * Math.random() ),
            type:       "quote",
            text:       "",
        });
    }

}///

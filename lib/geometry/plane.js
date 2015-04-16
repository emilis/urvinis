/// Exports --------------------------------------------------------------------

module.exports = {

    slice:              slice,
    forEach:            forEach,
    map:                map,
    generate:           generate,
    join:               join,
};

/// Functions ------------------------------------------------------------------

function slice( plane, vector ){

    var width =             vector.getWidth();
    var height =            vector.getHeight();

    var result =            [];

    for( var y = 0; y < height; y++ ){
        result[y] =         [];
        for( var x = 0; x < width; x++ ){
            result[y][x] =  plane[ vector.y0 + y ][ vector.x0 + x ];
        }
    }

    return result;
}///


function forEach( plane, fn ){

    for( var y = 0; y < plane.length; y++ ){
        for( var x = 0; x < plane[y].length; x++ ){
            fn( plane[y][x], x, y, plane );
        }
    }

    return plane;
}///


function map( plane, fn ){

    var result =            [];

    for( var y = 0; y < plane.length; y++ ){
        result[y] =         [];
        for( var x = 0; x < plane[y].length; x++ ){
            result[y][x] =  fn( plane[y][x], x, y, plane );
        }
    }

    return result;
}///


function generate( width, height, fn ){

    var result =            [];

    for( var y = 0; y < height; y++ ){
        result[y] =         [];
        for( var x = 0; x < width; x++ ){
            result[y][x] =  fn( x, y );
        }
    }

    return result;
}///


function join( plane, rowStr, cellStr ){

    return plane.map( getRow ).join( rowStr );

    function getRow( row ){
        return row.join( cellStr );
    }///
}///

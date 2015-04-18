/// Requirements ---------------------------------------------------------------

var debug =             require( "../../debugger" );

/// Exports --------------------------------------------------------------------

module.exports = {

    slice:              slice,
    forEach:            forEach,
    map:                map,
    generate:           generate,
    generateRect:       generateRect,
    join:               join,

    getPoint:           getPoint,
    setPoint:           setPoint,
};

/// Functions ------------------------------------------------------------------

function slice( plane, rect ){

    return plane.slice( rect.y0, rect.y1 ).map( sliceRow );

    function sliceRow( row ){

        return row.slice( rect.x0, rect.x1 );
    }///
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

function generateRect( rect, fn ){

    return generate( rect.getWidth(), rect.getHeight(), function( x, y ){
    
        return fn( x + rect.x0, y + rect.y0 );
    });
}///


function join( plane, rowStr, cellStr ){
    rowStr =    ( arguments.length > 1 ) ? rowStr : "\n";
    cellStr =   ( arguments.length > 2 ) ? cellStr : ",";

    return plane.map( getRow ).join( rowStr );

    function getRow( row ){
        return row.join( cellStr );
    }///
}///


function getPoint( plane, x, y ){

    return plane[y] && plane[y][x];
}///

function setPoint( plane, x, y, value ){

    plane[y] =      plane[y] || [];
    plane[y][x] =   value;

    return plane;
}///




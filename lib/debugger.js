/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );
var blessed =           require( "blessed" );

/// Variables ------------------------------------------------------------------

var box;

/// Exports --------------------------------------------------------------------

module.exports = _.assign( debug, {

    addToScreen:        addToScreen,
    getElement:         getElement,
});

/// Functions ------------------------------------------------------------------

function debug(){

    if( !box ){
        console.log.apply( console, arguments );
    } else if( !box.detached ){
        var args =  Array.prototype.slice.call( arguments );
        box.add( args.join( " " ));
    }
}///


function addToScreen( parent, options ){

    box && box.detach && box.detach();

    box =   blessed.log( _.assign( {}, options, {
        parent: parent,
    }));
    ///screen.append( box );
}///


function getElement(){

    return box;
}///

/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );
var blessed =           require( "blessed" );

var debug =             require( "../debugger" );

/// Variables ------------------------------------------------------------------

var box;
var renderScreen;

/// Exports --------------------------------------------------------------------

module.exports = {

    addToScreen:        addToScreen,
    getElement:         getElement,
    setContent:         setContent,
};

/// Functions ------------------------------------------------------------------

function addToScreen( parent, renderFn, options ){

    box && box.detach && box.detach();

    box =   blessed.box( _.assign( {}, options, {
        parent: parent,
    }));

    renderScreen =      renderFn;

}///


function getElement(){

    return box;
}///


function setContent( text ){

    if( box ){
        box.setContent( text );
        renderScreen();
    }
}///

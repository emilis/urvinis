/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );
var blessed =           require( "blessed" );

var debug =             require( "../debugger" );

/// Variables ------------------------------------------------------------------

var box;

/// Exports --------------------------------------------------------------------

module.exports = {

    addToScreen:        addToScreen,
    getElement:         getElement,
    setContent:         setContent,
};

/// Functions ------------------------------------------------------------------

function addToScreen( parent, options ){

    box && box.detach && box.detach();

    box =   blessed.box( _.assign( {}, options, {
        parent: parent,
    }));

}///


function getElement(){

    return box;
}///


function setContent( text ){

    box.setContent( text );
    box.screen.render();
}///

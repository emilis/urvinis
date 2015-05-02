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

    follow:             follow,
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


function follow( player, world ){

    var world_items =   world.npcs;

    player.on( world.events.MOVE, checkForItems );

    function checkForItems( player ){

        var items =     world_items.getAt( player );
        if( items.length ){
            setContent( items[0].text );
        } else {
            setContent( getPositionInfo( player ));
        }
    }///
}///


/// Private functions ----------------------------------------------------------

function getPositionInfo( pos ){

    return [
        "X: ", pos.x, "\n",
        "Y: ", pos.y, "\n",
    ].join( "" );
}///

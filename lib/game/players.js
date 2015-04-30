/// Requirements ---------------------------------------------------------------

var EventEmitter =      require( "events" ).EventEmitter;

//// Variables ------------------------------------------------------------------

var events =            new EventEmitter();
var players =           [];

/// Exports --------------------------------------------------------------------

module.exports = {

    getArea:            getArea,
    add:                add,

    onMove:             onMove,
};

/// Functions ------------------------------------------------------------------

function getArea( rect ){

    return players.filter( rect.contains.bind( rect ));
}///


function add( player ){

    players.push( player );
    player.on( "new-pos", triggerMove );
}///


function triggerMove( player ){

    return events.emit( "move", player );
}///


function onMove( fn ){

    return events.on( "move", fn );
}///

//// Variables ------------------------------------------------------------------

var players =           [];

/// Exports --------------------------------------------------------------------

module.exports = {

    getArea:            getArea,
    add:                add,
};

/// Functions ------------------------------------------------------------------

function getArea( rect ){

    return players.filter( rect.contains.bind( rect ));
}///


function add( player ){

    players.push( player );
}///

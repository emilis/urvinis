/// Variables ------------------------------------------------------------------

var objects =           [];

/// Exports --------------------------------------------------------------------

module.exports = {

    getArea:            getArea,
    plantFlower:        plantFlower,
    leaveTracks:        leaveTracks,
};

/// Functions ------------------------------------------------------------------

function getArea( rect ){

    return objects.filter( rect.contains.bind( rect ));
}///


function plantFlower( player ){

    objects.push({
        type:           "flower",
        x:              player.x,
        y:              player.y,
        color:          player.col1,
        player:         player,
    });
}///


function leaveTracks( player ){

    objects.push({
        type:           "tracks",
        x:              player.x,
        y:              player.y,
        player:         player,
        time:           +new Date,
    });
}///

/// Requirements ---------------------------------------------------------------

var debug =             require( "../debugger" );
var events =            require( "./events" );
var memdb =             require( "./memdb" );

/// Constants ------------------------------------------------------------------

var TABLE =             "ground";

/// Exports --------------------------------------------------------------------

module.exports = {

    init:                   init,

    getArea:                getArea,
    findNewestHumanTracks:   findNewestHumanTracks,
    plantFlower:            plantFlower,
    leaveTracks:            leaveTracks,
};

/// Functions ------------------------------------------------------------------

function init(){

    return memdb.schema
        .dropTableIfExists( TABLE )
        .createTable( TABLE, createTable );
}///


function getArea( rect ){

    return memdb( TABLE )
        .select( "*" )
        .where( "x", ">", rect.x0 )
        .andWhere( "x", "<", rect.x1 )
        .andWhere( "y", ">", rect.y0 )
        .andWhere( "y", "<", rect.y1 )
}///


function findNewestHumanTracks( player, radius ){

    var x =                 player.x;
    var y =                 player.y;

    return memdb( TABLE )
        .first( "*" )
        .where({
            type:           "tracks",
            player_type:    "human",
        })
        .andWhere( "x", ">",    x - radius )
        .andWhere( "x", "<",    x + radius )
        .andWhere( "x", "!=",   x )
        .andWhere( "y", ">",    y - radius )
        .andWhere( "y", "<",    y + radius )
        .andWhere( "y", "!=",   y )
        .orderBy( "time", "desc" );
}///


function plantFlower( player ){

    return addObject({
        type:           "flower",
        x:              player.x,
        y:              player.y,
        time:           +new Date,
        player_id:      player.id,
        player_type:    player.type,
        player_color:   player.col1,
    });
}///


function leaveTracks( player ){

    return addObject({
        type:           "tracks",
        x:              player.x,
        y:              player.y,
        time:           +new Date,
        player_id:      player.id,
        player_type:    player.type,
        player_color:   player.col1,
    });
}///


/// Private functions ----------------------------------------------------------

function createTable( table ){

    table.integer( "x" ).notNullable().index();
    table.integer( "y" ).notNullable().index();
    table.integer( "time" ).notNullable();
    table.string( "type" ).notNullable().index();
    table.string( "player_id" ).notNullable().index();
    table.string( "player_type" ).notNullable().index();
    table.string( "player_color" ).nullable();

    table.primary([ "x", "y" ]);
}///


function addObject( groundObj ){

    return writeRecord( groundObj )
        .then( emitAddEvent );

    function emitAddEvent(){

        events.emit( events.GROUND_ADD, groundObj );
    }///
}///


function writeRecord( groundObj ){

    var key = {
        x:              groundObj.x,
        y:              groundObj.y,
    };

    return memdb( TABLE )
        .select( "x", "y" )
        .where( key )
        .then( insertOrUpdate )
        .catch( debug );

    function insertOrUpdate( rows ){

        if( rows.length ){
            return memdb( TABLE )
                .where( key )
                .update( groundObj );
        } else {
            return memdb( TABLE )
                .insert( groundObj );
        }
    }///
}///

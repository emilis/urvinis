/// Requirements ---------------------------------------------------------------

var debug =             require( "../debugger" );
var events =            require( "./events" );
var memdb =             require( "./memdb" );

/// Constants ------------------------------------------------------------------

var TABLE =             "ground";

/// Variables ------------------------------------------------------------------

var objects =           [];

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

    memdb( TABLE )
        .select( "*" )
        .where( "x", ">", rect.x0 )
        .andWhere( "x", "<", rect.x1 )
        .andWhere( "y", ">", rect.y0 )
        .andWhere( "y", "<", rect.y1 )

    return objects.filter( rect.contains.bind( rect ));
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
        color:          player.col1,
        player:         player,
    });
}///


function leaveTracks( player ){

    return addObject({
        type:           "tracks",
        x:              player.x,
        y:              player.y,
        player:         player,
        time:           +new Date,
    });
}///


/// Private functions ----------------------------------------------------------

function createTable( table ){

    table.integer( "x" ).notNullable().index();
    table.integer( "y" ).notNullable().index();
    table.integer( "time" ).notNullable();
    table.string( "type" ).notNullable().index();
    table.string( "player_type" ).notNullable().index();
    table.string( "player_color" ).nullable();

    table.primary([ "x", "y" ]);
}///


function addObject( groundObj ){

    objects.push( groundObj );

    return
        writeRecord( "flower", player )
        .then( events.emit.bind(
            events, events.GROUND_ADD, groundObj
        ));
}///


function writeRecord( type, player ){

    var key = {
        x:              player.x,
        y:              player.y,
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
                .update({
                    type:           type,
                    time:           +new Date,
                    player_type:    player.type,
                    player_color:   player.col1,
                });
        } else {
            return memdb( TABLE )
                .insert({
                    x:              key.x,
                    y:              key.y,
                    type:           type,
                    time:           +new Date,
                    player_type:    player.type,
                    player_color:   player.col1,
                })
        }
    }///
}///

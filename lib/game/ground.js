/// Requirements ---------------------------------------------------------------

var EventEmitter =      require( "events" ).EventEmitter;

var debug =             require( "../debugger" );
var memdb =             require( "./memdb" );

/// Constants ------------------------------------------------------------------

var TABLE =             "ground";

/// Variables ------------------------------------------------------------------

var objects =           [];
var _events =           new EventEmitter();

/// Exports --------------------------------------------------------------------

module.exports = {

    init:                   init,

    on:                     on,
    off:                    off,

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


function on( evt_type, fn ){

    return _events.on( evt_type, fn );
}///

function off( evt_type, fn ){

    return _events.off( evt_type, fn );
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

    objects.push({
        type:           "flower",
        x:              player.x,
        y:              player.y,
        color:          player.col1,
        player:         player,
    });

    return writeRecord( "flower", player );
}///


function leaveTracks( player ){

    objects.push({
        type:           "tracks",
        x:              player.x,
        y:              player.y,
        player:         player,
        time:           +new Date,
    });

    return writeRecord( "tracks", player );
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

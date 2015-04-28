/// Requirements ---------------------------------------------------------------

var debug =             require( "./lib/debugger" );
var monsters =          require( "./lib/game/monsters" );
var Player =            require( "./lib/game/player" );
var Rectangle =         require( "./lib/game/geometry/rectangle" );
var ui =                require( "./lib/ui/ui" );
var world =             require( "./lib/game/world" );

/// Constants ------------------------------------------------------------------

var START_POINT = {
    x:                  Math.pow( 2, 23 ),
    y:                  Math.pow( 2, 23 ),
};

/// Main -----------------------------------------------------------------------

world.init().then( startGame );

/// Start game -----------------------------------------------------------------

function startGame(){

    var area =              Rectangle.around( START_POINT, 500 );

    var player1 =           new Player( "Player1", "PL", "blue", "yellow" );
    player1.setPos( START_POINT.x, START_POINT.y );


    world.npcs.generate( 100, area );
    world.addPlayer( player1 );

    monsters.addToWorld(
        world,
        area,
        100
    );

    monsters.nextMove();

    setInterval( moveMonsters, 5e2 );

    ui.map.follow( player1, world );
    var mapEl =             ui.map.getElement();
    mapEl.focus();

    player1.on( "new-pos", checkForNpcs );

    ui.screen.key([ "q", "C-c" ], quit );

    mapEl.key([ "left" ],  player1.left.bind( player1 ));
    mapEl.key([ "right" ], player1.right.bind( player1 ));
    mapEl.key([ "up" ],    player1.up.bind( player1 ));
    mapEl.key([ "down" ],  player1.down.bind( player1 ));
    mapEl.key([ "space" ], player1.plantFlower.bind( player1 ));
}///

/// Functions ------------------------------------------------------------------

function quit(){

    return process.exit( 0 );
}///


function moveMonsters(){
    /// debug( "MOVE MONSTERS" );

    monsters.nextMove();
    ui.map.render( world );
}///


function checkForNpcs( player ){

    var npc_list =      world.npcs.getAt( player );
    if( npc_list.length ){
        ui.info.setContent( npc_list[0].text );
    } else {
        ui.info.setContent( getPositionInfo( player ));
    }
}///


function getPositionInfo( pos ){

    return [
        "X: ", pos.x, "\n",
        "Y: ", pos.y, "\n",
    ].join( "" );
}///

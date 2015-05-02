/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );
var blessed =           require( "blessed" );

var debug =             require( "../debugger" );
var plane =             require( "../game/geometry/plane" );
var Rectangle =         require( "../game/geometry/rectangle" );

/// Constants ------------------------------------------------------------------

var PADDING =           8;

var TERRAIN = {
    mud:                { bg: 233, fg: 236 },
    ground:             { bg: 233, fg: 237 },
    grass:              { bg: 233, fg: 238 },
    bushes:             { bg: 233, fg: 239 },
    trees:              { bg: 234, fg: 239 },
    mountains:          { bg: 235, fg: 240 },
};

var TERRAIN_STR = {    
    mud:                getStyledString( "  ", TERRAIN.mud ),
    ground:             getStyledString( "··", TERRAIN.ground ),
    grass:              getStyledString( "··", TERRAIN.grass ),
    bushes:             getStyledString( "··", TERRAIN.bushes ),
    trees:              getStyledString( "··", TERRAIN.trees ),
    mountains:          getStyledString( "··", TERRAIN.mountains ),
};

/// Variables ------------------------------------------------------------------

var box;
var backgroundBox;
var stationary =        {};
var movable =           {};

var moved_viewport =    true;

var padding;
var renderScreen;
var viewport =          new Rectangle( 0, 0, 0, 0 );

/// Exports --------------------------------------------------------------------

module.exports = {

    addToScreen:        addToScreen,
    getElement:         getElement,

    updateViewport:     updateViewport,
    render:             render,
    follow:             follow,
};

/// Functions ------------------------------------------------------------------

function addToScreen( parent, renderFn, options ){

    box && box.detach && box.detach();

    box =   blessed.box( _.assign( {}, options, {
        parent:         parent,
    }));

    backgroundBox = blessed.box({
        parent:         box,
        left:           0,
        top:            0,
        right:          0,
        bottom:         0,
        tags:           true,
        content:        "",
    });

    renderScreen =      renderFn;

    updateViewport();
}///


function getElement(){

    return box;
}///


function updateViewport(){

    if( box ){
        viewport.x1 =       viewport.x0 + Math.floor( box.width / 2 ) - 1;
        viewport.y1 =       viewport.y0 + box.height - 2;
        moved_viewport =    true;
    }
}///


function render( world ){

    if( box ){
        world
            .getArea( viewport )
            .then( updateBox )
            .then( renderScreen );
    }

    function updateBox( worldPlane ){

        if( moved_viewport ){
            moved_viewport =    false;
            backgroundBox.setContent(
                plane.join(
                    plane.map( worldPlane, getPixelString),
                    "\n", ""
                )
            );
        }
    }///
}///


function follow( player, world ){

    player.on( world.events.MOVE, updatePos.bind( {}, world ));
    world.events.on( world.events.MOVE, onPlayerMove );

    updatePos( world, player );
    onPlayerMove( player );

    function updatePos( world, player ){

        if( player.x - PADDING < viewport.x0 || player.x + PADDING > viewport.x1 ){
            viewport.x0 =   player.x - Math.floor( box.width / 4 );
            updateViewport();
        }
        if( player.y - PADDING < viewport.y0 || player.y + PADDING > viewport.y1 ){
            viewport.y0 =   player.y - Math.floor( box.height / 2 );
            updateViewport();
        }

        moved_viewport && render( world );
    }///
}///

function onPlayerMove( player ){

    if( movable[player.id] ){
        var playerBox =         movable[player.id];
    } else{
        var playerBox =         getPlayerBox( player );
        playerBox.hide();
        movable[player.id] =    playerBox;
        box.append( playerBox );
    }

    if( viewport.contains( player )){
        
        playerBox.left =    2 * ( player.x - viewport.x0 );
        playerBox.top =     player.y - viewport.y0;
        playerBox.hidden && playerBox.show();
        renderScreen();
    } else {
        playerBox.hidden || playerBox.hide();
    }
}///


function getPixelString( block ){

    ///if( block.player ){
    ///    return getPlayerString( block.player );
    ///} else if( block.npc ){
    if( block.npc ){
        return getNpcString( block.npc );
    } else if( block.ground ){
        return getGroundString( block.ground );  
    } else {
        return TERRAIN_STR[ block.terrain ];
    }

    function getGroundString( ground ){

        switch( ground.type ){

            case "flower":
                return getStyledString( "**", {
                    bg: TERRAIN[ block.terrain ].bg,
                    fg: ground.color,
                });
                break;

            case "tracks":
                return getStyledString( ";;",  TERRAIN[ block.terrain ]);
                break;
            
            default:
                return TERRAIN_STR[ block.terrain ];
        }
    }///

    function getNpcString( npc ){

        return getStyledString( "??", {
            bg:     "white",
            fg:     "red",
        });
    }///
}///


function getPlayerBox( player ){

    return blessed.box({
        width:      2,
        height:     1,
        tags:       true,
        content:    getPlayerString( player ),
    });
}///

function getPlayerString( player ){

    if( player.type && player.type === "monster" ){
        return getStyledString( "}{", {
            bg: "black",
            fg: "red",
        });
    } else if( player.csign ){
        return getStyledString( player.csign, {
            bg: player.col1,
            fg: "white",
        });
    }
}///

function getStyledString( string, style ){

    var res =   [];

    style.bg && res.push( "{", style.bg, "-bg}" );
    style.fg && res.push( "{", style.fg, "-fg}" );
    res.push( string );
    ( style.fg || style.bg ) && res.push( "{/}" );

    return res.join( "" );
}///

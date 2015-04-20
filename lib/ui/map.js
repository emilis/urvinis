/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );
var blessed =           require( "blessed" );

var debug =             require( "../debugger" );
var plane =             require( "../game/geometry/plane" );
var Rectangle =         require( "../game/geometry/rectangle" );

/// Constants ------------------------------------------------------------------

var PADDING =           5;

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
var padding;
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

function addToScreen( parent, options ){

    box && box.detach && box.detach();

    box =   blessed.box( _.assign( {}, options, {
        parent: parent,
    }));

    updateViewport();
}///


function getElement(){

    return box;
}///


function updateViewport(){

    if( box ){
        viewport.x1 =       viewport.x0 + Math.floor( box.width / 2 ) - 1;
        viewport.y1 =       viewport.y0 + box.height - 2;
    }
}///


function render( world ){

    if( box ){
        box.setContent(
            plane.join(
                plane.map(
                    world.getArea( viewport ),
                    getPixelString
                ),
                "\n", ""
            )
        );
        box.parent.render();
    }
}///


function follow( player, world ){

    updatePos( world, player );
    player.on( "new-pos", updatePos.bind( {}, world ));

    function updatePos( world, player ){

        if( player.x - PADDING < viewport.x0 || player.x + PADDING > viewport.x1 ){
            viewport.x0 =   player.x - Math.floor( box.width / 4 );
            updateViewport();
        }
        if( player.y - PADDING < viewport.y0 || player.y + PADDING > viewport.y1 ){
            viewport.y0 =   player.y - Math.floor( box.height / 2 );
            updateViewport();
        }

        render( world );
    }///
}///


function getPixelString( block ){

    if( block.player ){
        return getPlayerString( block.player );
    } else if( block.object ){
        return getObjectString( block );  
    } else {
        return TERRAIN_STR[ block.terrain ];
    }

    function getObjectString( block ){

        switch( block.object.type ){

            case "flower":
                return getStyledString( "**", {
                    bg: TERRAIN[ block.terrain ].bg,
                    fg: block.object.player.col1
                });
                break;

            case "tracks":
                return getStyledString( ";;",  TERRAIN[ block.terrain ]);
                break;
            
            default:
                return TERRAIN_STR[ block.terrain ];
        }
    }///
    
    function getPlayerString( player ){

        return getStyledString( player.csign, {
            bg: player.col1,
            fg: "white",
        });
    }///
}///


function getStyledString( string, style ){

    var res =   [];

    style.bg && res.push( "{", style.bg, "-bg}" );
    style.fg && res.push( "{", style.fg, "-fg}" );
    res.push( string );
    ( style.fg || style.bg ) && res.push( "{/}" );

    return res.join( "" );
}///

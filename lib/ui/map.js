/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );
var blessed =           require( "blessed" );

var debug =             require( "../debugger" );
var plane =             require( "../game/geometry/plane" );
var Rectangle =         require( "../game/geometry/rectangle" );

/// Constants ------------------------------------------------------------------

var PADDING =           5;

var TERRAIN_STR = {    
    mud:                "{232-bg}{234-fg}··{/234-fg}{/232-bg}",
    ground:             "{232-bg}{234-fg}··{/234-fg}{/232-bg}",
    grass:              "{232-bg}{234-fg}··{/234-fg}{/232-bg}",
    bushes:             "{232-bg}{235-fg}··{/235-fg}{/232-bg}",
    trees:              "{233-bg}{236-fg}··{/236-fg}{/233-bg}",
    mountains:          "{233-bg}{237-fg}··{/237-fg}{/233-bg}",
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
    } else {
        return TERRAIN_STR[ block.terrain ];
    }
    
    function getPlayerString( player ){

        return [
            "{", player.col1, "-bg}",
            "{white-fg}",
            player.csign,
            "{/white-fg}",
            "{/", player.col1, "-bg}",
        ].join( "" );
    }///
}///


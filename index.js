#!/usr/bin/env node

/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );
var blessed =           require( 'blessed' );

var CONST =             require( "./lib/constants" );

var debug =             require( "./lib/debugger" );

var Player =            require( "./lib/world/player" );
var Vector =            require( "./lib/geometry/vector" );
var World =             require( "./lib/world/world" );

/// Constants ------------------------------------------------------------------

var FPS =               60;
var INTERVAL =          1000 / FPS;
var PADDING =           10;

/// Main -----------------------------------------------------------------------

// Create a screen object.
var screen =            blessed.screen({
    term:               "xterm-256color",
    fullUnicode:        true,
});

debug.addToScreen( screen, {
    top:                0,
    right:              0,
    width:              "40%",
    height:             "100%",
    border:             { type: "line" },
    label:              "[ Debug ]",
    content:            "",
});


// Create a box perfectly centered horizontally and vertically.
var box =   blessed.box({
    top:                0, ///'center',
    left:               0, ///'center',
    width:              "60%", ///CONST.width * CONST.pxwidth,
    height:             "100%", /// CONST.height,
    border:             { type: "line" },
    label:              "[ World ]",
    scrollable:         true,
    alwaysScroll:       true,
    tags:               true,
    style: {
        fg:             CONST.fg,
        bg:             CONST.bg,
    },
    content:            "",
});

screen.append( box );

var thFrame =           _.throttle( frame, INTERVAL );

var viewport =          new Vector( 0, 0, 0, 0 );
resizeViewport();
screen.on( "resize", resizeViewport )


screen.key([ 'q', 'C-c' ], quit );

/// Add player:

var player1 =            new Player( "Player1", "#66f", "yellow" );
player1.setPos( 10, 20 );
World.addPlayer( player1 );

screen.key([ "left" ],  movePlayer( player1, "left" ));
screen.key([ "right" ], movePlayer( player1, "right" ));
screen.key([ "up" ],    movePlayer( player1, "up" ));
screen.key([ "down" ],  movePlayer( player1, "down" ));
screen.key([ "space" ], function(){ player1.draw();     thFrame(); });

/// Redraw:

thFrame();

/// Functions ------------------------------------------------------------------

function frame(){

    box.setContent( World.getState( viewport ));
    screen.render();
}///

function quit(){

    return process.exit( 0 );
}///


function movePlayer( player, direction ){
    return function(){

        player[direction]();

        viewport.x0 =   Math.min( viewport.x0, player.x - PADDING );
        viewport.y0 =   Math.min( viewport.y0, player.y - PADDING );
        if( player.x + PADDING > viewport.x1 ){
            viewport.x0 += viewport.x1 - player.x;
        }
        if( player.y + PADDING > viewport.y1 ){
            viewport.y0 += viewport.y1 - player.y;
        }
        resizeViewport();
    };//
}///


function resizeViewport(){

    viewport.x1 =       viewport.x0 + Math.floor( box.width / 2 ) - 1;
    viewport.y1 =       viewport.y0 + box.height - 2;
    thFrame();
}///

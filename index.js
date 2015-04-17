#!/usr/bin/env node

/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );
var blessed =           require( 'blessed' );

var CONST =             require( "./lib/constants" );

var Player =            require( "./lib/world/player" );
var Vector =            require( "./lib/geometry/vector" );
var World =             require( "./lib/world/world" );

/// Constants ------------------------------------------------------------------

var FPS =               60;
var INTERVAL =          1000 / FPS;

/// Main -----------------------------------------------------------------------

// Create a screen object.
var screen =            blessed.screen({
    term:               "xterm-256color",
    fullUnicode:        true,

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
thFrame();

screen.on( "resize", thFrame );

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

    box.setContent(
        World.getState(
            new Vector( 0, 0, Math.floor( box.width / 2 ) - 1, box.height - 2 )
        )
    );
    screen.render();
}///

function quit(){

    return process.exit( 0 );
}///


function movePlayer( player, direction ){
    return function(){

        player[direction]();
        thFrame();
    };//
}///

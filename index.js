#!/usr/bin/env node

/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );
var blessed =           require( 'blessed' );

var CONST =             require( "./lib/constants" );

var Vector =            require( "./lib/geometry/vector" );
var World =             require( "./lib/world/world" );

/// Constants ------------------------------------------------------------------

var FPS =               60;
var INTERVAL =          1000 / FPS;

/// Main -----------------------------------------------------------------------

// Create a screen object.
var screen =            blessed.screen({
    term:               "xterm-256color",
});

// Create a box perfectly centered horizontally and vertically.
var box =   blessed.box({
    top:                0, ///'center',
    left:               0, ///'center',
    width:              "50%", ///CONST.width * CONST.pxwidth,
    height:             "100%", /// CONST.height,
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

screen.key([ 'q', 'C-c' ], quit );

screen.key([ "left" ],  function(){ World.playerLeft();     thFrame(); });
screen.key([ "right" ], function(){ World.playerRight();    thFrame(); });
screen.key([ "up" ],    function(){ World.playerUp();       thFrame(); });
screen.key([ "down" ],  function(){ World.playerDown();     thFrame(); });

screen.key([ "space" ], function(){ World.playerDraw();     thFrame(); });

/// Functions ------------------------------------------------------------------

function frame(){

    box.setContent(
        World.getState(
            new Vector( 0, 0, Math.floor( box.width / 2 ), box.height )
        )
    );
    screen.render();
}///

function quit(){

    return process.exit( 0 );
}///

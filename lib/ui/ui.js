/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );
var blessed =           require( "blessed" );

var debug =             require( "./debugger" );
var info =              require( "./info" );
var map =               require( "./map" );

/// Constants ------------------------------------------------------------------

var FPS =               60;

/// Main -----------------------------------------------------------------------

// Create a screen object.
var screen =            blessed.screen({
    term:               "xterm-256color",
    fullUnicode:        true,
    /// smartCSR:           true,
    fastCSR:            true,
    autoPadding:        true,
    dockBorders:        true,
    /// debug:              true,
});

var renderScreen =      _.throttle( screen.render.bind( screen ), FPS );

var right =             blessed.box({
    top:                0,
    right:              0,
    width:              "40%",
});

screen.append( right );

map.addToScreen( screen, renderScreen, {
    top:                0,
    left:               0,
    width:              "61%",
    height:             "100%",
    border:             { type: "line" },
    label:              "[ Map ]",
    tags:               true,
    content:            "",
});

var infoBorder =    blessed.box({
    parent:             right,
    top:                0,
    right:              0,
    width:              "100%",
    height:             "50%+1",
    border:             { type: "line" },
    label:              "[ Info ]",
});

info.addToScreen( infoBorder, renderScreen, {
    top:                0,
    left:               0,
    right:              0,
    bottom:             0,
    padding:            { top: 1, left: 2, right: 0, bottom: 0 },
    content:            "...info...",
});

debug.addToScreen( right, renderScreen, {
    bottom:             0,
    right:              0,
    width:              "100%",
    height:             "50%+1",
    border:             { type: "line" },
    label:              "[ Debug ]",
    content:            "...",
});

screen.on( "resize", map.updateViewport )

/// Exports --------------------------------------------------------------------

module.exports = {

    screen:             screen,
    debug:              debug,
    map:                map,
    info:               info,

    renderScreen:       renderScreen,
};

/// Requirements ---------------------------------------------------------------

var blessed =           require( "blessed" );

var debug =             require( "./debugger" );
var info =              require( "./info" );
var map =               require( "./map" );

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

var right =             blessed.box({
    top:                0,
    right:              0,
    width:              "40%",
});

screen.append( right );

map.addToScreen( screen, {
    top:                0,
    left:               0,
    width:              "61%",
    height:             "100%",
    border:             { type: "line" },
    label:              "[ Map ]",
    tags:               true,
    content:            "",
});

info.addToScreen( right, {
    top:                0,
    right:              0,
    width:              "100%",
    height:             "50%+1",
    border:             { type: "line" },
    label:              "[ Info ]",
    content:            "...info...",
});

debug.addToScreen( right, {
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
};

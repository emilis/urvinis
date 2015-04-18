/// Requirements ---------------------------------------------------------------

var blessed =           require( "blessed" );

var debug =             require( "./debugger" );
var map =               require( "./map" );

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

map.addToScreen( screen, {
    top:                0,
    left:               0,
    width:              "60%",
    height:             "100%",
    border:             { type: "line" },
    label:              "[ Map ]",
    tags:               true,
    content:            "",
});

screen.on( "resize", map.updateViewport )

/// Exports --------------------------------------------------------------------

module.exports = {

    screen:             screen,
    debug:              debug,
    map:                map,
};

/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );
var EventEmitter =      require( "events" ).EventEmitter;

/// Exports --------------------------------------------------------------------

module.exports = _.assign( new EventEmitter, {

    MOVE:               "move",
    INVALID_MOVE:       "invalid-move",

    GROUND_ADD:         "ground-add",
});

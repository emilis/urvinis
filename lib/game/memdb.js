/// Requirements ---------------------------------------------------------------

var knex =              require( "knex" );

/// Exports --------------------------------------------------------------------

module.exports =        knex({
    client:             "sqlite3",
    connection: {
        filename:       ":memory:",
    },
});

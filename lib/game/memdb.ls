### Requirements ---------------------------------------------------------------

require! {
    'knex'
}

### Exports --------------------------------------------------------------------

module.exports =    knex do

    client:         'sqlite3'
    connection:
        filename:   ':memory:'

### Requirements ---------------------------------------------------------------

require! {
    fs
    path
}

### Constants ------------------------------------------------------------------

DATA_DIR =          path.resolve __dirname, '../../data'

TAO =               path.resolve DATA_DIR, 'tao-te-chip.txt'

### Exports --------------------------------------------------------------------

module.exports <<< {

    get-list
}

### Functions ------------------------------------------------------------------

function get-list

    fs
        .read-file-sync TAO, 'utf8'
        .split '---'
        .map ( str )->
            str && str.trim && str.trim! || ''

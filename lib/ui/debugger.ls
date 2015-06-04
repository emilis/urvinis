### Requirements ---------------------------------------------------------------

require!                blessed

### Variables ------------------------------------------------------------------

var box
var render-screen
start =                 +new Date

### Exports --------------------------------------------------------------------

module.exports = debug <<< {
    add-to-screen
    get-element
}

### Functions ------------------------------------------------------------------

!function debug

    if !box || box.detached
        console.log.apply console, &
    else
        args =  Array.prototype.slice.call &
        box.add +new Date - start + ' ' + args.join ' '
        render-screen!


!function add-to-screen parent, render-fn, options

    box && box.detach && box.detach!

    box :=  blessed.log {} <<< options <<< {
        parent
    }

    render-screen :=     render-fn


function get-element

    box

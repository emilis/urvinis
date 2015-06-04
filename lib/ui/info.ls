### Requirements ---------------------------------------------------------------

require! {
    blessed
    '../debugger':      debug
}

### Variables ------------------------------------------------------------------

var box
var render-screen

### Exports --------------------------------------------------------------------

module.exports = {

    add-to-screen
    get-element
    set-content

    follow
}

### Functions ------------------------------------------------------------------

!function add-to-screen parent, render-fn, options

    box && box.detach && box.detach!

    box :=  blessed.box {} <<< options <<< {
        parent:         parent
    }

    render-screen :=    render-fn

function get-element

    box

!function set-content text

    if box
        box.set-content text
        render-screen!


!function follow player, world

    world-items =       world.npcs

    check-for-items player
    player.on world.events.MOVE, check-for-items

    !function check-for-items player

        items =         world-items.get-at player
        if items.length
            set-content items[0].text
        else
            set-content get-position-info player

        render-screen!

### Private functions ----------------------------------------------------------

function get-position-info pos

    "
        X: #{pos.x}\n
        Y: #{pos.y}\n
    "

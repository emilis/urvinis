### Requirements ---------------------------------------------------------------

require! {
    blessed
    lodash
    './debugger': debug
    './info'
    './map'
}

### Constants ------------------------------------------------------------------

const MIN_FPS =     15
const MAX_FPS =     30

### Main -----------------------------------------------------------------------

screen = blessed.screen {
    term:           'xterm-256color'
    full-unicode:   true
    fast-csr:       true
    auto-padding:   true
    dock-borders:   true
}

render-screen = lodash.debounce do
    screen~render
    1000 / MAX_FPS
    {
        leading:    true
        trailing:   true
        max-wait:   1000 / MIN_FPS
    }

right = blessed.box {
    top:            0
    right:          0
    width:          '40%'
}

screen.append right

map.add-to-screen screen, render-screen, {
    top:            0
    left:           0
    width:          '61%'
    height:         '100%'
    border:         type: 'line'
    label:          '[ Map ]'
}

info-border = blessed.box {
    parent:         right
    top:            0
    right:          0
    width:          '100%'
    height:         '50%+1'
    border:         type: 'line'
    label:          '[ Info ]'
}

info.add-to-screen info-border, render-screen, {
    top:            0
    left:           0
    right:          0
    bottom:         0
    padding:
        top:        1
        left:       2
        right:      0
        bottom:     0
    content:        '...info...'
}

debug.add-to-screen right, render-screen, {
    bottom:         0
    right:          0
    width:          '100%'
    height:         '50%'
    border:         type: 'line'
    label:          '[ Debug ]'
    content:        '...'
}

screen.on 'resize', map.update-viewport


### Exports --------------------------------------------------------------------

module.exports = {
    screen
    debug
    map
    info

    render-screen
}

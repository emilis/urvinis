### Requirements ---------------------------------------------------------------

require! {

    blessed
    lodash
    '../debugger':      debug
    '../game/geometry/plane'
    '../game/geometry/rectangle'
    './map/character-layer'
}

### Constants ------------------------------------------------------------------

const PADDING =         8

const TERRAIN =
    mud:                bg: 233, fg: 236
    ground:             bg: 233, fg: 237
    grass:              bg: 233, fg: 238
    bushes:             bg: 233, fg: 239
    trees:              bg: 234, fg: 239
    mountains:          bg: 235, fg: 240

const TERRAIN_STR =
    mud:                get-styled-string '  ', TERRAIN.mud
    ground:             get-styled-string '..', TERRAIN.ground
    grass:              get-styled-string '..', TERRAIN.grass
    bushes:             get-styled-string '..', TERRAIN.bushes
    trees:              get-styled-string '..', TERRAIN.trees
    mountains:          get-styled-string '..', TERRAIN.mountains

const ZINDEX =
    terrain:            1
    ground:             2
    items:              3
    characters:         4

### Variables ------------------------------------------------------------------

var box
var background-box

stationary =            {}
movable =               {}

moved-viewport =        true

var padding
var render-screen

viewport =              new rectangle 0, 0, 0, 0

### Exports --------------------------------------------------------------------

module.exports = {

    add-to-screen
    get-element
    follow
    update-viewport
}

### Functions ------------------------------------------------------------------

!function add-to-screen parent, render-fn, options

    box && box.detach && box.detach!

    box :=  blessed.box {} <<< options <<< {
        parent:         parent
    }

    background-box := blessed.box do
        parent:         box
        left:           0
        top:            0
        right:          0
        bottom:         0
        tags:           true
        content:        ''

    render-screen :=    render-fn

    update-viewport!

function get-element

    box

!function follow player, world

    player.on do
        world.events.MOVE
        check-viewport world, _

    world.events.on do
        world.events.GROUND_ADD
        on-add-ground world, _

    check-viewport world, player

    new character-layer box, viewport, render-screen
        ..follow player, world

!function update-viewport

    if box
        viewport.x1 =       viewport.x0 + Math.floor( box.width / 2 ) - 1
        viewport.y1 =       viewport.y0 + box.height - 2
        moved-viewport :=    true

!function check-viewport world, player

    if player.x - PADDING < viewport.x0 || player.x + PADDING > viewport.x1
        viewport.x0 =       player.x - Math.floor box.width / 4
        update-viewport!

    if player.y - PADDING < viewport.y0 || player.y + PADDING > viewport.y1
        viewport.y0 =       player.y - Math.floor box.height / 2
        update-viewport!

    moved-viewport && render world

function render world

    if box
        world
            .get-area viewport
            .then ( world-plane )!->

                if moved-viewport
                    moved-viewport :=   false

                    lodash.each stationary, detach-box
                    stationary :=       {}

                    background-box.set-content do
                        plane.join do
                            plane.map world-plane, get-pixel-string
                            '\n'
                            ''
            .then render-screen

### Ground boxes ---------------------------------------------------------------

!function on-add-ground world, ground-obj

    id =                "#{ground-obj.x}:#{ground-obj.y}"
    ground-box =        stationary[id]
    contains =          viewport.contains ground-obj

    if !contains
        if ground-box && !ground-box.hidden
            detach-box ground-box
            render-screen!
    else
        if !ground-box
            stationary[id] = ground-box = get-ground-box do
                ground-obj
                world.terrain.get-at ground-obj
            box.append ground-box
            ground-box.set-index ZINDEX.ground
        else
            ground-box.set-content do
                get-ground-string do
                    ground-obj
                    world.terrain.get-at ground-obj
        render-screen!

function get-ground-box ground-obj, terrain

    blessed.box do
        left:       2 * ( ground-obj.x - viewport.x0 )
        top:        ground-obj.y - viewport.y0
        width:      2
        height:     1
        tags:       true
        content:    get-ground-string ground-obj, terrain

function get-ground-string ground, terrain

    switch  ground.type
    case    'flower'    then get-styled-string '**', {
                bg:         TERRAIN[terrain].bg
                fg:         ground.player_color
    }
    case    'tracks'    then get-styled-string ';;', TERRAIN[terrain]
    default             TERRAIN_STR[terrain]

### Item boxes -----------------------------------------------------------------
### Terrain boxes --------------------------------------------------------------

function get-pixel-string block

    if block.npc
        get-npc-string block.npc
    else if block.ground
        get-ground-string block.ground, block.terrain
    else
        TERRAIN_STR[block.terrain]

function get-npc-string npc

    get-styled-string '??', {
        bg:         'white'
        fg:         'red'
    }

### Utilities ------------------------------------------------------------------

function get-styled-string string, style

    res =           []
    style.bg && res.push "{#{style.bg}-bg}"
    style.fg && res.push "{#{style.fg}-fg}"
    res.push string
    if style.fg || style.bg
        res.push '{/}'
    res.join ''

!function detach-box a-box

    a-box.detach!

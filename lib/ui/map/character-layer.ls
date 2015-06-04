### Requirements ---------------------------------------------------------------

require! {

    blessed
}

### Constants ------------------------------------------------------------------

ZINDEX =                5

### Export class ---------------------------------------------------------------

module.exports = class Character-layer

    ( @map-box, @viewport, @render-screen )->

        @boxes =        {}
        @world =        null

    follow: ( player, world )!~>

        @world =        world
        @events =       world.events

        @events.on @events.MOVE, @on-player-move

    on-player-move: ( player )!~>

        player-box =    @boxes[player.id]
        contains =      @viewport.contains player

        if !contains
            if player-box && !player-box.hidden
                player-box.hide!
                @render-screen!
        else
            if !player-box
                @boxes[player.id] = player-box = @get-player-box player
                @map-box.append player-box
                player-box.set-index ZINDEX

            player-box
                ..left =    2 * ( player.x - @viewport.x0 )
                ..top =     player.y - @viewport.y0
                ..hidden && ..show!
            @render-screen

    get-player-box: ( player )~>

        if player.col1
            style =
                bg:     player.col1
                fg:     'white'
        else
            style =
                bg:     'black'
                fg:     'red'

        blessed.box do
            width:      2
            height:     1
            style:      style
            content:    player.csign || '}{'

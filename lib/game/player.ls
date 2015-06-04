### Requirements ---------------------------------------------------------------

require! {
    'events':       { Event-emitter }
    './events':     { MOVE, INVALID_MOVE }
}

### Export class ---------------------------------------------------------------

module.exports = class Player

    ( name, csign, col1, col2 )->

        @id =       Math.random!to-string 36
        @type =     'human'
        @name =     name
        @csign =    csign
        @col1 =     col1
        @col2 =     col2

        @world =    null
        @x =        0
        @y =        0

        @_events =  new Event-emitter

    set-world: ( world )!->

        @world =        world
        @world_events = world.events

    on: ->          @_events.on.apply @_events, &
    off: ->         @_events.off.apply @_events, &

    emit: !->

        @_events.emit.apply @_events, &
        @world_events && @world_events.emit.apply @world_events, &

    set-pos: ( x, y )!->

        @world && @world.ground.leave-tracks @

        @x =        x
        @y =        y

        @emit MOVE, @

    try-move: ( x, y )!->

        if @world.is-valid-player-move @, x, y
            @set-pos x, y
        else
            @emit INVALID_MOVE, @

    left: !->       @try-move @x - 1,   @y
    right: !->      @try-move @x + 1,   @y
    up: !->         @try-move @x,       @y - 1
    down: !->       @try-move @x,       @y + 1

    plant-flower: ->

        @world && @world.ground.plant-flower @

    to-string: ->   "Player( '#{@name}' #{@x} #{@y} )"

module.exports =

    class Rectangle

        ( @x0, @y0, @x1, @y1 )->

        @around = ( pos, radius )->

            new Rectangle do

                pos.x - radius
                pos.y - radius
                pos.x + radius
                pos.y + radius

        get-width: ->   @x1 - @x0

        get-height: ->  @y1 - @y0

        contains: ( obj )->

            true
                && obj.x > @x0
                && obj.x < @x1
                && obj.y > @y0
                && obj.y < @y1

        to-string: ->

            [
                'Rectangle('
                @get-width! + '×' + @get-height!
                @x0
                @y0
                @x1
                @y1
                ')'
            ].join ' '

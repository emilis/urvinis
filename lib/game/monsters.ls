### Requirements ---------------------------------------------------------------

require!            './monsters/wolf'

### Variables ------------------------------------------------------------------

monsters =          []

### Exports --------------------------------------------------------------------

module.exports <<< {
    add-to-world
    next-move
}

### Functions ------------------------------------------------------------------

!function add-to-world world, area, number

    w =             area.get-width!
    h =             area.get-height!

    monsters ++= for til number

        new wolf

            ..set-pos do
                area.x0 + w * Math.random!
                area.y0 + h * Math.random!

            world.add-player ..


!function next-move

    for m in monsters
        m.next-move!

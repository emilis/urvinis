/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );

var Wolf =              require( "./monsters/wolf" );

/// Variables ------------------------------------------------------------------

var monsters =          [];

/// Exports --------------------------------------------------------------------

module.exports = {

    addToWorld:         addToWorld,
    nextMove:           nextMove,
};

/// Functions ------------------------------------------------------------------

function addToWorld( world, area, number ){

    var w =             area.getWidth();
    var h =             area.getHeight();

    monsters =  monsters.concat(
        _.times( number, addMonster )
    );

    function addMonster( i ){

        var m =         new Wolf();
        m.setPos(
            area.x0 + w * Math.random(),
            area.y0 + h * Math.random()
        );
        
        return world.addPlayer( m );
    }///
}///


function nextMove(){

    monsters.forEach( moveMonster );

    function moveMonster( m ){

        m.nextMove();
    }///
}///

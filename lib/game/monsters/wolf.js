/// Requirements ---------------------------------------------------------------

var _ =                 require( "lodash" );

var debug =             require( "../../debugger" );
var plane =             require( "../geometry/plane" );
var Rectangle =         require( "../geometry/rectangle" );
var sun =               require( "../sun" );

/// Exports --------------------------------------------------------------------

_.assign( Wolf.prototype, {

    setPos:             setPos,
    setWorld:           setWorld,
    nextMove:           nextMove,
    isValidMove:        isValidMove,
    move:               move,
    moveToTarget:       moveToTarget,
});

module.exports =        Wolf;

/// Class ----------------------------------------------------------------------

function Wolf(){

    this.type =         "monster";
    this.subtype =      "wolf";
    this.x =            0;
    this.y =            0;
    this.rx =           0;
    this.ry =           0;
    this.world =        null;
}///


function setPos( rx, ry ){

    this.world && this.world.ground.leaveTracks( this );

    this.x =            Math.round( rx );
    this.y =            Math.round( ry );
    this.rx =           rx;
    this.ry =           ry;
}///


function setWorld( world ){

    this.world =        world;
}///


function nextMove(){

    var radius =        10;
    var rect =          Rectangle.around( this, radius );

    var humans = this.world.players
        .getArea( rect )
        .filter( isHuman )
        .filter( notSameSpot( this ))
        .sort( isNearestTo( this ));

    if( humans.length ){
        return this.moveToTarget( humans[0] );
    }

    var track = this.world.ground
        .getArea( rect )
        .filter( hasHumanTracks )
        .filter( notSameSpot( this ))
        .reduce( getNewest, null );

    if( track ){
        return this.moveToTarget( track );
    }

    var sunDir =        sun.getVector();
    return this.move( sunDir.x, sunDir.y );
}///


function isValidMove( dx, dy ){

    return this.world.isValidPlayerMove(
        this,
        Math.round( this.rx + dx ),
        Math.round( this.ry + dy )
    );
}///


function move( dx, dy ){

    var k = Math.max( Math.abs( dx ), Math.abs( dy ));

    return this.setPos(
        this.rx + dx / k,
        this.ry + dy / k
    );
}///


function moveToTarget( t ){

    return this.move(
        t.x - this.x,
        t.y - this.y
    );
}///


/// Utilities ------------------------------------------------------------------

function notSameSpot( spot ){
    return function( p ){

        return p.x !== spot.x || p.y !== spot.y;
    };//
}///

function isHuman( player ){

    return player.type === "human";
}///

function getDistance( p1, p2 ){

    return Math.pow( p1.x - p2.x, 2 ) + Math.pow( p1.y - p2.y, 2 );
}///

function isNearestTo( p ){
    return function isNearest( a, b ){
        
        return getDistance( p, b ) - getDistance( p, a );
    };//
}///

function hasHumanTracks( ground ){

    return ground.player.type === "human";
}///

function getNewest( t1, t2 ){

    if( !t1 || t2.time > t1.time ){
        return t2;
    } else {
        return t1;
    }
}///

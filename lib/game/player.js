/// Requirements ---------------------------------------------------------------

var _ =             require( "lodash" );
var EventEmitter =  require( "events" ).EventEmitter;

/// Exports --------------------------------------------------------------------

_.assign( Player.prototype, {

    setWorld:       setWorld,
    on:             on,
    off:            off,

    setPos:         setPos,
    tryMove:        tryMove,
    left:           left,
    right:          right,
    up:             up,
    down:           down,

    plantFlower:    plantFlower,

    toString:       toString,
});

module.exports =    Player;

/// Functions ------------------------------------------------------------------

function Player( name, csign, col1, col2 ){

    this.id =       Math.random().toString( 36 );
    this.type =     "human";
    this.name =     name;
    this.csign =    csign;
    this.col1 =     col1;
    this.col2 =     col2;

    this.world =    null;
    this.x =        0;
    this.y =        0;

    this._events =  new EventEmitter();
}///


function setWorld( world ){

    this.world =    world;
}///

function on( evt_type, fn ){

    return this._events.on( evt_type, fn );
}///

function off( evt_type, fn ){

    return this._events.off( evt_type, fn );
}///


function setPos( x, y ){

    this.world && this.world.ground.leaveTracks( this );

    this.x =        x;
    this.y =        y;

    this._events.emit( "new-pos", this );
}///

function tryMove( x, y ){

    if( this.world.isValidPlayerMove( this, x, y )){
        this.setPos( x, y );
    } else {
        this._events.emit( "invalid-move", this, x, y );
    }
}///


function left(){

    this.tryMove( this.x - 1, this.y );
}///

function right(){

    this.tryMove( this.x + 1, this.y );
}///

function up(){

    this.tryMove( this.x, this.y - 1 );
}///

function down(){

    this.tryMove( this.x, this.y + 1 );
}///


function plantFlower(){

    this.world && this.world.ground.plantFlower( this );
}///


function toString(){

    return [
        "Player(",
        '"' + this.name + '"',
        this.x,
        this.y,
        ")",
    ].join( " " );
}///

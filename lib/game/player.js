/// Requirements ---------------------------------------------------------------

var _ =             require( "lodash" );
var EventEmitter =  require( "events" ).EventEmitter;

/// Exports --------------------------------------------------------------------

_.assign( Player.prototype, {

    setWorld:       setWorld,
    on:             on,
    off:            off,

    setPos:         setPos,
    left:           left,
    right:          right,
    up:             up,
    down:           down,

    draw:           draw,

    toString:       toString,
});

module.exports =    Player;

/// Functions ------------------------------------------------------------------

function Player( name, csign, col1, col2 ){

    this.name =     name;
    this.csign =    csign;
    this.col1 =     col1;
    this.col2 =     col2;

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

    this.x =        x;
    this.y =        y;

    this._events.emit( "new-pos", this );
}///


function left(){

    this.x--;
    this._events.emit( "new-pos", this );
}///

function right(){

    this.x++;
    this._events.emit( "new-pos", this );
}///

function up(){

    this.y--;
    this._events.emit( "new-pos", this );
}///

function down(){

    this.y++;
    this._events.emit( "new-pos", this );
}///


function draw(){

    this.world.drawPlayerObject( this );
    this._events.emit( "new-pos", this );
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

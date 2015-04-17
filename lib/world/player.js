/// Requirements ---------------------------------------------------------------

var _ =             require( "lodash" );

/// Exports --------------------------------------------------------------------

_.assign( Player.prototype, {

    setPos:         setPos,
    setWorld:       setWorld,

    left:           left,
    right:          right,
    up:             up,
    down:           down,

    draw:           draw,

    getDrawBlock:   getDrawBlock,
});

module.exports =    Player;

/// Functions ------------------------------------------------------------------

function Player( name, col1, col2 ){

    this.name =     name;
    this.name2 =    name.slice( 0, 2 ).toUpperCase();
    this.col1 =     col1;
    this.col2 =     col2;

    this.block =    getBlock( this.name2, this.col1 );

    this.x =        0;
    this.y =        0;
}///

function setPos( x, y ){

    this.x =        x;
    this.y =        y;
}///

function setWorld( world ){

    this.world =    world;
}///

function left(){

    this.x--;
}///

function right(){

    this.x++;
}///

function up(){

    this.y--;
}///

function down(){

    this.y++;
}///


function draw(){

    this.world.drawObject( this.x, this.y, this.getDrawBlock() );
}///


function getDrawBlock( val ){

    ///var col =   ( val % 2 ) ? this.col1 : this.col2;
    var col =       this.col1;

    return [
        "{", col, "-fg}",
        "øø",
        "{/", col, "-fg}",
    ].join( "" );
}///



function getBlock( name, col ){

    return [
        "{", col, "-bg}",
        "{white-fg}",
        name,
        "{/white-fg}",
        "{/", col, "-bg}",
    ].join( "" );
}///


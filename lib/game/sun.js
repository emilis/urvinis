/// Exports --------------------------------------------------------------------

module.exports = {

    getVector:          getVector,
};

/// Functions ------------------------------------------------------------------

function getVector(){

    var t =             +new Date;
    var angle =         ( t % 314159 ) / 1e5;

    return {
        x:              Math.cos( angle ),
        y:              Math.sin( angle ),
        angle:          angle,
    };
}///

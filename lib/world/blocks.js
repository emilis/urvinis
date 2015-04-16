/// Constants ------------------------------------------------------------------

var ERR_BLOCK = "{red-bg}{yellow-fg}E!{/yellow-fg}{/red-bg}";

var TYPES = [
    "{232-bg}{234-fg}··{/234-fg}{/232-bg}",
    "{232-bg}{234-fg}··{/234-fg}{/232-bg}",
    "{232-bg}{234-fg}··{/234-fg}{/232-bg}",
    "{232-bg}{235-fg}··{/235-fg}{/232-bg}",
    "{233-bg}{236-fg}··{/236-fg}{/233-bg}",
    "{233-bg}{237-fg}··{/237-fg}{/233-bg}",
];

var TYPE_COUNT =    TYPES.length;

/// Exports --------------------------------------------------------------------

module.exports = {

    ERR_BLOCK:          ERR_BLOCK,

    TYPES:              TYPES,
    TYPE_COUNT:         TYPE_COUNT,
    
    numToString:        numToString,
};

/// Functions ------------------------------------------------------------------

function numToString( num ){

    return TYPES[num] || ERR_BLOCK;
}///

/// Constants ------------------------------------------------------------------

var ERR_BLOCK = "{red-bg}{yellow-fg}E!{/yellow-fg}{/red-bg}";

var TYPES = [
    "{black-bg}{#111-fg}··{/#111-fg}{/black-bg}",
    "{black-bg}{#222-fg}··{/#222-fg}{/black-bg}",
    "{black-bg}{#333-fg}··{/#333-fg}{/black-bg}",
    "{black-bg}{#444-fg}··{/#444-fg}{/black-bg}",
    "{black-bg}{#555-fg}··{/#555-fg}{/black-bg}",
    "{black-bg}{#666-fg}··{/#666-fg}{/black-bg}",
    "{black-bg}{#777-fg}··{/#777-fg}{/black-bg}",
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

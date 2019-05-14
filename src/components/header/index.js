import './index.styl';

$(document).ready(function() {
    console.log($( "input.fulltext-search-box" ).width())
    $( "input.fulltext-search-box" ).resize(function() {
        console.log($( "input.fulltext-search-box" ).width())
    });
});
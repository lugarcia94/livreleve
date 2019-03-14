import './style.styl';

const body = $('body');

if(body.hasClass('category') || body.hasClass('department') || body.hasClass('resultado-busca')) {
    let sub = $('.sub');
    let resultTimer = $('.searchResultsTime');
    sub.first().append($('.pager.top')).prepend(resultTimer.first());
    sub.last().append($('.pager.bottom')).prepend(resultTimer.last());
}



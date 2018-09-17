import './style.styl';

const body = $('body');

if(body.hasClass('category')) {
    let sub = $('.sub');
    sub.first().append($('.pager.top'));
    sub.last().append($('.pager.bottom'));
}

import './style.styl';

const body = $('body');

$('.sidebar__button--open').click(function(){
    body.addClass('sidebar--open');
});

$(".sidebar__button--close").click(function(){
    body.removeClass('sidebar--open');
});

$('.sidebar__container').click(function(evt){
    if($(evt.target).hasClass('sidebar__container')) {
        body.removeClass('sidebar--open');
    }
});
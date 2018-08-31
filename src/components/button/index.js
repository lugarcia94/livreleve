import './style.styl';

const body          = document.querySelector('body');
const buttonMenu    = document.querySelector('.button__menu');
const menu          = document.querySelector('#menu');

buttonMenu.addEventListener('click',function(){
    menuAction();
});

menu.addEventListener('click', function(evt){
    if(evt.target.classList.contains('menu') || evt.target.classList.contains('menu--mobile')) {
        menuAction();
    }
});

function menuAction() {
    if(body.classList.contains('is-menu')) {
        body.classList.remove('is-menu');
        buttonMenu.classList.remove('button__menu--close');
    } else {
        body.classList.add('is-menu');
        buttonMenu.classList.add('button__menu--close');
    }
}


const buttonCart    = document.querySelector('.button__minicart');

buttonCart.addEventListener('click', function(){
    cartAction();
});

function cartAction() {
    body.classList.toggle('is-minicart');
}
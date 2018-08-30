// import Slideout from 'slideout';
// import './style.styl';
//
// const menu      = document.querySelector('#menu');
// const panel     = document.querySelector('.wrapper__container');
// const button    = document.querySelector('.button__menu');
//
// const slideout = new Slideout({
//     'panel'        : panel,
//     'menu'         : menu,
//     'padding'      : 256,
//     'tolerance'    : 70
// });
//
// if(!slideout.isOpen()) {
//     menu.classList.add('menu--hide');
// }
//
// slideout.on('beforeopen', function () {
//     panel.classList.add('slideout--open');
//     button.classList.add('button__menu--close');
//     menu.classList.remove('menu--hide');
// });
//
// slideout.on('beforeclose', function () {
//     panel.classList.remove('slideout--open');
//     button.classList.remove('button__menu--close');
// });
//
// slideout.on('close', function(){
//     menu.classList.add('menu--hide');
// });
//
// button.addEventListener('click', function() {
//     slideout.toggle();
// });
//
//
// // Slideout Cart
// const cart          = document.querySelector('#minicart');
// const buttonCart    = document.querySelector('.button__minicart');
//
// const slideoutCart = new Slideout({
//     'panel'        : panel,
//     'menu'         : cart,
//     'padding'      : 256,
//     'tolerance'    : 70,
//     'side'         : 'right'
// });
//
// console.log('teste');
// if(!slideoutCart.isOpen()) {
//     cart.classList.add('minicart--hide');
// }
//
// // slideoutCart.on('beforeopen', function() {
// //     if($(window).outerWidth() > 987) {
// //         menu.style.transform = 'translateX(-256px)';
// //     } else menu.style.transform = '';
// // });
// //
// // slideoutCart.on('beforeclose', function() {
// //     menu.style.transform = '';
// // });
//
// slideoutCart.on('beforeopen', function () {
//     cart.classList.remove('minicart--hide');
// });
//
// slideoutCart.on('close', function(){
//     cart.classList.add('minicart--hide');
// });
//
// buttonCart.addEventListener('click', function() {
//     slideoutCart.toggle();
// });

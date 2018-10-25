// Import Componete CSS
import './components';
import 'Core';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './react/store/configureStore';

import Menu from './react/components/Menu';
const store = configureStore();

import { fetchOrderForm } from "./react/actions/core";

import 'Core/polyfill/hasAttribute';

//Polyfill
import 'Core/polyfill/array.range';
import 'Core/polyfill/reduce';

const config = {
    menu: true,
    minicart: true,
    buybutton: true,
    giftlist: false,
    contact: true,
    relatedSearch: true
};

// Load Order Form

store.dispatch(fetchOrderForm());

import Kit from './react/components/kit';
let rootKit = Array.from(document.querySelectorAll('[data-component=kits]'));
// 1512
if(rootKit.length) {

    rootKit.forEach((kit) => {
        let title   = kit.querySelector('h2').innerHTML;
        let rate    = [];
        let ids     = [];

        Array.from(kit.querySelectorAll('[data-id]')).forEach(id => {
            ids.push(id.getAttribute('data-id'));
            rate.push(id.querySelector('.rate').innerHTML);
        });

        ReactDOM.render(
            <Provider store={store}>
                <Kit ids={ ids } rate={ rate } title={ title } />
            </Provider>,
            kit
        );
    });
}


// Render Button Menu
// import ButtonMenu from './react/components/ButtonMenu';


if(config.menu) {
    let rootMenu = document.querySelector('#menu');

    if(rootMenu) {
        let slotMenu = Array.from(rootMenu.querySelectorAll('[slot]'));

    // Render Menu
        ReactDOM.render(
            <Provider store={store}>
                <Menu slot={slotMenu}/>
            </Provider>,
            rootMenu
        );
    }

    // let rootButtonMenu = document.querySelector('.header__button-menu');
    //
    // if(rootButtonMenu) {
    //     ReactDOM.render(
    //         <Provider store={store}>
    //             <ButtonMenu />
    //         </Provider>,
    //         rootButtonMenu
    //     );
    // }
}


// Minicart
import Minicart from './react/components/Minicart';

if(config.minicart) {
    let rootMinicart = document.querySelector('#minicart');
    if(rootMinicart) {
        ReactDOM.render(
            <Provider store={store}>
                <Minicart />
            </Provider>,
            rootMinicart
        );
    }
}

import BuyButton from './react/components/BuyButton';
if(config.buybutton) {
    let rootBuyButtom = document.querySelectorAll('.showcase__buy');

    Array.from(rootBuyButtom).forEach(function(root) {
        let id = root.getAttribute('data-id');
        let title = root.innerHTML;

        ReactDOM.render(
            <Provider store={store}>
                <BuyButton id={id} title={title} />
            </Provider>,
            root
        );

    });
}
//
// // Gift List
// import GiftList from './react/components/GiftList';
// if(config.giftlist) {
//
//     let rootGiftList = document.querySelectorAll('.showcase__giftlist');
//
//     Array.from(rootGiftList).forEach(function(root) {
//         let id = root.getAttribute('data-id');
//
//         ReactDOM.render(
//             <Provider store={store}>
//                 <GiftList id={id} />
//             </Provider>,
//             root
//         );
//
//     });
// }
//
// Contato
import Contact from './react/components/Contact';

if(config.contact) {
    let rootContact = document.querySelector('[data-component=contact]');

    if(rootContact) {
        ReactDOM.render(
            <Provider store={store}>
                <Contact />
            </Provider>,
            rootContact
        );
    }

}
//
// //Related Search
// import RelatedSearch from './react/components/RelatedSearch';
//
// if(config.relatedSearch) {
//     let rootRelatedSearch = document.querySelector('#related-search');
//
//     if(rootRelatedSearch) {
//         window.addEventListener('auaha.product', e => {
//             let id = e.detail.product.productId;
//
//             ReactDOM.render(
//                 <Provider store={store}>
//                     <RelatedSearch id={id} />
//                 </Provider>,
//                 rootRelatedSearch
//             );
//         });
//     }
// }

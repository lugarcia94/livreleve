import React from 'react';
import ReactDOM from 'react-dom';
import Attr from './attr';

import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

import './zoom.styl';
import './style.styl';
import './notifyme.styl';
import './frete.styl';
import zoom from 'Core/functions/zoom';


const body = $vtex('body');
const attrs = Array.from(document.querySelectorAll('[data-attr]'));

attrs.forEach((attr) => {
    const name = attr.getAttribute('data-attr');
    ReactDOM.render(
        <Attr name={ name } />,
        attr
    );
});

// Function set SKU code, show in tag HTML code
const setSkuID = (sku) => {
    const code = $vtex('.product__code');
    if(code.length) {
        code.html('SKU: ' + sku).addClass('product__code--show');
    }
};

// Check page product
if(body.attr('id') == 'product-page') {
    $(document).ready(()=> ShippingValue());
    // Correção para o zoom
    zoom();

    $('.product__variants').on('click', function(){
        $('.product__variations').addClass('on');
    });

    $('.product__variations').click((evt) => {
        if(evt.target.classList.contains('product__variations')) evt.target.classList.remove('on');
    });

    $('#popupCalculoFreteWrapper').on('click', function(){
        $('.product__shipping').addClass('on');
    });

    $('#calculoFrete').on('click', function(evt){
        if($(evt.target).attr('id') == 'calculoFrete')
            $('.product__shipping').removeClass('on');
    });

    $('.product__description .product__title').click(function(){
        $(this).closest('.product__description').addClass('on');
    });

    $('.description-product__content').click(function(evt){
        if($(evt.target).hasClass('description-product__content')) {
            $(this).closest('.product__description').removeClass('on');
        }
    })

    $('.product__specification').on('click', '.attrs__title', function(){
        $(this).closest('.product__specification').addClass('on');
    });

    $('.product__specification').on('click', '.attrs__container', function(evt){
        if($(evt.target).hasClass('attrs__container')) {
            $(this).closest('.product__specification').removeClass('on');
        }
    });

    // Atuazação do Sku do produto
    $vtex(window).on('skuSelected.vtex', (evt, productId, sku) => {
        setSkuID(sku.sku);
    });

    // Quando carrega o produto pega o sku
    vtexjs.catalog.getCurrentProductWithVariations().done(function(product){
        setSkuID(product.skus[0].sku);
    });

    // Carousel das miniaturas do produto
    $('.thumbs').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        vertical: true
    });
}
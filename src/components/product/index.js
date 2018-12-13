import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

import './zoom.css';
import './style.styl';
import { slug, buttonMoreLess, onlyFloat, buttonBuy } from 'Core/functions';

const body = $vtex('body');

// Function set SKU code, show in tag HTML code
const setSkuID = (sku) => {
    const code = $vtex('.product__code');
    if(code.length) {
        code.html('SKU: ' + sku).addClass('product__code--show');
    }
};

// Check page product
if(body.attr('id') == 'product-page') {
    $vtex(window).on('skuSelected.vtex', (evt, productId, sku) => {
        setSkuID(sku.sku);
    });

    vtexjs.catalog.getCurrentProductWithVariations().done(function(product){
        setSkuID(product.skus[0].sku);
    });

    $('.thumbs').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        vertical: true
    });
}
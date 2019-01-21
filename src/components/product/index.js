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
import getProductById from 'Core/getProductById';


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
        if($(window).width() > 991) {
            if($('body').hasClass('quickview')) {
                $("html,body").animate({
                    scrollTop: $('.product__variations').offset().top
                }, 1000);
                console.log('iframe', $('.product__variations').offset().top);
            } else {
                $('html,body').animate({
                    scrollTop: $('.product__variations').offset().top - $('.wrapper__container > .header').outerHeight()
                }, 1000);
            }
        }
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
        initProduct(product.productId);
    });

    async function initProduct(id) {
        const product = await getProductById(id);
        // thumbs Video
        const video = product.Video
        if(video) {
            const src = $(video[0]).attr('src');
            const id = src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
            $('.thumbs').append(`<li class="video"><img src="//img.youtube.com/vi/${ id }/0.jpg" /></li>`);
            $('.thumbs .video').on('click', function(){
                $('#include').toggleClass('on-play');
            });
            $('.thumbs li:not(.video)').on('click', function(){
                $('#include').removeClass('on-play');
            });
        }
        $('#include').append($('<div id="yotubeplay">').append(video));
        thumbsCarousel();

        // Imagem descrição 
        const image = product.Imagem;
        if(image) {
            $('.product__specification-image').append($('<div class="product__image-extra">').append(`<img src="${ image }" />`));
        }
    }

    function thumbsCarousel(){
        // Carousel das miniaturas do produto
        $('.thumbs').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            vertical: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        vertical: false
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        vertical: false,
                        slidesToShow: 3,
                    }
                }
            ]
        });
    }

    $('.product').on('click', '.showcase__title', function(){
        $(this).closest('.showcase').addClass('on');
    });

    $('.product').on('click', '.showcase__container > div > ul', function(evt) {
        if($(evt.target).hasClass('slick-slider')) {
            $(this).closest('.showcase').removeClass('on');
        }
    });

    const buytobether = $('#divCompreJunto');
    if(buytobether.length) {
        const htmlBuyToBether = $.trim(buytobether.html());
        if(htmlBuyToBether != '') {
            buytobether.closest('.product__buytobether').addClass('buytobether--actived');
        }
    }

    $('.product__link-more').click(function(evt){
        const top = $('.product__title--description').offset().top - $('#header').outerHeight();

        $('body,html').animate({
            scrollTop: top
        }, 1000);

        evt.preventDefault();
    });

    function checkProduct() {
        $('body').removeClass('product--availabled');
        if($('.notifyme.sku-notifyme').attr('style').indexOf('none') != -1) {
            $('body').addClass('product--availabled');
        }
    }

    checkProduct();

    function checkTicketProduct() {
        const discount = $('.product__image .labels [class*=desconto-a-vista]:not(.on)');
        const numberPattern = /\D/g;

        if(!$('.product__prices:not([wholesale-prices]) .productPrice').hasClass('on')) {
            const percent  = $.trim(discount.text().replace( numberPattern, '' ));
            const price = $.trim($('.product__prices .price-best-price .skuBestPrice').text().replace('R$', '').replace(',', '.'));
            const total = price * ((100-percent) / 100);
            const html      = `<div class="prices__discount"><span class="price">R$ ${ total.toFixed(2).replace('.', ',') }</span>  á vista com desconto</div>`;

            $('.product__price:not([wholesale-prices]) .productPrice').append(html).addClass('on');
        }
    }
    
    checkTicketProduct();

    let discountDefault=0;

    function discountProgressive(qtd) {
        const label = $('.product__image .labels [class*=desconto-progressivo]');

        if(label) {
            const discount = $.trim(label.text().split('-')[1]).split(' ');

            $.each(discount,function(index, item){
                const productDiscount = item.split('/');

                if(qtd < parseInt(productDiscount[0])) {
                    if(discountDefault != parseInt(productDiscount[0])) {
                        discountDefault = parseInt(productDiscount[0]);
                        renderProgressiveHtml(productDiscount[0], productDiscount[1]);
                    }
                    return false;
                }
            });
            
        }
        
    }
    function renderProgressiveHtml(qtd, percent) { console.log(qtd,percent);
        const HTML = `<div class="progressive">
            <div class="progressive__container">
                <h3 class="progressive__title">Desconto Progressivo</h3>
                <p>Compre <strong>${ qtd } UNIDADES</strong></p>
                <p>Ganhe <strong>${ percent }% DE DESCONTO</strong></p>
            </div>
        </div>`;
        $('.progressive').remove();
        $('.product__actions--button').before(HTML);
    }
    $('.qtds__input').on('qtds.change', function(evt,qtd){
        var qtds = parseInt(qtd) || 1;
        discountProgressive(qtds);
    });
    $(document).ajaxComplete(function(){
        checkTicketProduct();
        checkProduct();
    });
}
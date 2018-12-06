import './zoom.css';
import './style.styl';
import { slug, buttonMoreLess, onlyFloat, buttonBuy } from 'Core/functions';



function produtoInit(){

    $vtex(window).on('load', function() {  
        setTimeout(function() {
           $vtex('.product__review #publishUserReview').on('click', '.formUserComment', function(e){
               if($vtex(e.target).hasClass('formUserComment')) {
                   $vtex('.product__review #publishUserReview .formUserComment').html('');
               }
           });
        }, 5000);
    });


    $vtex(document).ajaxComplete(function(a,b,c) {
        let u = "/userreview";
        let p = "/publishuserreviewcomment";

        if( u == c.url ){
            $vtex('.product__review #publishUserReview').on('click', '.formUserComment', function(e){
                if($vtex(e.target).hasClass('formUserComment')) {
                    $vtex('.product__review #publishUserReview .formUserComment').html('');
                }
            });
        }

        if( p == c.url ){
            $vtex('.product__review #publishUserReview').on('click', '.formUserComment', function(e){
                if($vtex(e.target).hasClass('formUserComment')) {
                    $vtex('.product__review #publishUserReview .formUserComment').html('');
                }
            });
        }
    });

    $('.product__variations .skuList label').each(function(){
        $(this).append('<img src="//wawcadeiras.vteximg.com.br/arquivos/'+slug($(this).text())+'.jpg" width="60" height="60" alt="'+$(this).text()+'">');
    });

    function pencent(){
        let oldPrice = $('.plugin-preco .skuListPrice').text();
        let bestPrice = $('.plugin-preco .skuBestPrice').text();
        if(oldPrice && bestPrice) {
            let discount = (onlyFloat(oldPrice) - onlyFloat(bestPrice)) / onlyFloat(oldPrice) * 100

            if (!$('.pencent-price').length) {
                $('.plugin-preco').append('<span class="pencent-price"></span>');
            }
            $('.pencent-price').html('<strong>' + discount.toFixed(0) + '%</strong><em>off</em>');
        }
    }
    pencent();

    $vtex(window).on('skuSelected.vtex', function(e,id,sku){
        let status = sku.available
        if( status == true ){
            $vtex('.product__container').attr('data-status', true );
            pencent();
        }else{
            $vtex('.product__container').attr('data-status', false );
        }
        if( !$vtex('.product__variations--selected').length ){
            $vtex('.product__variations').append('<span class="product__variations--selected"></span>');
        }
        $vtex('.product__variations--selected').html('Selecionado: <strong>' + sku.skuname + '</strong>' );

        $('#show .thumbs').slick({
            slidesToShow      : 5,
            slidesToScroll    : 5,
            arrows: true
        });

    });


    let brand = $('.product__brand a').text();
    $('.product__brand a').html('<img src="/arquivos/'+slug(brand)+'.jpg">');

}

if( $('body#product-page').length ){
    produtoInit();
}



buttonMoreLess('.buttons__qtys', '.buttons__input--buy', '.buttons__action--more', '.buttons__action--less');
buttonBuy('.buttons--buy', '.buy-button', '.buttons__input--buy');

if($('.image-zoom').length) {
    var resetZoom = function () {
        window.LoadZoom = function () {
            var optionsZoom = {
                zoomType: 'innerzoom',
                zoomWidth: $vtex('.image-zoom').width(),
                zoomHeight: $vtex('.image-zoom').height()
            };

            $vtex(".image-zoom").jqzoom(optionsZoom);
        };

        LoadZoom(0);
    };

    resetZoom();

    $(window).resize(() => resetZoom());
}

const shortDescription = $('.product__description-more');
const description = $('.product__description .product__title');

if(shortDescription && description) {
    shortDescription.click(function(){
        let top = description.offset().top - $('.header').outerHeight();

        $('html,body').animate({scrollTop: top}, 1000);
    });
}
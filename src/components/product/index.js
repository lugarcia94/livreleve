import './style.styl';
import { slug, currency, onlyFloat } from 'Core/functions';


$('.product__variations .skuList label').each(function(){
    $(this).append('<img src="//monali.vteximg.com.br/arquivos/'+slug($(this).text())+'.jpg" width="60" height="60" alt="'+$(this).text()+'">');
});



function pencent(){
    let oldPrice = $('.plugin-preco .skuListPrice').text();
    let bestPrice = $('.plugin-preco .skuBestPrice').text();
    let discount =  ( onlyFloat(oldPrice) - onlyFloat(bestPrice) ) / onlyFloat(oldPrice) * 100 

    if( !$('.pencent-price').length ){
        $('.plugin-preco').append('<span class="pencent-price"></span>');
    }
    $('.pencent-price').html( '<strong>'+discount.toFixed(0)+'%</strong><em>off</em>' );
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
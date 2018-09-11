import './style.styl';
import { slug } from 'Core/functions';



$('.product__variations .skuList label').each(function(){
    $(this).append('<img src="//monali.vteximg.com.br/arquivos/'+slug($(this).text())+'.jpg" width="60" height="60" alt="'+$(this).text()+'">');
});


$vtex(window).on('skuSelected.vtex', function(e,id,sku){
	let status = sku.available
	if( status == true ){
        $vtex('.product__container').attr('data-status', true );
	}else{
		$vtex('.product__container').attr('data-status', false );
    }
    
    if( !$vtex('.product__variations--selected').length ){
        $vtex('.product__variations').append('<span class="product__variations--selected"></span>');
    }

    $vtex('.product__variations--selected').html('Selecionado: <strong>' + sku.skuname + '</strong>' );

});



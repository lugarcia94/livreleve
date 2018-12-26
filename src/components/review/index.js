import 'Core/jquery.observe';
import './style.styl';

$(document).ready(function(){
    const ratingTop = $('#spnRatingProdutoTop')
    if(ratingTop.length) {
        ratingTop.next().append(ratingTop.text());
    };

    $('.product__review').on('click', '.product__title', function(){
        $(this).closest('.product__review').addClass('on');
    });
    
    $('.product__review').on('click', '#resenha', function(evt){
        if($(evt.target).attr('id') == 'resenha')
            $(this).closest('.product__review').removeClass('on');
    });

    $('.product__review').on('click', '#opcoes-avalie label', function(){
        $(this).prev().each(function() { this.click(); })
    });

    $vtex(document).ajaxComplete((event, xhr, settings) => {
        if(settings.url.indexOf('publishuserreviewcomment') !== -1) {
            const form = $('.formUserComment');
            form.observe('childlist subtree', function(record) {
                console.log('change');
            })

        }
    })
})
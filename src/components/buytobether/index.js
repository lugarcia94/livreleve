import slick from 'slick-carousel';
import './style.styl';


function buytobether(){
    let  buytobether = $('.buytobether');
    $('.buytobether__inner').remove();
    if( ! buytobether.find('.buytobether__inner').length ){
        buytobether.prepend('<ul class="buytobether__inner"></ul>');
    }

    let imgA    = '';
    let imgB    = '';
    let nameA   = '';
    let nameB   = '';
    let buy     = '';

    $.each(buytobether.find('tr'),function(i){
        
        imgA    = $(this).find('.itemA img').attr('src');
        imgB    = $(this).find('.itemB img').attr('src');
        nameA   = $(this).find('.itemA h3').text();
        nameB   = $(this).find('.itemB h3').text();
        buy     = $(this).find('.buy').html()

        buytobether.find('.buytobether__inner').append(`
            <li>
                <div class="buytobether__a">
                        <img src="${imgA}" alt="${nameA}">
                        <h3>${nameA}</h3>
                </div>
                <div class="buytobether__b">
                        <img src="${imgB}" alt="${nameB}">
                        <h3>${nameB}</h3>
                </div>
                <div class="buytobether__buy">${buy}</div>
            </li>
        `);
    });

    $('.buytobether__inner').slick({
        slidesToShow      : 2,
        slidesToScroll    : 2,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });
    
}

buytobether();

$(document).ready(function(){
    $(document).on("DOMNodeInserted DOMNodeRemoved", "#divCompreJunto", function(i){
        buytobether();
    });
});




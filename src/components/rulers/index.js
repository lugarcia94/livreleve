import './style.styl';

if (window.innerWidth < 1100) {
    const rulers = $('.info__list');

    rulers.slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },{
                breakpoint: 530,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    });
}

$('#newsletterButtonOK').val('CADASTRAR');
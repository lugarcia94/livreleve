import slick from 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import './style.styl';

$('[data-carousel]').each(function(){
    const type = $(this).attr('data-carousel');
    let config = {};

    switch (type) {
        case 'three':
            config.variableWidth      = true;
            config.responsive         = [
                {
                    breakpoint        : 992,
                    settings          : {
                        centerMode    : true
                    }
                }
            ];
            break;

        case 'duo':
            config.slidesToShow      = 2;
            config.slidesToScroll    = 2;

            break;

        case 'showcase':
            config.slidesToShow      = 5;
            config.slidesToScroll    = 5;
            config.dots              = true;
            config.responsive         = [
                {
                    breakpoint        : 1024,
                    settings          : {
                        slidesToShow      : 4,
                        slidesToScroll    : 4
                    }
                },
                {
                    breakpoint        : 992,
                    settings          : {
                        slidesToShow      : 3,
                        slidesToScroll    : 3
                    }
                },
                {
                    breakpoint        : 768,
                    settings          : {
                        slidesToShow      : 2,
                        slidesToScroll    : 2
                    }
                },
                {
                    breakpoint        : 425,
                    settings          : {
                        slidesToShow      : 1,
                        slidesToScroll    : 1
                    }
                }
            ];

            break;
    }

    if(type != 'showcase') {
        $(this).slick(config);
    } else if($(this).find('> div > ul').length) {
        $(this).find('.helperComplement').remove();
        $(this).find('> div > ul').slick(config);
    }
});
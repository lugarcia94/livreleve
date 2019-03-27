import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import './style.styl';

$('[data-carousel]').each(function(){
    const type = $(this).attr('data-carousel');
    let config = {};

    switch (type) {
        case 'one':
            config.autoplay = true;
            config.autoplaySpeed = 5000;
            config.responsive = [
                {
                    breakpoint    : 992,
                    settings      : {
                        dots      : true
                    }
                }
            ];
            break;
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
            config.slidesToShow      = 4;
            config.slidesToScroll    = 4;
            config.arrows            = true;
            config.dots              = false;
            config.responsive        = [
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
        
        case 'miniBanner':
            config.slidesToShow      = 3;
            config.slidesToScroll    = 4;
            config.arrows            = true;
            config.dots              = false;
            config.responsive        = [
                {
                    breakpoint        : 992,
                    settings          : {
                        slidesToShow      : 2,
                        slidesToScroll    : 1
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
        
            case 'miniVal':
            config.slidesToShow      = 4;
            config.slidesToScroll    = 4;
            config.arrows            = true;
            config.dots              = false;
            config.responsive        = [
                {
                    breakpoint        : 992,
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

        case 'gift':
            config.slidesToShow      = 1;
            config.slidesToScroll    = 1;
            config.dots              = false;

            config.responsive         = [
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

    if( $.inArray(type, ['showcase', 'gift']) != -1 ) {
        $(this).find('.helperComplement').remove();
        $(this).find('> div > ul').slick(config);
    }else if( type == 'buytobether'){

    }else{
        $(this).slick(config);
    } 

});


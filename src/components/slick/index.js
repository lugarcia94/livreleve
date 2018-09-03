import slick from 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import './style.styl';

$('[data-carousel]').each(function(){
    const type = $(this).attr('data-carousel');
    let config = {};

    switch (type) {
        case 'three':
            config.variableWidth = true;
            config.responsive = [
                {
                    breakpoint: 991,
                    settings : {
                        centerMode: true
                    }
                }
            ];
            break
    }

    $(this).slick(config);
});
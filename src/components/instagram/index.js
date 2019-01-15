import Instafeed from 'instafeed.js';
import 'slick-carousel';
import './style.styl';

function loadCarousel() {
    $('.instagram__main').slick({
        slidesToShow: 6,
        slidesToScroll: 6,
        infinite: false,
        responsive: [   
            {
                breakpoint    : 992,
                settings      : {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint    : 768,
                settings      : {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint    : 500,
                settings      : {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}
if($('#instafeed').length) {
    const userFeed = new Instafeed({
        get: 'user',
        userId: '9123501381',
        accessToken: '9123501381.1677ed0.35659f9918244d11b50f44519d0c8e4a',
        limit: 6,
        resolution: "low_resolution",
        after: loadCarousel
    });

    userFeed.run();
}
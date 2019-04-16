import './style.styl';

$('.brands__list').slick({
    slidesToShow: 8,
    slidesToScroll: 8,
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
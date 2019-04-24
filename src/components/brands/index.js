import './style.styl';

$('.brands__list').slick({
    slidesToShow: 8,
    slidesToScroll: 8,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [   
        {
            breakpoint    : 1200,
            settings      : {
                slidesToShow: 6,
                slidesToScroll: 6
            }
        },
        {
            breakpoint    : 1100,
            settings      : {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint    : 992,
            settings      : {
                slidesToShow: 6,
                slidesToScroll: 6,
                infinite: true,
                arrows: false,
                dots: false
            }
        },
        {
            breakpoint    : 768,
            settings      : {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                arrows: false,
                dots: false
            }
        },
        {
            breakpoint    : 500,
            settings      : {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                arrows: false,
                dots: false
            }
        }
    ]
});
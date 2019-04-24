import './style.styl';

const rulers = $('.ruler__list');

rulers.slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                arrows:false,
                dots: true
            }
        },{
            breakpoint: 720,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows:false,
                dots: true
            }
        },{
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows:false,
                dots: true
            }
        }
    ]

});
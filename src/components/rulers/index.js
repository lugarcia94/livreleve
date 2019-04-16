import './style.styl';

const rulers = $('.ruler__list');

rulers.slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 769,
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
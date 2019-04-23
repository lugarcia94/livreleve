import './style.styl';

$('.showcase').each(function(){
    let title = $(this).find('h2');

    if( title.length ) {
        let text = title.text().split('-');

        if(text.length > 1) {
            title.html(`<strong>${text[0]}</strong> ${text[1]}`);
        }
    }

    title
        .addClass('showcase__title')
        .addClass('showcase__title--actived');
});

$(".showcase-tabs .helperComplement").remove();

$('.showcase-tabs .showcase .showcase__title + ul').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    responsive: [   
        {
            breakpoint    : 992,
            settings      : {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint    : 768,
            settings      : {
                slidesToShow: 2,
                slidesToScroll: 2
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

$(".showcase-tabs__tabs-item").click(function() {
    $(".showcase-tabs__tabs-item").removeClass("showcase-tabs__tabs-item--active")
    $(this).addClass("showcase-tabs__tabs-item--active")
    const showcase = "."+$(this).attr("data-showcase")
    $(".showcase-tabs__showcase .showcase").removeClass("showcase--active")
    $(showcase).addClass("showcase--active")
});
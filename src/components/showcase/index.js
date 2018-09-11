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
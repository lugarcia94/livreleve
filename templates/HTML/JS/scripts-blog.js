$.get('https://blog.woodprime.com.br/wp-json/wp/v2/posts?filter[orderby]=date&per_page=4&_embed').done(function(data) {
    data.forEach(function(i){ 
        var date = i.date; 
        function formatDate(date) {
            var monthNames = [
              "Janeiro", "Fevereiro", "Março",
              "Abril", "Maio", "Junho", "Julho",
              "Agosto", "Setembro", "Outubro",
              "Novembro", "Dezembro"
            ];
            var day = date.getDate(date);
            var monthIndex = date.getMonth(date);
            var year = date.getFullYear(date);
            return day + ' de ' + monthNames[monthIndex] + ' de ' + year;
        }
        var image = i._embedded['wp:featuredmedia'][0].source_url;
        var title = i.title.rendered;
        var description = i.excerpt.rendered;
        var link = i.link; 
        var html ='<li class="list__post-item">' +
            '<div class="list__post-thumbnail"><a class="list__post-link" target="_blank" href="' +link + '"><img src="'+ image + '" alt="' + title + '" title="' + title + '"/></a></div>' +
            '<div class="list__post-content">' +
                '<span class="list__post-title"><a class="list__post-link" target="_blank" href="' +link + '">' + title + '</a></span>' +
                '<span class="list__post-data">' + formatDate(new Date(date))  + '</span>' +
                '<span class="list__post-description">' + description + '</span>' +
                '<a class="list__post-link" target="_blank" href="' +link + '">Continuar lendo...</a>' +
            '</div>' +
        '</li>';
        $('ul.list__post').append($(html));
    });
});
 
setTimeout(function(){ 
    $('ul.list__post').not('.slick-initialized').slick({
        dots: true,
        infinite: false, 
        centerMode: false,
        variableWidth: false,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 300,
        arrows: false
    });
    $(window).trigger('resize');
},2000);
 

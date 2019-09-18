var _hotsite = {
    init: function(){
        var _self = this;

        _self.validadeQtySlide();
        _self.scrollTop();
    },
    validadeQtySlide: function(){
        setTimeout(function(){
            $('.shell-products .vitrine .owl-carousel').each(function(index, el) {
                var $class = $(this).parents('.shell-products').parent().attr('class');

                if ($class == "section-content") {
                    _hotsite.slide($(this), 4);
                } else {
                    _hotsite.slide($(this), 1);
                }   
            });
        }, 3000);
    },
    slide: function($this, qtySlide){
        $this.owlCarousel({
            loop: true,
            nav: true,
            mouseDrag: true,
            touchDrag: true,
            dots: true,
            responsive:{
                0:{
                    items: window.innerWidth <= 768 ? 1 : qtySlide,
                }
            }
        });
    },
    scrollTop: function(){
        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
              $(".ah-container .go-scroll-top").css("opacity", "1");
            } else {
              $(".ah-container .go-scroll-top").css("opacity", "0");
            }
        });

        $('body').on('click', '.ah-container .go-scroll-top', function(event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: 0}, 800);
        });
    }
}

;(function($, window, document, undefined) {
    var $win = $(window);
    var $doc = $(document);

    $doc.ready(function() {
        _hotsite.init(); 
    });

    $win.on('load', function(){
    });
})(jQuery, window, document);


var $products = '<div class="shell-products">' +
    '<div class="vitrine produto">' +
        '<ul v-html="products" v-bind:class="{ \'owl-carousel\': toogleClass(slide) }"></ul>' +
    '</div>' +
'</div>';

var $banners = '<div class="shell-imagens">' +
    '<img :src="imageSrc()">' +
'</div>';
    
Vue.component('products', {
    template: $products,
    props: ['idCollection','qtyProducts', 'slide'],
    data: function() {
        return {
            "showModal": false,
            "products": "",
        };
    },
    created: function() {
        var _self = this;

        _self.getProducts();
    },
    mounted: function() {
        var _self = this;
    },
    methods:{
        getProducts: function(){
            var _self = this;

            $.get("/buscapagina?sl=f2eb3f3f-69f1-486a-aa83-092701384d25&PS=" + _self.qtyProducts + "&cc=1&sm=0&PageNumber=1&fq=H:" + _self.idCollection, function(data){
                _self.products = _self.formatHTML(data);;
            });
        },
        toogleClass: function(slide){
            if (slide == "true"){
                return true;
            } else {
                return false;
            }
        },
        formatHTML: function(data){
            var htmlSemFormatar = $(data)[1].innerHTML.replace(/\<\/ul\>\<ul\>/g,"");
            var varivelReferencia = $(htmlSemFormatar)[0].innerHTML;
            var htmlFormatado = "";    

            $(varivelReferencia).each(function(index, el) {
                if($(this)[0].className != "helperComplement"){
                    htmlFormatado += "<li>" + $(this)[0].innerHTML + "</li>";
                }
            });

            return htmlFormatado;
        },
    }
});

Vue.component('banners', {
    template: $banners,
    props: ['desktop','mobile'],
    data: function() {
        return {
            "isMobile": window.innerWidth <= 768
        };
    },
    created: function() {
    },
    mounted: function() {
    },
    methods:{
        imageSrc: function(){
            var _self = this;

            if (_self.mobile){
                return "/arquivos/" + _self.mobile;
            } else {
                return "/arquivos/" + _self.desktop;
            }
        },
    }
});

var _app = new Vue({
    el: '#woodprime-hotsite-customize'
});


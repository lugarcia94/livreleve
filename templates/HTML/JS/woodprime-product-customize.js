(function() {
    var _template = '<div class="wrapper">' +
        '<div class="content-product-infos" v-if="!showItens.finalized">' +
            '<header class="header-customize">' +
                '<h4>Você sabia que esse produto é personalizável?</h4>' +
                '<p>Descubra quais as opções disponíveis clicando no botão abaixo:</p>' +
            '</header>' +

            '<div class="shell">'+
                '<button id="btn-customize" @click="showItens.showModal = true, addLoad()">Escolha sua personalização</button>' +
                '<span class="msg-error">* as personalizações são obrigatórias</span>' +
            '</div>' +
        '</div>' +

        '<div class="content-product-infos-finalized" v-if="showItens.finalized">' +
            '<header class="header-customize">' +
                '<h4>Ficou lindo!</h4>' +
                '<p>Seu Móvel está pronto, agora é só adicionar ao carrinho para concluir sua compra.</p>' +
            '</header>' +

            '<div class="shell">'+
                '<ul class="list-item-select">' +
                    '<li v-if="showItens.colorsPrimary" class="">' +
                        '<span class="tooltip" v-if="!showItens.isMobile"> {{ limitString(selects.colors.name, 12) }} </span>' +

                        '<figure class="content-selects" @click="showItens.showModal = true, addLoad()">' +
                            '<img :src="selects.colors.image" :alt="selects.colors.name">' +
                            '<i class="ico-change colors"></i>' +
                        '</figure>' +
                    '</li>' +

                    '<li v-if="showItens.paintFinishing">' +
                        '<span class="tooltip" v-if="!showItens.isMobile"> {{ limitString(selects.painting.name, 12) }} </span>' +

                        '<figure class="content-selects" @click="showItens.showModal = true, addLoad()">' +
                            '<img :src="selects.painting.image" :alt="selects.painting.name">' +
                            '<i class="ico-change painting"></i>' +
                        '</figure>' +
                    '</li>' +

                    '<li v-if="showItens.colorsSecondary">' +
                        '<span class="tooltip" v-if="!showItens.isMobile"> {{ limitString(selects.colorsSecondary.name, 10) }} </span>' +

                        '<figure class="content-selects" @click="showItens.showModal = true, addLoad()">' +
                            '<img :src="selects.colorsSecondary.image" :alt="selects.colorsSecondary.name">' +
                            '<i class="ico-change colorsSecondary"></i>' +
                        '</figure>' +
                    '</li>' +

                    '<li v-if="showItens.skus">' +
                        '<span class="tooltip" v-if="!showItens.isMobile"> {{ limitString(selects.sku.name) }} </span>' +

                        '<figure class="content-selects" @click="showItens.showModal = true, addLoad()">' +
                            '<img :src="selects.sku.image" :alt="selects.sku.name">' +
                            '<i class="ico-change sku"></i>' +
                        '</figure>' +
                    '</li>' +
                '</ul>' +
            '</div>' +

            '<button id="btn-add-cart" @click="addToCart()">' +
                '<svg class="icon-cart" viewBox="0 0 16 14"><g id="cart"><path d="M.53,0A.52.52,0,0,0,0,.54a.52.52,0,0,0,.53.52H2.31c.89,2.15,1.76,4.3,2.63,6.45l-.8,1.91a.49.49,0,0,0,.05.49.53.53,0,0,0,.44.23h8.88a.54.54,0,0,0,.53-.52.55.55,0,0,0-.53-.52H5.42L5.88,8l8.56-.66a.55.55,0,0,0,.48-.4L16,2.39a.55.55,0,0,0-.52-.65H3.73L3.16.33A.54.54,0,0,0,2.66,0H.53Zm3.62,2.8H14.78l-.83,3.53L5.84,7ZM6.57,10.5a1.75,1.75,0,1,0,1.78,1.75A1.77,1.77,0,0,0,6.57,10.5Zm5,0a1.75,1.75,0,1,0,1.78,1.75A1.77,1.77,0,0,0,11.55,10.5Zm-5,1a.7.7,0,1,1-.71.7A.71.71,0,0,1,6.57,11.55Zm5,0a.7.7,0,1,1-.71.7A.71.71,0,0,1,11.55,11.55Z"></path></g></svg>' +
                'Adicionar ao carrinho' +
            '</button>' +
        '</div>' +

        '<transition name="modal">' +
            '<div class="modal-overlay" v-show="showItens.showModal">' +
                '<div class="modal-wrapper">' +
                    '<div class="modal-container">' +
                        '<button @click="showItens.showModal = false" class="btn-modal-close">' +
                            '<i class="ico-close">+</i>' +
                        '</button>' +
                        
                        '<div class="cssload-container" v-if="showItens.load">' +
                            '<div class="cssload-shell">' +
                                '<div class="cssload-double-torus"></div>' +
                            '</div>' +
                        '</div>' +

                        '<div class="cols owl-carousel owl-theme">' +
                            '<div class="col-1 item" v-if="showItens.colorsPrimary">' +
                                '<header class="header-title">' +
                                    '{{ colorsPrimary.title }}' +
                                '</header>' +
                                
                                '<div class="shell">' +
                                    '<div class="col-left">' +
                                        '<div class="image-select">'+
                                            '<img :src="selects.colors.image" width="350" :alt="selects.colors.name"/>' +
                                            '<span class="name-color"> {{ selects.colors.name }} </span>' +
                                        '</div>' +
                                    '</div>' +
                                    
                                    '<div class="col-right">' +
                                        '<div class="conten-image-list">' +
                                            '<ul class="list">' +
                                                '<li class="list-item" v-for="item in colorsPrimary.colors">' +
                                                    '<img :src="item.image" :alt="item.name" width="50"/>' +
                                                '</li>' +
                                            '</ul>' +
                                        '</div>' +

                                        '<div class="breadcrumbs-customize">' +
                                            '<ul v-if="!showItens.isMobile">' +
                                                '<li v-for="item in breadcrumb">' +
                                                    ' {{ item }}' +
                                                    '<i class="ico-marker"></i>' +
                                                '</li>' +

                                                '<li>' +
                                                    '<i class="ico-marker"></i> Confirmação' +
                                                '</li>' +
                                            '</ul>' +

                                            '<div class="arrows-nav">' +
                                                '<i class="arrow-prev disable"></i>' +
                                                '<i class="arrow-next" :class="{ disable: selects.colors.select == false }"></i>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +

                            '<div class="col-2 item" v-if="showItens.paintFinishing">' +
                                '<header class="header-title">' +
                                    'Escolha o tipo de pintura' +
                                '</header>' +

                                '<div class="shell">' +
                                    '<div class="col-left">' +
                                        '<ul class="list-painting">' +
                                            '<li v-for="item in paintFinishing">' +
                                                '<h4>' +
                                                    'Pintura {{ item.name }}' +
                                                '</h4>' +

                                                '<p>Nessa opção, seu móvel ficará com <br/>o acabamento em Verniz {{  item.name }} </p>' +
                                            
                                                '<button class="btn-select-type" :data-type="item.name">Escolher {{  item.name }}</button>' +
                                            '</li>' +
                                        '</ul>' +
                                    '</div>' +
                                    
                                    '<div class="col-right">' +
                                        '<div class="breadcrumbs-customize">' +
                                            '<ul v-if="!showItens.isMobile">' +
                                                '<li  v-for="(item, index) in breadcrumb">' +
                                                    '<i class="ico-marker"></i> {{ item }}' +
                                                '</li>' +

                                                '<li>' +
                                                    '<i class="ico-marker"></i> Confirmação' +
                                                '</li>' +
                                            '</ul>' +

                                            '<div class="arrows-nav">' +
                                                '<i class="arrow-prev"></i>' +
                                                '<i class="arrow-next" :class="{ disable: selects.painting.select == false }"></i>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +

                            '<div class="col-3 item" v-if="showItens.colorsSecondary">' +
                                '<header class="header-title">' +
                                    '{{ colorsSecondary.title }}' +
                                '</header>' +
                                
                                '<div class="shell">' +
                                    '<div class="col-left">' +
                                        '<div class="image-select">'+
                                            '<img :src="selects.colorsSecondary.image" width="350" :alt="selects.colorsSecondary.name"/>' +
                                            '<span class="name-color"> {{ selects.colorsSecondary.name }} </span>' +
                                        '</div>' +
                                    '</div>' +
                                    
                                    '<div class="col-right">' +
                                        '<div class="conten-image-list">' +
                                            '<ul class="list">' +
                                                '<li class="list-item" v-for="item in colorsSecondary.colors">' +
                                                    '<img :src="item.image" :alt="item.name" width="50"/>' +
                                                '</li>' +
                                            '</ul>' +
                                        '</div>' +

                                        '<div class="breadcrumbs-customize">' +
                                            '<ul v-if="!showItens.isMobile">' +
                                                '<li v-for="(item, index) in breadcrumb">' +
                                                    '<i class="ico-marker"></i> {{ item }}' +
                                                '</li>' +

                                                '<li>' +
                                                    '<i class="ico-marker"></i> Confirmação' +
                                                '</li>' +
                                            '</ul>' +

                                            '<div class="arrows-nav">' +
                                                '<i class="arrow-prev"></i>' +
                                                '<i class="arrow-next" :class="{ disable: selects.colorsSecondary.select == false }"></i>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +

                            '<div class="col-4 item" v-if="showItens.skus">' +
                                '<header class="header-title">' +
                                    'Escolha {{ skus.title }}' +
                                '</header>' +

                                '<div class="shell">' +
                                    '<div class="col-left">' +
                                        '<ul class="list-painting">' +
                                            '<li v-for="item in skus.sku">' +
                                                '<figure class="image-sku" v-if="!showItens.isMobile">' +
                                                    '<img :src="item.image" :alt="item.name"/>' +
                                                '</figure>' +

                                                '<div class="content-text">' +
                                                    '<h4> {{ item.name }} </h4>' +

                                                    '<div class="sku-description">' +
                                                        '<p> {{ item.title }} </p>' +
                                                        '<p> {{ item.description }} </p>' +
                                                    '</div>' +

                                                    '<button class="btn-select-sku" :data-name="item.name">' + 
                                                        'Escolher esse' +
                                                    '</button>' +
                                                    
                                                    '<span class="value-sku"> valor {{ item.price.best }} </span>' +
                                                '</div>' +
                                            '</li>' +
                                        '</ul>' +
                                    '</div>' +
                                    
                                    '<div class="col-right">' +
                                        '<div class="breadcrumbs-customize">' +
                                            '<ul v-if="!showItens.isMobile">' +
                                                '<li v-for="(item, index) in breadcrumb">' +
                                                    '<i class="ico-marker"></i> {{ item }}' +
                                                '</li>' +

                                                '<li>' +
                                                    '<i class="ico-marker"></i> Confirmação' +
                                                '</li>' +
                                            '</ul>' +

                                            '<div class="arrows-nav">' +
                                                '<i class="arrow-prev"></i>' +
                                                '<i class="arrow-next" :class="{ disable: selects.sku.select == false }"></i>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +

                            '<div class="col-5 item">' +
                                '<header class="header-title">' +
                                    'Seu móvel terá as opções escolhidas por você' +
                                '</header>' +

                                '<div class="shell">' +
                                    '<ul class="list-item-select">' +
                                        '<li v-if="showItens.colorsPrimary">' +
                                            '<span class="tooltip"> Cor </span>' +

                                            '<figure class="content-selects">' +
                                                '<img :src="selects.colors.image" :alt="selects.colors.name">' +
                                                '<i class="ico-change colors"></i>' +
                                            '</figure>' +

                                            '<div class="item-data-selects">' +
                                                '<span class="name-item"> {{ limitString(selects.colors.name, 12) }} </span>' +
                                            '</div>' +
                                        '</li>' +

                                        '<li v-if="showItens.paintFinishing">' +
                                            '<span class="tooltip"> Tipo de pintura </span>' +

                                            '<figure class="content-selects">' +
                                                '<img :src="selects.painting.image" :alt="selects.painting.name">' +
                                                '<i class="ico-change painting"></i>' +
                                            '</figure>' +

                                            '<div class="item-data-selects">' +
                                                '<span class="name-item"> {{ limitString(selects.painting.name, 12) }} </span>' +
                                            '</div>' +
                                        '</li>' +

                                        '<li v-if="showItens.colorsSecondary">' +
                                            '<span class="tooltip"> Tecido </span>' +

                                            '<figure class="content-selects">' +
                                                '<img :src="selects.colorsSecondary.image" :alt="selects.colorsSecondary.name">' +
                                                '<i class="ico-change colorsSecondary"></i>' +
                                            '</figure>' +

                                            '<div class="item-data-selects">' +
                                                '<span class="name-item"> {{ limitString(selects.colorsSecondary.name, 12) }} </span>' +
                                            '</div>' +
                                        '</li>' +

                                        '<li v-if="showItens.skus">' +
                                            '<span class="tooltip"> Tipo de encosto </span>' +

                                            '<figure class="content-selects">' +
                                                '<img :src="selects.sku.image" :alt="selects.sku.name">' +
                                                '<i class="ico-change sku"></i>' +
                                            '</figure>' +

                                            '<div class="item-data-selects">' +
                                                '<span class="name-item"> {{ limitString(selects.sku.name, 12) }} </span>' +
                                            '</div>' +
                                        '</li>' +
                                    '</ul>' +

                                    '<div class="content-confirme">' +
                                        '<p> Confirmo que escolhi as opções citadas acima </p>' +
                                        '<button class="btn-confirme-purchase" @click="priceChange(), showItens.showModal = false, showItens.finalized = true"> confirmo </button>' +
                                    '</div>' +

                                    '<div class="arrows-nav">' +
                                        '<i class="arrow-prev"></i>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</transition>' +

        '<transition name="modal">' +
            '<div class="modal-overlay" v-if="showItens.showModalConfirmation">' +
                '<div class="modal-wrapper wrapper-confirmation">' +
                    '<div class="modal-container modal-confirmation">' +
                        '<div class="cssload-container" v-if="showItens.load">' +
                            '<div class="cssload-shell">' +
                                '<div class="cssload-double-torus"></div>' +
                            '</div>' +
                        '</div>' +

                        '<div class="shell">' +
                            '<header class="title-confirmation">' +
                                '<i class="icon-confirmation" v-if="!showItens.isMobile"></i>' +
                                '<h3>Prouto adicionado ao carrinho</h3>' +
                            '</header>' +

                            '<div class="container-navigation">' +
                                '<button class="btn-keep-buying">' +
                                    'Continuar comprado' +
                                '</button>' +

                                '<a href="/checkout/#/cart" class="btn-finalize-purchase">' +
                                    'Finalizar compra' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</transition>' +
    '</div>';
    
    Vue.component('app-product-customize', {
        template: _template,
        data: function() {
            return {
                "paintFinishing": [],
                "breadcrumb": [],
                "skus": {
                    "title": "",
                    "sku": []
                },
                "colorsPrimary": {
                    "title": "",
                    "colors": []
                },
                "colorsSecondary": {
                    "title": "",
                    "colors": []
                },
                "showItens": {
                    "showModal": false,
                    "showModalConfirmation": false,
                    "colorsPrimary": false,
                    "paintFinishing": false,
                    "colorsSecondary": false,
                    "skus": skuJson_0.skus.length > 1,
                    "load": false,
                    "finalized": false,
                    "isMobile": window.innerWidth <= 768
                },
                "selects": {
                    "colors": {
                        "category": "",
                        "name": "",
                        "image": "",
                        "select": false
                    },
                    "painting": {
                        "category": "",
                        "name": "",
                        "image": "",
                        "select": false
                    },
                    "colorsSecondary": {
                        "category": "",
                        "name": "",
                        "image": "",
                        "select": false
                    },
                    "sku": {
                        "category": "",
                        "sku": "",
                        "name": "",
                        "image": "",
                        "select": false,
                        "price": {
                            "best": "",
                            "list": ""
                        },
                        "seller": {
                            "id": "",
                            "name": ""
                        },
                        "installments": {
                            "amount": "",
                            "value": ""
                        }
                    }          
                }
            };
        },
        created: function() {
            this.getDate();
        },
        mounted: function() {
            this.events();
            this.triggers();
        },
        methods:{
            formatMoney:function(n, c, d, t){
                c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
                return 'R$ ' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
            },
            isEmpty: function(value){
                if(value == null || value == "" || value == undefined)
                    return true;
                else
                    return false;
            },
            limitString: function(string, value){
                if (string.length > 12){
                    return string.substr(0, value) + " ...";
                } else {
                    return string;
                }
            },
            getValueBill: function (price) {
                var _self = this;

                if (!price) return;

                var valor_desc = [];
                var product_price = parseFloat(price.toString().replace(".", "").replace(",", ".").replace("R$", "").replace("R$" + " ", ""));;

                valor_desc = (product_price * 10) / 100;
                valor_desc = valor_desc;
                product_price = product_price - valor_desc;

                product_price = _self.formatMoney(product_price);
                valor_desc = _self.formatMoney(valor_desc);

                return product_price;
            },
            formatLinkImage:function(category, link){
                var mapRegex = {
                    a : /[\xE0-\xE6]/g,
                    e : /[\xE8-\xEB]/g,
                    i : /[\xEC-\xEF]/g,
                    o : /[\xF2-\xF6]/g,
                    u : /[\xF9-\xFC]/g,
                    c : /\xE7/g,
                    n : /\xF1/g,
                };

                for (var letter in mapRegex){
                    link = link.trim().toLowerCase().replace(mapRegex[letter], letter).replace(/[\[\].!'@,><|://\\;&*()_+=]/g, "").replace(/\s/g, "-").replace("pes-palito-", "");
                }

                if (category == "Cores da Madeira") {
                    return "/arquivos/cz-cores-da-madeira-" + link + ".jpg";
                }

                if (category == "Tecidos") {
                    return "/arquivos/cz-tecidos-" + link + ".jpg";
                }

                if (category == "Cores NL") {
                    return "/arquivos/cz-cores-nl-" + link + ".jpg";
                }

                if (category == "Cores do Tampo NL") {
                    return "/arquivos/cz-cores-do-tampo-nl-" + link + ".jpg";
                }

                if (category == "Cores Fleischmann") {
                    return "/arquivos/cz-cores-fleischmann-" + link + ".jpg";
                }

                if (category == "Cores MY") {
                    return "/arquivos/cz-cores-my-" + link + ".jpg";
                }

                if (category == "Tecidos Magistral") {
                    return "/arquivos/cz-tecidos-magistral-" + link + ".jpg";
                }

                if (category == "Linha A") {
                    return "/arquivos/cz-linha-a-" + link + ".jpg";
                }

                if (category == "Linha B") {
                    return "/arquivos/cz-linha-b-" + link + ".jpg";
                }

                if (category == "Linha C") {
                    return "/arquivos/cz-linha-c-" + link + ".jpg";
                }

                if (category == "Linha X") {
                    return "/arquivos/cz-linha-x-" + link + ".jpg";
                }

                if (category == "Cores NP") {
                    return "/arquivos/cz-cores-np-" + link + ".jpg";
                }

                if (category == "Cores Personalização") {
                    return "/arquivos/cz-cores-personalizacao-" + link + ".jpg";
                } 

                if (category == "Detalhes - Cores NL") {
                    return "/arquivos/cz-detalhes-cores-nl-" + link + ".jpg";
                }

                if (category == "Cores MD") {
                    return "/arquivos/cz-cores-md-" + link + ".jpg";
                }

                if (category == "Cores Pés Palito Domi") {
                    return "/arquivos/cz-cores-pes-palito-domi-pes-palito-" + link + ".jpg";
                }

                if (category == "Cores Mão e Formão") {
                    return "/arquivos/cz-cores-mao-e-formao-" + link + ".jpg";
                }

                if (category == "Cores do Tampo MY") {
                    return "/arquivos/cz-cores-do-tampo-my-bege-" + link + ".jpg";
                }
            },
            getDate: function(){
                var _self = this;

                $.ajax({
                    url: '/api/catalog_system/pub/products/search/?fq=productId:' + skuJson_0.productId,
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        console.log(data[0]);

                        if (data[0]["Cores NL"]){
                            console.info('>>>>>>>>>>>>> Cores NL');

                            _self.getColorPrimary({
                                "data": data[0]["Cores NL"],
                                "name": "Cores NL",
                                "title": "Escolha a cor da base",
                                "breadcrumb": "Cor da base"
                            });
                        }

                        if (data[0]["Cores do Tampo NL"]){
                            console.info('>>>>>>>>>>>>> Cores do Tampo NL');

                            _self.getColorSecondary({
                                "data": data[0]["Cores do Tampo NL"],
                                "name": "Cores do Tampo NL",
                                "title": "Escolha a cor do tampo",
                                "breadcrumb": "Cor do tampo"
                            });
                        }

                        if (data[0]["Cores Fleischmann"]){
                            console.info('>>>>>>>>>>>>> Cores Fleischmann');

                            _self.getColorPrimary({
                                "data": data[0]["Cores Fleischmann"],
                                "name": "Cores Fleischmann",
                                "title": "Escolha a cor do produto",
                                "breadcrumb": "Cor do produto"
                            });
                        }

                        if (data[0]["Cores da Madeira"]){
                            console.info('>>>>>>>>>>>>> Cores da Madeira');

                            _self.getColorPrimary({
                                "data": data[0]["Cores da Madeira"],
                                "name": "Cores da Madeira",
                                "title": "Escolha a cor do produto",
                                "breadcrumb": "Cor da madeira"
                            });
                        }

                        if (data[0]["Cores MY"]){
                            console.info('>>>>>>>>>>>>> Cores MY');

                            _self.getColorPrimary({
                                "data": data[0]["Cores MY"],
                                "name": "Cores MY",
                                "title": "Escolha a cor do produto",
                                "breadcrumb": "Cor da madeira"
                            });
                        }

                        if (data[0]["Cores NP"]){
                            console.info('>>>>>>>>>>>>> Cores NP');

                            _self.getColorPrimary({
                                "data": data[0]["Cores NP"],
                                "name": "Cores NP",
                                "title": "Escolha a cor do produto",
                                "breadcrumb": "Cor da madeira"
                            });
                        }

                        if (data[0]["Linha A"]){
                            console.info('>>>>>>>>>>>>> Linha A');

                            _self.getColorPrimary({
                                "data": data[0]["Linha A"],
                                "name": "Linha A",
                                "title": "Escolha a Linha",
                                "breadcrumb": "Linha"
                            });
                        }

                        if (data[0]["Linha B"]){
                            console.info('>>>>>>>>>>>>> Linha B');

                            _self.getColorPrimary({
                                "data": data[0]["Linha B"],
                                "name": "Linha B",
                                "title": "Escolha a Linha",
                                "breadcrumb": "Linha"
                            });
                        }

                        if (data[0]["Linha C"]){
                            console.info('>>>>>>>>>>>>> Linha C');

                            _self.getColorPrimary({
                                "data": data[0]["Linha C"],
                                "name": "Linha C",
                                "title": "Escolha a Linha",
                                "breadcrumb": "Linha"
                            });
                        }

                        if (data[0]["Linha X"]){
                            console.info('>>>>>>>>>>>>> Linha X');

                            _self.getColorPrimary({
                                "data": data[0]["Linha X"],
                                "name": "Linha X",
                                "title": "Escolha a Linha",
                                "breadcrumb": "Linha"
                            });
                        }

                        if (data[0]["Cores MD"]){
                            console.info('>>>>>>>>>>>>> Cores MD');

                            _self.getColorPrimary({
                                "data": data[0]["Cores MD"],
                                "name": "Cores MD",
                                "title": "Escolha cores MD",
                                "breadcrumb": "cores - MD"
                            });
                        }

                        if (data[0]["Cores Mão e Formão"]){
                            console.info('>>>>>>>>>>>>> Cores Mão e Formão');

                            _self.getColorPrimary({
                                "data": data[0]["Cores Mão e Formão"],
                                "name": "Cores Mão e Formão",
                                "title": "Escolha Cores mão e formão",
                                "breadcrumb": "Mão e formão"
                            });
                        }

                        if (data[0]["Acabamento de Pintura"]){
                            console.info('>>>>>>>>>>>>> Acabamento de Pintura');

                            _self.getPaintFinishing({
                                "data": data[0]["Acabamento de Pintura"],
                                "breadcrumb": "Tipos da pintura"
                            });
                        }

                        if (data[0]["Cores Personalização"]){
                            console.info('>>>>>>>>>>>>> Cores Personalização');

                            _self.getColorSecondary({
                                "data": data[0]["Cores Personalização"],
                                "name": "Cores Personalização",
                                "title": "Escolha a personalização",
                                "breadcrumb": "personalização"
                            });
                        }

                        if (data[0]["Tecidos Magistral"]){
                            console.info('>>>>>>>>>>>>> Tecidos Magistral');

                            _self.getColorSecondary({
                                "data": data[0]["Tecidos Magistral"],
                                "name": "Tecidos Magistral",
                                "title": "Escolha a cor do tecido",
                                "breadcrumb": "Tipos tecidos"
                            });
                        }

                        if (data[0]["Detalhes - Cores NL"]){
                            console.info('>>>>>>>>>>>>> Detalhes - Cores NL');

                            _self.getColorSecondary({
                                "data": data[0]["Detalhes - Cores NL"],
                                "name": "Detalhes - Cores NL",
                                "title": "Escolha a cor NL",
                                "breadcrumb": "Cor - NL"
                            });
                        }

                        if (data[0]["Cores Pés Palito Domi"]){
                            console.info('>>>>>>>>>>>>> Cores Pés Palito Domi');

                            _self.getColorSecondary({
                                "data": data[0]["Cores Pés Palito Domi"],
                                "name": "Cores Pés Palito Domi",
                                "title": "Escolha as cores Pés Palito Domio",
                                "breadcrumb": "Pés palito domio"
                            });
                        }




                        if (data[0]["Cores do Tampo MY"]){
                            console.info('>>>>>>>>>>>>> Cores do Tampo MY');

                            _self.getColorSecondary({
                                "data": data[0]["Cores do Tampo MY"],
                                "name": "Cores do Tampo MY",
                                "title": "Escolha as cores do Tampo MY",
                                "breadcrumb": "cores do Tampo MY"
                            });
                        }




                        if (data[0].Tecidos){
                            console.info('>>>>>>>>>>>>> Tecidos');

                            _self.getColorSecondary({
                                "data": data[0].Tecidos,
                                "name": "Tecidos",
                                "title": "Escolha a cor do tecido",
                                "breadcrumb": "Tipos tecidos"
                            });
                        }

                        if (skuJson_0.skus.length > 1) {
                            _self.getSkus({
                                "data": skuJson_0.skus,
                                "title": skuJson_0.dimensions[0],
                                "breadcrumb": skuJson_0.dimensions[0],
                            });
                        }
                    },
                    error: function (error) {
                        console.error(error)
                    }
                });
            },
            getColorPrimary: function(_object){
                var _self = this;

                _self.breadcrumb.push(_object.breadcrumb);
                _self.colorsPrimary.title = _object.title;

                for (var i = 0; i < _object.data.length; i++) {
                    _self.colorsPrimary.colors.push({
                        'name': _object.data[i],
                        'image': _self.formatLinkImage(_object.name, _object.data[i])
                    });
                }

                _self.showItens.colorsPrimary = true;
                _self.selects.colors.category = _object.breadcrumb;
                _self.selects.colors.name = _self.colorsPrimary.colors[0].name;
                _self.selects.colors.image = _self.colorsPrimary.colors[0].image;
            },
            getPaintFinishing: function(_object){
                var _self = this;

                _self.breadcrumb.push(_object.breadcrumb);

                for (var i = 0; i < _object.data.length; i++) {
                    _self.paintFinishing.push({
                        'name': _object.data[i],
                        'image': _object.data[i] == "Brilho" ? "https://woodprime.vteximg.com.br/arquivos/cz-acabamento-de-pintura-brilho.jpg" : "https://woodprime.vteximg.com.br/arquivos/cz-acabamento-de-pintura-fosco.jpg"
                    });
                }

                _self.showItens.paintFinishing = true;
                _self.selects.painting.category = _object.breadcrumb;
                _self.selects.painting.name = _self.paintFinishing[0].name;
                _self.selects.painting.image = _self.paintFinishing[0].image;
            },
            getColorSecondary: function(_object){
                var _self = this;

                _self.breadcrumb.push(_object.breadcrumb);
                _self.colorsSecondary.title = _object.title;

                for (var i = 0; i < _object.data.length; i++) {
                    _self.colorsSecondary.colors.push({
                        'name': _object.data[i],
                        'image': _self.formatLinkImage(_object.name, _object.data[i])
                    });
                }

                _self.showItens.colorsSecondary = true;
                _self.selects.colorsSecondary.category = _object.breadcrumb;
                _self.selects.colorsSecondary.name = _self.colorsSecondary.colors[0].name;
                _self.selects.colorsSecondary.image = _self.colorsSecondary.colors[0].image;
            },
            getSkus: function(_object){
                var _self = this;
                var _arrayReference = [];

                _self.skus.title = _object.title;

                if (_object.breadcrumb.indexOf(" ")){
                    _self.breadcrumb.push(_object.breadcrumb.split(" ")[0]);
                    _self.selects.sku.category = _object.breadcrumb.split(" ")[0];
                } else {
                    _self.breadcrumb.push(_object.breadcrumb);
                    _self.selects.sku.category = _object.breadcrumb;
                } 

                for (var i = 0; i < _object.data.length; i++) {
                    _self.skus.sku.push({
                        "sku": _object.data[i].sku,
                        "name": _object.data[i].skuname,
                        "image": null,
                        "title": null,
                        "description": null,
                        "price": {
                            "best": _object.data[i].bestPriceFormated,
                            "list": _object.data[i].listPriceFormated
                        },
                        "seller": {
                            "id": _object.data[i].sellerId,
                            "name": _object.data[i].seller
                        },
                        "installments": {
                            "amount": _object.data[i].installments,
                            "value": _object.data[i].installmentsValue
                        }
                    });

                    $.ajax({
                        url: 'https://api.vtexcrm.com.br/woodprime/dataentities/AC/search?_fields=linkImage,sku,image,description,title&_where=sku=' + _object.data[i].sku,
                        type: 'GET',
                        async: false,
                        dataType: 'json',
                        success: function (data) {
                            if (!_self.isEmpty(data)){
                                _arrayReference.push({
                                    "sku": data[0].sku,
                                    "title": data[0].title,
                                    "description": data[0].description,
                                    "image": data[0].linkImage
                                });
                            }
                        },
                        error: function (error) {
                            console.error(error)
                        }
                    });
                }

                for (var i = 0; i < _arrayReference.length; i++) {
                    _self.skus.sku[i].image = "/arquivos/" + _arrayReference[i].image;
                    _self.skus.sku[i].title = _arrayReference[i].title;
                    _self.skus.sku[i].description = _arrayReference[i].description;
                }
            },
            addLoad: function(){
                var _self = this;

                _self.showItens.load = true;

                setTimeout(function(){
                    _self.addSlide();
                    _self.checkeds();
                    _self.showItens.load = false;
                }, 1500);
            },
            addSlide: function(){
                var _self = this;

                $('#app-woodprime-customize .owl-carousel').owlCarousel({
                    loop: false,
                    nav: false,
                    autoHeight: false,
                    mouseDrag: false,
                    touchDrag: false,
                    responsive:{
                        0:{
                            items: 1
                        },
                    }
                });
            },
            triggers: function(){
                var _self = this;

                $('#app-woodprime-customize').on('click', '.breadcrumbs-customize .arrows-nav .arrow-next:not(.disable)', function(event) {
                    event.preventDefault();
                    $('.owl-carousel').trigger('next.owl.carousel');
                });

                $('#app-woodprime-customize').on('click', '.breadcrumbs-customize .arrows-nav .arrow-prev:not(.disable)', function(event) {
                    event.preventDefault();
                    $('.owl-carousel').trigger('prev.owl.carousel');
                });

                $('#app-woodprime-customize').on('click', '.modal-container .cols .col-5 .shell .arrows-nav .arrow-prev', function(event) {
                    event.preventDefault();
                    $('.owl-carousel').trigger('prev.owl.carousel');
                });

                $('#app-woodprime-customize').on('click', '.cols .list-item-select > li', function(event) {
                    event.preventDefault();
                    $('.owl-carousel').data('owl.carousel').to($('.owl-carousel').data('owl.carousel').relative($(this).index()));
                });

                $('#app-woodprime-customize').on('click', '.content-product-infos-finalized .list-item-select > li', function(event) {
                    event.preventDefault();
                    $('.owl-carousel').data('owl.carousel').to($('.owl-carousel').data('owl.carousel').relative($(this).index()));
                });
            },
            priceChange: function(){
                var _self = this;

                if (_self.selects.sku.select) {
                    $('.descricao-preco .price-best-price .skuBestPrice').text(_self.selects.sku.price.best);
                    $('.descricao-preco .price-list-price .skuListPrice').text(_self.selects.sku.price.list);
                    $('.price-installments .skuBestInstallmentNumber').text(_self.selects.sku.installments.amount + "x");
                    $('.price-installments .skuBestInstallmentValue').text(_self.selects.sku.installments.value);
                    $('.preco-a-vista.price-cash .desconto-a-vista').text(_self.getValueBill(_self.selects.sku.price.best) + " à vista");
                }
            },
            addToCart: function(){
                var _self = this;

                _self.showItens.load = true;
                _self.showItens.showModalConfirmation = true;

                vtexjs.checkout.getOrderForm().then(function(orderForm) {
                    return vtexjs.checkout.addToCart([{
                        id: skuJson_0.skus.length > 1 ? _self.selects.sku.sku : skuJson_0.skus[0].sku,
                        quantity: $('.buyqtd .buyqtd-input').val(),
                        seller: _self.isEmpty(_self.selects.sku.sellerId) == true ? skuJson_0.skus[0].sellerId : _self.selects.sku.seller.id
                    }], null, 1);

                }).done(function(orderForm) {
                    _self.sendAttachment(orderForm.items);
                    console.info('Sku '+ _self.selects.sku.sku +' adicionado ao carrinho!');
                });
            },
            sendAttachment: function(itemIndex){
                var _self = this;
                var _itemAttachment = {};

                for (index in _self.selects){ 
                    if (_self.selects[index].select){
                        _itemAttachment[_self.selects[index].category] = _self.selects[index].name;  
                    } 
                }

                vtexjs.checkout.addItemAttachment(itemIndex.length - 1, "Caracteristicas", { "Personalização": JSON.stringify(_itemAttachment).replace(/[\\"{}]/g, ""), }).done(function(orderForm) {
                    console.info('Attachment adicionado ao sku '+ _self.selects.sku.sku +'!');
                    _self.showItens.load = false;
                });
            },
            filter: function(_object){
                var _self = this;

                var _filter = _object.itens.filter(function(item){
                    return _object.select == item.name;
                });

                if (_object.isSku){
                    _self.selects.sku.sku = _filter[0].sku;
                    _self.selects.sku.name = _filter[0].name;
                    _self.selects.sku.image = _filter[0].image;
                    _self.selects.sku.price.best = _filter[0].price.best;
                    _self.selects.sku.price.list = _filter[0].price.list;
                    _self.selects.sku.installments.amount = _filter[0].installments.amount;
                    _self.selects.sku.installments.value = _self.formatMoney(_filter[0].installments.value / 100);
                    _self.selects.sku.seller.id = _filter[0].seller.id;
                    _self.selects.sku.seller.name = _filter[0].seller.name;
                    _self.selects.sku.select = true;
                } else{
                    _object.tapy.name = _filter[0].name;
                    _object.tapy.image = _filter[0].image;
                    _object.tapy.select = true;
                }
            },
            checkeds: function(){
                var _self = this;

                if(_self.selects.colors.select) {
                    $('#app-woodprime-customize .col-1 .list .list-item').each(function(index, el) {
                        if($(this).find('img').attr('alt') == _self.selects.colors.name)
                            $(this).addClass('active');
                    });
                }

                if(_self.selects.painting.select) {
                    $('#app-woodprime-customize .col-2 .btn-select-type').each(function(index, el) {
                        if($(this).attr('data-type') == _self.selects.painting.name)
                            $(this).addClass('active');
                    });
                }

                if(_self.selects.colorsSecondary.select) {
                    $('#app-woodprime-customize .col-3 .list .list-item').each(function(index, el) {
                        if($(this).find('img').attr('alt') == _self.selects.colorsSecondary.name)
                            $(this).addClass('active');
                    });
                }

                if(_self.selects.sku.select) {
                    $('#app-woodprime-customize .col-4 .btn-select-sku').each(function(index, el) {
                        if($(this).attr('data-sku') == _self.selects.sku.sku)
                            $(this).addClass('active');
                    });
                }
            },
            resetBuy: function(){
                var _self = this;

                _self.showItens.finalized = false;
                _self.selects.colors.select = false;
                _self.selects.painting.select = false;
                _self.selects.colorsSecondary.select = false;
                _self.selects.sku.select = false;
                _self.showItens.showModalConfirmation = false;
            },
            events: function(){
                var _self = this;

                //toogle class e filter cor do produto
                $('#app-woodprime-customize').on('click', '.col-1 .conten-image-list .list .list-item', function(event) {
                    event.preventDefault();
                    $('#app-woodprime-customize .col-1 .conten-image-list .list .list-item').removeClass('active');
                    $(this).addClass('active');

                    _self.filter({
                        "select": $(this).find('img').attr('alt'),
                        "itens": _self.colorsPrimary.colors,
                        "tapy": _self.selects.colors,
                        "isSku": false
                    });
                });

                //toogle class e filter escolha seu tecido
                $('#app-woodprime-customize').on('click', '.col-3 .conten-image-list .list .list-item', function(event) {
                    event.preventDefault();
                    $('#app-woodprime-customize .col-3 .conten-image-list .list .list-item').removeClass('active');
                    $(this).addClass('active');

                    _self.filter({
                        "select": $(this).find('img').attr('alt'),
                        "itens": _self.colorsSecondary.colors,
                        "tapy": _self.selects.colorsSecondary,
                        "isSku": false
                    });
                });

                //toogle class e filter tipo de pintura
                $('#app-woodprime-customize').on('click', '.col-2 .col-left .btn-select-type', function(event) {
                    event.preventDefault();
                    $('.col-2 .col-left .list-painting > li .btn-select-type').removeClass('active');
                    $(this).addClass('active');

                    _self.filter({
                        "select": $(this).attr('data-type'),
                        "itens": _self.paintFinishing,
                        "tapy": _self.selects.painting,
                        "isSku": false
                    });
                });

                //toogle class e filter tipo de encosto
                $('#app-woodprime-customize').on('click', '.col-4 .list-painting .content-text .btn-select-sku', function(event) {
                    event.preventDefault();
                    $('#app-woodprime-customize .col-4 .content-text .btn-select-sku').removeClass('active');
                    $(this).addClass('active');

                    _self.filter({
                        "select": $(this).attr('data-name'),
                        "itens": _self.skus.sku,
                        "tapy": _self.selects.sku,
                        "isSku": true
                    });
                });

                //limpa objeto para nova compra
                $('#app-woodprime-customize ').on('click', '.modal-confirmation .btn-keep-buying', function(event) {
                    event.preventDefault();
                    _self.resetBuy();
                }); 
            }
        }
    });

    var _app = new Vue({
        el: '#app-woodprime-customize'
    });
})();
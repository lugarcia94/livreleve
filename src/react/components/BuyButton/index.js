import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import axios from 'axios';
import config from '../../../core/config';

class BuyButton extends Component {
    constructor(props) {
        super(props);

        this.buy = this.buy.bind(this);

        this.state = {
            item: {
                quantity: 1
            },
            salesChannel: '',
            product: {},
            sku: {},
            valid: true,
            single: true,
            msg: "",
            loadding: true,
            hasAddProduct: false

        };
    }
    componentWillMount() {
        axios.get(config.host + '/api/catalog_system/pub/products/variations/' + this.props.id).then( response => {
            let items   = response.data;
            let skus    = items.skus.filter(item => item.availablequantity > 0 && item.available );
            let state   = {
                product: items,
                single: false
            };

            if(skus.length == 1) {
                state = {
                    item: {
                        id: skus[0].sku,
                        quantity: 1,
                        seller: '1'
                    },
                    salesChannel: items.salesChannel,
                    product: items,
                    single: true,
                    sku: skus[0],
                    loadding: false,
                };
                
            }
            this.setState(state);
        });
    }
    buy() {
        if(this.state.item.quantity != '' && this.state.item.quantity > 0) {
            console.log('add');
            this.setState({
                hasAddProduct: true
            });
            vtexjs.checkout
                .addToCart([this.state.item], null, this.state.salesChannel)
                .done((orderForm) => {
                    this.setState({
                        hasAddProduct: false
                    });
                });
        } else {
            this.setState({
                valid: false,
                msg: "Adicione uma quantidade"
            });
        }
    }
    handleQTD(qtd) {

        if(this.state.sku.availablequantity >= qtd) 
            this.setState({
                item: {
                    id: this.state.item.id,
                    quantity: qtd,
                    seller: this.state.item.seller
                },
                valid: true,
                msg: ""
            });
        else if(qtd == '')
            this.setState({
                valid: false,
                msg: "Adicione uma quantidade"
            });
        else 
            this.setState({
                msg: "Quantidade Maxima em estoque é " + this.state.sku.availablequantity
            });
    }
    less() {
        let qtd = parseInt(this.state.item.quantity);

        if(qtd > 1) {
            qtd--;
        } else qtd = 1;

        this.handleQTD(qtd);
    }
    more() {
        let qtd = parseInt(this.state.item.quantity);
        
        if(!qtd) qtd = 1;
        else qtd++;

        this.handleQTD(qtd);
    }
    update(evt) {
        let qtd = parseInt(evt.target.value.replace(/[^\d]/,''));
        
        if(!qtd) qtd = '';

        this.handleQTD(qtd);
    }
    render() {
        let qtd = this.state.item.quantity;
        let msg = '';

        if(this.state.msg.length > 0) 
            msg = <div className="buy-button__msg">{ this.state.msg }</div>;

        if(this.state.loadding)
            return <div className="buy-button--loadding"></div>;

        if(!this.state.single || Object.keys(this.state.product).length == 0) 
            return <div className="buy-button--empty"></div>;

        return (
            <div className={classNames({ "buy-button": true, "buy-button--add-product": this.state.hasAddProduct })}>
                <div className="buy-button__qtd">
                    {msg}
                    <button className="buy-button__less" type="button" onClick={this.less.bind(this)} ><span>-</span></button>
                    <input className="buy-button__input" type="text" value={ qtd } onChange={this.update.bind(this)} />
                    <button className="buy-button__more" type="button" onClick={this.more.bind(this)}><span>+</span></button>
                </div>
                <button disabled={ !this.state.valid } className="buy-button__button" type="button" onClick={this.buy}>
                    <strong>Adiconar</strong>
                    ao carrinho
                </button>
            </div>
        );
    }
}

export default connect()(BuyButton);
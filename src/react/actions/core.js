import axios from 'axios';
import config from '../../core/config';

export function orderForm(object) {
    return {
        type: 'ORDER_FORM',
        orderForm: object
    }
}

export function fetchOrderForm() {
    return (dispatch) => {
        vtexjs.checkout.getOrderForm()
            .done(function(object) {
                dispatch(orderForm(object));
            });
    }
}

export function fetchFirstSku(id) {
    return (dispatch) => {
        axios.get(config.host + '/api/catalog_system/pub/products/variations/' + id)
            .then( response => {

                let data = response.data.skus;
                let flag = true;

                data.filter(item => {

                    if(flag && item.available) {
                        flag = false;
                        return true;
                    } else return false;

                });

                if(data.length) dispatch(firstSku(data[0].sku));

            });
    }
}

export function firstSku(idFirstSku) {
    return {
        type: 'FIRST_ID_SKU',
        idFirstSku: idFirstSku
    }
}

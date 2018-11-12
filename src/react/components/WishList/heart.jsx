import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { update } from '../../actions/wishlist';
import { orderForm } from '../../reducers/core';

class heart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            orderForm: {
                loggedIn: false
            }
        };
        this.handle = this.handle.bind(this);
    }
    componentDidMount() {
        this.update();
    }
    componentWillReceiveProps(nextProps) { 
        this.update();
    }
    login() {
        vtexjs.checkout.getOrderForm()
            .done((orderForm) => {
                this.setState({ orderForm });
                if(!orderForm.loggedIn) {
                    vtexid.start();
                }
            });
    }
    update() {
        let { wishlist } = this.props; 
        let index = wishlist.products.findIndex( id => id == this.props.id);

        if(index > -1)  this.setState({ selected: true });
        else            this.setState({ selected: false });
    }
    handle() {
        if(!this.state.orderForm.loggedIn) this.login();
        else {
            const { id } = this.props;
            this.props.update(parseInt(id));
        } 
    }
    render() {
        const { removing, creating } = this.props;
        let disabled = true;

        if( !removing && !creating ) disabled = false;

        return <button disabled={ disabled } aria-selected={ this.state.selected } onClick={ this.handle } class="c-wishlist__button c-wishlist__button--heart" type="button">
            <svg width="18" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543 c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503 c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z"/></svg>
        </button>;
    }
}

heart.propTypes = {
    wishlist: PropTypes.object.isRequired,
    removing: PropTypes.bool.isRequired,
    creating: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        wishlist: state.wishlist,
        removing: state.isRemoving,
        creating: state.isCreating
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        update: (id) => dispatch(update(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(heart);


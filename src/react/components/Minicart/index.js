import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { minicartFetchData, minicartFetchDataRemove, minicartToggle, minicartRemove } from '../../actions/minicart';

import './style.styl';

class Minicart extends Component {

    constructor(props) {
        super(props);
        this.handleClick    = this.handleClick.bind(this);
        this.close          = this.close.bind(this);
        this.state          = {
            qtd: 0,
            new: false
        };
    }

    componentWillMount() {
        this.props.fetchData();
        $vtex(window).on('checkoutRequestEnd.vtex', () => this.props.fetchData() );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.qtd !== this.state.qtd) {
            this.setState({ 
                qtd: nextProps.qtd,
                new: true 
            });

            window.setTimeout(()=>{
                this.setState({ 
                    new: false
                });
            }, 2000);
        }
    }

    close() {
        document.querySelector('body').classList.remove('is-minicart');
    }

    handleClick(event) {

        if(this.props.expanded) {
            if(event.target.parentElement.classList.contains('minicart-header')
                || event.target.parentElement.classList.contains('minicart')) {
                this.props.toggle(false);
            }
        } else
            this.props.toggle(true);
    }

    renderHtml() {
        if(typeof this.props.items === 'undefined') return;
        return Array.from(this.props.items).map((item, index) => {
            return (
                <li key={item.id} className="minicart__item">
                    <a href={item.detailUrl} className="minicart__link">
                        <figure className="minicart__figure">
                            <img className="minicart__image" src={item.imageUrl} alt={item.name}/>
                        </figure>
                        <div className="minicart__info">
                            <h4 className="minicart__name">{item.name}</h4>
                            <span className="minicart__price">{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item.price / 100)}</span>
                            <small className="minicart__amount">Qtde.: {item.quantity}</small>
                        </div>
                    </a>
                    <button onClick={() => this.props.remove(index)} className="minicart__trash"> Excluir </button>
                </li>
            );
        });
    }
    render() {
        let list = this.renderHtml();
        let _className = this.props.isRemoved ? 'minicart__container is-loading' : 'minicart__container';

        if(parseInt(this.props.qtd) == 0)
            list = (<h3 className="minicart__empty">Seu carrinho está vazio.</h3>);

        if(this.props.isLoading && !this.props.isRemoved) return (
            <section className={_className} >
                <div className="minicart__header">
                    <h1 className="minicart__title">Meu Carrinho</h1>
                    <button onClick={this.close} type="button" className="minicart__close">Close</button>
                </div>
                <div className="minicart__main">
                    <ul>{list}</ul>
                </div>
            </section>
        );

        return(
            <div className={_className} >
                <div className="minicart__header">
                    <h1 className="minicart__title">Meu Carrinho</h1>
                    <button onClick={this.close} type="button" class="minicart__close">Close</button>
                </div>
                <div className="minicart__main">
                    <ul>{list}</ul>
                </div>
                { this.props.qtd > 0 &&
                    <div className="minicart__footer">
                        <em className="minicart__price-total">
                            <span className="minicart__total">Total:</span>
                            <span className="minicart__price">{new Intl.NumberFormat('pt-br', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(this.props.minicart.value / 100)}</span>
                        </em>
                        <a className="minicart-calltoaction" href="/checkout/#/cart">
                            <span> Finalizar </span>
                        </a>
                    </div>
                }
            </div>
        );

    }
}


Minicart.propTypes = {
    fetchData: PropTypes.func.isRequired,
    minicart: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isRemoved: PropTypes.bool.isRequired,
    qtd: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired

};

const mapStateToProps = (state) => {
    return {
        minicart: state.minicart,
        hasErrored: state.minicartHasErrored,
        isLoading: state.minicartIsLoading,
        qtd: state.minicartQtd,
        expanded: state.minicartExpanded,
        items: state.minicartItems,
        isRemoved: state.minicartIsRemove
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData:  () => dispatch(minicartFetchData()),
        removeFake: (index) => dispatch(minicartRemove(index)),
        remove:     (index) => dispatch(minicartFetchDataRemove(index)),
        toggle: (bool) => dispatch(minicartToggle(bool))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Minicart);
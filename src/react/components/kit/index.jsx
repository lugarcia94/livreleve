import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import axios from 'axios';



class Kit extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('DidMount Kit');
        axios.get('/api/catalog_system/pub/products/search?fq=productId:1512')
            .then(function(data){
                console.log(data)
            })
    }

    render() {
        return <div></div>;

    }
}


Kit.propTypes = {

};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Kit);
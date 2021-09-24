import React, {useEffect} from 'react';
import {Row} from 'reactstrap';

import './Featured.css';
import * as actionTypes from '../../store/actions';
import { connect,} from 'react-redux';
import ProductItem from '../ProductItem/ProductItem';

const Featured = (props) => {
    const {onInitProducts} = props;
    

    useEffect(()=>{
        onInitProducts();
    },[onInitProducts])

    
    const modalProduct = (item) => {
      console.log(item)
    }

    const toFavorites = () => {
      console.log('Añadido a favoritos')
    }

    const Prods = () => {
      console.log(props.products)
      return props.products.map((item)=>
        <ProductItem item={item} toFavorites={toFavorites} modalProduct={modalProduct} showWish={true} />
      )
    }

    
    
    return (
      <Row>

        <Prods/>
      </Row>
    );
    
}


const mapStateToProps = state => {
    return {      
      products: state.products,
    }
}


const mapDispatchToProps = dispatch => {
    return{
      onInitProducts: () => dispatch(actionTypes.initProducts()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Featured);
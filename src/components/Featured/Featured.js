import React, {useEffect} from 'react';
import {Row,Carousel} from 'react-bootstrap';

import './Featured.css';
import * as actionTypes from '../../store/actions';
import { connect,} from 'react-redux';
import ProductCarousel from '../ProductItem/ProductCarousel';

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
      
          <ProductCarousel item={item} toFavorites={toFavorites} modalProduct={modalProduct} showWish={true} />
      )
    }

    
    
    return (
      <div>
        <Carousel>
          <Prods/>
        </Carousel>
      </div>
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
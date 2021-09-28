import React, {useEffect} from 'react';
import {Row,Carousel} from 'react-bootstrap';

import './Featured.css';
import * as actionTypes from '../../store/actions';
import { connect,} from 'react-redux';

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

    

    
    
    return (
        <Carousel fade variant="dark" width="50%">
          {
            props.products.map((item)=>      
              <Carousel.Item >
                <div className="CarouselItem">
                {
                    item.photo===null?
                    <img  src={no_photo} alt={item.name} height="350px" />:
                    <img  src={item.photo} alt={item.name} height="350px"/>
                }
                </div>
                <Carousel.Caption className="CarouselItem">
                  <div className="CarouselCaption">
                    <h3>{item.name}</h3>
                    <p><span><strong>Precio: </strong>{item.price} $</span>&nbsp;&nbsp;&nbsp;<span><strong>U/M: </strong>{item.um_name}</span></p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            )
          } 
        </Carousel>
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
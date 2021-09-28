import React, {useEffect} from 'react';
import {
    Table
} from 'react-bootstrap';
import { connect,} from 'react-redux';

import ProductRow from './ProductRow';

const Products = (props) =>{
    const {products, onInitProducts} = props

    useEffect(()=>{
        if (products===[]) {
            onInitProducts()
        }
    },[products,onInitProducts])

    const RowData = () =>{
        return props.products.map((item)=> <ProductRow item={item} /> )
    }

    return(
        <div  style={{marginTop:'70px'}}>
        <h2>Edición de productos</h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>U/M</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <RowData />
            </tbody>
        </Table>
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

export default connect(mapStateToProps,mapDispatchToProps)(Products);
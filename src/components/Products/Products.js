import React, {useEffect, useState} from 'react';
import {
    Table
} from 'react-bootstrap';
import { connect,} from 'react-redux';

import ProductRow from './ProductRow';
import * as actionTypes from '../../store/actions';
import Modal from './ProductModal';

const Products = (props) =>{
    const {products, onInitProducts} = props
    const [modal,setModal] = useState(false);
    const [activeItem,setActiveItem] = useState(null)

    useEffect(()=>{
            onInitProducts()
    },[onInitProducts])

    const RowData = () =>{
        return props.products.map((item)=> <ProductRow item={item} handleEdit={handleEdit} /> )
    }

    const handleEdit = (item) =>{
        setActiveItem(item);
        setModal(true);
    }

    return(
        <div  style={{marginTop:'70px'}}>
        <h2>Edición de productos</h2>
        <Table striped bordered hover size="sm">
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
        {modal ? (
            <Modal
                item={activeItem}
            />
        ) : null}
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
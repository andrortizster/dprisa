import React, {useEffect, useState} from 'react';
import {
    Table,
    Button,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import { connect,} from 'react-redux';
import {faPlusCircle,faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import ProductRow from './ProductRow';
import * as actionTypes from '../../store/actions';
import Modal from './ProductModal';

const Products = (props) =>{
    const {products, onInitProducts} = props
    const [modal,setModal] = useState(false);
    const [activeItem,setActiveItem] = useState(null)
    const [searchValue,setSearchValue] = useState('')

    useEffect(()=>{
            onInitProducts()
    },[onInitProducts])

    const RowData = () =>{
        const filteredItems = props.products.filter(lista => {
            return lista.name.toLowerCase().includes(searchValue.toLowerCase());
          });

        return filteredItems.map((item)=> <ProductRow item={item} handleEdit={handleEdit} /> )
    }

    const handleEdit = (item) =>{
        setActiveItem(item);
        setModal(true);
    }

    const searchChange = (e) =>{
        setSearchValue(e.target.value)
    }

    return(
        <div  style={{marginTop:'70px'}}>
        <h2>Edición de productos</h2>
        <div style={{display:"flex",justifyContent:"space-between", marginBottom:"10px",}}>
            <Button width="520px" variant="success"><FontAwesomeIcon icon={faPlusCircle}/> Nuevo producto</Button>
            <div></div>
                <input type="text" placeholder="Buscar" style={{borderRadius:"5px"}}  onChange={searchChange} />
        </div>
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
            <Modal
                item={activeItem}
                modal={modal}
                setModal={setModal}
            />
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
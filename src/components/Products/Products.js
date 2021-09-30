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
        <div style={{display:"flex",justifyItems:"stretch", marginBottom:"10px",}}>
            <Button variant="success"><FontAwesomeIcon icon={faPlusCircle}/> Añadir producto</Button>
            <InputGroup className="mb-3" width="120px">
                <FormControl
                placeholder="Buscar"
                aria-label="Buscar"
                aria-describedby="basic-addon2"
                />
                <InputGroup.Text id="basic-addon2"><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
            </InputGroup>
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